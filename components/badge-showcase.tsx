import { Button } from "@/components/ui/button"
import Link from "next/link"

export function BadgeShowcase() {
  const badges = [
    {
      title: "Marathon Finisher",
      category: "Fitness",
      gradient: "from-blue-500 to-cyan-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8"
        >
          <path d="M19 5h-7L8 19l-3-6H2" />
        </svg>
      ),
    },
    {
      title: "Coding Challenge",
      category: "Learning",
      gradient: "from-purple-500 to-indigo-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8"
        >
          <polyline points="16 18 22 12 16 6" />
          <polyline points="8 6 2 12 8 18" />
        </svg>
      ),
    },
    {
      title: "Book Worm",
      category: "Habit Tracking",
      gradient: "from-amber-500 to-orange-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8"
        >
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
        </svg>
      ),
    },
    {
      title: "Promotion",
      category: "Professional",
      gradient: "from-green-500 to-emerald-500",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-8 w-8"
        >
          <path d="M20 7h-9" />
          <path d="M14 17H5" />
          <circle cx="17" cy="17" r="3" />
          <circle cx="7" cy="7" r="3" />
        </svg>
      ),
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Popular Badge Templates</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Get inspired by our most popular badge designs or use them as a starting point for your own creation.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4">
          {badges.map((badge, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`w-40 h-40 rounded-full bg-gradient-to-br ${badge.gradient} flex items-center justify-center mb-4 shadow-lg border-4 border-white`}
              >
                <div className="text-white">{badge.icon}</div>
              </div>
              <h3 className="text-xl font-bold">{badge.title}</h3>
              <p className="text-sm text-muted-foreground">{badge.category}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/create">
            <Button size="lg">Create Your Own Badge</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
