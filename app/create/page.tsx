"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Slider } from "@/components/ui/slider"
import { Award, Heart, Download, Share2, Check, Sparkles, Trophy, Star, Zap, Target } from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { saveBadge } from "./actions"
import { Header } from "@/components/header"
import Link from "next/link"
import { getTemplateById } from "./templates/actions"

export default function CreateBadgePage() {
  const [badgeTitle, setBadgeTitle] = useState("Achievement Unlocked")
  const [badgeDescription, setBadgeDescription] = useState("Successfully completed")
  const [badgeCategory, setBadgeCategory] = useState("1")
  const [badgeColor, setBadgeColor] = useState("blue")
  const [badgeIcon, setBadgeIcon] = useState("trophy")
  const [badgeDate, setBadgeDate] = useState(new Date().toISOString().split("T")[0])
  const [badgeBorderWidth, setBadgeBorderWidth] = useState(4)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoadingTemplate, setIsLoadingTemplate] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const templateId = searchParams.get("template")
  const { toast } = useToast()

  useEffect(() => {
    // If a template ID is provided, load the template
    if (templateId) {
      const loadTemplate = async () => {
        setIsLoadingTemplate(true)
        try {
          const template = await getTemplateById(templateId)
          if (template) {
            setBadgeTitle(template.title)
            setBadgeDescription(template.description || "")
            setBadgeCategory(template.category_id?.toString() || "1")
            setBadgeColor(template.color || "blue")
            setBadgeIcon(template.icon || "trophy")
            setBadgeBorderWidth(template.border_width || 4)
          }
        } catch (error) {
          console.error("Error loading template:", error)
          toast({
            variant: "destructive",
            title: "Error",
            description: "Failed to load template",
          })
        } finally {
          setIsLoadingTemplate(false)
        }
      }

      loadTemplate()
    }
  }, [templateId, toast])

  const colors = {
    blue: "from-blue-500 to-indigo-600",
    green: "from-green-500 to-emerald-600",
    purple: "from-purple-500 to-violet-600",
    pink: "from-pink-500 to-rose-600",
    amber: "from-amber-500 to-orange-600",
    cyan: "from-cyan-500 to-teal-600",
  }

  const icons = {
    trophy: <Trophy className="h-8 w-8" />,
    star: <Star className="h-8 w-8" />,
    zap: <Zap className="h-8 w-8" />,
    target: <Target className="h-8 w-8" />,
    heart: <Heart className="h-8 w-8" />,
    sparkles: <Sparkles className="h-8 w-8" />,
    award: <Award className="h-8 w-8" />,
    check: <Check className="h-8 w-8" />,
  }

  const handleSaveBadge = async () => {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append("title", badgeTitle)
      formData.append("description", badgeDescription)
      formData.append("category", badgeCategory)
      formData.append("icon", badgeIcon)
      formData.append("color", badgeColor)
      formData.append("borderWidth", badgeBorderWidth.toString())
      formData.append("date", badgeDate)

      const result = await saveBadge(formData)

      if (result.success) {
        toast({
          title: "Badge saved!",
          description: "Your badge has been added to your collection.",
        })
        router.push("/dashboard")
      } else {
        toast({
          variant: "destructive",
          title: "Error saving badge",
          description: result.error || "Something went wrong. Please try again.",
        })
      }
    } catch (error) {
      console.error("Error saving badge:", error)
      toast({
        variant: "destructive",
        title: "Error saving badge",
        description: "An unexpected error occurred. Please try again.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-10">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold mb-2">Create Your Badge</h1>
              <p className="text-muted-foreground">
                Customize every aspect of your achievement badge and share it with the world.
              </p>
            </div>
            <Link href="/create/templates">
              <Button variant="outline">Browse Templates</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Tabs defaultValue="design" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="design">Design</TabsTrigger>
                  <TabsTrigger value="content">Content</TabsTrigger>
                  <TabsTrigger value="sharing">Sharing</TabsTrigger>
                </TabsList>
                <TabsContent value="design" className="space-y-6 pt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="badge-color">Badge Color</Label>
                      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mt-2">
                        {Object.entries(colors).map(([colorName, gradient]) => (
                          <button
                            key={colorName}
                            className={`h-10 rounded-md bg-gradient-to-r ${gradient} ${
                              badgeColor === colorName ? "ring-2 ring-primary ring-offset-2" : ""
                            }`}
                            onClick={() => setBadgeColor(colorName)}
                            aria-label={`Select ${colorName} color`}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="badge-icon">Badge Icon</Label>
                      <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 mt-2">
                        {Object.entries(icons).map(([iconName, IconComponent]) => (
                          <button
                            key={iconName}
                            className={`h-12 flex items-center justify-center rounded-md border ${
                              badgeIcon === iconName ? "border-primary bg-primary/10" : "border-input"
                            }`}
                            onClick={() => setBadgeIcon(iconName)}
                            aria-label={`Select ${iconName} icon`}
                          >
                            {IconComponent}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="badge-border-width">Border Width</Label>
                      <Slider
                        id="badge-border-width"
                        min={0}
                        max={8}
                        step={1}
                        value={[badgeBorderWidth]}
                        onValueChange={(value) => setBadgeBorderWidth(value[0])}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label htmlFor="badge-category">Category</Label>
                      <Select value={badgeCategory} onValueChange={setBadgeCategory}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">Personal Growth</SelectItem>
                          <SelectItem value="2">Professional</SelectItem>
                          <SelectItem value="3">Education</SelectItem>
                          <SelectItem value="4">Fitness</SelectItem>
                          <SelectItem value="5">Habit Tracking</SelectItem>
                          <SelectItem value="6">Learning</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="content" className="space-y-6 pt-4">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="badge-title">Badge Title</Label>
                      <Input
                        id="badge-title"
                        value={badgeTitle}
                        onChange={(e) => setBadgeTitle(e.target.value)}
                        className="mt-2"
                        maxLength={30}
                      />
                    </div>

                    <div>
                      <Label htmlFor="badge-description">Description</Label>
                      <Textarea
                        id="badge-description"
                        value={badgeDescription}
                        onChange={(e) => setBadgeDescription(e.target.value)}
                        className="mt-2"
                        maxLength={50}
                      />
                    </div>

                    <div>
                      <Label htmlFor="badge-date">Achievement Date</Label>
                      <Input
                        id="badge-date"
                        type="date"
                        value={badgeDate}
                        onChange={(e) => setBadgeDate(e.target.value)}
                        className="mt-2"
                      />
                    </div>
                  </div>
                </TabsContent>
                <TabsContent value="sharing" className="space-y-6 pt-4">
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Download Options</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          PNG Image
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Download className="h-4 w-4" />
                          SVG Vector
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Share on Social Media</h3>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" className="flex items-center gap-2">
                          <Share2 className="h-4 w-4" />
                          Twitter
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Share2 className="h-4 w-4" />
                          Facebook
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Share2 className="h-4 w-4" />
                          Instagram
                        </Button>
                        <Button variant="outline" className="flex items-center gap-2">
                          <Share2 className="h-4 w-4" />
                          LinkedIn
                        </Button>
                      </div>
                    </div>

                    <div className="rounded-lg border p-4">
                      <h3 className="font-medium mb-2">Embed Code</h3>
                      <Textarea
                        readOnly
                        value={`<iframe src="https://badgeboost.com/embed/${badgeCategory}/${badgeTitle
                          .toLowerCase()
                          .replace(/\s+/g, "-")}" width="250" height="250" frameborder="0"></iframe>`}
                        className="mt-2 h-20 text-xs"
                      />
                      <Button variant="outline" size="sm" className="mt-2">
                        Copy Code
                      </Button>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            <div className="flex flex-col items-center">
              <div className="sticky top-24">
                <h3 className="text-lg font-medium mb-4 text-center">Badge Preview</h3>
                <div className="flex flex-col items-center">
                  <div
                    className={`w-64 h-64 rounded-xl bg-gradient-to-br ${colors[badgeColor]} flex flex-col items-center justify-center p-6 shadow-lg`}
                    style={{ borderWidth: `${badgeBorderWidth}px`, borderColor: "white", borderStyle: "solid" }}
                  >
                    <div className="w-20 h-20 mb-4 bg-white rounded-full flex items-center justify-center text-primary">
                      {icons[badgeIcon]}
                    </div>
                    <h3 className="text-xl font-bold text-white text-center">{badgeTitle}</h3>
                    <p className="text-sm text-white text-center opacity-90">{badgeDescription}</p>
                    <div className="mt-3 text-xs text-white opacity-75">
                      {new Date(badgeDate).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </div>
                  <div className="mt-8 w-full">
                    <Button
                      className="w-full mb-2"
                      onClick={handleSaveBadge}
                      disabled={isSubmitting || isLoadingTemplate}
                    >
                      {isSubmitting ? "Saving..." : "Save Badge"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      Add to Collection
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
