import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")
  const verified = requestUrl.searchParams.get("verified")

  if (code) {
    const supabase = createRouteHandlerSupabaseClient()
    await supabase.auth.exchangeCodeForSession(code)
  }

  // URL to redirect to after sign in process completes
  // If the user just verified their email, redirect to login with success message
  if (verified === "success") {
    return NextResponse.redirect(new URL("/login?verified=success", request.url))
  }

  return NextResponse.redirect(new URL("/dashboard", request.url))
}
