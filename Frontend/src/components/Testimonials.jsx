import React from "react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Frequent Rider",
      content:
        "Riderr has completely transformed my daily commute. The drivers are always professional and the app is incredibly easy to use.",
      rating: 5,
      avatar: "SJ",
    },
    {
      id: 2,
      name: "Mike Chen",
      role: "Business Traveler",
      content:
        "As someone who travels frequently for work, Riderr makes getting around new cities stress-free. Reliable and always on time.",
      rating: 5,
      avatar: "MC",
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Driver Partner",
      content:
        "Driving with Riderr has given me the flexibility I need while earning a good income. The support team is always helpful.",
      rating: 4,
      avatar: "ER",
    },
    {
      id: 4,
      name: "David Kim",
      role: "Premium User",
      content:
        "The premium service is worth every penny. Clean cars, professional drivers, and excellent customer service.",
      rating: 5,
      avatar: "DK",
    },
  ];

  return (
    <div id="testimonials" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          What Our Users Say
        </h1>
        <p className="text-lg text-gray-600">
          Real experiences from riders and drivers
        </p>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {testimonials.map((testimonial, index) => (
          <motion.div
            key={testimonial.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300"
          >
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center text-white font-semibold mr-4">
                {testimonial.avatar}
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">
                  {testimonial.name}
                </h3>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>

            <div className="flex mb-3">
              {[...Array(5)].map((_, i) => (
                <svg
                  key={i}
                  className={`w-4 h-4 ${
                    i < testimonial.rating ? "text-yellow-400" : "text-gray-300"
                  }`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>

            <p className="text-gray-700 italic">"{testimonial.content}"</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;
