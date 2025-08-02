import React from "react";
import { motion } from "framer-motion";
import { Filter } from "lucide-react";
import IconGrid from "./IconGrid";
import IconCard from "./IconCard";
import { SearchIcon } from "../assets/Icons/SearchIcon";

const IconGallery = ({ searchTerm, setSearchTerm }) => {
  // Sample icon data - you can expand this with more icons
  const icons = [
    {
      id: 1,
      name: "Profile Icon",
      description: "A customizable profile icon with animated elements",
      category: "User Interface",
      component: "ProfileIcon",
    },
    {
      id: 2,
      name: "Search Icon",
      description: "An animated search icon with scanning effects",
      category: "Navigation",
      component: "SearchIcon",
    },
    {
      id: 3,
      name: "Left Arrow Icon",
      description: "A directional arrow icon with smooth animations",
      category: "Navigation",
      component: "LeftArrowIcon",
    },
    {
      id: 4,
      name: "GitHub Icon",
      description: "",
      category: "GitHub Icon",
      component: "GitHubIcon",
    },

    {
      id: 5,
      name: "Calendar Icon",
      description: "",
      category: "Calendar Icon",
      component: "CalendarIcon",
    },

    {
      id: 6,
      name: "Home Icon",
      description: "",
      category: "Home Icon",
      component: "HomeIcon",
    },

    {
      id: 7,
      name: "ExternalLink Icon",
      description: "",
      category: "ExternalLink Icon",
      component: "ExternalLinkIcon",
    },
    {
      id: 8,
      name: "Heart Icon",
      description: "A beautiful animated heart icon with pulsing effects",
      category: "Emotions",
      component: "HeartIcon",
    },

    {
      id: 9,
      name: "Fire Icon",
      description: "A dynamic fire icon with burning animations",
      category: "Emotions",
      component: "FireIcon",
    },
    {
      id: 10,
      name: "Palette Icon",
      description: "A creative palette icon with color mixing effects",
      category: "Design",
      component: "PaletteIcon",
    },

    {
      id: 11,
      name: "Sparkles Icon",
      description: "A magical sparkles icon with glitter effects",
      category: "Design",
      component: "SparklesIcon",
    },

    {
      id: 12,
      name: "Shopping Cart Icon",
      description: "A functional shopping cart icon for e-commerce",
      category: "Commerce",
      component: "ShoppingCartIcon",
    },

    {
      id: 13,
      name: "Notification Icon",
      description: "A notification bell icon with alert animations",
      category: "Interface",
      component: "NotificationIcon",
    },

    {
      id: 14,
      name: "X Icon",
      description: "A social media X (Twitter) icon",
      category: "Social",
      component: "XIcon",
    },
    {
      id: 15,
      name: "Instagram Icon",
      description: "A social media Instagram icon",
      category: "Social",
      component: "InstagramIcon",
    },
    {
      id: 16,
      name: "Facebook Icon",
      description: "A social media Facebook icon",
      category: "Social",
      component: "FacebookIcon",
    },
    {
      id: 17,
      name: "WhatsApp Icon",
      description: "A social media WhatsApp Icon",
      category: "Social",
      component: "WhatsAppIcon",
    },
    {
      id: 18,
      name: "LinkedIn Icon",
      description: "A social media LinkedIn Icon",
      category: "Social",
      component: "LinkedInIcon",
    },
    // Add your new icons here like this:
    // {
    //   id: 2,
    //   name: "Your Icon Name",
    //   description: "Description of your icon",
    //   category: "Category",
    //   component: "YourIconComponent",
    //   customizable: true,
    //   tags: ["tag1", "tag2", "tag3"],
    // },
  ];

  const filteredIcons = icons.filter(
    (icon) =>
      icon.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      icon.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="icon-collection" className="py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 font-dinta">
            Icon Collection
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto font-dinta">
            Each icon is designed to be easily integrated into your projects.
            Customize colors, sizes, and animations to match your design needs.
          </p>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="max-w-md mx-auto">
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <SearchIcon
                  width={20}
                  height={20}
                  stroke="#9ca3af"
                  accentColor="#10b981"
                  strokeWidth={2}
                  glowEffect={false}
                />
              </div>
              <input
                type="text"
                placeholder="Search icons..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-full focus:ring-2 focus:ring-green-500 focus:border-transparent bg-white shadow-sm"
              />
            </div>
          </div>
        </motion.div>

        {/* Customization Info */}
        <motion.div
          className="bg-green-50 border border-green-200 rounded-2xl p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-green-800 mb-3">
              Easy Integration
            </h3>
            <p className="text-green-700 mb-4">
              All icons are built as React components and can be easily added to
              any UI element. Simply import and customize with props for colors,
              sizes, and animations.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-green-600">
              <span className="bg-green-100 px-3 py-1 rounded-full">
                Customizable Colors
              </span>
              <span className="bg-green-100 px-3 py-1 rounded-full">
                Adjustable Sizes
              </span>
              <span className="bg-green-100 px-3 py-1 rounded-full">
                Smooth Animations
              </span>
              <span className="bg-green-100 px-3 py-1 rounded-full">
                React Components
              </span>
            </div>
          </div>
        </motion.div>

        {/* Icons Grid */}
        <IconGrid
          filteredIcons={filteredIcons}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* New Icon Coming Soon Section */}
        <motion.div
          className="mt-20 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="max-w-2xl mx-auto">
            {/* Animated placeholder icon */}
            <motion.div
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.7, 1, 0.7],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <motion.div
                className="w-12 h-12 bg-green-300 rounded-lg"
                animate={{
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </motion.div>

            {/* Coming Soon Text */}
            <h3 className="text-3xl font-bold text-gray-800 mb-4 font-dinta">
              New Icons Coming Soon...
            </h3>
            <p className="text-lg text-gray-600 mb-6 font-dinta">
              We're constantly crafting new animated icons to expand your
              collection. Stay tuned for more handcrafted components!
            </p>

            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <div
                className="w-2 h-2 bg-green-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.2s" }}
              ></div>
              <div
                className="w-2 h-2 bg-green-300 rounded-full animate-pulse"
                style={{ animationDelay: "0.4s" }}
              ></div>
            </div>

            {/* Subscribe or follow hint */}
            <div className="bg-white border border-green-200 rounded-xl p-4 shadow-sm">
              <p className="text-sm text-gray-600">
                💡 <span className="font-medium text-green-700">Tip:</span>{" "}
                Follow our GitHub repository to get notified when new icons are
                added!
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default IconGallery;
