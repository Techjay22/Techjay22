"use server"

import { createServerSupabaseClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { nanoid } from "nanoid"

export async function createShareLink(badgeId: string) {
  const supabase = createServerSupabaseClient()

  // Get the current user
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, error: "You must be logged in to share a badge" }
  }

  try {
    // Check if a share link already exists
    const { data: existingShare } = await supabase
      .from("shared_badges")
      .select("id, share_code")
      .eq("badge_id", badgeId)
      .eq("user_id", user.id)
      .single()

    if (existingShare) {
      return {
        success: true,
        shareCode: existingShare.share_code,
        shareUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/share/${existingShare.share_code}`,
      }
    }

    // Create a new share link
    const shareCode = nanoid(10)
    const { data, error } = await supabase
      .from("shared_badges")
      .insert({
        badge_id: badgeId,
        user_id: user.id,
        share_code: shareCode,
        view_count: 0,
      })
      .select()
      .single()

    if (error) {
      console.error("Error creating share link:", error)
      return { success: false, error: error.message }
    }

    // Update the user_badges table to mark as shared
    await supabase.from("user_badges").update({ shared: true }).eq("badge_id", badgeId).eq("user_id", user.id)

    // Check for sharing achievement
    await checkSharingAchievement(user.id)

    revalidatePath(`/badges/${badgeId}`)
    return {
      success: true,
      shareCode,
      shareUrl: `${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/share/${shareCode}`,
    }
  } catch (error) {
    console.error("Unexpected error:", error)
    return { success: false, error: "An unexpected error occurred" }
  }
}

async function checkSharingAchievement(userId: string) {
  const supabase = createServerSupabaseClient()

  // Count how many badges the user has shared
  const { count, error } = await supabase
    .from("shared_badges")
    .select("*", { count: "exact", head: true })
    .eq("user_id", userId)

  if (error) {
    console.error("Error counting shared badges:", error)
    return
  }

  // Get the sharing achievement
  const { data: sharingAchievement } = await supabase
    .from("achievements")
    .select("*")
    .eq("requirement_type", "share_count")
    .single()

  if (!sharingAchievement) return

  // Check if the user has already earned this achievement
  const { data: existingAchievement } = await supabase
    .from("user_achievements")
    .select("*")
    .eq("user_id", userId)
    .eq("achievement_id", sharingAchievement.id)
    .single()

  // If the user has shared enough badges and hasn't already earned the achievement
  if (count >= sharingAchievement.requirement_value && !existingAchievement) {
    await supabase.from("user_achievements").insert({
      user_id: userId,
      achievement_id: sharingAchievement.id,
    })
  }
}
