"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="bg-gradient-to-br from-rose-50 to-rose-100 text-gray-900 min-h-screen">
      <section className="relative bg-gradient-to-r from-rose-600 via-rose-700 to-red-600 text-white py-24 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white rounded-full opacity-10 animate-pulse"></div>
          <div className="absolute top-32 right-20 w-32 h-32 bg-yellow-300 rounded-full opacity-10 animate-bounce delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-blue-300 rounded-full opacity-10 animate-ping delay-500"></div>
        </div>

        <div
          className={`container mx-auto px-6 text-center relative z-10 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <div className="max-w-4xl mx-auto">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Image src="/logo2.png" height={55} width={55} alt="log" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight">
              <span className="text-white drop-shadow">All-in-One POS</span>
              <br />
              <span className="text-yellow-300">& E-commerce Solution</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 font-light leading-relaxed opacity-90">
              Streamline sales, inventory, and online orders with our
              cutting-edge POS & E-commerce platform
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6 mb-8">
              <button
                onClick={() => router.push("/contact")}
                className="group bg-white text-rose-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-50 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                Contact Us to Get Started
              </button>
              <button
                onClick={() => router.push("/Login")}
                className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-rose-600 transition-all duration-300"
              >
                Login
              </button>
            </div>
            <div className="flex flex-wrap justify-center gap-8 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Contact for setup
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                Custom pricing
              </div>
              <div className="flex items-center gap-2">
                <svg
                  className="w-5 h-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                24/7 support
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* Features Section */}
      <section className="py-20 container mx-auto px-6 bg-gradient-to-b from-rose-50 to-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Why Choose <span className="text-rose-600">Our Platform?</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Everything you need to run and grow your business, all in one
            powerful platform
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-rose-200 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-rose-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Smart POS Solution
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Lightning-fast, intuitive POS system that processes transactions
              in seconds. Perfect for retail, restaurants, and service
              businesses.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
                Offline mode capability
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
                Multi-payment methods
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-rose-400 rounded-full"></div>
                Receipt printing & SMS
              </li>
            </ul>
          </div>

          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-rose-200 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              E-commerce Platform
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Beautiful, mobile-optimized online store with secure payments.
              Sell anywhere, anytime with our integrated e-commerce solution.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                Mobile-first design
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                M-Pesa integration
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full"></div>
                SEO optimized
              </li>
            </ul>
          </div>

          <div className="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-rose-200 transform hover:-translate-y-2">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <svg
                className="w-8 h-8 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4 text-gray-900">
              Real-time Analytics
            </h3>
            <p className="text-gray-600 leading-relaxed mb-4">
              Make data-driven decisions with comprehensive analytics. Track
              sales, inventory, customer behavior, and business performance.
            </p>
            <ul className="text-sm text-gray-500 space-y-2">
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                Live dashboard
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                Custom reports
              </li>
              <li className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                Predictive insights
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="bg-gradient-to-b from-rose-100 to-rose-50 py-20">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Simple, Transparent Pricing
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Choose the perfect plan for your business. Contact me for custom
              pricing and setup.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                name: "Starter",
                price: "KES 1,000",
                period: "/month",
                description:
                  "Perfect for small businesses just getting started",
                features: [
                  "Basic POS system",
                  "Inventory tracking",
                  "Up to 100 products",
                  "Basic reports",
                  "Email support",
                ],
                popular: false,
                buttonClass: "bg-gray-900 text-white hover:bg-gray-800",
              },
              {
                name: "Professional",
                price: "KES 1,500",
                period: "/month",
                description:
                  "Ideal for growing businesses with online presence",
                features: [
                  "Advanced POS system",
                  "Full e-commerce store",
                  "Unlimited products",
                  "Advanced analytics",
                  "M-Pesa integration",
                  "Priority support",
                  "Multi-location support",
                ],
                popular: true,
                buttonClass: "bg-rose-600 text-white hover:bg-rose-700",
              },
              {
                name: "Enterprise",
                price: "Custom",
                period: "/pricing",
                description: "For large businesses with custom requirements",
                features: [
                  "Everything in Professional",
                  "Custom integrations",
                  "Dedicated account manager",
                  "Advanced security",
                  "API access",
                  "White-label options",
                  "24/7 phone support",
                ],
                popular: false,
                buttonClass: "bg-gray-900 text-white hover:bg-gray-800",
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white p-8 rounded-2xl shadow-lg transition-all duration-300 border-2 ${
                  plan.popular
                    ? "border-rose-500 shadow-2xl scale-105"
                    : "border-gray-200 hover:border-rose-200 hover:shadow-xl"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-rose-500 text-white px-4 py-2 rounded-full text-sm font-bold">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {plan.price}
                    </span>
                    <span className="text-gray-600">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <svg
                        className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <button
                  onClick={() => router.push("/contact")}
                  className={`w-full py-4 rounded-xl font-bold text-lg transition-all duration-300 ${plan.buttonClass}`}
                >
                  {plan.name === "Enterprise" ? "Contact Me" : "Get Started"}
                </button>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-gray-600">
              Contact me directly for setup and custom pricing solutions.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-rose-600 to-red-600 text-white py-20">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of businesses that have streamlined their operations
            with our platform
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <button
              onClick={() => router.push("/Login")}
              className="bg-white text-rose-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-rose-50 transform hover:scale-105 transition-all duration-300 shadow-lg"
            >
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-rose-600 transition-all duration-300">
              Contact Me
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-white font-bold text-xl mb-4">
                Zacc POS & E-Commerce
              </h3>
              <p className="text-gray-400 leading-relaxed">
                Empowering businesses across Kenya with cutting-edge technology
                solutions.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Connect</h4>
              <ul className="space-y-2">
                <li>
                  <a
                    href="https://stephen-karani.0xzile.sbs"
                    className="hover:text-white transition-colors"
                  >
                    Website
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/zilezarach"
                    className="hover:text-white transition-colors"
                  >
                    GitHub
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              © {new Date().getFullYear()} POS & E-Commerce SaaS. All rights
              reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
