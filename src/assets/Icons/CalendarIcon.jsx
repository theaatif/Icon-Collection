import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const CalendarIcon = ({
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
  const flipControls = useAnimation();
  const dateControls = useAnimation();
  const eventControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    flipControls.start("flipping");
    dateControls.start("highlighting");
    eventControls.start("pulsing");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    flipControls.start("idle");
    dateControls.start("normal");
    eventControls.start("idle");
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
          <linearGradient id="calendarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stroke} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={stroke} />
          </linearGradient>
          
          {/* Animated gradient for page flip effect */}
          <linearGradient id="flipGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0;100 0;-100 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Pulsing gradient for events */}
          <radialGradient id="eventGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Date highlight gradient */}
          <linearGradient id="dateGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.4" />
          </linearGradient>
        </defs>

        {/* Calendar background glow */}
        <motion.rect
          x="3"
          y="4"
          width="18"
          height="17"
          rx="2"
          fill="url(#eventGradient)"
          animate={flipControls}
          variants={{
            idle: { 
              scale: 0.9,
              opacity: 0 
            },
            flipping: { 
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

        {/* Main calendar body with enhanced animation */}
        <motion.rect
          x="3"
          y="4"
          width="18"
          height="17"
          rx="2"
          stroke="url(#calendarGradient)"
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

        {/* Calendar header separator */}
        <motion.path
          d="M3 9h18"
          stroke="url(#calendarGradient)"
          strokeWidth={strokeWidth * 0.8}
          strokeDasharray="18"
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
              strokeDashoffset: [18, 0],
              opacity: [0, 1],
            },
          }}
        />

        {/* Page flip overlay effect */}
        <motion.rect
          x="3"
          y="4"
          width="18"
          height="17"
          rx="2"
          fill="none"
          stroke="url(#flipGradient)"
          strokeWidth={strokeWidth * 0.4}
          animate={flipControls}
          variants={{
            idle: { opacity: 0 },
            flipping: { 
              opacity: [0, 0.7, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Calendar rings/bindings */}
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
            d="M8 2v4"
            stroke={accentColor}
            strokeWidth={strokeWidth + 0.5}
            animate={flipControls}
            variants={{
              idle: { opacity: 0.8 },
              flipping: { 
                opacity: [0.8, 1, 0.8],
                scaleY: [1, 1.1, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M16 2v4"
            stroke={accentColor}
            strokeWidth={strokeWidth + 0.5}
            animate={flipControls}
            variants={{
              idle: { opacity: 0.8 },
              flipping: { 
                opacity: [0.8, 1, 0.8],
                scaleY: [1, 1.1, 1],
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

        {/* Date grid dots */}
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
          {/* Week 1 */}
          <motion.circle
            cx="6"
            cy="12"
            r="0.8"
            fill={stroke}
            animate={dateControls}
            variants={{
              normal: { opacity: 0.6 },
              highlighting: { 
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
          <motion.circle
            cx="9"
            cy="12"
            r="0.8"
            fill={stroke}
            animate={dateControls}
            variants={{
              normal: { opacity: 0.6 },
              highlighting: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.1
                }
              }
            }}
          />
          <motion.circle
            cx="12"
            cy="12"
            r="0.8"
            fill={accentColor}
            animate={dateControls}
            variants={{
              normal: { opacity: 0.8 },
              highlighting: { 
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }
              }
            }}
          />
          <motion.circle
            cx="15"
            cy="12"
            r="0.8"
            fill={stroke}
            animate={dateControls}
            variants={{
              normal: { opacity: 0.6 },
              highlighting: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }
            }}
          />
          <motion.circle
            cx="18"
            cy="12"
            r="0.8"
            fill={stroke}
            animate={dateControls}
            variants={{
              normal: { opacity: 0.6 },
              highlighting: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }
            }}
          />

          {/* Week 2 */}
          <motion.circle
            cx="6"
            cy="15"
            r="0.8"
            fill={stroke}
            animate={dateControls}
            variants={{
              normal: { opacity: 0.6 },
              highlighting: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
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
            cx="9"
            cy="15"
            r="0.8"
            fill={stroke}
            animate={dateControls}
            variants={{
              normal: { opacity: 0.6 },
              highlighting: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }
              }
            }}
          />
          <motion.circle
            cx="15"
            cy="15"
            r="0.8"
            fill={stroke}
            animate={dateControls}
            variants={{
              normal: { opacity: 0.6 },
              highlighting: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.7
                }
              }
            }}
          />

          {/* Week 3 */}
          <motion.circle
            cx="6"
            cy="18"
            r="0.8"
            fill={stroke}
            animate={dateControls}
            variants={{
              normal: { opacity: 0.6 },
              highlighting: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }
              }
            }}
          />
          <motion.circle
            cx="12"
            cy="18"
            r="0.8"
            fill={stroke}
            animate={dateControls}
            variants={{
              normal: { opacity: 0.6 },
              highlighting: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9
                }
              }
            }}
          />
        </motion.g>

        {/* Event indicators */}
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
            cx="9"
            cy="15"
            r="0.3"
            fill={accentColor}
            animate={eventControls}
            variants={{
              idle: { opacity: 0.5 },
              pulsing: { 
                opacity: [0.5, 1, 0.5],
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
            cx="15"
            cy="12"
            r="0.3"
            fill={accentColor}
            animate={eventControls}
            variants={{
              idle: { opacity: 0.5 },
              pulsing: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }
            }}
          />
          <motion.circle
            cx="18"
            cy="18"
            r="0.3"
            fill={accentColor}
            animate={eventControls}
            variants={{
              idle: { opacity: 0.5 },
              pulsing: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }
              }
            }}
          />
        </motion.g>

        {/* Today highlight */}
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
              scale: [0.8, 1],
            },
          }}
        >
          <motion.circle
            cx="12"
            cy="12"
            r="1.5"
            fill="url(#dateGradient)"
            animate={eventControls}
            variants={{
              idle: { opacity: 0.3 },
              pulsing: { 
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
        </motion.g>

        {/* Calendar corner accents */}
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
              scale: [0, 1],
            },
          }}
        >
          <motion.path
            d="M2 7L4 5L6 7"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
            animate={flipControls}
            variants={{
              idle: { opacity: 0.4 },
              flipping: { 
                opacity: [0.4, 0.8, 0.4],
                y: [0, -1, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M22 7L20 5L18 7"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
            animate={flipControls}
            variants={{
              idle: { opacity: 0.4 },
              flipping: { 
                opacity: [0.4, 0.8, 0.4],
                y: [0, -1, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }
            }}
          />
        </motion.g>

        {/* Floating time particles */}
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
            cx="1"
            cy="10"
            r="0.3"
            fill={stroke}
            animate={flipControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.3 
              },
              flipping: { 
                y: [-2, 2, -2],
                opacity: [0.3, 0.7, 0.3],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="23"
            cy="16"
            r="0.2"
            fill={stroke}
            animate={flipControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.3 
              },
              flipping: { 
                y: [2, -2, 2],
                opacity: [0.3, 0.7, 0.3],
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

export { CalendarIcon };

// USAGE EXAMPLES:

{/* Calendar app link */}
{/* <CalendarIcon 
  href="/calendar"
  target="_self"
  label="Calendar"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#6366f1"
  fillColor="#6366f110"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* Event scheduler */}
{/* <CalendarIcon 
  onClick={(e) => {
    e.preventDefault();
    openEventModal();
  }}
  label="Schedule"
  width={28}
  height={28}
  stroke="#10b981"
  accentColor="#059669"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#065f46"
  glowEffect={true}
/> */}

{/* React Router calendar page */}
{/* import { Link } from 'react-router-dom';

<CalendarIcon 
  LinkComponent={Link}
  linkProps={{ to: "/appointments" }}
  label="Appointments"
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

{/* Date picker trigger */}
{/* <CalendarIcon 
  onClick={(e) => {
    e.preventDefault();
    toggleDatePicker();
  }}
  label="Select Date"
  width={24}
  height={24}
  stroke="#8b5cf6"
  accentColor="#a78bfa"
  strokeWidth={1.8}
  labelSize={14}
  labelColor="#6b21a8"
  glowEffect={false}
/> */}

{/* Google Calendar integration */}
{/* <CalendarIcon 
  href="https://calendar.google.com"
  target="_blank"
  rel="noopener noreferrer"
  label="Google Calendar"
  width={30}
  height={30}
  stroke="#1f2937"
  accentColor="#3b82f6"
  fillColor="#3b82f620"
  strokeWidth={2.2}
  labelSize={16}
  labelColor="#374151"
  glowEffect={true}
/> */}
