import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Heart,
  Briefcase,
  GraduationCap,
  Dumbbell,
  Calendar,
  BookOpen,
  Music,
  Utensils,
  Palette,
  Globe,
  Home,
  Leaf,
  Search,
} from "lucide-react"

export default function CategoriesPage() {
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
    {
      name: "Music",
      icon: <Music className="h-8 w-8" />,
      color: "from-red-500 to-pink-600",
      description: "Celebrate musical achievements and practice",
      count: 28,
    },
    {
      name: "Cooking",
      icon: <Utensils className="h-8 w-8" />,
      color: "from-yellow-500 to-amber-600",
      description: "Track culinary skills and recipes mastered",
      count: 31,
    },
    {
      name: "Art & Creativity",
      icon: <Palette className="h-8 w-8" />,
      color: "from-fuchsia-500 to-purple-600",
      description: "Showcase your creative accomplishments",
      count: 35,
    },
    {
      name: "Travel",
      icon: <Globe className="h-8 w-8" />,
      color: "from-blue-400 to-sky-600",
      description: "Document your adventures around the world",
      count: 42,
    },
    {
      name: "Home Projects",
      icon: <Home className="h-8 w-8" />,
      color: "from-stone-500 to-gray-600",
      description: "Track home improvement and DIY projects",
      count: 26,
    },
    {
      name: "Sustainability",
      icon: <Leaf className="h-8 w-8" />,
      color: "from-lime-500 to-green-600",
      description: "Recognize eco-friendly habits and milestones",
      count: 23,
    },
  ]

  return (
    <div className="container py-10">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold mb-2">Badge Categories</h1>
          <p className="text-muted-foreground">
            Explore different categories to find the perfect badge for your achievements.
          </p>
        </div>
        <div className="relative w-full md:w-auto">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search categories..." className="w-full md:w-[300px] pl-8" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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

      <div className="mt-12 rounded-lg border bg-muted p-8 text-center">
        <h2 className="text-2xl font-bold mb-2">Can't find what you're looking for?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Create a custom badge from scratch and design it exactly how you want. You can choose your own colors, icons,
          and text.
        </p>
        <Link href="/create">
          <Button size="lg">Create Custom Badge</Button>
        </Link>
      </div>
    </div>
  )
}
