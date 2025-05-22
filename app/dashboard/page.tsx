import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Target, Heart, Award, Plus, BarChart3 } from "lucide-react"
import { getUserBadges, getUserStats } from "./actions"
import { Header } from "@/components/header"
import { BadgeCard } from "@/components/badge-card"
import { ProgressBadgeCard } from "@/components/progress-badge-card"

export default async function DashboardPage() {
  const { badges, inProgress } = await getUserBadges()
  const stats = await getUserStats()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">My Achievement Dashboard</h1>
              <p className="text-muted-foreground">Track your progress and celebrate your achievements.</p>
            </div>
            <Link href="/create">
              <Button className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Create New Badge
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <div className="rounded-lg border p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{stats.badgeCount}</h3>
              <p className="text-sm text-muted-foreground">Badges Earned</p>
            </div>
            <div className="rounded-lg border p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Target className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{stats.inProgressCount}</h3>
              <p className="text-sm text-muted-foreground">In Progress</p>
            </div>
            <div className="rounded-lg border p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <BarChart3 className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{stats.categoryCount}</h3>
              <p className="text-sm text-muted-foreground">Categories</p>
            </div>
            <div className="rounded-lg border p-6 flex flex-col items-center text-center">
              <div className="rounded-full bg-primary/10 p-3 mb-3">
                <Heart className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-bold">{stats.likesCount}</h3>
              <p className="text-sm text-muted-foreground">Community Likes</p>
            </div>
          </div>

          <Tabs defaultValue="my-badges" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="my-badges">My Badges</TabsTrigger>
              <TabsTrigger value="in-progress">In Progress</TabsTrigger>
            </TabsList>
            <TabsContent value="my-badges">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {badges.length > 0 ? (
                  badges.map((badge) => (
                    <BadgeCard
                      key={badge.id}
                      badge={badge.badges}
                      earnedDate={badge.earned_date}
                      likes={badge.likes || 0}
                      comments={badge.comments || 0}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-muted-foreground mb-4">You haven't earned any badges yet.</p>
                    <Link href="/create">
                      <Button>Create Your First Badge</Button>
                    </Link>
                  </div>
                )}
                <Link
                  href="/create"
                  className="flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-8 h-[220px] hover:border-primary hover:bg-primary/5 transition-colors"
                >
                  <div className="rounded-full bg-muted p-3 mb-3">
                    <Plus className="h-6 w-6" />
                  </div>
                  <p className="font-medium">Create New Badge</p>
                  <p className="text-sm text-muted-foreground text-center mt-1">
                    Add a new achievement to your collection
                  </p>
                </Link>
              </div>
            </TabsContent>
            <TabsContent value="in-progress">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {inProgress.length > 0 ? (
                  inProgress.map((badge) => (
                    <ProgressBadgeCard
                      key={badge.id}
                      badge={badge.badges}
                      progress={badge.progress || 0}
                      target={badge.target || 100}
                    />
                  ))
                ) : (
                  <div className="col-span-full text-center py-10">
                    <p className="text-muted-foreground mb-4">You don't have any badges in progress.</p>
                    <Link href="/create">
                      <Button>Start Tracking a New Goal</Button>
                    </Link>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  )
}
