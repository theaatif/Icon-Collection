import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const SearchIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#6366f1",
  label = null,
  labelSize = 14,
  labelColor = null,
  labelWeight = 500,
  glowEffect = true,
  // Link props
  href = null,
  target = "_blank",
  rel = "noopener noreferrer",
  onClick = null,
  LinkComponent = null,
  linkProps = {},
  ...props
}) => {
  const controls = useAnimation();
  const containerControls = useAnimation();
  const scanControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    scanControls.start("scanning");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    scanControls.start("idle");
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  // Content component that contains the icon and animations
  const IconContent = () => (
    <motion.div
      animate={containerControls}
      variants={{
        normal: { 
          scale: 1, 
          rotate: 0,
          filter: glowEffect ? "drop-shadow(0 0 0px rgba(99, 102, 241, 0))" : "none"
        },
        hover: { 
          scale: 1.05, 
          rotate: 2,
          filter: glowEffect ? "drop-shadow(0 0 8px rgba(99, 102, 241, 0.3))" : "none"
        }
      }}
      transition={{ 
        duration: 0.2, 
        ease: "easeOut"
      }}
      style={{
        cursor: "pointer",
        userSelect: "none",
        padding: "8px",
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: "8px",
        textDecoration: "none",
        color: "inherit"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={width}
        height={height}
        viewBox="0 0 24 24"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        {...props}
      >
        <defs>
          {/* Gradient for modern stroke effect */}
          <linearGradient id="searchGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stroke} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={stroke} />
          </linearGradient>
          
          {/* Animated gradient for scanning effect */}
          <linearGradient id="scanGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0;100 0;-100 0"
              dur="2s"
              repeatCount="indefinite"
            />
          </linearGradient>
        </defs>

        {/* Main search circle with modern gradient */}
        <motion.circle
          cx="11"
          cy="11"
          r="8"
          stroke="url(#searchGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray="50.26"
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(0),
            ease: "easeInOut",
          }}
          variants={{
            normal: {
              strokeDashoffset: 0,
              opacity: 1,
              scale: 1,
              transition: { delay: 0 },
            },
            animate: {
              strokeDashoffset: [50.26, 0],
              opacity: [0, 1],
              scale: [0.8, 1],
            },
          }}
        />

        {/* Search handle with enhanced animation */}
        <motion.path
          d="M21 21l-4.35-4.35"
          stroke="url(#searchGradient)"
          strokeWidth={strokeWidth + 0.5}
          strokeDasharray="6.1"
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(1),
            ease: "easeInOut",
          }}
          variants={{
            normal: {
              strokeDashoffset: 0,
              opacity: 1,
              transition: { delay: 0 },
            },
            animate: {
              strokeDashoffset: [6.1, 0],
              opacity: [0, 1],
            },
          }}
        />

        {/* Animated scanning overlay */}
        <motion.circle
          cx="11"
          cy="11"
          r="8"
          fill="none"
          stroke="url(#scanGradient)"
          strokeWidth={strokeWidth * 0.5}
          animate={scanControls}
          variants={{
            idle: { opacity: 0 },
            scanning: { 
              opacity: [0, 0.6, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Modern crosshair with pulsing animation */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(2),
          }}
          variants={{
            normal: {
              opacity: 1,
              scale: 1,
              transition: { delay: 0 },
            },
            animate: {
              opacity: [0, 1],
              scale: [0.5, 1],
            },
          }}
        >
          <motion.path
            d="M9 11h4"
            stroke={accentColor}
            strokeWidth={strokeWidth * 0.8}
            animate={scanControls}
            variants={{
              idle: { opacity: 0.7 },
              scanning: { 
                opacity: [0.7, 1, 0.7],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M11 9v4"
            stroke={accentColor}
            strokeWidth={strokeWidth * 0.8}
            animate={scanControls}
            variants={{
              idle: { opacity: 0.7 },
              scanning: { 
                opacity: [0.7, 1, 0.7],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }
              }
            }}
          />
        </motion.g>

        {/* Corner accent dots for modern flair */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(3),
          }}
          variants={{
            normal: {
              opacity: 1,
              scale: 1,
              transition: { delay: 0 },
            },
            animate: {
              opacity: [0, 1],
              scale: [0, 1],
            },
          }}
        >
          <motion.circle
            cx="6"
            cy="6"
            r="1"
            fill={accentColor}
            animate={scanControls}
            variants={{
              idle: { opacity: 0.4 },
              scanning: { 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="18"
            cy="6"
            r="1"
            fill={accentColor}
            animate={scanControls}
            variants={{
              idle: { opacity: 0.4 },
              scanning: { 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }
            }}
          />
        </motion.g>

        {/* Floating search particles */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(4),
          }}
          variants={{
            normal: {
              opacity: 1,
              transition: { delay: 0 },
            },
            animate: {
              opacity: [0, 1],
            },
          }}
        >
          <motion.circle
            cx="16"
            cy="8"
            r="0.5"
            fill={stroke}
            animate={scanControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.3 
              },
              scanning: { 
                y: [-2, 2, -2],
                opacity: [0.3, 0.8, 0.3],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="6"
            cy="14"
            r="0.5"
            fill={stroke}
            animate={scanControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.3 
              },
              scanning: { 
                y: [2, -2, 2],
                opacity: [0.3, 0.8, 0.3],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }
              }
            }}
          />
        </motion.g>
      </svg>
      
      {/* Enhanced label with modern styling */}
      {label && (
        <motion.span
          animate={containerControls}
          variants={{
            normal: { 
              opacity: 0.9,
              x: 0
            },
            hover: { 
              opacity: 1,
              x: 2
            }
          }}
          style={{
            color: labelColor || stroke,
            fontSize: labelSize,
            fontWeight: labelWeight,
            userSelect: "none",
            textShadow: glowEffect ? `0 0 4px ${accentColor}20` : "none",
            transition: "text-shadow 0.2s ease"
          }}
        >
          {label}
        </motion.span>
      )}
    </motion.div>
  );

  // Conditional rendering based on link type
  if (LinkComponent) {
    // Use custom Link component (e.g., React Router Link)
    return (
      <LinkComponent {...linkProps}>
        <IconContent />
      </LinkComponent>
    );
  } else if (href) {
    // Use standard anchor tag for external links
    return (
      <a
        href={href}
        target={target}
        rel={rel}
        style={{ 
          textDecoration: "none", 
          color: "inherit",
          display: "inline-block"
        }}
      >
        <IconContent />
      </a>
    );
  } else {
    // No link, just the icon
    return <IconContent />;
  }
};

export { SearchIcon };

// USAGE EXAMPLES:

{/* Search page link */}
{/* <SearchIcon 
  href="/search"
  target="_self"
  label="Search"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#6366f1"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* Global search with custom action */}
{/* <SearchIcon 
  onClick={(e) => {
    e.preventDefault();
    // Open search modal or trigger search
    openSearchModal();
  }}
  label="Find"
  width={28}
  height={28}
  stroke="#10b981"
  accentColor="#059669"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#065f46"
  glowEffect={false}
/> */}

{/* React Router search link */}
{/* import { Link } from 'react-router-dom';

<SearchIcon 
  LinkComponent={Link}
  linkProps={{ to: "/search?category=all" }}
  label="Discover"
  width={36}
  height={36}
  stroke="#e5e7eb"
  accentColor="#f59e0b"
  strokeWidth={2}
  labelSize={20}
  labelColor="#f3f4f6"
  labelWeight={700}
  glowEffect={true}
/> */}

{/* Next.js search page */}
{/* import Link from 'next/link';

<SearchIcon 
  LinkComponent={Link}
  linkProps={{ href: "/explore" }}
  label="Explore"
  width={24}
  height={24}
  stroke="#8b5cf6"
  accentColor="#a78bfa"
  strokeWidth={1.8}
  labelSize={14}
  labelColor="#6b21a8"
  glowEffect={true}
/> */}

{/* External search engine */}
{/* <SearchIcon 
  href="https://google.com/search?q=example"
  target="_blank"
  rel="noopener noreferrer"
  label="Google Search"
  width={30}
  height={30}
  stroke="#1f2937"
  accentColor="#3b82f6"
  strokeWidth={2.2}
  labelSize={16}
  labelColor="#374151"
  glowEffect={true}
/> */}

{/* Search with keyboard shortcut trigger */}
{/* <SearchIcon 
  onClick={(e) => {
    e.preventDefault();
    // Trigger search with keyboard shortcut
    document.dispatchEvent(new KeyboardEvent('keydown', {
      key: '/',
      ctrlKey: true
    }));
  }}
  label="Quick Search (Ctrl+/)"
  width={20}
  height={20}
  stroke="#6b7280"
  accentColor="#10b981"
  strokeWidth={1.5}
  labelSize={12}
  labelColor="#4b5563"
  glowEffect={false}
/> */}
