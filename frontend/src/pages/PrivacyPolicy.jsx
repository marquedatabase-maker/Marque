import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 mt-24 py-16">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

      <p className="mb-4">
        We value your privacy and are committed to protecting your personal
        information. This policy explains how we collect, use, and protect your
        data.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p>
        We may collect personal information such as your name, email address,
        phone number, and other information when you contact us or use our
        services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">How We Use Information</h2>
      <ul className="list-disc ml-6">
        <li>Improve our services</li>
        <li>Respond to user queries</li>
        <li>Provide better user experience</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">Cookies</h2>
      <p>
        Our website may use cookies to analyze traffic and improve user
        experience.
      </p>
    </div>
  );
};

export default PrivacyPolicy;