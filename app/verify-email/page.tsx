"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { createClientSupabaseClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2, Mail } from "lucide-react"

export default function VerifyEmailPage() {
  const [email, setEmail] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [resendSuccess, setResendSuccess] = useState(false)
  const [resendLoading, setResendLoading] = useState(false)
  const supabase = createClientSupabaseClient()

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession()

      if (data.session?.user) {
        setEmail(data.session.user.email)
      }

      setIsLoading(false)
    }

    checkSession()
  }, [supabase])

  const handleResendVerification = async () => {
    if (!email) return

    setResendLoading(true)
    setResendSuccess(false)
    setError(null)

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback?verified=success`,
        },
      })

      if (error) {
        setError(error.message)
      } else {
        setResendSuccess(true)
      }
    } catch (err) {
      setError("An unexpected error occurred")
      console.error(err)
    } finally {
      setResendLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
        <p>Loading...</p>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-primary/10 p-3">
              <Mail className="h-6 w-6 text-primary" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Verify your email</CardTitle>
          <CardDescription>
            {email ? (
              <>
                We've sent a verification link to <span className="font-medium">{email}</span>
              </>
            ) : (
              "Please verify your email address to continue"
            )}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {resendSuccess && (
            <Alert className="mb-4 border-green-500 text-green-500">
              <CheckCircle2 className="h-4 w-4" />
              <AlertDescription>Verification email resent successfully. Please check your inbox.</AlertDescription>
            </Alert>
          )}

          <div className="space-y-4">
            <p className="text-center text-sm text-muted-foreground">
              Please check your email inbox and click the verification link to complete your registration. If you don't
              see the email, check your spam folder.
            </p>

            {email && (
              <Button onClick={handleResendVerification} className="w-full" disabled={resendLoading}>
                {resendLoading ? "Sending..." : "Resend verification email"}
              </Button>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <div className="text-center text-sm">
            <Link href="/login" className="text-primary hover:underline">
              Back to login
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
