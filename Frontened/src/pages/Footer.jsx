import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-[#0f0f0f] text-gray-400 py-4 border-t border-gray-800">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between text-sm font-light tracking-wide">
        {/* Left Side */}
        <div className="mb-3 md:mb-0 text-center md:text-left">
          <p className="text-gray-500">
            &copy; {new Date().getFullYear()}{" "}
            <span className="text-white font-medium">Fake News Detector</span>. All rights reserved.
          </p>
        </div>

        {/* Center Links */}
        <div className="flex space-x-5 mb-3 md:mb-0">
          <a href="#" className="hover:text-white transition duration-200 ease-in-out">
            Terms
          </a>
          <a href="#" className="hover:text-white transition duration-200 ease-in-out">
            Privacy
          </a>
          <a href="#" className="hover:text-white transition duration-200 ease-in-out">
            Contact
          </a>
        </div>

        {/* Socials */}
        <div className="flex space-x-4 text-[15px]">
          <a href="#" className="text-gray-500 hover:text-white transition duration-200">
            <FaTwitter />
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition duration-200">
            <FaLinkedin />
          </a>
          <a href="#" className="text-gray-500 hover:text-white transition duration-200">
            <FaGithub />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
