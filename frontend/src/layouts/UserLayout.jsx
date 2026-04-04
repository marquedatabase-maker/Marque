import { Outlet } from "react-router-dom";
import { Suspense } from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import RouteLoader from "../components/Loader/RouteLoader"; // Or your custom loader

const UserLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 flex flex-col w-full relative">
        <Suspense fallback={<RouteLoader />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer className="mt-auto" />
    </div>
  );
};

export default UserLayout;
