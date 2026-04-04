const FloatingWhatsApp = () => {
  return (
    <a
      href="https://wa.me/+919008445959"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 w-[60px] h-[60px] bg-[#25D366] text-white rounded-full flex items-center justify-center text-3xl shadow-lg z-[100] animate-pulse"
      style={{ bottom: "90px" }}
    >
      <i className="fa-brands fa-whatsapp" />
    </a>
  );
};

export default FloatingWhatsApp;
