import { useState } from "react";
import { CheckCircle, Loader2 } from "lucide-react";
import api from "../../Services/api";

const ContactForm = () => {
  const initialState = {
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    course: "",
    message: "",
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.post("/admission/submit-form", {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        phone: form.phone,
        course: form.course,
        extraInfo: form.message, 
      });

      setSubmitted(true);
      setForm(initialState);
    } catch (err) {
      console.error(err.response?.data || err.message);
      alert("Something went wrong!");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center justify-center text-center py-20">
        <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 animate-bounce">
          <CheckCircle className="w-10 h-10 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-[#0B1C33]">
          Message Sent Successfully!
        </h3>
        <p className="text-slate-500 mt-2">
          Our team will contact you shortly.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 m-5 ">
      <h1 className="  text-red-500 font-bold text-center text-3xl">Get in Touch With Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="firstName"
          value={form.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
          className="input-style"
        />

        <input
          name="lastName"
          value={form.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
          className="input-style"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email Address"
          required
          className="input-style"
        />

        <input
          name="phone"
          value={form.phone}
          onChange={handleChange}
          placeholder="Phone Number"
          required
          className="input-style"
        />
      </div>

      <select
        name="course"
        value={form.course}
        onChange={handleChange}
        required
        className="input-style"
      >
        <option value="">Select Program</option>
        <option>B.Tech</option>
        <option>MBA</option>
        <option>MBBS</option>
        <option>Law</option>
      </select>

      <textarea
        name="message"
        value={form.message}
        onChange={handleChange}
        placeholder="How can we help you?"
        rows={4}
        required
        className="input-style resize-none"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full h-14 bg-gradient-to-r from-[#0B1C33] to-[#061121] text-white font-bold rounded-xl flex items-center justify-center gap-2 disabled:opacity-60"
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin w-4 h-4" /> Sending...
          </>
        ) : (
          "Send Message"
        )}
      </button>

      <style>{`
        .input-style {
          width: 100%;
          height: 48px;
          padding: 0 16px;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          background: #f8fafc;
          outline: none;
          transition: 0.3s;
        }
        .input-style:focus {
          background: white;
          border-color: #DC2626;
        }
      `}</style>
    </form>
  );
};

export default ContactForm;
