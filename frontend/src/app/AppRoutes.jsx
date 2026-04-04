import { Routes, Route } from "react-router-dom";
import { lazy } from "react";
// import {  Suspense } from "react";

// layouts & routes
import UserLayout from "../layouts/UserLayout";
import AdminLayout from "../layouts/AdminLayout";
import ProtectedRoute from "../routes/ProtectedRoute";
import SearchResults from "../pages/SearchResults";
import EditBlog from "../pages/adminPage/Blog/EditBlog";
import AddExam from "../pages/adminPage/Exams/AddExam";
import ManageExams from "../pages/adminPage/Exams/ManageExams";
import UserExams from "../components/user/AllExams/UserExams";
import ExamDetails from "../components/user/AllExams/ExamDetails";
import EditCourse from "../pages/adminPage/course/EditCourse";

/* ================== USER PAGES ================== */
const Home = lazy(() => import("../pages/Home"));
const About = lazy(() => import("../pages/About"));
const Contact = lazy(() => import("../pages/Contact"));
const ContactForm = lazy(() => import("../components/contact/ContactForm"));
const CollegeCardPage = lazy(() => import("../pages/CollegeCardPage"));
const CollegeDetail = lazy(() => import("../components/user/CollegeDetail"));
const BlogPage = lazy(() => import("../pages/BlogPage"));
const HomeSearchResults = lazy(
  () => import("../components/home/HomeSearchResults"),
);
const SingleBlog = lazy(() => import("../pages/SingleBlog"));
const AllCoursesUser = lazy(
  () => import("../components/user/allcourse/AllCoursesUser"),
);
const CourseDetails = lazy(
  () => import("../components/user/coursedetails/CourseDetails"),
);
const PrivacyPolicy = lazy(() => import("../pages/PrivacyPolicy"));
const TermsConditions = lazy(() => import("../pages/TermsCondition"));
const Disclaimer = lazy(() => import("../pages/Disclaimer"));
const Sitemap = lazy(() => import("../pages/Sitemap"));


/* ================== ADMIN PAGES ================== */
const AdminLogin = lazy(() => import("../pages/adminPage/Login"));
const Dashboard = lazy(() => import("../pages/adminPage/Dashboard"));
const AddBlogs = lazy(() => import("../pages/adminPage/Blog/AddBlogs"));
const BlogList = lazy(() => import("../pages/adminPage/Blog/BlogList"));

const NotificationList = lazy(
  () => import("../pages/adminPage/Notification/NotificationList"),
);

const AddNotification = lazy(
  () => import("../pages/adminPage/Notification/AddNotification"),
);

const AddInstitute = lazy(
  () => import("../pages/adminPage/Colleges/AddInstitute"),
);
const InstituteList = lazy(
  () => import("../pages/adminPage/Colleges/InstituteList"),
);
const EditInstitute = lazy(
  () => import("../pages/adminPage/Colleges/EditInstitute"),
);
const ApplicationsList = lazy(() => import("../pages/adminPage/EnquiryList"));
const AllCourse = lazy(() => import("../pages/adminPage/course/AllCourse"));
const AddCourse = lazy(() => import("../pages/adminPage/course/AddCourse"));
const AdminProfile = lazy(() => import("../components/admin/AdminProfile"));
const CollegeDirectory = lazy(
  () => import("../../src/components/FindCollagesByState/CollegeDirectory"),
);

// const Loader = () => (
//   <div className="min-h-screen flex items-center justify-center">
//     <div className="text-lg font-semibold animate-pulse">Loading...</div>
//   </div>
// );

const AppRoutes = () => {
  return (
    // <Suspense fallback={<Loader />}>
    <Routes>
      {/* ========== USER ROUTES ========== */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/contact-us" element={<Contact />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<SingleBlog />} />
        <Route path="/all-college" element={<CollegeCardPage />} />
        <Route path="/all-college/:slug" element={<CollegeDetail />} />
        <Route path="/all-course" element={<AllCoursesUser />} />
        <Route path="/all-course/courses/:slug" element={<CourseDetails />} />
        <Route path="/college-directory" element={<CollegeDirectory />} />
        <Route path="/user/contact/ContactForm" element={<ContactForm />} />
        <Route path="/all-exams" element={<UserExams />} />
        <Route path="/all-exams/exam-details/:slug" element={<ExamDetails />} />
        <Route path="/Home/search-results" element={<HomeSearchResults />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/sitemap" element={<Sitemap />} />

      </Route>

      {/* ========== ADMIN LOGIN ========== */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* ========== ADMIN PROTECTED ROUTES ========== */}
      <Route
        element={
          <ProtectedRoute>
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/profile" element={<AdminProfile />} />
        <Route path="/admin/add-institute" element={<AddInstitute />} />
        <Route path="/admin/institutes" element={<InstituteList />} />
        <Route path="/admin/edit-institute/:id" element={<EditInstitute />} />
        <Route
          path="/admin/admission/get-admissions"
          element={<ApplicationsList />}
        />
        <Route path="/admin/course" element={<AllCourse />} />
        <Route path="/admin/courses/add" element={<AddCourse />} />
        {/* ✅ Edit Course */}
        <Route path="/admin/courses/edit/:id" element={<EditCourse />} />

        {/* exam page  */}
        {/* Ye route all exams ki listing dikhayega */}
        <Route path="/admin/exam" element={<ManageExams />} />

        {/* Ye route naya exam add karne ke liye khali form kholega */}
        <Route path="/admin/add-exam" element={<AddExam />} />

        {/* 🟢 YE LINE ADD KAREIN: Ye route existing exam ko edit karne ke liye data fetch karega */}
        <Route path="/admin/edit-exam/:id" element={<AddExam />} />

        <Route path="/admin/add-blog" element={<AddBlogs />} />

        <Route path="/admin/Blog" element={<BlogList />} />

        <Route path="/admin/Editblog/:id" element={<EditBlog />} />

        <Route path="/notification-list" element={<NotificationList />} />
        <Route path="/admin/add-notification" element={<AddNotification />} />
      </Route>
    </Routes>
    // </Suspense>
  );
};

export default AppRoutes;
