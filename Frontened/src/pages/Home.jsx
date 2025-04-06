import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Card, CardContent } from "../components/ui/card";
import { motion } from "framer-motion";
import { Boxes } from "../components/ui/background-boxes";
import FeaturesSection from "../pages/Featuresection"; // Adjust the path as needed

import { FollowerPointerCard } from "../components/ui/following-pointer";

const Home = () => {
  const navigate = useNavigate();
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") {
      setIsDarkMode(true);
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newMode);
  };

  const handleGetStarted = () => {
    navigate("/analyze");
  };

  const checkoutHandler = async (amount) => {
    try {
      const {
        data: { key },
      } = await axios.get("http://localhost:4000/api/getkey");

      const {
        data: { order },
      } = await axios.post("http://localhost:4000/api/checkout", { amount });

      const options = {
        key,
        amount: order.amount,
        currency: "INR",
        name: "Vaibhav",
        description: "RazorPay Subscription",
        image: "https://avatars.githubusercontent.com/u/145020241?v=4",
        order_id: order.id,
        callback_url: "http://localhost:4000/api/paymentverification",
        prefill: {
          name: "Vaibhav",
          email: "vaibhavkhandelwal@example.com",
          contact: "7737821875",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#121212",
        },
      };

      const razor = new window.Razorpay(options);
      razor.open();
    } catch (error) {
      console.error("Checkout Error:", error.message);
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col transition-all duration-500 ${
        isDarkMode ? "bg-gray-900 text-gray-100" : "bg-white text-gray-800"
      }`}
    >
      <FollowerPointerCard title="User">
      {/* Dark Mode Toggle */}
      <div className="absolute top-16 right-6 z-50">
        <button
          onClick={toggleDarkMode}
          className="bg-black text-white px-6 py-3 rounded-full shadow-lg hover:bg-black-500 transition duration-300 transform hover:scale-110"
        >
          {isDarkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      {/* Hero Section */}
      <div className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 z-0 pointer-events-none">
          <Boxes className="w-full h-full opacity-30" />
        </div>

        <div className="relative z-10 container mx-auto text-center">
          <h1 className="text-4xl font-bold mb-6 text-white">
            Welcome to Fake News Detector
          </h1>
          <p className="text-lg mb-8 text-black-200">
            Leverage advanced AI to analyze news content or URLs to assess their authenticity.
          </p>

          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="mx-auto max-w-lg relative z-10"
          >
            <Card className="shadow-xl border-4 border-white">
              <CardContent className="p-8 text-center">
                <p className="text-xl font-semibold text-gray-800">
                   Detecting Fake News in Real Time...
                </p>
                <p className="text-muted-foreground mt-2 text-gray-600">
                  AI + NLP + Fact-Checking = 🔥
                </p>
              </CardContent>
            </Card>
          </motion.div>
          <Boxes className="w-full h-full opacity-30" />

          <button
            onClick={handleGetStarted}
            
            className="bg-white text-teal-600 text-lg px-10 py-4 rounded-full shadow-xl hover:bg-teal-100 transition-transform duration-300 transform hover:scale-105 mt-8"
          >
             
            Get Started
          </button>
        </div>
      </div>

      {/* Features Section */}
      {/* Features Section */}
      <div className="py-16 bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300">
      <FeaturesSection />

      </div>

    

      {/* Testimonials */}
      <div className="py-16 bg-muted">
        <div className="container mx-auto text-center text-secondary-foreground">
          <h2 className="text-3xl font-semibold mb-8">What Users Are Saying</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              [
                "This tool is incredibly accurate! It has helped me avoid spreading fake news.",
                "John D.",
              ],
              [
                "Essential for any journalist or content creator. A must-have tool.",
                "Sarah L.",
              ],
              [
                "Effortless to use and highly reliable. I highly recommend it!",
                "Mark P.",
              ],
            ].map(([quote, name], i) => (
              <div
                key={i}
                className="p-6 bg-card rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out"
              >
                <p className="text-gray-700 italic mb-4">"{quote}"</p>
                <p className="font-semibold text-primary">- {name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="py-20 px-4 bg-gradient-to-r from-teal-800 via-teal-700 to-teal-800 relative overflow-hidden">
  {/* Decorative background sparkles or shapes (optional) */}
  <div className="absolute inset-0 pointer-events-none opacity-20 blur-sm">
    <div className="bg-white w-40 h-40 rounded-full absolute -top-10 -left-10 animate-pulse" />
    <div className="bg-teal-300 w-32 h-32 rounded-full absolute bottom-0 right-0 animate-ping" />
  </div>


  {/* Optional decorative blur circles */}
  <div className="absolute inset-0 pointer-events-none opacity-20 blur-lg">
    <div className="bg-white/30 w-60 h-60 rounded-full absolute -top-10 -left-10 animate-pulse" />
    <div className="bg-indigo-400/30 w-40 h-40 rounded-full absolute bottom-0 right-0 animate-ping" />
  </div>

  <div className="py-20 px-4 bg-white text-gray-900">
  <div className="container mx-auto text-center max-w-3xl">
    <h2 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight tracking-tight">
      Start Detecting Fake News Today
    </h2>
    <p className="text-lg md:text-xl mb-8 text-gray-600">
      Use AI-powered tools to verify information and stay ahead of misinformation.
    </p>
    <button
      onClick={handleGetStarted}
      className="inline-block bg-gray-900 text-white font-semibold text-lg md:text-xl px-8 py-4 md:px-12 md:py-5 rounded-full shadow-md hover:bg-gray-800 hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1"
    >
       Get Started Now
    </button>
  </div>
</div>



</div>

      {/* Payment CTA */}
      <div className="text-center my-14">
  <button
    onClick={() => checkoutHandler(5000)}
    className="px-8 py-4 text-lg font-semibold text-white bg-gray-900 rounded-full shadow-md hover:bg-black transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-xl dark:bg-white dark:text-gray-900 dark:hover:bg-gray-100"
  >
    💼 Subscribe Now
  </button>
</div>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-400 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">
            © 2024 Fake News Detector. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition duration-300">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition duration-300">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition duration-300">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
      </FollowerPointerCard>
    </div>
  );
};

export default Home;
