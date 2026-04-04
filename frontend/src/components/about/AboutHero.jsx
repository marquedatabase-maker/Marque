import { Link } from "react-router-dom";

const AboutHero = () => {
  return (
    <section className="py-20 lg:py-28 overflow-hidden bg-white">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center about-grid">

          <div className="relative z-10">
            <span className="text-[#DC2626] font-bold text-sm uppercase tracking-wider mb-2 block">
              Who We Are
            </span>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#0B1C33] leading-tight mb-6">
              Building Clear Pathways to the{" "}
              <span className="text-[#DC2626]">Right College</span>
            </h1>

            <div className="text-slate-600 space-y-4 mb-8 text-lg">
              <p>
                Choosing the right college is one of the most important decisions
                in a student’s life.
              </p>
              <p>
                We are a <strong>student-first counselling organization</strong>{" "}
                focused on clarity, transparency, and outcomes.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Badge text="Data-Backed Guidance" />
              <Badge text="Personalised Support" />
            </div>

            <div className="mt-8">
              <Link to="/contact-us" className="px-8 py-3.5 bg-[#DC2626] hover:bg-[#b91c1c] text-white font-bold rounded-xl shadow-lg transition-all hover:-translate-y-1">
                Start Your Journey
              </Link>
            </div>
          </div>

          <div className="relative pl-8 pb-8">
            <div className="h-[450px] rounded-[24px] overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?q=80&w=1470"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="hidden md:block absolute -bottom-6 -left-6 h-48 w-48 border-8 border-white rounded-xl shadow-lg overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1470"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="absolute top-10 -right-6 bg-white p-4 rounded-xl shadow-xl border animate-bounce">
              <h3 className="text-2xl font-bold text-[#0B1C33]">50k+</h3>
              <p className="text-xs text-slate-500 font-bold uppercase">
                Students Guided
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

const Badge = ({ text }) => (
  <div className="flex items-center gap-3 bg-slate-50 px-4 py-2 rounded-lg border">
    <span className="text-sm font-bold text-[#0B1C33]">{text}</span>
  </div>
);

export default AboutHero;
