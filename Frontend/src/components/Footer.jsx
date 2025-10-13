import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const footerSections = [
    {
      title: "Product",
      links: [
        { name: "Ride", path: "/ride" },
        { name: "Drive", path: "/drive" },
        { name: "Premium", path: "/premium" },
        { name: "Business", path: "/business" },
        { name: "Car Rental", path: "/rental" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "Careers", path: "/careers" },
        { name: "Blog", path: "/blog" },
        { name: "Press", path: "/press" },
        { name: "Cities", path: "/cities" },
      ],
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/help" },
        { name: "Community", path: "/community" },
        { name: "Safety", path: "/safety" },
        { name: "Contact Us", path: "/contact" },
        { name: "Driver Support", path: "/driver-support" },
      ],
    },
    {
      title: "Legal",
      links: [
        { name: "Terms of Service", path: "/terms" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Cookie Policy", path: "/cookies" },
        { name: "Licenses", path: "/licenses" },
        { name: "Accessibility", path: "/accessibility" },
      ],
    },
  ];

  const socialLinks = [
    {
      name: "Facebook",
      icon: "📘",
      url: "#",
    },
    {
      name: "Twitter",
      icon: "🐦",
      url: "#",
    },
    {
      name: "Instagram",
      icon: "📷",
      url: "#",
    },
    {
      name: "LinkedIn",
      icon: "💼",
      url: "#",
    },
    {
      name: "YouTube",
      icon: "📺",
      url: "#",
    },
  ];

  const appStores = [
    {
      name: "App Store",
      icon: "📱",
      url: "#",
      description: "Download on the",
      platform: "App Store",
    },
    {
      name: "Google Play",
      icon: "🤖",
      url: "#",
      description: "Get it on",
      platform: "Google Play",
    },
  ];

  return (
    <footer className="bg-gradient-to-b from-slate-900 to-slate-950 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8"
        >
          {/* Brand Section */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">R</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
                Riderr
              </span>
            </div>
            <p className="text-slate-300 mb-6 text-lg leading-relaxed">
              Your reliable ride-hailing partner. Book a ride in seconds, arrive
              in style. Available in 100+ cities worldwide.
            </p>

            {/* Social Links */}
            <div className="flex space-x-4 mb-6">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center text-lg hover:bg-slate-700 transition-colors duration-200"
                  title={social.name}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>

            {/* App Store Buttons */}
    
          </motion.div>

          {/* Navigation Links */}
          {footerSections.map((section, index) => (
            <motion.div key={section.title} variants={itemVariants}>
              <h3 className="text-lg font-semibold mb-4 text-white">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.path}
                      className="text-slate-300 hover:text-white transition-colors duration-200 text-base hover:underline"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Newsletter Section */}
       
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-slate-400 text-sm mb-4 md:mb-0">
              © 2024 Riderr Technologies. All rights reserved.
            </div>
            <div className="flex flex-wrap gap-6 text-sm">
              <Link
                to="/privacy"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </Link>
              <Link
                to="/sitemap"
                className="text-slate-400 hover:text-white transition-colors"
              >
                Sitemap
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
