import { createServerSupabaseClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { Header } from "@/components/header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Link from "next/link"
import { BadgeCard } from "@/components/badge-card"
import { AchievementCard } from "@/components/achievement-card"
import { Edit, MapPin, Globe, Twitter, Instagram, Linkedin } from "lucide-react"
import { getUserProfile } from "./actions"

export default async function ProfilePage() {
  const supabase = createServerSupabaseClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  const { profile, badges, achievements } = await getUserProfile(user.id)

  // Get initials from name or email
  const getInitials = () => {
    if (profile?.full_name) {
      return profile.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .substring(0, 2)
    }
    return user.email?.substring(0, 2).toUpperCase() || "U"
  }

  // Format social links
  const socialLinks = profile?.social_links ? JSON.parse(profile.social_links as string) : {}

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-10">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-32 w-32 mb-4">
                    <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt={profile?.full_name || ""} />
                    <AvatarFallback className="text-2xl">{getInitials()}</AvatarFallback>
                  </Avatar>
                  <h1 className="text-2xl font-bold">{profile?.full_name || user.email}</h1>
                  <p className="text-muted-foreground">@{profile?.username || user.email?.split("@")[0]}</p>

                  <div className="mt-4 flex flex-col items-center gap-2">
                    {profile?.location && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{profile.location}</span>
                      </div>
                    )}
                    {profile?.website && (
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <Globe className="h-4 w-4" />
                        <a href={profile.website} target="_blank" rel="noopener noreferrer" className="hover:underline">
                          {profile.website.replace(/^https?:\/\//, "")}
                        </a>
                      </div>
                    )}
                  </div>

                  {profile?.bio && <p className="mt-4 text-sm">{profile.bio}</p>}

                  <div className="mt-4 flex gap-2">
                    {socialLinks.twitter && (
                      <a
                        href={`https://twitter.com/${socialLinks.twitter}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Twitter className="h-5 w-5" />
                      </a>
                    )}
                    {socialLinks.instagram && (
                      <a
                        href={`https://instagram.com/${socialLinks.instagram}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Instagram className="h-5 w-5" />
                      </a>
                    )}
                    {socialLinks.linkedin && (
                      <a
                        href={`https://linkedin.com/in/${socialLinks.linkedin}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <Linkedin className="h-5 w-5" />
                      </a>
                    )}
                  </div>

                  <div className="mt-6">
                    <Link href="/profile/edit">
                      <Button variant="outline" className="flex items-center gap-2">
                        <Edit className="h-4 w-4" />
                        Edit Profile
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="border rounded-lg p-4">
                  <h2 className="font-medium mb-4">Stats</h2>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold">{badges.length}</p>
                      <p className="text-sm text-muted-foreground">Badges</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{achievements.length}</p>
                      <p className="text-sm text-muted-foreground">Achievements</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3">
              <Tabs defaultValue="badges" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-8">
                  <TabsTrigger value="badges">Badges</TabsTrigger>
                  <TabsTrigger value="achievements">Achievements</TabsTrigger>
                </TabsList>

                <TabsContent value="badges">
                  {badges.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {badges.map((badge) => (
                        <BadgeCard
                          key={badge.id}
                          badge={badge.badges}
                          earnedDate={badge.earned_date}
                          likes={badge.likes || 0}
                          comments={badge.comments || 0}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <h3 className="text-lg font-medium mb-2">No badges yet</h3>
                      <p className="text-muted-foreground mb-6">You haven't earned any badges yet.</p>
                      <Link href="/create">
                        <Button>Create Your First Badge</Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="achievements">
                  {achievements.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {achievements.map((achievement) => (
                        <AchievementCard
                          key={achievement.id}
                          achievement={achievement.achievements}
                          earnedAt={achievement.earned_at}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12 border rounded-lg">
                      <h3 className="text-lg font-medium mb-2">No achievements yet</h3>
                      <p className="text-muted-foreground mb-6">
                        Complete activities like creating badges and sharing them to earn achievements.
                      </p>
                      <Link href="/create">
                        <Button>Start Earning Achievements</Button>
                      </Link>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
