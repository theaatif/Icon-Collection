import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const HomeIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#6366f1",
  fillColor = "transparent",
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
  const smokeControls = useAnimation();
  const lightControls = useAnimation();
  const welcomeControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    smokeControls.start("smoking");
    lightControls.start("glowing");
    welcomeControls.start("welcoming");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    smokeControls.start("idle");
    lightControls.start("normal");
    welcomeControls.start("idle");
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
          rotate: 0.5,
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
          <linearGradient id="homeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stroke} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={stroke} />
          </linearGradient>
          
          {/* Animated gradient for chimney smoke */}
          <linearGradient id="smokeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor={stroke} stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="0 0;2 -5;-1 -8;1 -12"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Pulsing gradient for windows */}
          <radialGradient id="windowGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.9" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Warm home glow */}
          <radialGradient id="homeGlowGradient" cx="50%" cy="80%" r="70%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Door gradient */}
          <linearGradient id="doorGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Home background glow */}
        <motion.path
          d="M3 12l9-9 9 9v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z"
          fill="url(#homeGlowGradient)"
          animate={welcomeControls}
          variants={{
            idle: { 
              scale: 0.9,
              opacity: 0 
            },
            welcoming: { 
              scale: [0.9, 1.1, 0.9],
              opacity: [0, 0.4, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Main house path with enhanced animation */}
        <motion.path
          d="M3 12l9-9 9 9v8a2 2 0 01-2 2H5a2 2 0 01-2-2v-8z"
          stroke="url(#homeGradient)"
          strokeWidth={strokeWidth}
          fill={fillColor}
          strokeDasharray="70"
          animate={controls}
          transition={{
            duration: DURATION * 1.5,
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
              strokeDashoffset: [70, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
            },
          }}
        />

        {/* Chimney with smoke animation */}
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
              scale: [0.8, 1],
            },
          }}
        >
          <motion.path
            d="M16 3v4"
            stroke="url(#homeGradient)"
            strokeWidth={strokeWidth + 1}
            strokeDasharray="4"
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
                strokeDashoffset: [4, 0],
                opacity: [0, 1],
              },
            }}
          />
          
          {/* Chimney smoke particles */}
          <motion.circle
            cx="16"
            cy="2"
            r="0.5"
            fill="url(#smokeGradient)"
            animate={smokeControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0,
                scale: 1
              },
              smoking: { 
                y: [-2, -4, -6],
                opacity: [0, 0.8, 0],
                scale: [1, 1.2, 1.5],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }
              }
            }}
          />
          <motion.circle
            cx="15.5"
            cy="1.5"
            r="0.3"
            fill="url(#smokeGradient)"
            animate={smokeControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0,
                scale: 1
              },
              smoking: { 
                y: [-3, -5, -8],
                opacity: [0, 0.6, 0],
                scale: [1, 1.5, 2],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5
                }
              }
            }}
          />
          <motion.circle
            cx="16.5"
            cy="1"
            r="0.2"
            fill="url(#smokeGradient)"
            animate={smokeControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0,
                scale: 1
              },
              smoking: { 
                y: [-4, -7, -10],
                opacity: [0, 0.4, 0],
                scale: [1, 1.8, 2.5],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1
                }
              }
            }}
          />
        </motion.g>

        {/* Door with opening effect */}
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
              scale: [0.8, 1],
            },
          }}
        >
          <motion.path
            d="M9 21v-6a2 2 0 012-2h2a2 2 0 012 2v6"
            stroke="url(#homeGradient)"
            strokeWidth={strokeWidth}
            fill="url(#doorGradient)"
            strokeDasharray="16"
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
                strokeDashoffset: [16, 0],
                opacity: [0, 1],
              },
            }}
          />
          
          {/* Door handle */}
          <motion.circle
            cx="14"
            cy="17"
            r="0.5"
            fill={accentColor}
            animate={welcomeControls}
            variants={{
              idle: { opacity: 0.7 },
              welcoming: { 
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Windows with warm light */}
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
              scale: [0.5, 1],
            },
          }}
        >
          {/* Left window */}
          <motion.circle
            cx="7"
            cy="16"
            r="2"
            fill="url(#windowGradient)"
            animate={lightControls}
            variants={{
              normal: { opacity: 0.3 },
              glowing: { 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M5 16h4M7 14v4"
            stroke={stroke}
            strokeWidth="1"
            animate={lightControls}
            variants={{
              normal: { opacity: 0.6 },
              glowing: { 
                opacity: [0.6, 1, 0.6],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />

          {/* Right window */}
          <motion.circle
            cx="17"
            cy="16"
            r="2"
            fill="url(#windowGradient)"
            animate={lightControls}
            variants={{
              normal: { opacity: 0.3 },
              glowing: { 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.1, 1],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }
              }
            }}
          />
          <motion.path
            d="M15 16h4M17 14v4"
            stroke={stroke}
            strokeWidth="1"
            animate={lightControls}
            variants={{
              normal: { opacity: 0.6 },
              glowing: { 
                opacity: [0.6, 1, 0.6],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }
              }
            }}
          />
        </motion.g>

        {/* Roof tiles accent */}
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
              scale: [0.8, 1],
            },
          }}
        >
          <motion.path
            d="M6 10l6-6 6 6"
            stroke={accentColor}
            strokeWidth="1.5"
            fill="none"
            animate={welcomeControls}
            variants={{
              idle: { opacity: 0.5 },
              welcoming: { 
                opacity: [0.5, 0.8, 0.5],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M8 8l4-4 4 4"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
            animate={welcomeControls}
            variants={{
              idle: { opacity: 0.4 },
              welcoming: { 
                opacity: [0.4, 0.7, 0.4],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }
            }}
          />
        </motion.g>

        {/* Welcome path dots */}
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
            cx="8"
            cy="22"
            r="0.5"
            fill={accentColor}
            animate={welcomeControls}
            variants={{
              idle: { opacity: 0.4 },
              welcoming: { 
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="12"
            cy="22"
            r="0.5"
            fill={accentColor}
            animate={welcomeControls}
            variants={{
              idle: { opacity: 0.4 },
              welcoming: { 
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }
              }
            }}
          />
          <motion.circle
            cx="16"
            cy="22"
            r="0.5"
            fill={accentColor}
            animate={welcomeControls}
            variants={{
              idle: { opacity: 0.4 },
              welcoming: { 
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }
            }}
          />
        </motion.g>

        {/* Garden/landscape elements */}
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
            cx="4"
            cy="20"
            r="0.8"
            fill={stroke}
            animate={welcomeControls}
            variants={{
              idle: { 
                opacity: 0.3,
                scale: 1 
              },
              welcoming: { 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="20"
            cy="19"
            r="0.6"
            fill={stroke}
            animate={welcomeControls}
            variants={{
              idle: { 
                opacity: 0.3,
                scale: 1 
              },
              welcoming: { 
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.1, 1],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }
              }
            }}
          />
        </motion.g>

        {/* Floating home particles */}
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
          <motion.circle
            cx="2"
            cy="14"
            r="0.3"
            fill={stroke}
            animate={welcomeControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.3 
              },
              welcoming: { 
                y: [-1, 1, -1],
                opacity: [0.3, 0.7, 0.3],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="22"
            cy="12"
            r="0.2"
            fill={stroke}
            animate={welcomeControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.3 
              },
              welcoming: { 
                y: [1, -1, 1],
                opacity: [0.3, 0.7, 0.3],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
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

export { HomeIcon };

// USAGE EXAMPLES:

{/* Homepage navigation */}
{/* <HomeIcon 
  href="/"
  target="_self"
  label="Home"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#6366f1"
  fillColor="#6366f120"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* Dashboard home */}
{/* <HomeIcon 
  onClick={(e) => {
    e.preventDefault();
    navigateToHome();
  }}
  label="Dashboard"
  width={28}
  height={28}
  stroke="#10b981"
  accentColor="#059669"
  fillColor="#10b98115"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#065f46"
  glowEffect={true}
/> */}

{/* React Router homepage */}
{/* import { Link } from 'react-router-dom';

<HomeIcon 
  LinkComponent={Link}
  linkProps={{ to: "/" }}
  label="Welcome"
  width={36}
  height={36}
  stroke="#e5e7eb"
  accentColor="#f59e0b"
  fillColor="#f59e0b20"
  strokeWidth={2}
  labelSize={20}
  labelColor="#f3f4f6"
  labelWeight={700}
  glowEffect={true}
/> */}

{/* Property/real estate homepage */}
{/* <HomeIcon 
  href="/properties"
  target="_self"
  label="Properties"
  width={24}
  height={24}
  stroke="#8b5cf6"
  accentColor="#a78bfa"
  fillColor="#8b5cf620"
  strokeWidth={1.8}
  labelSize={14}
  labelColor="#6b21a8"
  glowEffect={false}
/> */}

{/* Smart home app */}
{/* <HomeIcon 
  onClick={(e) => {
    e.preventDefault();
    openSmartHomePanel();
  }}
  label="Smart Home"
  width={30}
  height={30}
  stroke="#1f2937"
  accentColor="#3b82f6"
  fillColor="#3b82f615"
  strokeWidth={2.2}
  labelSize={16}
  labelColor="#374151"
  glowEffect={true}
/> */}
