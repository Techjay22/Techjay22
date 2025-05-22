"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getUserProfile(userId: string) {
  const supabase = createServerSupabaseClient()

  // Get user profile
  const { data: profile } = await supabase.from("profiles").select("*").eq("id", userId).single()

  // Get user badges
  const { data: badges } = await supabase
    .from("user_badges")
    .select(
      `
      id,
      earned_date,
      likes,
      comments,
      badges (
        id,
        title,
        description,
        icon,
        color,
        border_width,
        badge_categories (
          id,
          name
        )
      )
    `,
    )
    .eq("user_id", userId)
    .order("earned_date", { ascending: false })

  // Get user achievements
  const { data: achievements } = await supabase
    .from("user_achievements")
    .select(
      `
      id,
      earned_at,
      achievements (
        id,
        name,
        description,
        icon,
        requirement_type,
        requirement_value
      )
    `,
    )
    .eq("user_id", userId)
    .order("earned_at", { ascending: false })

  return {
    profile,
    badges: badges || [],
    achievements: achievements || [],
  }
}

export async function updateProfile(formData: FormData) {
  const supabase = createServerSupabaseClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "You must be logged in to update your profile" }
  }

  const fullName = formData.get("fullName") as string
  const username = formData.get("username") as string
  const bio = formData.get("bio") as string
  const location = formData.get("location") as string
  const website = formData.get("website") as string
  const twitter = formData.get("twitter") as string
  const instagram = formData.get("instagram") as string
  const linkedin = formData.get("linkedin") as string

  // Prepare social links
  const socialLinks = {
    twitter: twitter || null,
    instagram: instagram || null,
    linkedin: linkedin || null,
  }

  try {
    const { error } = await supabase
      .from("profiles")
      .update({
        full_name: fullName,
        username,
        bio,
        location,
        website,
        social_links: socialLinks,
        updated_at: new Date().toISOString(),
      })
      .eq("id", user.id)

    if (error) {
      console.error("Error updating profile:", error)
      return { success: false, error: error.message }
    }

    revalidatePath("/profile")
    return { success: true }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
