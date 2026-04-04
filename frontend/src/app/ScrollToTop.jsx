import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    // If URL contains hash (#section), scroll to that element
    if (location.hash) {
      let attempts = 0;

      const tryScroll = () => {
        const id = location.hash.replace("#", "");
        const element = document.getElementById(id);

        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else if (attempts < 10) {
          attempts++;
          setTimeout(tryScroll, 100);
        }
      };

      tryScroll();
    } else {
      // Restore previous scroll position
      const savedPosition = sessionStorage.getItem(
        `scroll-${location.pathname}`
      );

      if (savedPosition) {
        window.scrollTo(0, parseInt(savedPosition, 10));
      } else {
        window.scrollTo(0, 0);
      }
    }

    // Save scroll position with throttle
    let scrollTimeout;

    const handleScroll = () => {
      clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        sessionStorage.setItem(
          `scroll-${location.pathname}`,
          window.scrollY.toString()
        );
      }, 150);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;