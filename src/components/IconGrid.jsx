import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import IconCard from "./IconCard";
import { SearchIcon } from "../assets/Icons/SearchIcon";

const IconGrid = ({ filteredIcons, searchTerm, setSearchTerm }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <>
      {/* Icons Grid */}
      {filteredIcons.length > 0 && (
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 max-w-7xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredIcons.map((icon) => (
              <motion.div key={icon.id} variants={itemVariants}>
                <IconCard icon={icon} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Empty State */}
      {filteredIcons.length === 0 && (
        <motion.div
          className="text-center py-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="max-w-md mx-auto">
            {/* Search Icon */}
            <div className="flex justify-center mb-6">
              <SearchIcon
                width={80}
                height={80}
                stroke="#9ca3af"
                accentColor="#10b981"
                strokeWidth={2}
                glowEffect={false}
              />
            </div>

            {/* Message */}
            <h3 className="text-2xl font-semibold text-gray-700 mb-3 font-dinta">
              No icons found
            </h3>
            <p className="text-gray-500 mb-6">
              {searchTerm
                ? `No icons match "${searchTerm}"`
                : "Try searching for something else"}
            </p>

            {/* Available Icons Hint */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-2">Available icons:</p>
              <div className="flex flex-wrap justify-center gap-2">
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Profile
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Search
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Arrow
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  GitHub
                </span>
                <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Calendar
                </span>
              </div>
            </div>

            {/* Clear Search Button */}
            <button
              onClick={() => setSearchTerm("")}
              className="bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition-colors"
            >
              Clear Search
            </button>
          </div>
        </motion.div>
      )}
    </>
  );
};

export default IconGrid;
