import React, { useState, useEffect } from "react";
import { Activity, Menu, X } from "lucide-react";
import Button from "./ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import {
  SignInButton,
  UserButton,
  SignedIn,
  SignedOut,
  SignUpButton,
} from "@clerk/clerk-react";

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);

      // Update active section based on scroll position
      const sections = ["features", "job-seekers", "companies"];
      const currentSection = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });

      setActiveSection(currentSection || "");
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#job-seekers", label: "For Job Seekers" },
    { href: "#companies", label: "For Companies" },
  ];

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-lg py-3"
          : "bg-gradient-to-r from-blue-600 to-indigo-600 py-5"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <motion.div
          className="flex items-center"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Activity
            className={`h-8 w-8 ${
              isScrolled ? "text-blue-600" : "text-white"
            } mr-2`}
          />
          <span
            className={`font-semibold text-xl ${
              isScrolled ? "text-slate-800" : "text-white"
            }`}
          >
            Worthy.ai
          </span>
        </motion.div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative font-medium ${
                isScrolled
                  ? "text-slate-700 hover:text-blue-600"
                  : "text-white/90 hover:text-white"
              } transition-colors ${
                activeSection === link.href.slice(1)
                  ? isScrolled
                    ? "text-blue-600"
                    : "text-white"
                  : ""
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <motion.div
                  layoutId="activeSection"
                  className={`absolute -bottom-1 left-0 right-0 h-0.5 ${
                    isScrolled ? "bg-blue-600" : "bg-white"
                  }`}
                  initial={false}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center space-x-3">
          <SignedOut>
          <SignInButton mode="modal" forceRedirectUrl = "/dashboard">
              <Button
                variant={isScrolled ? "outline" : "white"}
                size="sm"
                className={
                  isScrolled ? "" : "text-blue-600 hover:text-blue-700"
                }
              >
                Log in
              </Button>
            </SignInButton>

            <SignUpButton mode="modal" forceRedirectUrl = "/dashboard">
              <Button
                variant={isScrolled ? "primary" : "white"}
                size="sm"
                className={
                  isScrolled ? "" : "bg-white text-blue-600 hover:bg-blue-50"
                }
              >
                Sign up
              </Button>
            </SignUpButton>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* Mobile Menu Button */}
        <button
          className={`md:hidden p-2 transition-colors ${
            isScrolled
              ? "text-slate-700 hover:text-blue-600"
              : "text-white hover:text-white/80"
          }`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className={`md:hidden ${
              isScrolled
                ? "bg-white border-t border-slate-100"
                : "bg-blue-700 border-t border-blue-600"
            }`}
          >
            <nav className="container mx-auto px-4 py-4 space-y-4">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`block py-2 font-medium transition-colors ${
                    isScrolled
                      ? "text-slate-700 hover:text-blue-600"
                      : "text-white/90 hover:text-white"
                  } ${
                    activeSection === link.href.slice(1)
                      ? isScrolled
                        ? "text-blue-600"
                        : "text-white"
                      : ""
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </a>
              ))}
              <div className="pt-4 space-y-3">
                <SignedOut>
                  <SignInButton mode="modal" forceRedirectUrl = "/dashboard">
                    <Button
                      variant={isScrolled ? "outline" : "white"}
                      size="sm"
                      className={`w-full ${
                        isScrolled ? "" : "text-blue-600 hover:text-blue-700"
                      }`}
                    >
                      Log in
                    </Button>
                  </SignInButton>

                  <SignUpButton mode="modal" forceRedirectUrl = "/dashboard">
                    <Button
                      variant={isScrolled ? "primary" : "white"}
                      size="sm"
                      className={`w-full ${
                        isScrolled
                          ? ""
                          : "bg-white text-blue-600 hover:bg-blue-50"
                      }`}
                    >
                      Sign up
                    </Button>
                  </SignUpButton>
                </SignedOut>

                <SignedIn>
                  <UserButton afterSignOutUrl="/" />
                </SignedIn>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
