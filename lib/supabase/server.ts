import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import type { Database } from "@/lib/database.types"

// Use a global variable to store the client instance
let serverClient: ReturnType<typeof createServerClient<Database>> | null = null

export function createServerSupabaseClient() {
  // If we're in a server component that gets re-rendered frequently,
  // we want to reuse the same client instance
  if (serverClient) return serverClient

  const cookieStore = cookies()

  serverClient = createServerClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })

  return serverClient
}

// This function should be used in Route Handlers and Server Actions
// where we need a fresh client for each request
export function createRouteHandlerSupabaseClient() {
  const cookieStore = cookies()

  return createServerClient<Database>(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!, {
    cookies: {
      get(name) {
        return cookieStore.get(name)?.value
      },
      set(name, value, options) {
        cookieStore.set({ name, value, ...options })
      },
      remove(name, options) {
        cookieStore.set({ name, value: "", ...options })
      },
    },
  })
}
