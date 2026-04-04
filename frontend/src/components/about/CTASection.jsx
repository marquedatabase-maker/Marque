import { useState } from "react";
import EnquiryForm from "../enquiry/EnquiryForm";
const CTASection = () => {
  const [openForm, setOpenForm] = useState(false);
  return (
    <section className="py-20 bg-[#0B1C33] text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#DC2626] rounded-full blur-[150px] opacity-20"></div>

      <div className="max-w-[1400px] mx-auto px-6 text-center relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold mb-6">
          Let's Plan Your Academic Journey
        </h2>
        <p className="text-slate-300 mb-8 max-w-2xl mx-auto text-lg">
          Start with clarity. Move forward with confidence.
        </p>
        <button className="px-8 py-4 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold rounded-xl shadow-lg hover:-translate-y-1 transition"
          onClick={() => setOpenForm(true)}
        >
          Book Free Consultation
        </button>
        {openForm && (
          <div className="fixed inset-0 z-[9999]">
            <div className="min-h-screen flex items-center justify-center px-4 py-8 bg-black/50 backdrop-blur-sm">
              <div className="w-full max-w-[420px]">
                <EnquiryForm onClose={() => setOpenForm(false)} />
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};

export default CTASection;
