import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardContent, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
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

  const features = [
    {
      icon: "🚗",
      title: "Instant Booking",
      description:
        "Book a ride in seconds with our intuitive app. Real-time tracking and instant driver matching.",
      gradient: "from-blue-500 to-blue-600",
    },
    {
      icon: "💰",
      title: "Best Prices",
      description:
        "Competitive pricing with no surge pricing during peak hours. Transparent fare breakdown.",
      gradient: "from-green-500 to-emerald-600",
    },
    {
      icon: "🛡️",
      title: "Safe & Secure",
      description:
        "24/7 ride monitoring, emergency support, and verified drivers for your peace of mind.",
      gradient: "from-red-500 to-red-600",
    },
    {
      icon: "⚡",
      title: "Fast Arrival",
      description:
        "Average 3-minute pickup time. Smart algorithms match you with the nearest available driver.",
      gradient: "from-purple-500 to-purple-600",
    },
    {
      icon: "🌟",
      title: "Premium Rides",
      description:
        "Upgrade to premium vehicles for special occasions or business travel with professional drivers.",
      gradient: "from-amber-500 to-amber-600",
    },
    {
      icon: "📱",
      title: "Easy Payments",
      description:
        "Multiple payment options including credit cards, digital wallets, and cash. Secure and hassle-free.",
      gradient: "from-indigo-500 to-indigo-600",
    },
    
    
  ];

  return (
    <section
      id="features"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50/50"
    >
      <div className="max-w-7xl mx-auto">
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
            Why Choose Us
          </Badge>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Experience the Future of Ride-Hailing
          </h2>
          <p className="text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Designed with cutting-edge technology to deliver seamless
            experiences for both riders and drivers. Safety, reliability, and
            comfort in every journey.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 },
              }}
            >
              <Card className="h-full border border-gray-200/60 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 hover:border-gray-300 group">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div
                      className={`w-14 h-14 rounded-xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white text-2xl shadow-lg group-hover:shadow-xl transition-shadow duration-300`}
                    >
                      {feature.icon}
                    </div>
                    <div className="text-4xl font-bold text-gray-200/40 group-hover:text-gray-300/50 transition-colors duration-300">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>
                  <CardTitle className="text-xl font-bold text-slate-800 mt-6 group-hover:text-slate-900 transition-colors duration-300">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 leading-relaxed text-lg">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-20 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center"
        >
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-slate-900">
              10M+
            </div>
            <div className="text-slate-600 font-medium">Happy Riders</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-slate-900">
              500K+
            </div>
            <div className="text-slate-600 font-medium">Verified Drivers</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-slate-900">
              100+
            </div>
            <div className="text-slate-600 font-medium">Cities Worldwide</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl sm:text-4xl font-bold text-slate-900">
              4.9★
            </div>
            <div className="text-slate-600 font-medium">App Store Rating</div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Features;
