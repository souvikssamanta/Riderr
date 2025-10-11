


// import React, { useState } from "react";
// import { Link } from "react-router-dom";

// function Start() {
//   const [isChatOpen, setIsChatOpen] = useState(false);
//   const [messages, setMessages] = useState([]);
//   const [inputMessage, setInputMessage] = useState("");

//   const testimonials = [
//     {
//       name: "Sarah Johnson",
//       role: "Frequent Rider",
//       content:
//         "Riderr has transformed my daily commute. The drivers are always punctual and the app is so easy to use!",
//       rating: "★★★★★",
//     },
//     {
//       name: "Michael Chen",
//       role: "Business Professional",
//       content:
//         "As a captain, I've doubled my income while meeting interesting people. The platform is fair and transparent.",
//       rating: "★★★★☆",
//     },
//     {
//       name: "Emma Rodriguez",
//       role: "Student",
//       content:
//         "Affordable rides with great safety features. I feel secure using Riderr for my late-night study sessions.",
//       rating: "★★★★★",
//     },
//   ];

//   const faqs = [
//     {
//       question: "How do I book a ride?",
//       answer:
//         "Simply click 'Get Started', sign up or log in, and enter your destination. Our system will match you with the nearest available captain.",
//     },
//     {
//       question: "What safety features does Riderr offer?",
//       answer:
//         "We offer real-time tracking, emergency contact integration, driver verification, and 24/7 support for all rides.",
//     },
//     {
//       question: "How do I become a captain?",
//       answer:
//         "Click 'For Captains', complete the registration process, pass our background check, and you'll be ready to start earning.",
//     },
//     {
//       question: "What payment methods are accepted?",
//       answer:
//         "We accept all major credit cards, digital wallets like Apple Pay and Google Pay, and in some regions, cash payments.",
//     },
//   ];

//   const features = [
//     {
//       title: "Instant Booking",
//       description:
//         "Get matched with a ride in seconds with our advanced algorithm.",
//       icon: "⚡",
//     },
//     {
//       title: "Real-time Tracking",
//       description: "Follow your ride in real-time with live GPS updates.",
//       icon: "📍",
//     },
//     {
//       title: "Secure Payments",
//       description: "Cashless transactions with multiple payment options.",
//       icon: "💳",
//     },
//     {
//       title: "24/7 Support",
//       description:
//         "Our customer service team is always available to assist you.",
//       icon: "🛟",
//     },
//     {
//       title: "AI Assistant",
//       description: "Get instant help from our virtual assistant anytime.",
//       icon: "🤖",
//     },
//   ];

//   const handleSendMessage = (e) => {
//     e.preventDefault();
//     if (!inputMessage.trim()) return;

//     // Add user message
//     const userMessage = { text: inputMessage, sender: "user" };
//     setMessages([...messages, userMessage]);
//     setInputMessage("");

//     // Simulate AI response after a short delay
//     setTimeout(() => {
//       const aiResponses = [
//         "I can help you book a ride, explain our services, or answer questions about Riderr.",
//         "To book a ride, simply click the 'Get Started' button and enter your destination.",
//         "Our safety features include real-time tracking and driver verification for your peace of mind.",
//         "You can become a captain by clicking the 'For Captains' button and completing the registration process.",
//       ];
//       const randomResponse =
//         aiResponses[Math.floor(Math.random() * aiResponses.length)];
//       const aiMessage = { text: randomResponse, sender: "ai" };
//       setMessages((prev) => [...prev, aiMessage]);
//     }, 800);
//   };

//   return (
//     <div className="min-h-screen w-full bg-gradient-to-r from-[#f0f9ff] to-[#e0f2fe] flex flex-col items-center p-4 relative">
//       {/* AI Assistant Button */}
//       <button
//         onClick={() => setIsChatOpen(!isChatOpen)}
//         className="fixed bottom-8 right-8 bg-gradient-to-r from-blue-600 to-emerald-500 text-white p-4 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 z-50 flex items-center justify-center"
//       >
//         <span className="text-2xl">🤖</span>
//       </button>

//       {/* AI Chat Interface */}
//       {isChatOpen && (
//         <div className="fixed bottom-24 right-8 w-80 bg-white rounded-xl shadow-2xl overflow-hidden z-50 flex flex-col">
//           <div className="bg-gradient-to-r from-blue-600 to-emerald-500 p-4 text-white font-semibold flex justify-between items-center">
//             <span>Riderr Assistant</span>
//             <button onClick={() => setIsChatOpen(false)} className="text-white">
//               ×
//             </button>
//           </div>
//           <div className="flex-1 p-4 overflow-y-auto h-64">
//             <div className="mb-4 text-sm text-gray-600">
//               Hello! I'm your Riderr assistant. How can I help you today?
//             </div>
//             {messages.map((message, index) => (
//               <div
//                 key={index}
//                 className={`mb-3 ${
//                   message.sender === "user" ? "text-right" : "text-left"
//                 }`}
//               >
//                 <div
//                   className={`inline-block p-2 rounded-lg ${
//                     message.sender === "user"
//                       ? "bg-blue-100 text-blue-900"
//                       : "bg-gray-100 text-gray-900"
//                   }`}
//                 >
//                   {message.text}
//                 </div>
//               </div>
//             ))}
//           </div>
//           <form
//             onSubmit={handleSendMessage}
//             className="p-3 border-t border-gray-200"
//           >
//             <div className="flex">
//               <input
//                 type="text"
//                 value={inputMessage}
//                 onChange={(e) => setInputMessage(e.target.value)}
//                 placeholder="Ask me anything..."
//                 className="flex-1 p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
//               />
//               <button
//                 type="submit"
//                 className="bg-gradient-to-r from-blue-600 to-emerald-500 text-white px-4 rounded-r-lg"
//               >
//                 Send
//               </button>
//             </div>
//           </form>
//         </div>
//       )}

//       {/* Logo */}
//       {/* <div className="absolute top-1 w-full flex flex-row items-center justify-around ">
//         <div>
//           <p className="font-bold text-2xl">Riderr</p>
//         </div>
//         <div>
      
//           <Link>AdminPannel</Link>
//         </div>
//       </div> */}
//       <div className="fixed z-100  top-0 left-0 w-full flex flex-row items-center justify-between px-8 py-3 bg-gradient-to-r from-green-600  to-blue-500 shadow-lg">
//         {/* Logo / Brand */}
//         <div className="flex items-center gap-2">
//           <p className="font-bold font-mono text-2xl text-white tracking-wide drop-shadow-md">
//             Riderr
//           </p>
//         </div>

//         {/* Admin Panel Link */}
//         <div>
//           <Link to={'/admin'} className="text-white font-semibold text-lg bg-white/20 px-4 py-2 rounded-lg hover:bg-white hover:text-purple-600 transition-all duration-300 shadow-md">
//             Admin Panel
//           </Link>
//         </div>
//       </div>

//       {/* Main content container */}
//       <div className="max-w-4xl w-full flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 mt-16">
//         {/* Illustration section */}
//         <div className="flex-1 flex justify-center">
//           <img
//             className="h-64 rounded-xl md:h-96 w-auto transition-transform duration-500 hover:scale-105"
//             src="https://img.freepik.com/free-vector/car-sharing-concept-illustration_114360-15011.jpg"
//             alt="Ride sharing illustration"
//           />
//         </div>

//         {/* Text and buttons section */}
//         <div className="flex-1 flex flex-col items-center text-center">
//           {/* Animated wheel icon */}
//           <div className="mb-6 h-20 w-20 rounded-full animate-[spin_8s_linear_infinite]">
//             <img
//               className="h-20 w-20 rounded-full"
//               src="https://cdn.vectorstock.com/i/500p/12/90/car-rim-and-tire-linear-icon-vector-28511290.jpg"
//               alt="Car wheel"
//             />
//           </div>

//           {/* Headline with gradient text */}
//           <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
//             <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-700">
//               Welcome to Riderr
//             </span>
//           </h2>

//           <p className="text-gray-600 mb-8 text-lg max-w-md">
//             Your journey begins here. Ride with comfort or earn as a captain.
//           </p>

//           {/* Buttons container */}
//           <div className="w-full max-w-xs space-y-4">
//             <Link
//               to="/login"
//               className="block w-full px-6 py-3 rounded-full font-medium
//               bg-gradient-to-r from-blue-600 to-emerald-500 text-white
//               hover:shadow-xl transition-all duration-300
//               hover:from-blue-500 hover:to-emerald-400
//               transform hover:-translate-y-1"
//             >
//               Let's Get Started
//             </Link>

//             <Link
//               to="/captain-login"
//               className="block w-full px-6 py-3 rounded-full font-medium
//               bg-white border-2 
//               text-green-700
//               transition-all duration-600
//               hover:bg-black hover:text-white
//               transform hover:-translate-y-1"
//             >
//               For Captains
//             </Link>
//           </div>
//         </div>
//       </div>

//       {/* Features Section */}
//       <section className="w-full max-w-6xl py-12">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-700">
//             Why Choose Riderr?
//           </span>
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 px-4">
//           {features.map((feature, index) => (
//             <div
//               key={index}
//               className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow"
//             >
//               <div className="text-3xl mb-4">{feature.icon}</div>
//               <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
//               <p className="text-gray-600">{feature.description}</p>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Testimonials Section */}
//       <section className="w-full max-w-6xl py-12 bg-white rounded-xl p-6 shadow-sm">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-700">
//             What Our Users Say
//           </span>
//         </h2>
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
//           {testimonials.map((testimonial, index) => (
//             <div key={index} className="bg-gray-50 p-6 rounded-lg">
//               <div className="text-yellow-400 text-xl mb-2">
//                 {testimonial.rating}
//               </div>
//               <p className="italic mb-4">"{testimonial.content}"</p>
//               <div className="font-semibold">{testimonial.name}</div>
//               <div className="text-sm text-gray-500">{testimonial.role}</div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* FAQ Section */}
//       <section className="w-full max-w-4xl py-12 px-4">
//         <h2 className="text-3xl font-bold text-center mb-12">
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-700">
//             Frequently Asked Questions
//           </span>
//         </h2>
//         <div className="space-y-4">
//           {faqs.map((faq, index) => (
//             <div key={index} className="border-b border-gray-200 pb-4">
//               <details className="group">
//                 <summary className="flex justify-between items-center font-medium cursor-pointer list-none">
//                   <span className="text-lg">{faq.question}</span>
//                   <span className="transition-transform group-open:rotate-180">
//                     ▼
//                   </span>
//                 </summary>
//                 <p className="text-gray-600 mt-2 pl-4">{faq.answer}</p>
//               </details>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* Final CTA */}
//       <div className="w-full max-w-2xl py-12 text-center px-4">
//         <h3 className="text-2xl font-bold mb-6">Ready to ride with us?</h3>
//         <Link
//           to="/login"
//           className="inline-block px-8 py-3 rounded-full font-medium
//           bg-gradient-to-r from-blue-600 to-emerald-500 text-white
//           hover:shadow-xl transition-all duration-300
//           hover:from-blue-500 hover:to-emerald-400
//           transform hover:-translate-y-1"
//         >
//           Join Riderr Today
//         </Link>
//       </div>
//     </div>
//   );
// }

// export default Start;



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

function Start() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Frequent Rider",
      content:
        "Riderr has transformed my daily commute. The drivers are always punctual and the app is so easy to use!",
      rating: "★★★★★",
      avatar: "👩‍💼",
    },
    {
      name: "Michael Chen",
      role: "Business Professional",
      content:
        "As a captain, I've doubled my income while meeting interesting people. The platform is fair and transparent.",
      rating: "★★★★☆",
      avatar: "👨‍💼",
    },
    {
      name: "Emma Rodriguez",
      role: "Student",
      content:
        "Affordable rides with great safety features. I feel secure using Riderr for my late-night study sessions.",
      rating: "★★★★★",
      avatar: "👩‍🎓",
    },
  ];

  const faqs = [
    {
      question: "How do I book a ride?",
      answer:
        "Simply click 'Get Started', sign up or log in, and enter your destination. Our system will match you with the nearest available captain.",
    },
    {
      question: "What safety features does Riderr offer?",
      answer:
        "We offer real-time tracking, emergency contact integration, driver verification, and 24/7 support for all rides.",
    },
    {
      question: "How do I become a captain?",
      answer:
        "Click 'For Captains', complete the registration process, pass our background check, and you'll be ready to start earning.",
    },
    {
      question: "What payment methods are accepted?",
      answer:
        "We accept all major credit cards, digital wallets like Apple Pay and Google Pay, and in some regions, cash payments.",
    },
  ];

  const features = [
    {
      title: "Instant Booking",
      description:
        "Get matched with a ride in seconds with our advanced algorithm.",
      icon: "⚡",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      title: "Real-time Tracking",
      description: "Follow your ride in real-time with live GPS updates.",
      icon: "📍",
      gradient: "from-blue-400 to-cyan-500",
    },
    {
      title: "Secure Payments",
      description: "Cashless transactions with multiple payment options.",
      icon: "💳",
      gradient: "from-green-400 to-emerald-500",
    },
    {
      title: "24/7 Support",
      description:
        "Our customer service team is always available to assist you.",
      icon: "🛟",
      gradient: "from-purple-400 to-pink-500",
    },
    {
      title: "AI Assistant",
      description: "Get instant help from our virtual assistant anytime.",
      icon: "🤖",
      gradient: "from-indigo-400 to-purple-500",
    },
    {
      title: "Smart Pricing",
      description:
        "Dynamic pricing that ensures fair rates for both riders and captains.",
      icon: "📊",
      gradient: "from-red-400 to-pink-500",
    },
  ];

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
      {/* Navigation */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 w-full z-50 bg-white/80 backdrop-blur-md border-b"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-emerald-500 rounded-lg" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-emerald-500 bg-clip-text text-transparent">
                Riderr
              </span>
              <Badge variant="secondary" className="ml-2">
                Beta
              </Badge>
            </div>

            <div className="flex items-center gap-4">
              <Link to="/admin">
                <Button variant="ghost" className="text-sm">
                  Admin Panel
                </Button>
              </Link>
              <Link to="/login">
                <Button className="bg-gradient-to-r from-blue-600 to-emerald-500 hover:from-blue-700 hover:to-emerald-600">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

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

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Why Riders & Captains Love Us
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Built with cutting-edge technology to deliver the best experience
              for everyone
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="h-full border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                  <CardHeader>
                    <div
                      className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} flex items-center justify-center text-white text-xl mb-4`}
                    >
                      {feature.icon}
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              Testimonials
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Trusted by Thousands
            </h2>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {testimonials.map((testimonial, index) => (
              <motion.div key={index} variants={itemVariants}>
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="text-2xl">{testimonial.avatar}</div>
                      <div>
                        <div className="font-semibold">{testimonial.name}</div>
                        <div className="text-sm text-slate-600">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="text-yellow-400 text-lg mb-3">
                      {testimonial.rating}
                    </div>
                    <p className="text-slate-700 italic">
                      "{testimonial.content}"
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <Badge variant="secondary" className="mb-4">
              FAQ
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-slate-600">
              Everything you need to know about Riderr
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="bg-white rounded-lg border shadow-sm"
                >
                  <AccordionTrigger className="px-6 py-4 text-left font-semibold">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4 text-slate-600">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </section>

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

      {/* AI Assistant */}
      <Dialog open={isChatOpen} onOpenChange={setIsChatOpen}>
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
      </Dialog>
    </div>
  );
}

export default Start;




