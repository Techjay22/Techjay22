import { Palette, Share2, Award, BarChart3, Users, Sparkles } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">Features</div>
            <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
              Everything You Need to Celebrate Your Achievements
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Our platform provides all the tools you need to create, track, and share your personal milestones.
            </p>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Palette className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Badge Customization</h3>
            <p className="text-center text-muted-foreground">
              Design your own badges by choosing icons, colors, fonts, and messages that reflect your achievement.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Milestone Categories</h3>
            <p className="text-center text-muted-foreground">
              Choose from a variety of categories including personal growth, fitness, professional milestones, and more.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Share2 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Instant Sharing</h3>
            <p className="text-center text-muted-foreground">
              Download or share your badges on social media, via email, or embed them on other platforms.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <BarChart3 className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Progress Tracking</h3>
            <p className="text-center text-muted-foreground">
              Log your progress, collect badges, and visualize your journey with our gamified tracking system.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">Community Engagement</h3>
            <p className="text-center text-muted-foreground">
              Celebrate each other's achievements, comment, and participate in challenges or themed badge events.
            </p>
          </div>
          <div className="flex flex-col items-center space-y-2 rounded-lg border p-6 shadow-sm">
            <div className="rounded-full bg-primary/10 p-3">
              <Sparkles className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-bold">User-Friendly Interface</h3>
            <p className="text-center text-muted-foreground">
              Enjoy a smooth experience with a clean, intuitive design, making badge creation accessible to all.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
