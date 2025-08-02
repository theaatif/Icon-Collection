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
      name: " Heart Icon",
      description: "",
      category: " Heart Icon",
      component: " HeartIcon",
    },

    {
      id: 9,
      name: "Fire Icon",
      description: "",
      category: " Fire Icon",
      component: "FireIcon",
    },

    {
      id: 10,
      name: "Palette Icon",
      description: "",
      category: "Palette Icon",
      component: "PaletteIcon",
    },

    {
      id: 11,
      name: "Sparkles Icon",
      description: "",
      category: "SparklesI con",
      component: "SparklesIcon",
    },

    // Add  new icons here like this:
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
      </div>
    </section>
  );
};

export default IconGallery;
