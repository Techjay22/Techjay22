import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Heart, Briefcase, GraduationCap, Dumbbell, Calendar, BookOpen } from "lucide-react"

export function CategoryShowcase() {
  const categories = [
    {
      name: "Personal Growth",
      icon: <Heart className="h-8 w-8" />,
      color: "from-pink-500 to-rose-600",
      description: "Track your personal development milestones",
      count: 42,
    },
    {
      name: "Professional",
      icon: <Briefcase className="h-8 w-8" />,
      color: "from-blue-500 to-indigo-600",
      description: "Celebrate career achievements and skills",
      count: 38,
    },
    {
      name: "Education",
      icon: <GraduationCap className="h-8 w-8" />,
      color: "from-amber-500 to-orange-600",
      description: "Mark learning goals and academic success",
      count: 56,
    },
    {
      name: "Fitness",
      icon: <Dumbbell className="h-8 w-8" />,
      color: "from-green-500 to-emerald-600",
      description: "Recognize your health and fitness progress",
      count: 64,
    },
    {
      name: "Habit Tracking",
      icon: <Calendar className="h-8 w-8" />,
      color: "from-purple-500 to-violet-600",
      description: "Build consistency with habit streaks",
      count: 49,
    },
    {
      name: "Learning",
      icon: <BookOpen className="h-8 w-8" />,
      color: "from-cyan-500 to-teal-600",
      description: "Acknowledge new skills and knowledge",
      count: 37,
    },
  ]

  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">Explore Badge Categories</h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find the perfect badge template for any achievement or milestone in your life.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => (
            <Link
              href={`/categories/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
              key={index}
              className="group relative overflow-hidden rounded-lg border transition-colors hover:border-primary"
            >
              <div
                className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-10 group-hover:opacity-20 transition-opacity`}
              />
              <div className="flex flex-col items-center space-y-2 p-6">
                <div className={`rounded-full bg-gradient-to-br ${category.color} p-3 text-white`}>{category.icon}</div>
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="text-center text-muted-foreground">{category.description}</p>
                <div className="text-sm text-muted-foreground">{category.count} badge templates</div>
              </div>
            </Link>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link href="/categories">
            <Button size="lg" variant="outline">
              View All Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
