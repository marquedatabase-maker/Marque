const ContactMap = () => (
  <section id="map" className="pb-20 px-6 lg:px-12">
    <div className="max-w-[1400px] mx-auto rounded-2xl overflow-hidden border shadow">
      <iframe
        className="w-full h-[450px]"
        loading="lazy"
        src="https://www.google.com/maps/embed?pb=!1m18..."
      />
    </div>
  </section>
);

export default ContactMap;
