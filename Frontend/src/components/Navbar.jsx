import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button"; // Assuming you have a Button component
import { Badge } from "./ui/badge"; // Assuming you have a Badge component

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navigationLinks = [
    
    { name: "Features", path: "#features" },
    { name: "Testimonials", path: "#testimonials" },
    { name: "FAQ", path: "#faq" },
 
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo Section */}
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-3">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg" />
                <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                  Riderr
                </span>
                <Badge variant="secondary" className="ml-2">
                  Beta
                </Badge>
              </Link>
            </div>

            {/* Desktop Navigation Links */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <a
                 
                  href={link.path}
                  className="px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors duration-200 rounded-md hover:bg-gray-100/50"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Desktop Action Buttons */}
            <div className="hidden md:flex items-center gap-4">
              <Link to="/admin">
                <Button
                  variant="ghost"
                  className="text-sm text-gray-700 hover:text-blue-600"
                >
                  Admin Panel
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100/50 transition-colors duration-200"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  {isMobileMenuOpen ? (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  ) : (
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{
            opacity: isMobileMenuOpen ? 1 : 0,
            height: isMobileMenuOpen ? "auto" : 0,
          }}
          transition={{ duration: 0.2 }}
          className="md:hidden bg-white/95 backdrop-blur-md border-b border-gray-200 overflow-hidden"
        >
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navigationLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                onClick={() => setIsMobileMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100/50 rounded-md transition-colors duration-200"
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Action Buttons */}
            <div className="pt-4 space-y-2 border-t border-gray-200">
              <Link to="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                <Button
                  variant="ghost"
                  className="w-full justify-center text-gray-700 hover:text-blue-600"
                >
                  Admin Panel
                </Button>
              </Link>
              <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                <Button className="w-full justify-center bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </motion.nav>

      {/* Add padding to prevent content from being hidden behind fixed navbar */}
      <div className="h-16"></div>
    </>
  );
};

export default Navbar;
