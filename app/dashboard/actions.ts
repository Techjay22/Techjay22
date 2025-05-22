"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

export async function getUserBadges() {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { badges: [], inProgress: [] }
  }

  // Get user's earned badges
  const { data: userBadges, error: userBadgesError } = await supabase
    .from("user_badges")
    .select(`
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
    `)
    .eq("user_id", user.id)
    .order("earned_date", { ascending: false })

  if (userBadgesError) {
    console.error("Error fetching user badges:", userBadgesError)
    return { badges: [], inProgress: [] }
  }

  // Get user's in-progress badges
  const { data: inProgressBadges, error: inProgressError } = await supabase
    .from("badge_progress")
    .select(`
      id,
      progress,
      target,
      started_at,
      badges (
        id,
        title,
        description,
        icon,
        color,
        badge_categories (
          id,
          name
        )
      )
    `)
    .eq("user_id", user.id)
    .order("updated_at", { ascending: false })

  if (inProgressError) {
    console.error("Error fetching in-progress badges:", inProgressError)
    return { badges: userBadges || [], inProgress: [] }
  }

  return {
    badges: userBadges || [],
    inProgress: inProgressBadges || [],
  }
}

export async function getUserStats() {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return {
      badgeCount: 0,
      inProgressCount: 0,
      categoryCount: 0,
      likesCount: 0,
    }
  }

  // Get badge count
  const { count: badgeCount, error: badgeError } = await supabase
    .from("user_badges")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)

  // Get in-progress count
  const { count: inProgressCount, error: inProgressError } = await supabase
    .from("badge_progress")
    .select("id", { count: "exact", head: true })
    .eq("user_id", user.id)

  // Get unique categories
  const { data: categories, error: categoryError } = await supabase
    .from("user_badges")
    .select(`
      badges (
        badge_categories (
          id
        )
      )
    `)
    .eq("user_id", user.id)

  // Get total likes
  const { data: likes, error: likesError } = await supabase.from("user_badges").select("likes").eq("user_id", user.id)

  // Calculate unique categories
  const uniqueCategories = new Set()
  if (categories) {
    categories.forEach((item) => {
      if (item.badges?.badge_categories?.id) {
        uniqueCategories.add(item.badges.badge_categories.id)
      }
    })
  }

  // Calculate total likes
  const totalLikes = likes ? likes.reduce((sum, item) => sum + (item.likes || 0), 0) : 0

  return {
    badgeCount: badgeCount || 0,
    inProgressCount: inProgressCount || 0,
    categoryCount: uniqueCategories.size,
    likesCount: totalLikes,
  }
}

export async function deleteBadge(badgeId: string) {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "You must be logged in to delete a badge" }
  }

  try {
    // Delete the user_badge entry
    const { error: userBadgeError } = await supabase
      .from("user_badges")
      .delete()
      .eq("badge_id", badgeId)
      .eq("user_id", user.id)

    if (userBadgeError) {
      console.error("Error deleting user badge:", userBadgeError)
      return { success: false, error: userBadgeError.message }
    }

    // Delete the badge itself if it was created by this user
    const { error: badgeError } = await supabase.from("badges").delete().eq("id", badgeId).eq("created_by", user.id)

    if (badgeError) {
      console.error("Error deleting badge:", badgeError)
      // We don't return an error here because the user_badge was successfully deleted
      // The badge might be used by other users
    }

    revalidatePath("/dashboard")
    return { success: true }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}
