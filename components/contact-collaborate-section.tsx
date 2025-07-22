export default function ContactCollaborateSection() {
  return (
    <section className="bg-gray-100 py-16">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-semibold mb-4">Contact & Collaborate</h2>
        <p className="text-gray-700 mb-8">
          Interested in working together or have any questions? Feel free to reach out!
        </p>
        <div className="flex justify-center space-x-4">
          <a
            href="mailto:your-email@example.com"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Email Me
          </a>
          <a
            href="https://www.linkedin.com/in/your-linkedin-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  )
}
