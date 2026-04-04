import { useState } from "react";

const faqs = [
  { q: "How much does counselling cost?", a: "Our initial consultation is completely FREE." },
  { q: "When should I start the counselling process?", a: "Ideally during class 11." },
  { q: "Can you guarantee admission?", a: "No — but we maximize your chances." },
  { q: "What if I'm undecided?", a: "That's exactly what we help with!" },
];

const FAQSection = () => {
  const [open, setOpen] = useState(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-[800px] mx-auto px-6">
        <h2 className="text-3xl font-bold text-[#0B1C33] text-center mb-12">
          Frequently Asked Questions
        </h2>

        {faqs.map((f, i) => (
          <div key={i} className="border rounded-xl mb-4 bg-white">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full p-6 flex justify-between items-center font-semibold text-[#0B1C33]"
            >
              {f.q}
              <span className={`transition ${open === i ? "rotate-180 text-[#DC2626]" : ""}`}>
                ▼
              </span>
            </button>

            <div
              className={`overflow-hidden transition-all duration-300 px-6 ${
                open === i ? "max-h-40 pb-6" : "max-h-0"
              }`}
            >
              <p className="text-sm text-slate-600">{f.a}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQSection;
