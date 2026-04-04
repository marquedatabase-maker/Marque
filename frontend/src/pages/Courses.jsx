import { Link } from "react-router-dom"
import { courses } from "../data/courses"

export default function Courses() {
  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-3xl font-bold text-dark mb-10">
          Our Courses
        </h1>

        <div className="grid md:grid-cols-3 gap-8">
          {courses.map(course => (
            <div
              key={course.id}
              className="border rounded-xl p-6 hover:shadow-card transition"
            >
              <h2 className="text-xl font-semibold">
                {course.title}
              </h2>

              <p className="mt-3 text-gray-600">
                {course.description}
              </p>

              <p className="mt-2 text-sm text-gray-500">
                Duration: {course.duration}
              </p>

              <Link
                to={`/courses/${course.slug}`}
                className="inline-block mt-6 text-primary font-semibold"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
