import Link from "next/link"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { createClient } from "@/lib/supabase/server"

import { signIn } from "./actions"

export default async function LoginPage({
  searchParams,
}: {
  searchParams: { message: string }
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user) {
    redirect("/admin/dashboard")
  } else {
    redirect("/admin-login")
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4 dark:bg-gray-900">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-md dark:bg-gray-800">
        <h2 className="mb-6 text-center text-3xl font-bold text-gray-800 dark:text-white">Admin Login</h2>
        <form action={signIn} className="space-y-6">
          <div>
            <Label className="text-gray-700 dark:text-gray-300" htmlFor="email">
              Email
            </Label>
            <Input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              id="email"
              name="email"
              placeholder="m@example.com"
              required
              type="email"
            />
          </div>
          <div>
            <Label className="text-gray-700 dark:text-gray-300" htmlFor="password">
              Password
            </Label>
            <Input
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              id="password"
              name="password"
              placeholder="••••••••"
              required
              type="password"
            />
          </div>
          <Button className="w-full" type="submit">
            Log in
          </Button>
          {searchParams?.message && <p className="mt-4 text-center text-sm text-red-500">{searchParams.message}</p>}
        </form>
        <p className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <Link className="text-blue-600 hover:underline" href="/admin/signup">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}
