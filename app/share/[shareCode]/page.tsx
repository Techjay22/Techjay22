import { notFound } from "next/navigation"
import { createServerSupabaseClient } from "@/lib/supabase/server"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Header } from "@/components/header"
import { BadgeDisplay } from "@/components/badge-display"

interface SharePageProps {
  params: {
    shareCode: string
  }
}

export default async function SharePage({ params }: SharePageProps) {
  const { shareCode } = params
  const supabase = createServerSupabaseClient()

  // Get the shared badge
  const { data: sharedBadge, error } = await supabase
    .from("shared_badges")
    .select(
      `
      id,
      badge_id,
      user_id,
      created_at,
      view_count,
      badges (
        id,
        title,
        description,
        icon,
        color,
        border_width,
        badge_categories (
          id,
          name
        )
      ),
      profiles:user_id (
        username,
        full_name,
        avatar_url
      )
    `,
    )
    .eq("share_code", shareCode)
    .single()

  if (error || !sharedBadge) {
    notFound()
  }

  // Increment view count
  await supabase
    .from("shared_badges")
    .update({ view_count: (sharedBadge.view_count || 0) + 1 })
    .eq("id", sharedBadge.id)

  const badge = sharedBadge.badges
  const user = sharedBadge.profiles

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-10">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold mb-2">{badge.title}</h1>
              <p className="text-muted-foreground">Shared by {user.full_name || user.username || "Anonymous User"}</p>
            </div>

            <div className="flex flex-col items-center justify-center mb-8">
              <BadgeDisplay
                badge={{
                  title: badge.title,
                  description: badge.description || "",
                  icon: badge.icon || "trophy",
                  color: badge.color || "blue",
                  borderWidth: badge.border_width || 4,
                }}
                size="large"
              />
            </div>

            <div className="text-center space-y-4">
              <p className="text-muted-foreground">Category: {badge.badge_categories?.name || "Uncategorized"}</p>
              <p>{badge.description}</p>

              <div className="flex justify-center gap-4 mt-8">
                <Button asChild>
                  <Link href="/signup">Create Your Own Badge</Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/">Learn More</Link>
                </Button>
              </div>
            </div>

            <div className="mt-12 border-t pt-8">
              <h2 className="text-xl font-bold mb-4 text-center">Share this badge</h2>
              <div className="flex justify-center gap-4">
                <Button variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                  </svg>
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                  </svg>
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="mr-2"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                  Instagram
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
