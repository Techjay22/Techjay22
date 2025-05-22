import { Header } from "@/components/header"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { BadgeDisplay } from "@/components/badge-display"
import { getBadgeTemplates } from "./actions"

export default async function TemplatesPage() {
  const templates = await getBadgeTemplates()

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">Badge Templates</h1>
              <p className="text-muted-foreground">Choose a template to quickly create your badge</p>
            </div>
            <Link href="/create">
              <Button variant="outline">Custom Badge</Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {templates.map((template) => (
              <div key={template.id} className="flex flex-col items-center">
                <BadgeDisplay
                  badge={{
                    title: template.title,
                    description: template.description || "",
                    icon: template.icon,
                    color: template.color,
                    borderWidth: template.border_width || 4,
                  }}
                  size="medium"
                />
                <h3 className="mt-4 font-medium">{template.title}</h3>
                <p className="text-sm text-muted-foreground text-center mt-1">{template.description}</p>
                <p className="text-xs text-muted-foreground mt-2">
                  {template.badge_categories?.name || "Uncategorized"}
                </p>
                <Link href={`/create?template=${template.id}`} className="mt-4 w-full">
                  <Button className="w-full">Use Template</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  )
}
