import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const LeftArrowIcon = ({
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
  const flowControls = useAnimation();
  const pulseControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    flowControls.start("flowing");
    pulseControls.start("pulsing");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    flowControls.start("idle");
    pulseControls.start("idle");
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
          x: 0,
          filter: glowEffect ? "drop-shadow(0 0 0px rgba(99, 102, 241, 0))" : "none"
        },
        hover: { 
          scale: 1.05, 
          rotate: -1,
          x: -3,
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
          <linearGradient id="arrowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} />
            <stop offset="50%" stopColor={stroke} />
            <stop offset="100%" stopColor={accentColor} />
          </linearGradient>
          
          {/* Animated gradient for flowing effect */}
          <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor={stroke} stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="100 0;-100 0;100 0"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Pulsing gradient for tail */}
          <radialGradient id="tailGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Motion trail gradient */}
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Motion trail effect */}
        <motion.path
          d="M20 12H4"
          stroke="url(#trailGradient)"
          strokeWidth={strokeWidth * 2}
          animate={flowControls}
          variants={{
            idle: { 
              opacity: 0,
              scaleX: 1 
            },
            flowing: { 
              opacity: [0, 0.4, 0],
              scaleX: [1, 1.1, 1],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Main arrow shaft with enhanced animation */}
        <motion.path
          d="M20 12H4"
          stroke="url(#arrowGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray="16"
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
              strokeDashoffset: [16, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
            },
          }}
        />

        {/* Flowing overlay on shaft */}
        <motion.path
          d="M20 12H4"
          stroke="url(#flowGradient)"
          strokeWidth={strokeWidth * 0.6}
          animate={flowControls}
          variants={{
            idle: { opacity: 0 },
            flowing: { 
              opacity: [0, 0.8, 0],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Arrow head top line with staggered animation */}
        <motion.path
          d="M10 18l-6-6"
          stroke="url(#arrowGradient)"
          strokeWidth={strokeWidth + 0.5}
          strokeDasharray="8.49"
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
              strokeDashoffset: [8.49, 0],
              opacity: [0, 1],
            },
          }}
        />

        {/* Arrow head bottom line with staggered animation */}
        <motion.path
          d="M10 6l-6 6"
          stroke="url(#arrowGradient)"
          strokeWidth={strokeWidth + 0.5}
          strokeDasharray="8.49"
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(2),
            ease: "easeInOut",
          }}
          variants={{
            normal: {
              strokeDashoffset: 0,
              opacity: 1,
              transition: { delay: 0 },
            },
            animate: {
              strokeDashoffset: [8.49, 0],
              opacity: [0, 1],
            },
          }}
        />

        {/* Enhanced decorative accent circle at tail */}
        <motion.circle
          cx="20"
          cy="12"
          r="3"
          fill="url(#tailGradient)"
          animate={pulseControls}
          variants={{
            idle: { 
              scale: 0.8,
              opacity: 0 
            },
            pulsing: { 
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 0.6, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        <motion.circle
          cx="20"
          cy="12"
          r="2"
          stroke={accentColor}
          strokeWidth="1"
          fill="none"
          strokeDasharray="12.57"
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(3),
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
              strokeDashoffset: [12.57, 0],
              opacity: [0, 1],
              scale: [0.5, 1],
            },
          }}
        />

        {/* Enhanced decorative accent lines */}
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
          <motion.path
            d="M14 8v2"
            stroke={accentColor}
            strokeWidth={strokeWidth * 0.8}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.6 },
              pulsing: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M14 14v2"
            stroke={accentColor}
            strokeWidth={strokeWidth * 0.8}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.6 },
              pulsing: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
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

        {/* Direction indicators */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(5),
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
            cx="2"
            cy="12"
            r="1"
            fill={accentColor}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.5 },
              pulsing: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="2"
            cy="12"
            r="0.4"
            fill={stroke}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.8 },
              pulsing: { 
                opacity: [0.8, 1, 0.8],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Floating motion particles */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(6),
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
            cx="18"
            cy="9"
            r="0.4"
            fill={stroke}
            animate={flowControls}
            variants={{
              idle: { 
                x: 0,
                opacity: 0.3 
              },
              flowing: { 
                x: [-8, -4, -8],
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
            cx="16"
            cy="15"
            r="0.3"
            fill={stroke}
            animate={flowControls}
            variants={{
              idle: { 
                x: 0,
                opacity: 0.3 
              },
              flowing: { 
                x: [-6, -2, -6],
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
          <motion.circle
            cx="12"
            cy="10"
            r="0.2"
            fill={accentColor}
            animate={flowControls}
            variants={{
              idle: { 
                x: 0,
                opacity: 0.4 
              },
              flowing: { 
                x: [-4, 0, -4],
                opacity: [0.4, 0.9, 0.4],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }
              }
            }}
          />
        </motion.g>

        {/* Speed lines for motion effect */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(7),
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
          <motion.path
            d="M22 10h-2"
            stroke={accentColor}
            strokeWidth="0.8"
            animate={flowControls}
            variants={{
              idle: { opacity: 0.3 },
              flowing: { 
                opacity: [0.3, 0.8, 0.3],
                scaleX: [1, 1.2, 1],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M22 14h-1.5"
            stroke={accentColor}
            strokeWidth="0.6"
            animate={flowControls}
            variants={{
              idle: { opacity: 0.3 },
              flowing: { 
                opacity: [0.3, 0.8, 0.3],
                scaleX: [1, 1.2, 1],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
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
              x: -2
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

export { LeftArrowIcon };

// USAGE EXAMPLES:

{/* Back navigation */}
{/* <LeftArrowIcon 
  href="/previous-page"
  target="_self"
  label="Go Back"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#6366f1"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* Previous page with custom action */}
{/* <LeftArrowIcon 
  onClick={(e) => {
    e.preventDefault();
    window.history.back();
  }}
  label="Previous"
  width={28}
  height={28}
  stroke="#10b981"
  accentColor="#059669"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#065f46"
  glowEffect={true}
/> */}

{/* React Router back navigation */}
{/* import { Link } from 'react-router-dom';

<LeftArrowIcon 
  LinkComponent={Link}
  linkProps={{ to: "/dashboard" }}
  label="Dashboard"
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

{/* Breadcrumb navigation */}
{/* <LeftArrowIcon 
  href="/category/products"
  target="_self"
  label="Products"
  width={24}
  height={24}
  stroke="#8b5cf6"
  accentColor="#a78bfa"
  strokeWidth={1.8}
  labelSize={14}
  labelColor="#6b21a8"
  glowEffect={false}
/> */}

{/* Carousel/slider previous */}
{/* <LeftArrowIcon 
  onClick={(e) => {
    e.preventDefault();
    previousSlide();
  }}
  width={20}
  height={20}
  stroke="#6b7280"
  accentColor="#3b82f6"
  strokeWidth={1.5}
  glowEffect={true}
/> */}
