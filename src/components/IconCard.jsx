import React from "react";
import { motion } from "framer-motion";
import { ProfileIcon } from "../assets/Icons/ ProfileIcon";
import { SearchIcon } from "../assets/Icons/SearchIcon";
import { LeftArrowIcon } from "../assets/Icons/LeftArrowIcon";
import { GitHubIcon } from "../assets/Icons/GitHubIcon";
import { CalendarIcon } from "../assets/Icons/CalendarIcon";
import { HomeIcon } from "../assets/Icons/HomeIcon";
import { ExternalLinkIcon } from "../assets/Icons/ExternalLinkIcon";
import { HeartIcon } from "../assets/Icons/ HeartIcon";
import { FireIcon } from "../assets/Icons/FireIcon";
import { PaletteIcon } from "../assets/Icons/PaletteIcon";
import { SparklesIcon } from "../assets/Icons/SparklesIcon";

// Import your new icon components here:
// import { YourIconComponent } from "../assets/Icons/YourIconComponent";

const IconCard = ({ icon }) => {
  const renderIconComponent = () => {
    switch (icon.component) {
      case "ProfileIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <ProfileIcon
              label="Profile"
              width={60}
              height={60}
              stroke="#10b981"
              strokeWidth={2}
              labelSize={18}
              labelColor="#1f2937"
              labelWeight={600}
            />
          </div>
        );

      case "SearchIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <SearchIcon
              width={60}
              height={60}
              stroke="#10b981"
              accentColor="#059669"
              strokeWidth={2}
              glowEffect={true}
            />
          </div>
        );

      case "LeftArrowIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <LeftArrowIcon
              width={60}
              height={60}
              stroke="#10b981"
              strokeWidth={2}
            />
          </div>
        );

      case "GitHubIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <GitHubIcon
              width={60}
              height={60}
              stroke="#10b981"
              fillColor="#ffffff"
              accentColor="#059669"
              strokeWidth={2}
              glowEffect={true}
            />
          </div>
        );

      case "CalendarIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <CalendarIcon
              width={60}
              height={60}
              stroke="#ffffff"
              accentColor="#6366f1"
              fillColor="#6366f110"
              glowEffect={true}
            />
          </div>
        );

      case "HomeIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <HomeIcon
              href="/"
              width={60}
              height={60}
              stroke="#ffffff"
              accentColor="#6366f1"
              fillColor="#6366f120"
              glowEffect={true}
            />
          </div>
        );

      case "ExternalLinkIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <ExternalLinkIcon
              width={60}
              height={60}
              stroke="#ffffff"
              accentColor="#6366f1"
              fillColor="#6366f120"
            />
          </div>                                          
        );

        case " HeartIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <HeartIcon
              width={60}
              height={60}
              stroke="#ffffff"
              accentColor="red"
              fillColor="#6366f120"
            />
          </div>                                          
        );

        case "FireIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <FireIcon
              width={60}
              height={60}
              stroke="#ffffff"
              accentColor="red"
              fillColor="#6366f120"
            />
          </div>                                          
        );

        case "PaletteIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <PaletteIcon
              width={60}
              height={60}
              stroke="#ffffff"
              accentColor="#6366f1"
              fillColor="#6366f120"
            />
          </div>                                          
        );

        case "SparklesIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <SparklesIcon
              width={60}
              height={60}
              stroke="#ffffff"
              accentColor="#6366f1"
              fillColor="#6366f120"
            />
          </div>                                          
        );

      // Add  new icon cases here like this:
      // case "YourIconComponent":
      //   return (
      //     <div className="flex justify-center items-center p-4">
      //       <YourIconComponent
      //         width={60}
      //         height={60}
      //         stroke="#10b981"
      //         strokeWidth={2}
      //       />
      //     </div>
      //   );
      default:
        return <div className="w-15 h-15 bg-gray-200 rounded-lg"></div>;
    }
  };

  return (
    <motion.div
      className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100"
      whileHover={{ y: -5 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Icon Display Area */}
      <div className="p-4 bg-gradient-to-br from-green-50 to-white">
        <div className="flex justify-center items-center">
          {renderIconComponent()}
        </div>
      </div>

      {/* Icon Name */}
      <div className="p-3 text-center">
        <h3 className="text-base font-semibold text-gray-900">{icon.name}</h3>
      </div>
    </motion.div>
  );
};

export default IconCard;
