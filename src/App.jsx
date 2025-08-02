import React, { useState } from "react";
import { motion } from "framer-motion";
import HeroSection from "./components/HeroSection";
import IconGallery from "./components/IconGallery";
import Footer from "./components/Footer";
import "./App.css";
import "./assets/fonts.css";
import Lenis from 'lenis'

function App() {
  const [searchTerm, setSearchTerm] = useState("");

  //lenis for smooth scroll
const lenis = new Lenis();

// Make lenis available globally
window.lenis = lenis;

// Use requestAnimationFrame to continuously update the scroll
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}

requestAnimationFrame(raf);

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-green-100 honeycomb-bg">
      <div className="relative z-10">
        <HeroSection />
        <IconGallery searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Footer />
      </div>
    </div>
  );
}

export default App;
