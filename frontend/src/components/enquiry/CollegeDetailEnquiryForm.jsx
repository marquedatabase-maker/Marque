import { useState, useEffect } from "react";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  CheckCircle,
  Loader2,
  X,
  GraduationCap,
} from "lucide-react";
import api from "../../Services/api";

export default function EnquiryForm({
  defaultCourse = "",
  onClose,
  isPopup = true,
}) {
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

  useEffect(() => {
    if (!submitted) return;
    const timer = setTimeout(() => {
      if (onClose) onClose();
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
    } catch (err) {
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br from-[#0B1C33] to-slate-900 text-white rounded-2xl shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] ${isPopup ? "w-full max-w-md" : "w-full"}`}
    >
      {/* Background Icon Decoration */}
      <div className="absolute top-0 right-0 -mt-4 -mr-4 opacity-10 text-white pointer-events-none">
        <GraduationCap size={120} />
      </div>

      {/* CLOSE BUTTON (Only if it's a popup) */}
      {isPopup && onClose && (
        <button
          type="button"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 w-8 h-8 flex items-center justify-center rounded-full bg-white/10 hover:bg-red-500/20 text-white/70 hover:text-white transition-all border border-white/10 backdrop-blur-md"
        >
          <X size={18} />
        </button>
      )}

      {/* HEADER SECTION */}
      <div className="relative z-10 p-6 pb-2">
        <h3 className="text-xl font-[Outfit] font-extrabold mb-1 tracking-tight">
          Get Free Counselling
        </h3>
        <p className="text-xs text-slate-300 font-medium">
          Expert guidance for Admissions 2026.
        </p>
      </div>

      <div className="relative z-10 min-h-[380px]">
        {!submitted ? (
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* Input Fields */}
            <Input
              icon={<User size={16} />}
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Full Name"
            />
            <Input
              icon={<Mail size={16} />}
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="Email Address"
            />
            <Input
              icon={<Phone size={16} />}
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="Mobile Number"
            />

            {/* Course Selector */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 pointer-events-none">
                <BookOpen size={16} />
              </div>
              <select
                name="course"
                value={form.course}
                onChange={handleChange}
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white outline-none text-sm font-medium placeholder-white/50 focus:bg-white/15 focus:border-white transition-all appearance-none cursor-pointer"
                required
              >
                <option value="" className="bg-[#0B1C33]">
                  Select Course
                </option>
                <option value="B.Tech" className="bg-[#0B1C33]">
                  B.Tech
                </option>
                <option value="BBA" className="bg-[#0B1C33]">
                  BBA
                </option>
                <option value="MBA" className="bg-[#0B1C33]">
                  MBA
                </option>
                <option value="MBBS" className="bg-[#0B1C33]">
                  MBBS
                </option>
              </select>
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none opacity-50">
                <div className="border-l border-t border-white w-2 h-2 rotate-[225deg] mt-[-4px]"></div>
              </div>
            </div>

            {/* Consent Checkbox */}
            <label className="flex items-center gap-2.5 text-[11px] text-slate-400 cursor-pointer select-none py-1 group">
              <input
                type="checkbox"
                name="consent"
                checked={form.consent}
                onChange={handleChange}
                className="w-4 h-4 rounded border-white/20 bg-white/10 checked:bg-[#DC2626] transition-all cursor-pointer accent-[#DC2626]"
              />
              <span className="group-hover:text-slate-300 transition-colors">
                I agree to the privacy policy
              </span>
            </label>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 bg-[#DC2626] hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed font-bold rounded-xl shadow-[0_10px_40px_-10px_rgba(220,38,38,0.3)] text-sm uppercase tracking-wide transition-all active:scale-[0.98] flex items-center justify-center gap-3 mt-2"
            >
              {loading ? (
                <Loader2 className="animate-spin w-5 h-5" />
              ) : (
                <>
                  Apply Now
                  <CheckCircle size={16} className="opacity-70" />
                </>
              )}
            </button>

            <p className="text-[10px] text-center text-slate-400 mt-3 opacity-60">
              By clicking Apply, you agree to our Terms.
            </p>
          </form>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <div className="w-20 h-20 bg-green-500/20 backdrop-blur-xl rounded-full flex items-center justify-center mb-5 animate-pulse border border-green-500/30">
              <CheckCircle className="w-12 h-12 text-green-400" />
            </div>
            <h3 className="text-2xl font-bold text-white tracking-tight">
              Application Sent!
            </h3>
            <p className="text-sm text-slate-400 mt-2">
              Our experts will contact you shortly.
            </p>
            <div className="w-40 bg-white/5 h-1 rounded-full mt-8 overflow-hidden">
              <div className="h-full bg-green-500 animate-shrink"></div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        .animate-shrink {
          animation: shrink 1.2s linear forwards;
        }
        @keyframes shrink {
          from { width: 100%; }
          to { width: 0%; }
        }
      `}</style>
    </div>
  );
}

// Helper Input Component with the updated Dark Style
function Input({ icon, ...props }) {
  return (
    <div className="relative group">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 pointer-events-none group-focus-within:text-white transition-colors">
        {icon}
      </div>
      <input
        {...props}
        required
        className="w-full pl-11 pr-4 py-3 rounded-xl bg-white/10 border border-white/15 backdrop-blur-md text-white outline-none text-sm font-medium placeholder-white/40 focus:bg-white/15 focus:border-white/40 transition-all shadow-inner"
      />
    </div>
  );
}
