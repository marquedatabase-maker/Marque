import FloatingWhatsApp from "../components/contact/FloatingWhatsApp";
import ContactHero from "../components/contact/ContactHero";
import ContactCards from "../components/contact/ContactCards";
import LocationAndSocial from "../components/contact/LocationAndSocial";
import ContactMap from "../components/contact/ContactMap";
import ContactForm from "../components/contact/ContactForm";

const Contact = () => {
  return (
    <>
      {/* Floating WhatsApp */}
      <FloatingWhatsApp />

      {/* Hero Section */}
      <ContactHero />

      {/* Top Contact Cards */}
      <ContactCards />

      {/* FORM + LOCATION SIDE BY SIDE */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

            {/* LEFT → FORM */}
            <div className="lg:col-span-7">
              <div className="bg-white rounded-2xl border border-slate-200 p-8 lg:p-10">
                <ContactForm />
              </div>
            </div>

            {/* RIGHT → LOCATION + SOCIAL */}
            <div className="lg:col-span-5 space-y-8">
              <LocationAndSocial />
            </div>

          </div>
        </div>
      </section>

      {/* MAP */}
      <ContactMap />
    </>
  );
};

export default Contact;
