"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Check,
  WavesIcon,
  GitBranch,
} from "lucide-react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

const Footer = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real application, you would send the email to your API
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail("");
      }, 3000);
    }
  };

  // Footer link sections
  const footerLinks = [
    {
      title: "Platform",
      links: [
        { name: "Features", href: "/#features" },
        { name: "Pricing", href: "/pricing" },
        { name: "Testimonials", href: "/#testimonials" },
        { name: "API", href: "/api-docs" },
        { name: "Status", href: "/status" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Documentation", href: "/docs" },
        { name: "Blog", href: "/blog" },
        { name: "Guides", href: "/guides" },
        { name: "Help Center", href: "/help" },
        { name: "Community", href: "/community" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", href: "/about" },
        { name: "Careers", href: "/careers" },
        { name: "Press", href: "/press" },
        { name: "Privacy Policy", href: "/privacy" },
        { name: "Terms of Service", href: "/terms" },
      ],
    },
  ];

  // Social media links
  const socialLinks = [
    {
      name: "Twitter",
      href: "https://twitter.com",
      icon: <Twitter className="w-5 h-5" />,
    },
    {
      name: "GitHub",
      href: "https://github.com",
      icon: <GitBranch className="w-5 h-5" />,
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com",
      icon: <Linkedin className="w-5 h-5" />,
    },
    {
      name: "Instagram",
      href: "https://instagram.com",
      icon: <Instagram className="w-5 h-5" />,
    },
    {
      name: "YouTube",
      href: "https://youtube.com",
      icon: <Youtube className="w-5 h-5" />,
    },
  ];

  return (
    <footer className="bg-[#0F0A19] relative">
      {/* Top border gradient */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-[#7209B7] to-transparent"></div>

      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-[#7209B7]/5 rounded-full blur-[100px]"></div>
        <div className="absolute -bottom-10 -right-10 w-60 h-60 bg-[#F72585]/5 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-6 pt-20 pb-10 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Company info section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="col-span-1 lg:col-span-4"
          >
            {/* Logo */}
            <Link href="/" className="flex items-center mb-6">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-br from-[#7209B7] to-[#F72585] rounded-lg flex items-center justify-center mr-2">
                  <span
                    className={`text-white text-xl font-bold ${orbitron.className}`}
                  >
                    M
                  </span>
                </div>
                <span
                  className={`text-white text-xl font-bold ${orbitron.className}`}
                >
                  MultiScribe
                </span>
              </div>
            </Link>

            <p className="text-white/60 mb-6 max-w-md">
              Transform audio and video to text with unmatched accuracy in over
              100 languages. Powered by cutting-edge AI technology.
            </p>

            {/* Newsletter signup */}
            <div className="mb-8">
              <h3 className="text-white text-sm font-medium mb-3">
                Stay updated
              </h3>
              <form
                onSubmit={handleSubscribe}
                className="flex flex-col sm:flex-row gap-3"
              >
                <div className="relative flex-grow">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#7209B7] transition-colors"
                    required
                  />
                </div>
                <button
                  type="submit"
                  disabled={isSubscribed}
                  className={`${
                    isSubscribed
                      ? "bg-green-600"
                      : "bg-gradient-to-r from-[#7209B7] to-[#F72585] hover:shadow-lg hover:shadow-purple-500/20"
                  } text-white px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition-all whitespace-nowrap`}
                >
                  {isSubscribed ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Subscribed!</span>
                    </>
                  ) : (
                    <>
                      <span>Subscribe</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Social links */}
            <div>
              <h3 className="text-white text-sm font-medium mb-3">
                Connect with us
              </h3>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={social.name}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-white/5 w-10 h-10 rounded-full flex items-center justify-center text-white/80 hover:bg-[#7209B7]/20 hover:text-white transition-colors"
                  >
                    {social.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Links columns */}
          <div className="col-span-1 lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
              {footerLinks.map((section, idx) => (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: idx * 0.1 }}
                  viewport={{ once: true }}
                >
                  <h3 className="text-white font-semibold mb-5">
                    {section.title}
                  </h3>
                  <ul className="space-y-3">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-white/60 hover:text-white transition-colors"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom section - copyright and legal links */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center gap-1 mb-4 md:mb-0">
            <WavesIcon className="w-4 h-4 text-[#7209B7]" />
            <p className="text-white/50 text-sm">
              © {new Date().getFullYear()} MultiScribe. All rights reserved.
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-2">
            {["Privacy Policy", "Terms of Service", "Cookies", "Contact"].map(
              (item) => (
                <Link
                  key={item}
                  href={`/${item.toLowerCase().replace(/\s+/g, "-")}`}
                  className="text-white/50 hover:text-white text-sm transition-colors"
                >
                  {item}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
