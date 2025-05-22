"use client"

import { useState, useEffect } from "react"
import { useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Header } from "@/components/header"
import { createShareLink } from "./actions"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Copy, Facebook, Twitter, Linkedin, Instagram, Mail } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"

export default function ShareBadgePage() {
  const params = useParams()
  const badgeId = params.badgeId as string
  const [shareUrl, setShareUrl] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    async function getShareLink() {
      setIsLoading(true)
      setError(null)
      try {
        const result = await createShareLink(badgeId)
        if (result.success) {
          setShareUrl(result.shareUrl)
        } else {
          setError(result.error || "Failed to create share link")
        }
      } catch (err) {
        setError("An unexpected error occurred")
        console.error(err)
      } finally {
        setIsLoading(false)
      }
    }

    getShareLink()
  }, [badgeId])

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: "Copied!",
      description: "Link copied to clipboard",
    })
  }

  const embedCode = `<iframe src="${shareUrl}" width="300" height="300" frameborder="0"></iframe>`

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-10">
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold mb-6 text-center">Share Your Badge</h1>

            {error ? (
              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">Error</CardTitle>
                  <CardDescription>There was a problem creating your share link</CardDescription>
                </CardHeader>
                <CardContent>
                  <p>{error}</p>
                  <Button className="mt-4" onClick={() => window.history.back()}>
                    Go Back
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <Tabs defaultValue="social" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="social">Social Media</TabsTrigger>
                  <TabsTrigger value="link">Direct Link</TabsTrigger>
                  <TabsTrigger value="embed">Embed</TabsTrigger>
                </TabsList>

                <TabsContent value="social" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Share on Social Media</CardTitle>
                      <CardDescription>Share your achievement with your network</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <Button variant="outline" className="flex items-center gap-2" disabled={isLoading}>
                          <Twitter className="h-4 w-4" />
                          Twitter
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2" disabled={isLoading}>
                          <Facebook className="h-4 w-4" />
                          Facebook
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2" disabled={isLoading}>
                          <Instagram className="h-4 w-4" />
                          Instagram
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2" disabled={isLoading}>
                          <Linkedin className="h-4 w-4" />
                          LinkedIn
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2" disabled={isLoading}>
                          <Mail className="h-4 w-4" />
                          Email
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="link" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Direct Link</CardTitle>
                      <CardDescription>Copy and share this link anywhere</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        <Input value={shareUrl} readOnly disabled={isLoading} />
                        <Button variant="outline" size="icon" onClick={() => handleCopy(shareUrl)} disabled={isLoading}>
                          <Copy className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="embed" className="space-y-4 pt-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Embed Code</CardTitle>
                      <CardDescription>Add this badge to your website or blog</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Textarea value={embedCode} readOnly disabled={isLoading} className="h-24" />
                      <Button
                        variant="outline"
                        className="flex items-center gap-2"
                        onClick={() => handleCopy(embedCode)}
                        disabled={isLoading}
                      >
                        <Copy className="h-4 w-4" />
                        Copy Embed Code
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
