import Link from "next/link"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
          <div className="flex flex-col justify-center space-y-4">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                Celebrate Your Achievements with Custom Badges
              </h1>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                Create personalized badges to mark your milestones, track your progress, and share your success with the
                world.
              </p>
            </div>
            <div className="flex flex-col gap-2 min-[400px]:flex-row">
              <Link href="/create">
                <Button size="lg" className="px-8">
                  Create Your Badge
                </Button>
              </Link>
              <Link href="/categories">
                <Button size="lg" variant="outline" className="px-8">
                  Explore Categories
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <div className="relative w-full max-w-[500px] h-[400px]">
              <div className="absolute top-0 left-0 w-[250px] h-[250px] rotate-[-8deg] rounded-xl shadow-lg overflow-hidden border-4 border-white bg-gradient-to-br from-blue-500 to-purple-600">
                <div className="flex flex-col items-center justify-center h-full text-white p-4">
                  <div className="w-16 h-16 mb-2 bg-white rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-blue-500"
                    >
                      <path d="M12 2v4" />
                      <path d="m16.24 7.76-2.12 2.12" />
                      <path d="M21 12h-4" />
                      <path d="m16.24 16.24-2.12-2.12" />
                      <path d="M12 18v4" />
                      <path d="m7.76 16.24 2.12-2.12" />
                      <path d="M3 12h4" />
                      <path d="m7.76 7.76 2.12 2.12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">10K Steps</h3>
                  <p className="text-sm opacity-90">Daily Goal Achieved</p>
                  <div className="mt-2 text-xs opacity-75">May 10, 2025</div>
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-[250px] h-[250px] rotate-[8deg] rounded-xl shadow-lg overflow-hidden border-4 border-white bg-gradient-to-br from-amber-500 to-pink-600">
                <div className="flex flex-col items-center justify-center h-full text-white p-4">
                  <div className="w-16 h-16 mb-2 bg-white rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-amber-500"
                    >
                      <path d="M12 15a5 5 0 1 0 0-10 5 5 0 0 0 0 10Z" />
                      <path d="M12 15v3" />
                      <path d="M10 18h4" />
                      <path d="M8.5 7.5a6.5 6.5 0 1 0 13 0 6.5 6.5 0 1 0-13 0" />
                      <path d="M14 8a2 2 0 1 0 4 0 2 2 0 1 0-4 0" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Project Launch</h3>
                  <p className="text-sm opacity-90">Successfully Completed</p>
                  <div className="mt-2 text-xs opacity-75">April 15, 2025</div>
                </div>
              </div>
              <div className="absolute top-[50%] translate-y-[-50%] right-[50%] translate-x-[30%] w-[220px] h-[220px] rotate-[0deg] rounded-xl shadow-lg overflow-hidden border-4 border-white bg-gradient-to-br from-green-500 to-emerald-600">
                <div className="flex flex-col items-center justify-center h-full text-white p-4">
                  <div className="w-16 h-16 mb-2 bg-white rounded-full flex items-center justify-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-8 w-8 text-green-500"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold">Healthy Habits</h3>
                  <p className="text-sm opacity-90">30 Day Streak</p>
                  <div className="mt-2 text-xs opacity-75">March 22, 2025</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
