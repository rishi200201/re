import { useState } from "react";
import { m } from "framer-motion";
import { FaPhone, FaMapMarkerAlt, FaClock, FaEnvelope, FaWhatsapp, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { SITE } from "../config/site";
import { submitEnquiry } from "../lib/api";

const contactInfo = [
  {
    icon: <FaPhone />,
    title: "Phone",
    items: [
      { text: SITE.phone.primary.display, href: SITE.phone.primary.href },
      { text: SITE.phone.secondary.display, href: SITE.phone.secondary.href },
    ],
  },
  {
    icon: <FaEnvelope />,
    title: "Email",
    items: [{ text: SITE.email.display, href: SITE.email.href }],
  },
  {
    icon: <FaMapMarkerAlt />,
    title: "Address",
    items: [{ text: SITE.address.full }],
  },
  {
    icon: <FaClock />,
    title: "Working Hours",
    items: [{ text: SITE.hours.display }],
  },
];

export default function Contact() {
  const [fields, setFields] = useState({ name: "", phone: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success | error

  const validate = () => {
    const e = {};
    if (!fields.name.trim()) e.name = "Name is required.";
    if (!fields.phone.trim()) {
      e.phone = "Phone number is required.";
    } else if (!/^[6-9][0-9]{9}$/.test(fields.phone.trim())) {
      e.phone = "Enter a valid 10-digit Indian mobile number.";
    }
    if (!fields.message.trim()) e.message = "Please describe your requirement.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }
    setStatus("submitting");
    try {
      await submitEnquiry(fields);
      setStatus("success");
      setFields({ name: "", phone: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="py-20 sm:py-28 bg-white">
      <div className="w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left - Info */}
          <m.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-primary font-semibold text-sm uppercase tracking-widest">
              Contact Us
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-accent mt-3 mb-4">
              Get In Touch
            </h2>
            <p className="text-gray-medium mb-8 text-base sm:text-lg leading-relaxed">
              Need a quote or have questions about our products? Reach us via phone or WhatsApp — we respond within hours.
            </p>

            {/* Quick action buttons */}
            <div className="flex flex-col sm:flex-row gap-3 mb-10">
              <a
                href={SITE.phone.primary.href}
                className="inline-flex items-center justify-center gap-2.5 bg-primary text-white font-semibold px-5 py-3 rounded-xl hover:bg-primary-dark transition-colors shadow-md shadow-primary/20 text-sm w-full sm:w-auto"
              >
                <FaPhone className="text-xs" />
                {SITE.phone.primary.display}
              </a>
              <a
                href={SITE.whatsapp.contactEnquiry}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-green-500 text-white font-semibold px-5 py-3 rounded-xl hover:bg-green-600 transition-colors shadow-md shadow-green-500/20 text-sm w-full sm:w-auto"
              >
                <FaWhatsapp className="text-sm" />
                WhatsApp Now
              </a>
            </div>

            <div className="space-y-5">
              {contactInfo.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-primary/10 rounded-xl flex items-center justify-center text-primary shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold text-accent mb-1">{item.title}</h3>
                    {item.items.map((sub, si) =>
                      sub.href ? (
                        <a
                          key={si}
                          href={sub.href}
                          className="block text-gray-medium hover:text-primary transition-colors"
                        >
                          {sub.text}
                        </a>
                      ) : (
                        <p key={si} className="text-gray-medium">{sub.text}</p>
                      )
                    )}
                  </div>
                </div>
              ))}
            </div>
          </m.div>

          {/* Right - Form */}
          <m.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {status === "success" ? (
              <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                <FaCheckCircle className="text-4xl text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-accent mb-2">Enquiry Sent!</h3>
                <p className="text-gray-medium text-sm mb-6">
                  Thank you — we'll get back to you within a few hours.
                </p>
                <button
                  onClick={() => setStatus("idle")}
                  className="bg-primary text-white font-semibold px-6 py-2.5 rounded-xl hover:bg-primary-dark transition-colors text-sm"
                >
                  Send Another
                </button>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="bg-gray-light rounded-2xl p-7 sm:p-9 space-y-5"
              >
                <h3 className="text-xl font-bold text-accent mb-1">Request a Quote</h3>
                <p className="text-gray-medium text-sm mb-4">We'll respond within a few hours.</p>

                {status === "error" && (
                  <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-xl">
                    <FaExclamationCircle className="shrink-0" />
                    Something went wrong. Please try WhatsApp directly.
                  </div>
                )}

                <div>
                  <label htmlFor="cf-name" className="block text-sm font-semibold text-accent mb-2">
                    Your Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="cf-name"
                    type="text"
                    name="name"
                    value={fields.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-all bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                      errors.name ? "border-red-400" : "border-gray-200 focus:border-primary"
                    }`}
                    placeholder="Enter your name"
                    aria-describedby="cf-name-error"
                    aria-invalid={!!errors.name}
                  />
                  {errors.name && <p id="cf-name-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
                </div>

                <div>
                  <label htmlFor="cf-phone" className="block text-sm font-semibold text-accent mb-2">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="cf-phone"
                    type="tel"
                    name="phone"
                    value={fields.phone}
                    onChange={handleChange}
                    inputMode="numeric"
                    maxLength={10}
                    className={`w-full px-4 py-3 rounded-lg border transition-all bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                      errors.phone ? "border-red-400" : "border-gray-200 focus:border-primary"
                    }`}
                    placeholder="10-digit mobile number"
                    aria-describedby="cf-phone-error"
                    aria-invalid={!!errors.phone}
                  />
                  {errors.phone && <p id="cf-phone-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.phone}</p>}
                </div>

                <div>
                  <label htmlFor="cf-message" className="block text-sm font-semibold text-accent mb-2">
                    Product & Quantity <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="cf-message"
                    name="message"
                    rows={4}
                    value={fields.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-all bg-white resize-none text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 ${
                      errors.message ? "border-red-400" : "border-gray-200 focus:border-primary"
                    }`}
                    placeholder="e.g. 400 Series Crates – 200 units, Wooden Pallets – 50 units…"
                    aria-describedby="cf-message-error"
                    aria-invalid={!!errors.message}
                  />
                  {errors.message && <p id="cf-message-error" role="alert" className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:opacity-60 text-white font-semibold py-3.5 rounded-lg transition-all text-sm"
                >
                  <FaWhatsapp className="text-lg" />
                  {status === "submitting" ? "Sending…" : "Send Enquiry"}
                </button>
              </form>
            )}
          </m.div>
        </div>
      </div>
    </section>
  );
}
