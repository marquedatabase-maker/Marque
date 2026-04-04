import { useParams } from "react-router-dom"
import { courses } from "../data/courses"

export default function CourseDetails() {
  const { slug } = useParams()
  const course = courses.find(c => c.slug === slug)

  if (!course) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl font-bold">Course not found</h2>
      </div>
    )
  }

  return (
    <section className="py-20">
      <div className="max-w-4xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-dark">
          {course.title}
        </h1>

        <p className="mt-6 text-gray-700 text-lg">
          {course.description}
        </p>

        <div className="mt-8 p-6 border rounded-xl">
          <p><strong>Duration:</strong> {course.duration}</p>
          <p className="mt-2">
            <strong>Mode:</strong> Online
          </p>
        </div>

        <button className="mt-10 bg-primary text-white px-8 py-3 rounded-lg shadow-card hover:opacity-90 transition">
          Enroll Now
        </button>
      </div>
    </section>
  )
}
