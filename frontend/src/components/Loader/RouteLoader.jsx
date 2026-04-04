import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const RouteLoader = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <>
      <style>
        {`
          @keyframes slideLoader {
            from { width: 0%; }
            to { width: 100%; }
          }
        `}
      </style>

      {loading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            height: "3px",
            background: "#DC2626",
            zIndex: 9999,
            animation: "slideLoader 0.4s ease forwards",
          }}
        />
      )}
    </>
  );
};

export default RouteLoader;