import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const NotificationIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#f59e0b",
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
  const ringControls = useAnimation();
  const dotControls = useAnimation();
  const pulseControls = useAnimation();
  const soundControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    ringControls.start("ringing");
    dotControls.start("bouncing");
    pulseControls.start("pulsing");
    soundControls.start("waving");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    ringControls.start("idle");
    dotControls.start("idle");
    pulseControls.start("idle");
    soundControls.start("idle");
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
          filter: glowEffect ? "drop-shadow(0 0 0px rgba(245, 158, 11, 0))" : "none"
        },
        hover: { 
          scale: 1.05, 
          rotate: -3,
          filter: glowEffect ? "drop-shadow(0 0 10px rgba(245, 158, 11, 0.4))" : "none"
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
          {/* Gradient for modern bell effect */}
          <linearGradient id="bellGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stroke} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={stroke} />
          </linearGradient>
          
          {/* Animated gradient for ringing effect */}
          <linearGradient id="ringingGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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

          {/* Notification pulse gradient */}
          <radialGradient id="notificationPulseGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.9" />
            <stop offset="70%" stopColor="#ef4444" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Sound wave gradient */}
          <radialGradient id="soundWaveGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="60%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.2" />
          </radialGradient>

          {/* Bell glow gradient */}
          <radialGradient id="bellGlowGradient" cx="50%" cy="60%" r="60%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Alert badge gradient */}
          <linearGradient id="badgeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="50%" stopColor="#f97316" />
            <stop offset="100%" stopColor={accentColor} />
          </linearGradient>
        </defs>

        {/* Sound wave background */}
        <motion.circle
          cx="12"
          cy="11"
          r="11"
          fill="url(#soundWaveGradient)"
          animate={soundControls}
          variants={{
            idle: { 
              scale: 0.8,
              opacity: 0 
            },
            waving: { 
              scale: [0.8, 1.3, 0.8],
              opacity: [0, 0.5, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Bell background glow */}
        <motion.ellipse
          cx="12"
          cy="13"
          rx="6"
          ry="8"
          fill="url(#bellGlowGradient)"
          animate={pulseControls}
          variants={{
            idle: { 
              scale: 0.9,
              opacity: 0.3 
            },
            pulsing: { 
              scale: [0.9, 1.1, 0.9],
              opacity: [0.3, 0.7, 0.3],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Main bell shape with enhanced animation */}
        <motion.path
          d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
          stroke="url(#bellGradient)"
          strokeWidth={strokeWidth}
          fill={fillColor}
          strokeDasharray="50"
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
              strokeDashoffset: [50, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
            },
          }}
        />

        {/* Ringing overlay effect */}
        <motion.path
          d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"
          stroke="url(#ringingGradient)"
          strokeWidth={strokeWidth * 0.6}
          fill="none"
          animate={ringControls}
          variants={{
            idle: { opacity: 0 },
            ringing: { 
              opacity: [0, 0.8, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Bell clapper with swing animation */}
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
              scale: [0.7, 1],
            },
          }}
        >
          <motion.path
            d="M13.73 21a2 2 0 0 1-3.46 0"
            stroke="url(#bellGradient)"
            strokeWidth={strokeWidth + 0.5}
            strokeDasharray="6.28"
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
                strokeDashoffset: [6.28, 0],
                opacity: [0, 1],
              },
            }}
          />
          
          {/* Clapper swing motion */}
          <motion.circle
            cx="12"
            cy="20"
            r="0.8"
            fill={accentColor}
            animate={ringControls}
            variants={{
              idle: { 
                x: 0,
                rotate: 0 
              },
              ringing: { 
                x: [-1, 1, -1, 1, 0],
                rotate: [-5, 5, -5, 5, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Notification dot/badge with enhanced animation */}
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
          <motion.circle
            cx="18"
            cy="6"
            r="4"
            fill="url(#notificationPulseGradient)"
            animate={dotControls}
            variants={{
              idle: { 
                scale: 0.8,
                opacity: 0.8 
              },
              bouncing: { 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.8, 1, 0.8],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.circle
            cx="18"
            cy="6"
            r="2.5"
            fill="url(#badgeGradient)"
            animate={dotControls}
            variants={{
              idle: { scale: 1 },
              bouncing: { 
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          {/* Notification count */}
          <motion.text
            x="18"
            y="7"
            fontSize="3"
            fill={stroke}
            textAnchor="middle"
            animate={dotControls}
            variants={{
              idle: { opacity: 0.9 },
              bouncing: { 
                opacity: [0.9, 1, 0.9],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          >
            3
          </motion.text>
        </motion.g>

        {/* Sound wave rings */}
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
              scale: [0.8, 1],
            },
          }}
        >
          <motion.circle
            cx="12"
            cy="11"
            r="8"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
            animate={soundControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0 
              },
              waving: { 
                scale: [1, 1.3, 1.6],
                opacity: [0, 0.6, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }
              }
            }}
          />
          
          <motion.circle
            cx="12"
            cy="11"
            r="10"
            stroke={accentColor}
            strokeWidth="0.8"
            fill="none"
            animate={soundControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0 
              },
              waving: { 
                scale: [1, 1.2, 1.4],
                opacity: [0, 0.4, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.3
                }
              }
            }}
          />
          
          <motion.circle
            cx="12"
            cy="11"
            r="12"
            stroke={accentColor}
            strokeWidth="0.6"
            fill="none"
            animate={soundControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0 
              },
              waving: { 
                scale: [1, 1.1, 1.2],
                opacity: [0, 0.3, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.6
                }
              }
            }}
          />
        </motion.g>

        {/* Alert sparkles */}
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
          <motion.circle
            cx="6"
            cy="4"
            r="0.8"
            fill={accentColor}
            animate={dotControls}
            variants={{
              idle: { opacity: 0.5 },
              bouncing: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.circle
            cx="20"
            cy="18"
            r="0.6"
            fill={accentColor}
            animate={dotControls}
            variants={{
              idle: { opacity: 0.5 },
              bouncing: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.5, 1],
                transition: {
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }
            }}
          />
          
          <motion.circle
            cx="4"
            cy="20"
            r="0.4"
            fill={accentColor}
            animate={dotControls}
            variants={{
              idle: { opacity: 0.4 },
              bouncing: { 
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.6, 1],
                transition: {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }
              }
            }}
          />
        </motion.g>

        {/* Floating alert particles */}
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
            cx="2"
            cy="12"
            r="0.3"
            fill={stroke}
            animate={soundControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.3 
              },
              waving: { 
                x: [0, 2, 4],
                y: [-1, 1, -1],
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
            cx="22"
            cy="8"
            r="0.25"
            fill={stroke}
            animate={soundControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.3 
              },
              waving: { 
                x: [0, -2, -4],
                y: [1, -1, 1],
                opacity: [0.3, 0.7, 0.3],
                transition: {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }
              }
            }}
          />
          
          <motion.circle
            cx="1"
            cy="16"
            r="0.2"
            fill={accentColor}
            animate={soundControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.4 
              },
              waving: { 
                x: [0, 1, 2],
                y: [-0.5, 0.5, -0.5],
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }
              }
            }}
          />
        </motion.g>

        {/* Bell bracket/mount */}
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
              scale: [0.8, 1],
            },
          }}
        >
          <motion.path
            d="M12 2v2"
            stroke={accentColor}
            strokeWidth={strokeWidth + 1}
            animate={ringControls}
            variants={{
              idle: { opacity: 0.7 },
              ringing: { 
                opacity: [0.7, 1, 0.7],
                scaleY: [1, 1.1, 1],
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
            cy="2"
            r="1"
            fill={accentColor}
            animate={ringControls}
            variants={{
              idle: { opacity: 0.8 },
              ringing: { 
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Urgency indicator lines */}
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
            d="M21 4l-1 1"
            stroke={accentColor}
            strokeWidth="1.5"
            animate={dotControls}
            variants={{
              idle: { opacity: 0.4 },
              bouncing: { 
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.path
            d="M23 6l-1 1"
            stroke={accentColor}
            strokeWidth="1.2"
            animate={dotControls}
            variants={{
              idle: { opacity: 0.4 },
              bouncing: { 
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 1.4,
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
              x: 2
            }
          }}
          style={{
            color: labelColor || stroke,
            fontSize: labelSize,
            fontWeight: labelWeight,
            userSelect: "none",
            textShadow: glowEffect ? `0 0 4px ${accentColor}30` : "none",
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

export { NotificationIcon };

// USAGE EXAMPLES:

{/* Notifications page */}
{/* <NotificationIcon 
  href="/notifications"
  target="_self"
  label="Notifications"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#f59e0b"
  fillColor="#f59e0b20"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* Alert system */}
{/* <NotificationIcon 
  onClick={(e) => {
    e.preventDefault();
    showNotifications();
  }}
  label="Alerts (3)"
  width={28}
  height={28}
  stroke="#ef4444"
  accentColor="#f97316"
  fillColor="#ef444420"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#7f1d1d"
  glowEffect={true}
/> */}

{/* React Router notifications */}
{/* import { Link } from 'react-router-dom';

<NotificationIcon 
  LinkComponent={Link}
  linkProps={{ to: "/inbox" }}
  label="Inbox"
  width={36}
  height={36}
  stroke="#e5e7eb"
  accentColor="#3b82f6"
  fillColor="#3b82f625"
  strokeWidth={2}
  labelSize={20}
  labelColor="#f3f4f6"
  labelWeight={700}
  glowEffect={true}
/> */}

{/* Push notifications toggle */}
{/* <NotificationIcon 
  onClick={(e) => {
    e.preventDefault();
    toggleNotifications();
  }}
  label="Push Notifications"
  width={24}
  height={24}
  stroke="#10b981"
  accentColor="#059669"
  fillColor="#10b98120"
  strokeWidth={1.8}
  labelSize={14}
  labelColor="#065f46"
  glowEffect={false}
/> */}

{/* System alerts */}
{/* <NotificationIcon 
  href="/system-alerts"
  target="_self"
  label="System Alerts"
  width={30}
  height={30}
  stroke="#1f2937"
  accentColor="#dc2626"
  fillColor="#dc262615"
  strokeWidth={2.2}
  labelSize={16}
  labelColor="#374151"
  glowEffect={true}
/> */}

{/* Message notifications */}
{/* <NotificationIcon 
  onClick={(e) => {
    e.preventDefault();
    openMessageCenter();
  }}
  label="Messages"
  width={26}
  height={26}
  stroke="#8b5cf6"
  accentColor="#a855f7"
  fillColor="#8b5cf620"
  strokeWidth={2}
  labelSize={15}
  labelColor="#6b21a8"
  glowEffect={true}
/> */}
