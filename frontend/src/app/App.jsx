import { useState, useEffect } from "react";
import AppRoutes from "./AppRoutes";
import ScrollToTop from "./ScrollToTop";
import TopScroll from "./TopScroll";
import Loader from "../components/Loader/Loader";
import RouteLoader from "../components/Loader/RouteLoader";
function App() {
  const hasLoadedBefore = sessionStorage.getItem("hasLoaded");

  const [loading, setLoading] = useState(!hasLoadedBefore);
  const [fadeOut, setFadeOut] = useState(false);


  useEffect(() => {
    if (!hasLoadedBefore) {
      const timer = setTimeout(() => {
        setFadeOut(true);

        setTimeout(() => {
          setLoading(false);
          sessionStorage.setItem("hasLoaded", "true");
        }, 600);
      }, 500);

      return () => clearTimeout(timer);
    }
  }, []);

  if (loading) {
    return <Loader fadeOut={fadeOut} />;
  }

  return (
    <div className="flex flex-col min-h-screen w-full">
      <TopScroll />
      <ScrollToTop />
      <RouteLoader />
      <div className="flex-1 flex flex-col w-full">
        <AppRoutes />
      </div>
    </div>
  );
}

export default App;
