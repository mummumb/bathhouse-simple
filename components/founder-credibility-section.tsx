export default function FounderCredibilitySection() {
  return (
    <section className="bg-white py-12">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-8">Founder Credibility</h2>
        <p className="text-gray-700 mb-4">Our founders bring a wealth of experience and expertise to the table.</p>
        {/* Add founder profiles or testimonials here */}
        <div className="flex justify-center">
          {/* Example Founder Profile */}
          <div className="w-64 mx-4">
            <img src="https://via.placeholder.com/150" alt="Founder 1" className="rounded-full mb-2" />
            <h3 className="text-xl font-medium">John Doe</h3>
            <p className="text-gray-500">CEO</p>
            <p className="text-sm mt-2">Experienced entrepreneur with a proven track record.</p>
          </div>
          {/* Example Founder Profile */}
          <div className="w-64 mx-4">
            <img src="https://via.placeholder.com/150" alt="Founder 2" className="rounded-full mb-2" />
            <h3 className="text-xl font-medium">Jane Smith</h3>
            <p className="text-gray-500">CTO</p>
            <p className="text-sm mt-2">Leading expert in technology and innovation.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
