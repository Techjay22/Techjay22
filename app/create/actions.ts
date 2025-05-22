"use server"

import { createRouteHandlerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { createServerSupabaseClient } from "@/lib/supabase/server"

export async function saveBadge(formData: FormData) {
  // Use the route handler client for server actions
  const supabase = createRouteHandlerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "You must be logged in to save a badge" }
  }

  // Extract badge data from form
  const title = formData.get("title") as string
  const description = formData.get("description") as string
  const categoryId = Number.parseInt(formData.get("category") as string)
  const icon = formData.get("icon") as string
  const color = formData.get("color") as string
  const borderWidth = Number.parseInt(formData.get("borderWidth") as string)
  const date = formData.get("date") as string

  try {
    // Insert the badge
    const { data: badge, error: badgeError } = await supabase
      .from("badges")
      .insert({
        title,
        description,
        category_id: categoryId,
        icon,
        color,
        border_width: borderWidth,
        created_by: user.id,
      })
      .select()
      .single()

    if (badgeError) {
      console.error("Error saving badge:", badgeError)
      return { success: false, error: badgeError.message }
    }

    // Add the badge to user_badges
    const { error: userBadgeError } = await supabase.from("user_badges").insert({
      user_id: user.id,
      badge_id: badge.id,
      earned_date: date,
    })

    if (userBadgeError) {
      console.error("Error linking badge to user:", userBadgeError)
      return { success: false, error: userBadgeError.message }
    }

    revalidatePath("/dashboard")
    return { success: true, badgeId: badge.id }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

export async function getBadgeCategories() {
  // For read-only operations in server components, we can use the singleton client
  const supabase = createServerSupabaseClient()

  const { data, error } = await supabase.from("badge_categories").select("*").order("name")

  if (error) {
    console.error("Error fetching categories:", error)
    return []
  }

  return data || []
}
