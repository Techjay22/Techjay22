import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { Heart, MessageSquare, Share2, Award, Users, TrendingUp, Search } from "lucide-react"

export default function CommunityPage() {
  const communityPosts = [
    {
      id: 1,
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      badge: {
        title: "Marathon Finisher",
        color: "from-blue-500 to-indigo-600",
      },
      message:
        "Just completed my first marathon! So proud of this achievement after 6 months of training. The last 5 miles were tough, but the feeling of crossing that finish line was worth every bit of pain.",
      likes: 42,
      comments: 8,
      time: "2 hours ago",
    },
    {
      id: 2,
      user: {
        name: "Sam Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ST",
      },
      badge: {
        title: "Coding Challenge",
        color: "from-purple-500 to-violet-600",
      },
      message:
        "Finished the 30-day coding challenge! Learned so much about React and Next.js. Built 5 projects and deployed them all. Looking forward to the next challenge!",
      likes: 36,
      comments: 5,
      time: "5 hours ago",
    },
    {
      id: 3,
      user: {
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      badge: {
        title: "Book Worm",
        color: "from-amber-500 to-orange-600",
      },
      message:
        "Just finished my 50th book this year! On track to reach my goal of 75 books. Currently reading 'The Psychology of Money' and it's been eye-opening. Any recommendations for what to read next?",
      likes: 29,
      comments: 7,
      time: "1 day ago",
    },
    {
      id: 4,
      user: {
        name: "Taylor Morgan",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "TM",
      },
      badge: {
        title: "Healthy Habits",
        color: "from-green-500 to-emerald-600",
      },
      message:
        "30 days of meditation complete! I've noticed such a difference in my stress levels and focus. Starting to make this a permanent part of my morning routine.",
      likes: 51,
      comments: 12,
      time: "2 days ago",
    },
  ]

  const trendingChallenges = [
    {
      title: "Summer Fitness Challenge",
      participants: 1243,
      badges: 3,
      daysLeft: 18,
    },
    {
      title: "Reading Marathon",
      participants: 876,
      badges: 5,
      daysLeft: 25,
    },
    {
      title: "Coding Bootcamp",
      participants: 1502,
      badges: 4,
      daysLeft: 12,
    },
  ]

  const activeCommunities = [
    {
      name: "Fitness Enthusiasts",
      members: 3245,
      badgesAwarded: 12567,
    },
    {
      name: "Book Lovers",
      members: 2876,
      badgesAwarded: 9432,
    },
    {
      name: "Tech Learners",
      members: 4123,
      badgesAwarded: 15789,
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Community</h1>
          <p className="text-muted-foreground">Connect with others, share your achievements, and celebrate together.</p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search community..." className="w-full md:w-[300px] pl-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold">Recent Achievements</h2>
            <Button variant="outline" size="sm">
              Create Post
            </Button>
          </div>

          <div className="space-y-6">
            {communityPosts.map((post) => (
              <div key={post.id} className="rounded-lg border bg-background p-6 shadow-sm">
                <div className="flex items-start space-x-4">
                  <Avatar>
                    <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                    <AvatarFallback>{post.user.initials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">{post.user.name}</p>
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${post.badge.color} mr-1`}></div>
                          <p className="text-sm text-muted-foreground">Earned: {post.badge.title}</p>
                        </div>
                      </div>
                      <p className="text-xs text-muted-foreground">{post.time}</p>
                    </div>
                    <p>{post.message}</p>
                    <div className="flex items-center space-x-4 pt-2">
                      <button className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1">
                        <Heart className="h-4 w-4" />
                        <span>{post.likes}</span>
                      </button>
                      <button className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{post.comments}</span>
                      </button>
                      <button className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="outline">Load More</Button>
          </div>
        </div>

        <div className="space-y-8">
          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center">
                <TrendingUp className="h-4 w-4 mr-2" />
                Trending Challenges
              </h3>
              <Link href="/challenges" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {trendingChallenges.map((challenge, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <h4 className="font-medium">{challenge.title}</h4>
                  <div className="mt-2 grid grid-cols-3 text-center text-sm">
                    <div>
                      <p className="font-bold">{challenge.participants}</p>
                      <p className="text-xs text-muted-foreground">Participants</p>
                    </div>
                    <div>
                      <p className="font-bold">{challenge.badges}</p>
                      <p className="text-xs text-muted-foreground">Badges</p>
                    </div>
                    <div>
                      <p className="font-bold">{challenge.daysLeft}</p>
                      <p className="text-xs text-muted-foreground">Days Left</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Join Challenge
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center">
                <Users className="h-4 w-4 mr-2" />
                Active Communities
              </h3>
              <Link href="/communities" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="space-y-4">
              {activeCommunities.map((community, index) => (
                <div key={index} className="rounded-lg border p-4">
                  <h4 className="font-medium">{community.name}</h4>
                  <div className="mt-2 grid grid-cols-2 text-center text-sm">
                    <div>
                      <p className="font-bold">{community.members.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Members</p>
                    </div>
                    <div>
                      <p className="font-bold">{community.badgesAwarded.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Badges Awarded</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3">
                    Join Community
                  </Button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-lg border bg-background p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold flex items-center">
                <Award className="h-4 w-4 mr-2" />
                Popular Badges
              </h3>
              <Link href="/badges" className="text-sm text-primary hover:underline">
                View All
              </Link>
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center mb-1 border-2 border-white shadow-sm">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-blue-500"
                    >
                      <path d="M19 5h-7L8 19l-3-6H2" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-center">Marathon</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center mb-1 border-2 border-white shadow-sm">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-green-500"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-center">Healthy Habits</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center mb-1 border-2 border-white shadow-sm">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-4 w-4 text-purple-500"
                    >
                      <polyline points="16 18 22 12 16 6" />
                      <polyline points="8 6 2 12 8 18" />
                    </svg>
                  </div>
                </div>
                <p className="text-xs text-center">Coding</p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="w-full mt-4">
              Create Badge
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
