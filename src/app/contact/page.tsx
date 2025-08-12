"use client";

import { useState } from "react";
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Here you can integrate with your backend or email service
    console.log("Form submitted:", formData);

    setStatus("✅ Message sent! We'll get back to you soon.");
    setFormData({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="bg-gradient-to-br from-rose-50 to-rose-100 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-rose-600 via-rose-700 to-red-600 text-white py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Contact Us</h1>
        <p className="text-lg opacity-90 max-w-2xl mx-auto">
          Have questions or want to get started? Reach out to us and we’ll be
          happy to help.
        </p>
      </section>

      {/* Contact Form & Info */}
      <section className="container mx-auto px-6 py-16 grid md:grid-cols-2 gap-12">
        {/* Contact Form */}
        <div className="bg-white p-8 rounded-2xl shadow-lg border border-rose-100">
          <h2 className="text-2xl font-bold text-rose-600 mb-6">
            Send us a message
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 text-black"
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 text-black"
            />
            <input
              type="tel"
              name="phone"
              placeholder="Your Phone"
              value={formData.phone}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 text-black"
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={5}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-rose-500 text-black"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-rose-600 text-white py-3 rounded-lg font-bold hover:bg-rose-700 transition"
            >
              Send Message
            </button>
          </form>
          {status && (
            <p className="mt-4 text-green-600 font-semibold">{status}</p>
          )}
        </div>

        {/* Contact Info */}
        <div className="space-y-8">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-rose-100">
            <h2 className="text-2xl font-bold text-rose-600 mb-4">
              Get in touch
            </h2>
            <p className="text-gray-600 mb-6">
              You can also reach us directly through the following channels:
            </p>
            <div className="flex items-center gap-4 mb-4">
              <FaEnvelope className="text-rose-600 text-xl" />
              <a
                href="mailto:karanisteve449@gmail.com"
                className="text-gray-700 hover:text-rose-600"
              >
                karanisteve449@gmail.com
              </a>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <FaPhoneAlt className="text-rose-600 text-xl" />
              <a
                href="tel:+254717071509"
                className="text-gray-700 hover:text-rose-600"
              >
                +254 717 071 509
              </a>
            </div>
            <div className="flex items-center gap-4">
              <FaMapMarkerAlt className="text-rose-600 text-xl" />
              <span className="text-gray-700">Nairobi, Kenya</span>
            </div>
          </div>

          {/* Optional Map */}
          <div className="rounded-2xl overflow-hidden shadow-lg border border-rose-100">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15955.197!2d36.8219!3d-1.2921!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f10d6f0b0b0b1%3A0x1234567890abcdef!2sNairobi!5e0!3m2!1sen!2ske!4v1234567890"
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  );
}
