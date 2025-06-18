"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight, ChevronDown } from "lucide-react";
import { Orbitron } from "next/font/google";

const orbitron = Orbitron({
  subsets: ["latin"],
  variable: "--font-orbitron",
});

// Navigation links structure
const navLinks = [
  { name: "Home", href: "/" },
  {
    name: "Features",
    href: "/#features",
    dropdown: [
      { name: "Accuracy", href: "/#accuracy" },
      { name: "Languages", href: "/#languages" },
      { name: "Export Options", href: "/#export" },
    ],
  },
  { name: "Pricing", href: "/pricing" },
  { name: "FAQ", href: "/faq" },
  { name: "Blog", href: "/blog" },
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Handle scroll effect for navbar transparency
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle dropdown menu
  const toggleDropdown = (name: string) => {
    if (activeDropdown === name) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(name);
    }
  };

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0F0A19]/80 backdrop-blur-md border-b border-[#7209B7]/10"
          : "bg-transparent"
      }`}
    >
      {/* Optional: Add a subtle bottom glow when scrolled */}
      {isScrolled && (
        <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#7209B7]/20 to-transparent"></div>
      )}

      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
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

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navLinks.map((link) => (
              <div key={link.name} className="relative group">
                <div
                  className="flex items-center gap-1 cursor-pointer"
                  onClick={() => link.dropdown && toggleDropdown(link.name)}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => link.dropdown && e.preventDefault()}
                    className="text-white/80 hover:text-white font-medium transition-colors"
                  >
                    {link.name}
                  </Link>
                  {link.dropdown && (
                    <ChevronDown className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
                  )}
                </div>

                {/* Dropdown for desktop */}
                {link.dropdown && (
                  <div className="absolute left-0 mt-2 w-48 rounded-md shadow-lg bg-[#150C28] border border-white/10 overflow-hidden transform opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-200 origin-top-left z-50">
                    <div className="py-1">
                      {link.dropdown.map((subLink) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          className="block px-4 py-2 text-sm text-white/70 hover:bg-[#7209B7]/20 hover:text-white transition-colors"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right side buttons */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              href="/login"
              className="text-white/80 hover:text-white font-medium transition-colors"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="bg-gradient-to-r from-[#7209B7] to-[#F72585] text-white px-6 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/30 transition-all flex items-center gap-1"
            >
              <span>Get Started</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-[#0F0A19] border-t border-white/5"
          >
            <div className="container mx-auto px-6 py-4">
              {navLinks.map((link) => (
                <div key={link.name}>
                  <div
                    className="py-3 border-b border-white/10 flex justify-between items-center"
                    onClick={() => link.dropdown && toggleDropdown(link.name)}
                  >
                    <Link
                      href={link.href}
                      onClick={(e) => link.dropdown && e.preventDefault()}
                      className="text-white font-medium"
                    >
                      {link.name}
                    </Link>
                    {link.dropdown && (
                      <ChevronDown
                        className={`w-5 h-5 text-white/60 transition-transform duration-200 ${
                          activeDropdown === link.name
                            ? "transform rotate-180"
                            : ""
                        }`}
                      />
                    )}
                  </div>

                  {/* Mobile dropdown */}
                  {link.dropdown && activeDropdown === link.name && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                      className="bg-[#150C28]/50 rounded-md my-1"
                    >
                      {link.dropdown.map((subLink) => (
                        <Link
                          key={subLink.name}
                          href={subLink.href}
                          className="block px-4 py-3 text-sm text-white/70 hover:text-white transition-colors"
                        >
                          {subLink.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </div>
              ))}

              {/* Mobile buttons */}
              <div className="mt-6 flex flex-col gap-4">
                <Link
                  href="/login"
                  className="text-center text-white/80 hover:text-white py-2 transition-colors"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-gradient-to-r from-[#7209B7] to-[#F72585] text-white py-3 px-6 rounded-md text-center hover:shadow-lg hover:shadow-purple-500/30 transition-all"
                >
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default Navbar;
