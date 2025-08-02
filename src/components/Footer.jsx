import React from "react";
import { motion } from "framer-motion";
import { GitHubIcon } from "../assets/Icons/GitHubIcon";
import { HeartIcon } from "../assets/Icons/ HeartIcon";

const Footer = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
      },
    },
  };

  return (
    <footer className="relative bg-gradient-to-br from-green-50 via-white to-green-100 honeycomb-bg py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Green gradient overlay - starts from left and fades to right */}
      <div className="absolute inset-0 bg-gradient-to-r from-green-400/15 via-green-300/8 to-transparent"></div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Brand Section */}
          <motion.div
            variants={itemVariants}
            className="text-center md:text-left"
          >
            <h3 className="text-2xl font-bold mb-4 font-dinta text-gray-900">
              Custom Icons
            </h3>
            <p className="text-gray-600 mb-4">
              Handcrafted, animated icons for modern web applications. Built
              with React and Framer Motion for smooth interactions.
            </p>
          </motion.div>

          {/* Right Side - How to Use & Connect */}
          <motion.div
            variants={itemVariants}
            className="text-center md:text-right space-y-6"
          >
            {/* How to Use Section */}
            <div>
              <h4 className="text-lg font-semibold mb-3 font-dinta text-gray-900">
                How to Use?
              </h4>
              <p className="text-gray-600 mb-3 text-sm">
                Learn how to integrate these icons into your projects.
              </p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-block"
              >
                <GitHubIcon
                  href="https://github.com/theaatif/Icon-Collection"
                  target="_blank"
                  rel="noopener noreferrer"
                  label="Visit GitHub"
                  width={24}
                  height={24}
                  stroke="#10b981"
                  fillColor="#ffffff"
                  accentColor="#059669"
                  labelSize={12}
                  labelColor="#374151"
                  labelWeight={500}
                  glowEffect={true}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-green-300 mt-8 pt-8 text-center"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <p className="text-gray-500 text-sm">
            © 2025 Custom Icons Collection. Built with
            <span>
              <HeartIcon />
            </span>
            using React & Framer Motion.
          </p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
