import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const ProfileIcon = ({
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
  const pulseControls = useAnimation();
  const breatheControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    pulseControls.start("pulsing");
    breatheControls.start("breathing");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    pulseControls.start("idle");
    breatheControls.start("normal");
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
          rotate: 1,
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
          <linearGradient id="profileGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stroke} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={stroke} />
          </linearGradient>
          
          {/* Animated gradient for pulsing effect */}
          <radialGradient id="profilePulseGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Heartbeat gradient */}
          <radialGradient id="heartbeatGradient" cx="50%" cy="30%" r="40%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Pulsing background aura */}
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="url(#profilePulseGradient)"
          animate={pulseControls}
          variants={{
            idle: { 
              scale: 0.9,
              opacity: 0 
            },
            pulsing: { 
              scale: [0.9, 1.1, 0.9],
              opacity: [0, 0.3, 0],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Head circle with enhanced animation */}
        <motion.circle
          cx="12"
          cy="7"
          r="4"
          stroke="url(#profileGradient)"
          strokeWidth={strokeWidth}
          fill={fillColor}
          strokeDasharray="25.13"
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
              strokeDashoffset: [25.13, 0],
              opacity: [0, 1],
              scale: [0.8, 1],
            },
          }}
        />

        {/* Breathing effect for head */}
        <motion.circle
          cx="12"
          cy="7"
          r="4"
          stroke="none"
          fill="url(#heartbeatGradient)"
          animate={breatheControls}
          variants={{
            normal: { 
              scale: 1,
              opacity: 0 
            },
            breathing: { 
              scale: [1, 1.05, 1],
              opacity: [0, 0.2, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Shoulder curve left with staggered animation */}
        <motion.path
          d="M6 21v-2a4 4 0 0 1 4-4h.5"
          stroke="url(#profileGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray="12.5"
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
              strokeDashoffset: [12.5, 0],
              opacity: [0, 1],
            },
          }}
        />

        {/* Shoulder curve right with staggered animation */}
        <motion.path
          d="M13.5 15H14a4 4 0 0 1 4 4v2"
          stroke="url(#profileGradient)"
          strokeWidth={strokeWidth}
          strokeDasharray="12.5"
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
              strokeDashoffset: [12.5, 0],
              opacity: [0, 1],
            },
          }}
        />

        {/* Enhanced decorative accent lines */}
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
          <motion.path
            d="M8 3.5L10 2"
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
            d="M16 3.5L14 2"
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

        {/* Profile status indicators */}
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
              scale: [0, 1],
            },
          }}
        >
          {/* Online indicator */}
          <motion.circle
            cx="16"
            cy="7"
            r="1.5"
            fill={accentColor}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.6 },
              pulsing: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          {/* Inner glow */}
          <motion.circle
            cx="16"
            cy="7"
            r="0.8"
            fill={stroke}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.8 },
              pulsing: { 
                opacity: [0.8, 1, 0.8],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Floating profile particles */}
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
            cx="5"
            cy="10"
            r="0.5"
            fill={stroke}
            animate={pulseControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.3 
              },
              pulsing: { 
                y: [-2, 2, -2],
                opacity: [0.3, 0.7, 0.3],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="19"
            cy="14"
            r="0.4"
            fill={stroke}
            animate={pulseControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.3 
              },
              pulsing: { 
                y: [2, -2, 2],
                opacity: [0.3, 0.7, 0.3],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }
              }
            }}
          />
        </motion.g>

        {/* Modern profile frame */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(6),
          }}
          variants={{
            normal: {
              opacity: 1,
              scale: 1,
              transition: { delay: 0 },
            },
            animate: {
              opacity: [0, 1],
              scale: [0.9, 1],
            },
          }}
        >
          {/* Corner accents */}
          <motion.path
            d="M7 4L9 4L9 6"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.4 },
              pulsing: { 
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M17 4L15 4L15 6"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.4 },
              pulsing: { 
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }
              }
            }}
          />
        </motion.g>

        {/* User activity dots */}
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
            cx="8"
            cy="18"
            r="0.3"
            fill={accentColor}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.5 },
              pulsing: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.5, 1],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="10"
            cy="19"
            r="0.3"
            fill={accentColor}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.5 },
              pulsing: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.5, 1],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }
              }
            }}
          />
          <motion.circle
            cx="16"
            cy="18"
            r="0.3"
            fill={accentColor}
            animate={pulseControls}
            variants={{
              idle: { opacity: 0.5 },
              pulsing: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.5, 1],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
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

export { ProfileIcon };

// USAGE EXAMPLES:

{/* Modern profile with link */}
{/* <ProfileIcon 
  href="/profile/john-doe"
  label="John Doe"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#6366f1"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* User dashboard link */}
{/* <ProfileIcon 
  href="/dashboard"
  target="_self"
  label="Dashboard"
  width={28}
  height={28}
  stroke="#10b981"
  accentColor="#059669"
  fillColor="#10b98110"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#065f46"
  glowEffect={true}
/> */}

{/* React Router profile link */}
{/* import { Link } from 'react-router-dom';

<ProfileIcon 
  LinkComponent={Link}
  linkProps={{ to: "/user/profile" }}
  label="My Profile"
  width={36}
  height={36}
  stroke="#1f2937"
  accentColor="#f59e0b"
  strokeWidth={2}
  labelSize={20}
  labelColor="#f3f4f6"
  labelWeight={700}
  glowEffect={true}
/> */}

{/* Settings page with custom action */}
{/* <ProfileIcon 
  onClick={(e) => {
    e.preventDefault();
    // Open modal or navigate
    openProfileModal();
  }}
  label="Settings"
  width={24}
  height={24}
  stroke="#8b5cf6"
  accentColor="#a78bfa"
  glowEffect={false}
/> */}

{/* Minimal profile indicator */}
{/* <ProfileIcon 
  width={20}
  height={20}
  stroke="#6b7280"
  accentColor="#3b82f6"
  strokeWidth={1.5}
  glowEffect={false}
/> */}
