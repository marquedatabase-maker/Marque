import { useEffect, useState } from "react";
import api from "../../Services/api";

const NotificationToast = () => {
  const [toasts, setToasts] = useState([]);

  const removeToast = (id) => {
    setToasts((prev) => prev.filter((item) => item._id !== id));
  };

  useEffect(() => {
    // Logic to prevent toast on every refresh
    const hasShownToasts = sessionStorage.getItem("toasts_shown");
    if (hasShownToasts) return;

    const fetchNotifications = async () => {
      try {
        const response = await api.get("/notifications/latest");
        const notifications = response.data?.data || [];

        const latestTwelve = notifications.slice(0, 4);

        if (latestTwelve.length > 0) {
          // Mark as shown so refresh doesn't trigger it again
          sessionStorage.setItem("toasts_shown", "true");

          latestTwelve.forEach((item, index) => {
            setTimeout(() => {
              setToasts([item]);

              setTimeout(() => {
                removeToast(item._id);
              }, 3000);

            }, index * 2000);
          });
        }
      } catch (error) {
        console.error("Notification fetch failed:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      {Array.isArray(toasts) &&
        toasts.map((toast) => {
          const isExam = toast.category === "Exam Alerts";
          const isAdmission = toast.category === "Admission Alerts";

          return (
            <div
              key={toast._id}
              className="relative w-[380px] bg-white rounded-xl shadow-2xl border border-slate-100 flex overflow-hidden animate-slideIn"
            >
              {/* Accent Bar */}
              <div
                className={`w-1.5 ${
                  isAdmission
                    ? "bg-red-600"
                    : isExam
                    ? "bg-orange-500"
                    : "bg-blue-500"
                }`}
              />

              <div className="flex-1 p-4 pr-10">
                {/* 🔴 Close Button (absolute positioned) */}
                <button
                  onClick={() => removeToast(toast._id)}
                  className="absolute top-3 right-3 text-slate-300 hover:text-slate-600 transition"
                >
                  ✕
                </button>

                <div className="flex items-start gap-3">
                  <div className="relative mt-0.5">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        isAdmission
                          ? "bg-red-50 text-red-600"
                          : isExam
                          ? "bg-orange-50 text-orange-600"
                          : "bg-blue-50 text-blue-600"
                      }`}
                    />

                    {toast.isPinned && (
                      <span className="absolute -top-1 -right-1 text-[9px] bg-black text-white px-1 rounded">
                        New
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <h4 className="text-sm font-bold text-[#0B1C33] pr-2">
                        {toast.title}
                      </h4>

                      <span className="text-[10px] text-slate-400 font-medium whitespace-nowrap">
                        {new Date(toast.displayDate).toLocaleDateString()}
                      </span>
                    </div>

                    <p className="text-xs text-slate-500 mt-1 leading-relaxed line-clamp-2">
                      {toast.shortSnippet}
                    </p>

                    <a
                      href={toast.targetUrl}
                      className="mt-3 text-xs font-bold text-red-600 hover:text-[#0B1C33] transition-colors"
                    >
                      Read More →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default NotificationToast;