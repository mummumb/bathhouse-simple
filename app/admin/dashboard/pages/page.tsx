import { redirect } from "next/navigation"

export default async function AdminPagesPage() {
  // Redirect to the all pages view which has both standalone pages and content sections
  redirect("/admin/dashboard/pages/all")
}