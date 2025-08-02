import React from "react";
import { motion } from "framer-motion";
import { FireIcon } from "../assets/Icons/FireIcon";
import { PaletteIcon } from "../assets/Icons/PaletteIcon";
import { SparklesIcon } from "../assets/Icons/SparklesIcon";

const HeroSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const scrollToIconCollection = (e) => {
    e.preventDefault();
    e.stopPropagation();

    console.log("Button clicked!"); // Debug log

    const iconCollectionSection = document.getElementById("icon-collection");
    console.log("Found section:", iconCollectionSection); // Debug log

    if (iconCollectionSection) {
      // Get the lenis instance from window
      const lenis = window.lenis;
      console.log("Lenis instance:", lenis); // Debug log

      if (lenis) {
        // Use Lenis smooth scrolling
        lenis.scrollTo(iconCollectionSection, {
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
        console.log("Scrolling with Lenis"); // Debug log
      } else {
        // Fallback to native smooth scrolling
        iconCollectionSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        console.log("Scrolling with native method"); // Debug log
      }
    } else {
      console.log("Section not found!"); // Debug log
    }
  };

  return (
    <section className="relative overflow-hidden py-20 px-4 sm:px-6 lg:px-8">
      {/* Background decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-32 h-32 bg-green-200 rounded-full opacity-20"
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        <motion.div
          className="absolute top-40 right-20 w-24 h-24 bg-green-300 rounded-full opacity-15"
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="text-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Main heading */}
          <motion.h1
            className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 font-dinta"
            variants={itemVariants}
          >
            <span className="bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
              Custom Icons
            </span>
            <br />
            <span className="text-gray-700">Collection</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed font-dinta"
            variants={itemVariants}
          >
            Discover handcrafted, customizable icons that bring your designs to
            life. Each icon is crafted with attention to detail and ready for
            any project.
          </motion.p>

          {/* Feature highlights */}
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-8 mb-12"
            variants={itemVariants}
          >
            <div className="flex items-center gap-3 text-green-700 font-dinta">
              <PaletteIcon />
              <span className="font-medium">Customizable</span>
            </div>
            <div className="flex items-center gap-3 text-green-700 font-dinta">
              <SparklesIcon/>
              <span className="font-medium">Handcrafted</span>
            </div>
            <div className="flex items-center gap-3 text-green-700 font-dinta">
              <FireIcon/>
              <span className="font-medium">Ready to Use</span>
            </div>
          </motion.div>

          {/* CTA Button */}
          <motion.button
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl font-dinta cursor-pointer relative z-20"
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToIconCollection}
            type="button"
          >
            Explore Icons
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
