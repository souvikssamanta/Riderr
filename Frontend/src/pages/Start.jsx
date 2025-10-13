



import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../components/ui/accordion";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Badge } from "../components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";

function Start() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  
  const stats = [
    { number: "50K+", label: "Happy Riders" },
    { number: "10K+", label: "Verified Captains" },
    { number: "100+", label: "Cities Covered" },
    { number: "24/7", label: "Support Available" },
  ];

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const userMessage = { text: inputMessage, sender: "user" };
    setMessages([...messages, userMessage]);
    setInputMessage("");

    setTimeout(() => {
      const aiResponses = [
        "I can help you book a ride, explain our services, or answer questions about Riderr.",
        "To book a ride, simply click the 'Get Started' button and enter your destination.",
        "Our safety features include real-time tracking and driver verification for your peace of mind.",
        "You can become a captain by clicking the 'For Captains' button and completing the registration process.",
      ];
      const randomResponse =
        aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMessage = { text: randomResponse, sender: "ai" };
      setMessages((prev) => [...prev, aiMessage]);
    }, 800);
  };

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
 
      <Navbar/>
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid lg:grid-cols-2 gap-12 items-center"
          >
            <motion.div variants={itemVariants} className="space-y-8">
              <div className="space-y-4">
                <Badge variant="outline" className="text-sm px-3 py-1">
                  🚀 The Future of Urban Mobility
                </Badge>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
                  <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                    Smarter Rides,
                  </span>
                  <br />
                  <span className="text-slate-900">Better Journeys</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl">
                  Experience seamless urban transportation with AI-powered
                  matching, real-time tracking, and premium safety features.
                </p>
              </div>

              <motion.div
                variants={itemVariants}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/login" className="flex-1">
                  <Button
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white"
                  >
                    Start Riding
                  </Button>
                </Link>
                <Link to="/captain-login" className="flex-1">
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2"
                  >
                    Become a Captain
                  </Button>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div
                variants={itemVariants}
                className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8"
              >
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-slate-900">
                      {stat.number}
                    </div>
                    <div className="text-sm text-slate-600">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            <motion.div variants={itemVariants} className="relative">
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src="https://img.freepik.com/free-vector/car-sharing-concept-illustration_114360-15011.jpg"
                  alt="Ride sharing illustration"
                  className="w-full h-auto"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/20 to-transparent" />
              </div>

              {/* Floating elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute -top-4 -left-4 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium">Ride matched</span>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                className="absolute -bottom-4 -right-4 bg-white rounded-xl shadow-lg p-4"
              >
                <div className="text-sm font-medium">2 min away</div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <Features/>

      {/* Testimonials */}
      

    <Testimonials/>


      
      <FAQ/>
      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Ready to Transform Your Commute?
              </h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Join thousands of riders and captains who trust Riderr for their
                daily journeys.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/login">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600 text-white px-8"
                >
                  Start Riding Today
                </Button>
              </Link>
              <Link to="/captain-login">
                <Button size="lg" variant="outline" className="border-2 px-8">
                  Drive With Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
              {/* footer section */}

              <Footer/>

      {/* AI Assistant */}
      {/* <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
        <DialogTrigger asChild>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full shadow-2xl flex items-center justify-center text-white z-50"
          >
            <span className="text-2xl">🤖</span>
          </motion.button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-md p-0 overflow-hidden">
          <DialogHeader className="bg-gradient-to-r from-blue-600 to-emerald-500 p-4 text-white">
            <DialogTitle className="text-white flex items-center gap-2">
              <span>Riderr Assistant</span>
              <Badge variant="secondary" className="bg-white/20">
                AI
              </Badge>
            </DialogTitle>
          </DialogHeader>

          <div className="p-4 h-64 overflow-y-auto space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm">
                AI
              </div>
              <div className="bg-slate-100 rounded-lg p-3 text-sm">
                Hello! I'm your Riderr assistant. How can I help you today?
              </div>
            </div>

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex items-start gap-3 ${
                  message.sender === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {message.sender === "ai" && (
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm">
                    AI
                  </div>
                )}
                <div
                  className={`rounded-lg p-3 text-sm max-w-[80%] ${
                    message.sender === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-slate-100 text-slate-900"
                  }`}
                >
                  {message.text}
                </div>
                {message.sender === "user" && (
                  <div className="w-8 h-8 bg-slate-400 rounded-full flex items-center justify-center text-white text-sm">
                    You
                  </div>
                )}
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Ask me anything about Riderr..."
                className="flex-1"
              />
              <Button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-emerald-500"
              >
                Send
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}

export default Start;




