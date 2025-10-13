import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

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

  const faqData = [
    {
      question: "How do I book a ride with Riderr?",
      answer:
        "Booking a ride is simple! Download our app, create an account, enter your destination, and confirm your ride. You'll be matched with a nearby driver within seconds. You can track your driver's arrival in real-time and receive notifications throughout the journey.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including credit/debit cards (Visa, MasterCard, American Express), digital wallets (Apple Pay, Google Pay, PayPal), and in select regions, cash payments. All digital payments are securely processed with encryption to protect your financial information.",
    },
    {
      question: "How are fares calculated?",
      answer:
        "Fares are calculated based on several factors: base fare, distance traveled, time spent, current demand in your area, and local regulations. You'll always see the estimated fare before confirming your ride. For longer trips, we offer fixed pricing to eliminate surprises.",
    },
    {
      question: "Can I schedule rides in advance?",
      answer:
        "Yes! You can schedule rides up to 30 days in advance through our app. This is perfect for airport transfers, important meetings, or any time-sensitive appointments. Your scheduled ride will be confirmed and a driver will be assigned ahead of your pickup time.",
    },
    {
      question: "What safety measures are in place?",
      answer:
        "Your safety is our priority. We have 24/7 customer support, real-time ride tracking, emergency assistance button, driver verification including background checks, vehicle inspections, and ride sharing with trusted contacts. All rides are insured and drivers are regularly rated by passengers.",
    },
    {
      question: "How do I become a driver with Riderr?",
      answer:
        "To become a driver, you need to: be at least 21 years old, have a valid driver's license, possess proper insurance, pass a background check, and have a qualifying vehicle. Apply through our website or app, and our team will guide you through the verification process which typically takes 3-5 business days.",
    },
    {
      question: "What if I need to cancel my ride?",
      answer:
        "You can cancel your ride free of charge within the first 2 minutes after booking. After that, a cancellation fee may apply depending on how long the driver has been en route. Cancellation policies are clearly displayed in the app before you confirm any charges.",
    },
    {
      question: "Do you offer ride-sharing options?",
      answer:
        "Yes! We offer shared rides in many cities where you can split the cost with other passengers heading in the same direction. This eco-friendly option reduces costs by up to 30% while helping reduce traffic congestion and carbon emissions.",
    },
    {
      question: "How do I contact customer support?",
      answer:
        "You can contact our 24/7 customer support through the app's help section, via email at support@riderr.com, or by calling our toll-free number. For urgent issues during a ride, use the in-app emergency button for immediate assistance.",
    },
    {
      question: "Are there any hidden fees?",
      answer:
        "No hidden fees! We believe in transparent pricing. The fare you see before booking is what you pay. The only exceptions are if you make additional stops, change your destination mid-ride, or cause significant cleaning fees due to spills or messes in the vehicle.",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="faq"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-50/50 to-white"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge
            variant="secondary"
            className="mb-4 px-4 py-1 text-sm font-semibold"
          >
            FAQ
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Find quick answers to common questions about riding with Riderr.
            Can't find what you're looking for? Contact our support team.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="space-y-4"
        >
          {faqData.map((faq, index) => (
            <motion.div key={index} variants={itemVariants}>
              <Card className="border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-all duration-300 group cursor-pointer">
                <CardContent className="p-0">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full px-6 py-6 text-left flex justify-between items-center hover:bg-gray-50/50 transition-colors duration-200"
                  >
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 flex items-center justify-center text-white text-sm font-bold mt-1 flex-shrink-0">
                        ?
                      </div>
                      <div className="text-left">
                        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-slate-900 transition-colors duration-200">
                          {faq.question}
                        </h3>
                      </div>
                    </div>
                    <motion.div
                      animate={{ rotate: openIndex === index ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex-shrink-0 ml-4"
                    >
                      <svg
                        className="w-5 h-5 text-gray-500 group-hover:text-gray-700 transition-colors duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {openIndex === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6">
                          <div className="w-full border-t border-gray-200/60 mb-4"></div>
                          <p className="text-slate-600 leading-relaxed text-lg">
                            {faq.answer}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 text-center"
        >
          <Card className="border border-blue-200 bg-blue-50/50 backdrop-blur-sm">
            <CardContent className="py-8">
              <h3 className="text-2xl font-bold text-slate-900 mb-3">
                Still have questions?
              </h3>
              <p className="text-slate-600 mb-6 text-lg">
                Our support team is here to help you 24/7
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-emerald-500 text-white rounded-lg font-semibold hover:from-blue-700 hover:to-emerald-600 transition-all duration-300 shadow-sm hover:shadow-md">
                  Contact: 8927420376
                </button>
               
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
