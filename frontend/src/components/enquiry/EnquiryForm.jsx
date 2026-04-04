import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  CheckCircle,
  Loader2,
} from "lucide-react";
import api from "../../Services/api";
import { X } from "lucide-react";

export default function EnquiryForm({ defaultCourse = "", onClose , onSuccess}) {
  const initialFormState = {
    name: "",
    email: "",
    phone: "",
    course: defaultCourse,
    consent: false,
   
  };

  const [form, setForm] = useState(initialFormState);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ auto-close popup after submit
  useEffect(() => {
    if (!submitted) return;

    const timer = setTimeout(() => {
      onClose(); // 🔥 Navbar se popup close
    }, 1000);

    return () => clearTimeout(timer);
  }, [submitted, onClose]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.consent) {
      alert("Please accept the privacy policy");
      return;
    }

    try {
      setLoading(true);

      await api.post("/admission/submit-form", form);

      setSubmitted(true);

      // ✅ notify parent after animation delay
      if (onSuccess) {
        setTimeout(() => {
          onSuccess();
        }, 1000);
      }
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden w-full max-w-md">
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-50
               w-9 h-9 flex items-center justify-center
               rounded-full bg-slate-100 hover:bg-red-100
               text-slate-500 hover:text-red-600 transition"
      >
        <X className="w-5 h-5" />
      </button>
      {/* HEADER */}
      <div className="px-6 py-5 bg-gradient-to-r from-[#0b1f3a] to-[#0f2d52]">
        <h2 className="text-xl font-bold text-white">Apply for Admission</h2>
        <p className="text-sm text-blue-100 mt-1">
          Fill the form below to get started
        </p>
      </div>

      <div className="relative min-h-[380px]">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            <Input
              icon={<User />}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
            <Input
              icon={<Mail />}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
            />
            <Input
              icon={<Phone />}
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="Phone Number"
            />

            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
                <BookOpen className="w-4 h-4" />
              </div>
              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm"
                required
              >
                <option value="">Select Course</option>
                <option>B.Tech</option>
                <option>BBA</option>
                <option>MBA</option>
                <option>MBBS</option>
              </select>
            </div>

            <label className="flex items-center gap-2 text-xs text-slate-500">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
              />
              I agree to the privacy policy
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#DC2626] text-white py-3 rounded-xl font-bold flex justify-center gap-2"
            >
              {loading ? (
                <Loader2 className="animate-spin w-4 h-4" />
              ) : (
                "Submit"
              )}
            </button>
          </form>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-[#0B1C33]">
              Application Sent!
            </h3>
            <p className="text-sm text-slate-500 mt-2">
              We will contact you shortly.
            </p>
            <div className="w-40 bg-slate-100 h-1 rounded-full mt-6 overflow-hidden">
              <div className="h-full bg-green-500 animate-shrink"></div>
            </div>
          </div>
        )}
      </div>
      <style>{`
        .animate-shrink {
          animation: shrink 1.5s linear forwards;
        }
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

function Input({ icon, ...props }) {
  return (
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400">
        {icon}
      </div>
      <input
        {...props}
        required
        className="w-full pl-10 pr-4 py-3 bg-slate-50 border rounded-xl text-sm"
      />
    </div>
  );
}
