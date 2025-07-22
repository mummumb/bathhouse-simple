"use server"

import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"
import { adminLoginSchema } from "@/lib/validation/schemas"
import { z } from "zod"

import { createClient } from "@/lib/supabase/server"

export async function signIn(formData: FormData) {
  const rawData = {
    email: formData.get("email") as string,
    password: formData.get("password") as string
  }

  // Validate input
  let validatedData
  try {
    validatedData = adminLoginSchema.parse(rawData)
  } catch (error) {
    if (error instanceof z.ZodError) {
      redirect("/admin-login?message=Invalid email or password format")
    }
    throw error
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email: validatedData.email,
    password: validatedData.password,
  })

  if (error) {
    console.error("Sign-in error:", error.message)
    redirect("/admin-login?message=Could not authenticate user")
  }

  revalidatePath("/admin/dashboard")
  redirect("/admin/dashboard")
}

export async function signOut() {
  const supabase = await createClient()
  const { error } = await supabase.auth.signOut()

  if (error) {
    console.error("Sign-out error:", error.message)
  }

  revalidatePath("/admin")
  redirect("/admin")
}

export async function createEvent(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Unauthorized" }
  }

  try {
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const date = formData.get("date") as string
    const time = formData.get("time") as string
    const location = formData.get("location") as string
    const imageUrl = formData.get("imageUrl") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const capacity = Number.parseInt(formData.get("capacity") as string, 10)

    console.log("Creating event:", { title, date, time, imageUrl, imageUrlLength: imageUrl?.length })

    const { error } = await supabase.from("events").insert({
      title,
      slug,
      description,
      date,
      time,
      location,
      image: imageUrl,
      price,
      capacity,
    })

    if (error) {
      console.error("Error creating event:", error.message)
      return { success: false, message: `Could not create event: ${error.message}` }
    }

    revalidatePath("/admin/dashboard/events")
    return { success: true, message: "Event created successfully" }
  } catch (error) {
    console.error("Error in createEvent:", error)
    return { success: false, message: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}` }
  }
}

export async function updateEvent(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Unauthorized" }
  }

  try {
    const id = formData.get("id") as string
    const title = formData.get("title") as string
    const slug = formData.get("slug") as string
    const description = formData.get("description") as string
    const date = formData.get("date") as string
    const time = formData.get("time") as string
    const location = formData.get("location") as string
    const imageUrl = formData.get("imageUrl") as string
    const price = Number.parseFloat(formData.get("price") as string)
    const capacity = Number.parseInt(formData.get("capacity") as string, 10)

    console.log("Updating event:", { id, title, date, time, imageUrl, imageUrlLength: imageUrl?.length })

    const { error } = await supabase
      .from("events")
      .update({
        title,
        slug,
        description,
        date,
        time,
        location,
        image: imageUrl,
        price,
        capacity,
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating event:", error.message)
      return { success: false, message: `Could not update event: ${error.message}` }
    }

    revalidatePath("/admin/dashboard/events")
    return { success: true, message: "Event updated successfully" }
  } catch (error) {
    console.error("Error in updateEvent:", error)
    return { success: false, message: `An unexpected error occurred: ${error instanceof Error ? error.message : 'Unknown error'}` }
  }
}

export async function deleteEvent(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin?message=Unauthorized")
  }

  const { error } = await supabase.from("events").delete().eq("id", id)

  if (error) {
    console.error("Error deleting event:", error.message)
    return { success: false, message: "Could not delete event" }
  }

  revalidatePath("/admin/dashboard/events")
  return { success: true, message: "Event deleted successfully" }
}

export async function createJournalPost(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { success: false, message: "Please log in to create posts." }
  }

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const author = formData.get("author") as string
  const imageUrl = formData.get("imageUrl") as string
  const publishedAt = formData.get("publishedAt") as string

  const { error } = await supabase.from("journal_posts").insert({
    title,
    slug,
    excerpt,
    content,
    author_name: author, // Fix: use author_name instead of author
    image: imageUrl,     // Fix: use image instead of image_url
    published_at: publishedAt,
  })

  if (error) {
    console.error("Error creating journal post:", error.message)
    return { success: false, message: `Could not create journal post: ${error.message}` }
  }

  revalidatePath("/admin/dashboard/journal")
  return { success: true, message: "Journal post created successfully!" }
}

export async function updateJournalPost(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
    error: authError
  } = await supabase.auth.getUser()

  if (authError) {
    console.error("Auth error in updateJournalPost:", authError)
    return { success: false, message: "Authentication error. Please log in again." }
  }

  if (!user) {
    console.log("No user found in updateJournalPost")
    return { success: false, message: "Please log in to edit posts." }
  }

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const excerpt = formData.get("excerpt") as string
  const content = formData.get("content") as string
  const author = formData.get("author") as string
  const imageUrl = formData.get("imageUrl") as string
  const publishedAt = formData.get("publishedAt") as string

  console.log("Updating journal post:", { id, title, author, excerpt: excerpt?.substring(0, 30) + '...', imageUrl: imageUrl?.substring(0, 50) + '...' })

  const { error } = await supabase
    .from("journal_posts")
    .update({
      title,
      slug,
      excerpt,
      content,
      author_name: author, // Fix: use author_name instead of author
      image: imageUrl,     // Fix: use image instead of image_url
      published_at: publishedAt,
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating journal post:", error)
    return { success: false, message: `Could not update journal post: ${error.message}` }
  }

  revalidatePath("/admin/dashboard/journal")
  return { success: true, message: "Journal post updated successfully!" }
}

export async function deleteJournalPost(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin?message=Unauthorized")
  }

  const { error } = await supabase.from("journal_posts").delete().eq("id", id)

  if (error) {
    console.error("Error deleting journal post:", error.message)
    return { success: false, message: "Could not delete journal post" }
  }

  revalidatePath("/admin/dashboard/journal")
  return { success: true, message: "Journal post deleted successfully" }
}

export async function createRitual(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin?message=Unauthorized")
  }

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("imageUrl") as string
  const duration = formData.get("duration") as string
  const benefits = formData.get("benefits") as string

  const { error } = await supabase.from("rituals").insert({
    title,
    slug,
    description,
    image: imageUrl, // Fix: use image instead of image_url
    duration,
    benefits,
  })

  if (error) {
    console.error("Error creating ritual:", error.message)
    redirect("/admin/dashboard/rituals?message=Could not create ritual")
  }

  revalidatePath("/admin/dashboard/rituals")
  redirect("/admin/dashboard/rituals")
}

export async function updateRitual(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin?message=Unauthorized")
  }

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const description = formData.get("description") as string
  const imageUrl = formData.get("imageUrl") as string
  const duration = formData.get("duration") as string
  const benefits = formData.get("benefits") as string

  const { error } = await supabase
    .from("rituals")
    .update({
      title,
      slug,
      description,
      image: imageUrl, // Fix: use image instead of image_url
      duration,
      benefits,
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating ritual:", error.message)
    redirect(`/admin/dashboard/rituals/${id}/edit?message=Could not update ritual`)
  }

  revalidatePath("/admin/dashboard/rituals")
  redirect("/admin/dashboard/rituals")
}

export async function deleteRitual(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin?message=Unauthorized")
  }

  const { error } = await supabase.from("rituals").delete().eq("id", id)

  if (error) {
    console.error("Error deleting ritual:", error.message)
    return { success: false, message: "Could not delete ritual" }
  }

  revalidatePath("/admin/dashboard/rituals")
  return { success: true, message: "Ritual deleted successfully" }
}

export async function createStandalonePage(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin?message=Unauthorized")
  }

  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const image_url = formData.get("image_url") as string
  const excerpt = formData.get("excerpt") as string
  const meta_description = formData.get("meta_description") as string
  const is_published = formData.get("is_published") === "on"

  const { error } = await supabase.from("standalone_pages").insert({
    title,
    slug,
    content,
    meta_description,
    is_published,
    // Note: standalone_pages table doesn't have image_url or excerpt fields
  })

  if (error) {
    console.error("Error creating standalone page:", error.message)
    redirect("/admin/dashboard/pages?message=Could not create standalone page")
  }

  revalidatePath("/admin/dashboard/pages")
  redirect("/admin/dashboard/pages")
}

export async function updateStandalonePage(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin?message=Unauthorized")
  }

  const id = formData.get("id") as string
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const content = formData.get("content") as string
  const image_url = formData.get("image_url") as string
  const excerpt = formData.get("excerpt") as string
  const meta_description = formData.get("meta_description") as string
  const is_published = formData.get("is_published") === "on"

  const { error } = await supabase
    .from("standalone_pages")
    .update({
      title,
      slug,
      content,
      meta_description,
      is_published,
      // Note: standalone_pages table doesn't have image_url or excerpt fields
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating standalone page:", error.message)
    redirect(`/admin/dashboard/pages/${id}/edit?message=Could not update standalone page`)
  }

  revalidatePath("/admin/dashboard/pages")
  redirect("/admin/dashboard/pages")
}

export async function deleteStandalonePage(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin?message=Unauthorized")
  }

  const { error } = await supabase.from("standalone_pages").delete().eq("id", id)

  if (error) {
    console.error("Error deleting standalone page:", error.message)
    return { success: false, message: "Could not delete standalone page" }
  }

  revalidatePath("/admin/dashboard/pages")
  return { success: true, message: "Standalone page deleted successfully" }
}

export async function createPageContent(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin?message=Unauthorized")
  }

  const section = formData.get("section") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const section_name = formData.get("section_name") as string | null
  const order_index = formData.get("order_index") ? parseInt(formData.get("order_index") as string) : 0
  const published = formData.get("published") === "on"
  const image_url = formData.get("image_url") as string

  const { error } = await supabase.from("page_content").insert({
    section,
    title,
    content,
    section_name,
    order_index,
    published,
    image_url,
  })

  if (error) {
    console.error("Error creating page content:", error.message)
    redirect("/admin/dashboard/page-content?message=Could not create page content")
  }

  revalidatePath("/admin/dashboard/page-content")
  redirect("/admin/dashboard/page-content")
}

export async function updatePageContent(formData: FormData) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin?message=Unauthorized")
  }

  const id = formData.get("id") as string
  const section = formData.get("section") as string
  const title = formData.get("title") as string
  const content = formData.get("content") as string
  const section_name = formData.get("section_name") as string | null
  const order_index = formData.get("order_index") ? parseInt(formData.get("order_index") as string) : 0
  const published = formData.get("published") === "on"
  const image_url = formData.get("image_url") as string

  const { error } = await supabase
    .from("page_content")
    .update({
      section,
      title,
      content,
      section_name,
      order_index,
      published,
      image_url,
    })
    .eq("id", id)

  if (error) {
    console.error("Error updating page content:", error.message)
    redirect(`/admin/dashboard/page-content/${id}/edit?message=Could not update page content`)
  }

  revalidatePath("/admin/dashboard/page-content")
  redirect("/admin/dashboard/page-content")
}

export async function deletePageContent(id: string) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/admin?message=Unauthorized")
  }

  const { error } = await supabase.from("page_content").delete().eq("id", id)

  if (error) {
    console.error("Error deleting page content:", error.message)
    return { success: false, message: "Could not delete page content" }
  }

  revalidatePath("/admin/dashboard/page-content")
  return { success: true, message: "Page content deleted successfully" }
}
