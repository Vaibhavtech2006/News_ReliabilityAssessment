import React from "react";
import { useNavigate } from "react-router-dom";
import p12Image from "./p12.jpg"; // Adjust the path based on your folder structure

const Home = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    // Navigate to the Analyze page
    navigate("/analyze");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      {/* Hero Section */}
      <div className="flex-grow relative bg-gray-800 text-white py-20">
        <div className="container mx-auto flex flex-col items-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Fake News Detector</h1>
          <p className="text-lg mb-6 text-center">
            Analyze news content or URLs to determine if they are real or fake.
          </p>
          <img
            src={p12Image} // Use the imported image
            alt="Fake News Detection"
            className="mb-6 rounded-md shadow-lg"
          />
          <button
            onClick={handleGetStarted}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-center md:text-left mb-4 md:mb-0">
            © 2024 Fake News Detector. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a
              href="#"
              className="text-gray-300 hover:text-white transition"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-300 hover:text-white transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
