// import axios from "axios";

// const api = axios.create({
//   baseURL: import.meta.env.VITE_API_URL + "/api",
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

// export default api;

import axios from "axios";

/**
 * Axios instance
 * Base URL comes from .env (VITE_API_URL)
 * Example: VITE_API_URL=http://localhost:5000
 */
const api = axios.create({
  baseURL: `${import.meta.env.VITE_API_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

/* =======================
   ADMIN APIs
======================= */

// Create Course
export const createCourse = (data) => api.post("/courses", data);

// Get All Courses (Admin)
export const getAllCourses = () => api.get("/courses");

// Get Course by ID
export const getCourseById = (id) => api.get(`/courses/${id}`);

// Update Course
export const updateCourse = (id, data) => api.put(`/courses/${id}`, data);

// Delete Course
export const deleteCourse = (id) => api.delete(`/courses/${id}`);

// Publish / Unpublish Course
export const togglePublish = (id, status) =>
  api.put(`/courses/${id}`, { isPublished: status });

/* =======================
   USER APIs
======================= */

// Get Published Courses (with filters)
export const getPublishedCourses = (params = {}) =>
  api.get("/courses", {
    params: { published: true, ...params },
  });

// Get Course by Slug
export const getCourseBySlug = (slug) => api.get(`/courses/slug/${slug}`);

export default api;
