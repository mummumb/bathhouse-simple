import StandalonePageForm from "@/components/admin/standalone-page-form"

export default function NewPagePage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Create New Page</h1>
        <p className="text-gray-600">Create a new standalone page that will be accessible at /p/[slug]</p>
      </div>
      
      <StandalonePageForm />
    </div>
  )
}