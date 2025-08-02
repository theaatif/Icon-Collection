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
import { ShoppingCartIcon } from "../assets/Icons/ShoppingCartIcon";
import { NotificationIcon } from "../assets/Icons/NotificationIcon";
import { XIcon } from "../assets/Icons/XIcon";
import { InstagramIcon } from "../assets/Icons/InstagramIcon";
import { FacebookIcon } from "../assets/Icons/FacebookIcon";
import { WhatsAppIcon } from "../assets/Icons/WhatsAppIcon";
import { LinkedInIcon } from "../assets/Icons/LinkedInIcon";

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

      case "HeartIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <HeartIcon
              width={60}
              height={60}
              stroke="#10b981"
              accentColor="#059669"
              fillColor="#10b98120"
              strokeWidth={2}
              glowEffect={true}
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
              accentColor="#8b5cf6"
              fillColor="#8b5cf620"
              glowEffect={true}
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
              accentColor="#8b5cf6"
              fillColor="#8b5cf620"
              glowEffect={true}
            />
          </div>
        );

      case "ShoppingCartIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <ShoppingCartIcon
              width={60}
              height={60}
              stroke="#ffffff"
              accentColor="#8b5cf6"
              fillColor="#8b5cf620"
              glowEffect={true}
            />
          </div>
        );

      case "NotificationIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <NotificationIcon
              width={60}
              height={60}
              stroke="#ffffff"
              accentColor="#8b5cf6"
              fillColor="#8b5cf620"
              glowEffect={true}
            />
          </div>
        );

      case "XIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <XIcon
              label="Follow"
              labelSize={18}
              labelColor="#1f2937"
              labelWeight={600}
              width={60}
              height={60}
              stroke="#10b981"
              accentColor="black"
              fillColor="black"
              strokeWidth={2}
              glowEffect={true}
            />
          </div>
        );

      case "InstagramIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <InstagramIcon
              label="Follow"
              labelSize={18}
              labelColor="#1f2937"
              labelWeight={600}
              width={60}
              height={60}
              stroke="#10b981"
              accentColor="black"
              fillColor="black"
              strokeWidth={2}
              glowEffect={true}
            />
          </div>
        );

      case "FacebookIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <FacebookIcon
              width={60}
              height={60}
              stroke="#ffffff"
              accentColor="#1877F2"
              fillColor="#1877F220"
              labelSize={18}
              labelColor="#1f2937"
              labelWeight={600}
              glowEffect={true}
            />
          </div>
        );

      case "WhatsAppIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <WhatsAppIcon
              width={60}
              height={60}
              stroke="#ffffff"
              accentColor="#25D366"
              fillColor="#25D36620"
              glowEffect={false}
            />
          </div>
        );

      case "LinkedInIcon":
        return (
          <div className="flex justify-center items-center p-4">
            <LinkedInIcon
              width={60}
              height={60}
              stroke="#ffffff"
              accentColor="#0077B5"
              fillColor="#0077B5"
              connectionCount={250}
              showConnectionBadge={true}
              animationVariant="network"
              springConfig={{ type: "spring", damping: 10, stiffness: 150 }}
              glowEffect={true}
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
