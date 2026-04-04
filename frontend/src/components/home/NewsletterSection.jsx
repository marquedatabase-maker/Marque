import { useState } from "react";
import { Mail, Phone, MapPin, SendHorizontal } from "lucide-react";

const NewsletterSection = () => {
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, mobile });
    setEmail("");
    setMobile("");
  };

  return (
    <section className="relative w-full bg-white overflow-hidden">
      {/* TOP PART */}
      <div className="relative flex flex-col justify-center items-center px-6 py-14">
        {/* dotted background */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "radial-gradient(#0B1C33 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative z-10 w-full max-w-5xl mx-auto text-center">
          <h2 className="text-2xl lg:text-3xl font-extrabold text-[#0B1C33] mb-2">
            Subscribe To Our <span className="text-[#DC2626]">Newsletter</span>
          </h2>

          <p className="text-sm text-slate-500 mb-8 max-w-xl mx-auto">
            Get the latest college notifications, exam updates, and news
            delivered directly to your inbox.
          </p>

          {/* FORM */}
          <form
            onSubmit={handleSubmit}
            className="bg-white p-2 rounded-2xl shadow-[0_20px_40px_-10px_rgba(11,28,51,0.1)] border border-slate-100 flex flex-col sm:flex-row gap-2 max-w-4xl mx-auto"
          >
            {/* EMAIL */}
            <div className="relative w-full flex-1 group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-[#DC2626]">
                <Mail size={18} />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email id"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl text-sm font-medium text-[#0B1C33] border border-transparent focus:bg-white focus:border-[#DC2626] outline-none transition"
              />
            </div>

            {/* MOBILE */}
            <div className="relative w-full flex-1 group">
              <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-slate-400 group-focus-within:text-[#DC2626]">
                <Phone size={18} />
              </span>
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter mobile no"
                className="w-full pl-10 pr-4 py-3 bg-slate-50 rounded-xl text-sm font-medium text-[#0B1C33] border border-transparent focus:bg-white focus:border-[#DC2626] outline-none transition"
              />
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full sm:w-auto bg-[#0B1C33] hover:bg-[#DC2626] text-white px-8 py-3 rounded-xl font-bold text-sm shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2"
            >
              Subscribe <SendHorizontal size={16} />
            </button>
          </form>
        </div>
      </div>

      {/* BOTTOM RED STRIP */}
      <div className="bg-[#DC2626] text-white py-6">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 divide-y md:divide-y-0 md:divide-x divide-white/20 text-center md:text-left">
            {/* EMAIL */}
            <div className="flex flex-col md:flex-row items-center gap-4 px-4 pt-4 md:pt-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold opacity-80 tracking-wider">
                  Email Address
                </p>
                <a
                  href="mailto:info@collegedekho.com"
                  className="text-sm font-bold hover:underline"
                >
                  help@marquecareer.com
                </a>
              </div>
            </div>

            {/* PHONE */}
            <div className="flex flex-col md:flex-row items-center gap-4 px-4 pt-6 md:pt-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold opacity-80 tracking-wider">
                  Phone Number
                </p>
                <a
                  href="tel:+001239957689"
                  className="text-sm font-bold hover:underline"
                >
                  +91 98765 43210
                </a>
              </div>
            </div>

            {/* ADDRESS */}
            <div className="flex flex-col md:flex-row items-center gap-4 px-4 pt-6 md:pt-0">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <p className="text-[10px] uppercase font-bold opacity-80 tracking-wider">
                  Our Address
                </p>
                <span className="text-sm font-bold">
                  Noida, Uttar Pradesh, India
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;