import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const GitHubIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#6366f1",
  fillColor = "#ffffff",
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
  LinkComponent = null, // For React Router Link or custom link components
  linkProps = {}, // Additional props to pass to LinkComponent
  ...props
}) => {
  const controls = useAnimation();
  const containerControls = useAnimation();
  const pulseControls = useAnimation();
  const eyeControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    pulseControls.start("pulsing");
    eyeControls.start("blinking");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    pulseControls.start("idle");
    eyeControls.start("normal");
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
          rotate: -2,
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
        textDecoration: "none", // Remove default link underline
        color: "inherit" // Inherit color to avoid link color override
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
          {/* Gradient for modern fill effect */}
          <linearGradient id="githubGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fillColor} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={fillColor} />
          </linearGradient>
          
          {/* Animated gradient for pulsing effect */}
          <radialGradient id="pulseGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Code particle gradient */}
          <linearGradient id="codeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Pulsing background circle */}
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="url(#pulseGradient)"
          animate={pulseControls}
          variants={{
            idle: { 
              scale: 0.8,
              opacity: 0 
            },
            pulsing: { 
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 0.4, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Main GitHub icon path with staggered animation */}
        <motion.path
          d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
          stroke="url(#githubGradient)"
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray="120"
          animate={controls}
          transition={{
            duration: DURATION * 2,
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
              strokeDashoffset: [120, 0],
              opacity: [0, 1],
              scale: [0.8, 1],
            },
          }}
        />

        {/* Animated cat ears/horns */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(1),
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
            d="M7 3l1 2"
            stroke={accentColor}
            strokeWidth={strokeWidth + 0.5}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.7 },
              pulsing: { 
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.1, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M17 3l-1 2"
            stroke={accentColor}
            strokeWidth={strokeWidth + 0.5}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.7 },
              pulsing: { 
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.1, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }
            }}
          />
        </motion.g>

        {/* Animated eyes */}
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
              scale: [0, 1],
            },
          }}
        >
          <motion.circle
            cx="9"
            cy="9"
            r="1"
            fill={accentColor}
            animate={eyeControls}
            variants={{
              normal: { scaleY: 1 },
              blinking: { 
                scaleY: [1, 0.1, 1],
                transition: {
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 2
                }
              }
            }}
          />
          <motion.circle
            cx="15"
            cy="9"
            r="1"
            fill={accentColor}
            animate={eyeControls}
            variants={{
              normal: { scaleY: 1 },
              blinking: { 
                scaleY: [1, 0.1, 1],
                transition: {
                  duration: 0.3,
                  repeat: Infinity,
                  repeatDelay: 2,
                  delay: 0.1
                }
              }
            }}
          />
        </motion.g>

        {/* Floating code symbols */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(3),
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
          <motion.text
            x="3"
            y="8"
            fontSize="3"
            fill={stroke}
            opacity="0.4"
            animate={pulseControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.4 
              },
              pulsing: { 
                y: [-1, 1, -1],
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          >
            &lt;/&gt;
          </motion.text>
          <motion.text
            x="18"
            y="16"
            fontSize="2"
            fill={stroke}
            opacity="0.4"
            animate={pulseControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.4 
              },
              pulsing: { 
                y: [1, -1, 1],
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }
              }
            }}
          >
            {}
          </motion.text>
        </motion.g>

        {/* Branch indicators */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(4),
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
          <motion.circle
            cx="4"
            cy="20"
            r="0.8"
            fill={accentColor}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.5 },
              pulsing: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="20"
            cy="4"
            r="0.8"
            fill={accentColor}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.5 },
              pulsing: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }
            }}
          />
        </motion.g>

        {/* Commit dots trail */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(5),
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
            cx="6"
            cy="12"
            r="0.3"
            fill={stroke}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.3 },
              pulsing: { 
                opacity: [0.3, 0.8, 0.3],
                x: [0, 2, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="8"
            cy="14"
            r="0.3"
            fill={stroke}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.3 },
              pulsing: { 
                opacity: [0.3, 0.8, 0.3],
                x: [0, 2, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }
            }}
          />
          <motion.circle
            cx="18"
            cy="8"
            r="0.3"
            fill={stroke}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.3 },
              pulsing: { 
                opacity: [0.3, 0.8, 0.3],
                x: [0, -2, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
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

export { GitHubIcon };

// USAGE EXAMPLES:

{/* External link to GitHub */}
{/* <GitHubIcon 
  href="https://github.com/username"
  target="_blank"
  rel="noopener noreferrer"
  label="GitHub Profile"
  width={32}
  height={32}
  stroke="#ffffff"
  fillColor="#ffffff"
  accentColor="#6366f1"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* React Router Link */}
{/* import { Link } from 'react-router-dom';

<GitHubIcon 
  LinkComponent={Link}
  linkProps={{ to: "/profile" }}
  label="Profile"
  width={28}
  height={28}
  stroke="#e5e7eb"
  fillColor="#f3f4f6"
  accentColor="#10b981"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#065f46"
  glowEffect={true}
/> */}

{/* Next.js Link */}
{/* import Link from 'next/link';

<GitHubIcon 
  LinkComponent={Link}
  linkProps={{ href: "/dashboard" }}
  label="Dashboard"
  width={36}
  height={36}
  stroke="#1f2937"
  fillColor="#374151"
  accentColor="#f59e0b"
  strokeWidth={2}
  labelSize={20}
  labelColor="#f3f4f6"
  labelWeight={700}
  glowEffect={true}
/> */}

{/* Custom onClick handler */}
{/* <GitHubIcon 
  onClick={(e) => {
    e.preventDefault();
    // Custom logic here
    window.open('https://github.com', '_blank');
  }}
  label="Custom Action"
  width={28}
  height={28}
  stroke="#6366f1"
  accentColor="#818cf8"
  glowEffect={true}
/> */}

{/* Email link */}
{/* <GitHubIcon 
  href="mailto:contact@github.com"
  target="_self"
  label="Contact"
  width={24}
  height={24}
  stroke="#059669"
  accentColor="#10b981"
  glowEffect={false}
/> */}
