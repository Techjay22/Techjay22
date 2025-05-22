"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function getBadgeTemplates() {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("badge_templates")
    .select(
      `
      id,
      title,
      description,
      icon,
      color,
      border_width,
      is_featured,
      badge_categories (
        id,
        name
      )
    `,
    )
    .order("is_featured", { ascending: false })
    .order("title")

  if (error) {
    console.error("Error fetching badge templates:", error)
    return []
  }

  return data || []
}

export async function getTemplateById(templateId: string) {
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase
    .from("badge_templates")
    .select(
      `
      id,
      title,
      description,
      category_id,
      icon,
      color,
      border_width
    `,
    )
    .eq("id", templateId)
    .single()

  if (error) {
    console.error("Error fetching badge template:", error)
    return null
  }

  return data
}
