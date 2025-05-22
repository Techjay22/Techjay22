import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CommunitySection() {
  const communityPosts = [
    {
      user: {
        name: "Alex Johnson",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "AJ",
      },
      badge: "Marathon Finisher",
      message: "Just completed my first marathon! So proud of this achievement after 6 months of training.",
      likes: 42,
      comments: 8,
      time: "2 hours ago",
    },
    {
      user: {
        name: "Sam Taylor",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "ST",
      },
      badge: "Coding Challenge",
      message: "Finished the 30-day coding challenge! Learned so much about React and Next.js.",
      likes: 36,
      comments: 5,
      time: "5 hours ago",
    },
    {
      user: {
        name: "Jamie Smith",
        avatar: "/placeholder.svg?height=40&width=40",
        initials: "JS",
      },
      badge: "Book Worm",
      message: "Just finished my 50th book this year! On track to reach my goal of 75 books.",
      likes: 29,
      comments: 7,
      time: "1 day ago",
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Join Our Community</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Connect with others, share your achievements, and celebrate together.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl space-y-6 py-12">
          {communityPosts.map((post, index) => (
            <div key={index} className="rounded-lg border bg-background p-6 shadow-sm">
              <div className="flex items-start space-x-4">
                <Avatar>
                  <AvatarImage src={post.user.avatar || "/placeholder.svg"} alt={post.user.name} />
                  <AvatarFallback>{post.user.initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{post.user.name}</p>
                      <p className="text-sm text-muted-foreground">Earned: {post.badge}</p>
                    </div>
                    <p className="text-xs text-muted-foreground">{post.time}</p>
                  </div>
                  <p>{post.message}</p>
                  <div className="flex items-center space-x-4 pt-2">
                    <button className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M7 10v12" />
                        <path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2h0a3.13 3.13 0 0 1 3 3.88Z" />
                      </svg>
                      <span>{post.likes}</span>
                    </button>
                    <button className="text-sm text-muted-foreground hover:text-foreground flex items-center space-x-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="h-4 w-4"
                      >
                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                      </svg>
                      <span>{post.comments}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/community">
            <Button size="lg">Join the Community</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
