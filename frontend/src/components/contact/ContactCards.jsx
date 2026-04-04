const ContactCards = () => {
  return (
    <section className="relative z-20 -mt-20 px-6 lg:px-12">
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">

        {[
          {
            icon: "fa-solid fa-location-dot",
            title: "Visit Campus",
            desc: "Experience our world-class infrastructure firsthand.",
            link: "#map",
            label: "Get Directions",
          },
          {
            icon: "fa-solid fa-headset",
            title: "Admission Helpline",
            desc: "Direct line to our senior admission officers.",
            link: "tel:+919008445959",
            label: "Call Now",
          },
          {
            icon: "fa-brands fa-whatsapp",
            title: "WhatsApp Chat",
            desc: "Instant answers to your quick queries.",
            link: "https://wa.me/+919008445959",
            label: "Chat Now",
            whatsapp: true,
          },
        ].map((item) => (
          <div
            key={item.title}
            className={`
              group bg-white border rounded-2xl p-10 text-center
              transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
              ${
                item.whatsapp
                  ? "border-slate-200 hover:border-[#25D366]"
                  : "border-slate-200 hover:border-[#DC2626]"
              }
            `}
          >
            {/* ICON */}
            <div
              className={`
                w-[70px] h-[70px] mx-auto mb-6 rounded-full
                flex items-center justify-center text-3xl
                transition-all duration-300
                ${
                  item.whatsapp
                    ? "bg-green-50 text-[#25D366] group-hover:bg-[#25D366] group-hover:text-white"
                    : "bg-slate-50 text-[#0B1C33] group-hover:bg-[#DC2626] group-hover:text-white"
                }
              `}
            >
              <i className={item.icon} />
            </div>

            {/* CONTENT */}
            <h3 className="text-xl font-bold mb-2 text-[#0B1C33]">
              {item.title}
            </h3>

            <p className="text-sm text-slate-500 mb-6">
              {item.desc}
            </p>

            {/* ACTION */}
            {item.whatsapp ? (
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  inline-flex items-center justify-center
                  px-6 py-2 rounded-full
                  text-sm font-bold text-white
                  bg-[#25D366] hover:bg-[#128C7E]
                  transition-all duration-300
                  shadow-md hover:shadow-lg
                "
              >
                {item.label}
              </a>
            ) : (
              <a
                href={item.link}
                className="font-bold text-sm text-[#DC2626] hover:underline"
              >
                {item.label}
              </a>
            )}
          </div>
        ))}

      </div>
    </section>
  );
};

export default ContactCards;
