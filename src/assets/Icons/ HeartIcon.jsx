import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const HeartIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#ef4444",
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
  const heartbeatControls = useAnimation();
  const sparkleControls = useAnimation();
  const loveControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    heartbeatControls.start("beating");
    sparkleControls.start("sparkling");
    loveControls.start("loving");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    heartbeatControls.start("idle");
    sparkleControls.start("idle");
    loveControls.start("idle");
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
          filter: glowEffect ? "drop-shadow(0 0 0px rgba(239, 68, 68, 0))" : "none"
        },
        hover: { 
          scale: 1.05, 
          rotate: -2,
          filter: glowEffect ? "drop-shadow(0 0 12px rgba(239, 68, 68, 0.4))" : "none"
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
          {/* Gradient for modern heart effect */}
          <linearGradient id="heartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stroke} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={stroke} />
          </linearGradient>
          
          {/* Animated gradient for heartbeat pulse */}
          <radialGradient id="heartbeatGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="scale"
              values="0.8;1.2;0.8"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </radialGradient>

          {/* Love aura gradient */}
          <radialGradient id="loveAuraGradient" cx="50%" cy="50%" r="80%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.2" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Sparkle gradient */}
          <radialGradient id="sparkleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Romantic glow */}
          <filter id="romanticGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Love aura background */}
        <motion.circle
          cx="12"
          cy="12"
          r="12"
          fill="url(#loveAuraGradient)"
          animate={loveControls}
          variants={{
            idle: { 
              scale: 0.8,
              opacity: 0 
            },
            loving: { 
              scale: [0.8, 1.3, 0.8],
              opacity: [0, 0.5, 0],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Heartbeat pulse background */}
        <motion.ellipse
          cx="12"
          cy="13"
          rx="9"
          ry="7"
          fill="url(#heartbeatGradient)"
          animate={heartbeatControls}
          variants={{
            idle: { 
              scale: 0.9,
              opacity: 0 
            },
            beating: { 
              scale: [0.9, 1.1, 1.2, 0.9],
              opacity: [0, 0.6, 0.3, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                times: [0, 0.3, 0.5, 1]
              }
            }
          }}
        />

        {/* Main heart path with enhanced animation */}
        <motion.path
          d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
          stroke="url(#heartGradient)"
          strokeWidth={strokeWidth}
          fill={fillColor}
          strokeDasharray="65"
          animate={controls}
          transition={{
            duration: DURATION * 1.8,
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
              strokeDashoffset: [65, 0],
              opacity: [0, 1],
              scale: [0.8, 1],
            },
          }}
        />

        {/* Heart chambers with breathing effect */}
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
          {/* Left chamber */}
          <motion.circle
            cx="9"
            cy="10"
            r="2.5"
            fill={accentColor}
            fillOpacity="0.3"
            animate={heartbeatControls}
            variants={{
              idle: { scale: 1 },
              beating: { 
                scale: [1, 1.1, 1.2, 1],
                opacity: [0.3, 0.6, 0.4, 0.3],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.5, 1]
                }
              }
            }}
          />
          
          {/* Right chamber */}
          <motion.circle
            cx="15"
            cy="10"
            r="2.5"
            fill={accentColor}
            fillOpacity="0.3"
            animate={heartbeatControls}
            variants={{
              idle: { scale: 1 },
              beating: { 
                scale: [1, 1.1, 1.2, 1],
                opacity: [0.3, 0.6, 0.4, 0.3],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  times: [0, 0.3, 0.5, 1],
                  delay: 0.1
                }
              }
            }}
          />
        </motion.g>

        {/* Heart sparkles */}
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
            cx="8"
            cy="6"
            r="0.8"
            fill="url(#sparkleGradient)"
            animate={sparkleControls}
            variants={{
              idle: { opacity: 0.4 },
              sparkling: { 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.5, 1],
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
            cy="7"
            r="0.6"
            fill="url(#sparkleGradient)"
            animate={sparkleControls}
            variants={{
              idle: { opacity: 0.4 },
              sparkling: { 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.5, 1],
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
            cy="8"
            r="0.4"
            fill="url(#sparkleGradient)"
            animate={sparkleControls}
            variants={{
              idle: { opacity: 0.5 },
              sparkling: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1
                }
              }
            }}
          />
        </motion.g>

        {/* Cupid's arrow accents */}
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
            d="M3 12l2-2"
            stroke={accentColor}
            strokeWidth="1.5"
            animate={loveControls}
            variants={{
              idle: { opacity: 0.3 },
              loving: { 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M21 12l-2 2"
            stroke={accentColor}
            strokeWidth="1.5"
            animate={loveControls}
            variants={{
              idle: { opacity: 0.3 },
              loving: { 
                opacity: [0.3, 0.8, 0.3],
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
        </motion.g>

        {/* Floating love particles */}
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
            cx="6"
            cy="16"
            r="0.4"
            fill={accentColor}
            animate={loveControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.4,
                scale: 1
              },
              loving: { 
                y: [-3, 3, -3],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="18"
            cy="18"
            r="0.3"
            fill={accentColor}
            animate={loveControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.4,
                scale: 1
              },
              loving: { 
                y: [3, -3, 3],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }
              }
            }}
          />
          <motion.circle
            cx="4"
            cy="8"
            r="0.2"
            fill={stroke}
            animate={loveControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.3,
                scale: 1
              },
              loving: { 
                y: [-2, 2, -2],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }
              }
            }}
          />
          <motion.circle
            cx="20"
            cy="6"
            r="0.25"
            fill={stroke}
            animate={loveControls}
            variants={{
              idle: { 
                y: 0,
                opacity: 0.3,
                scale: 1
              },
              loving: { 
                y: [2, -2, 2],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }
            }}
          />
        </motion.g>

        {/* Heart rate line */}
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
          <motion.path
            d="M2 12h4l2-4 2 8 2-6 2 4h8"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
            opacity="0.4"
            animate={heartbeatControls}
            variants={{
              idle: { 
                pathLength: 1,
                opacity: 0.4 
              },
              beating: { 
                pathLength: [0, 1, 1, 0],
                opacity: [0.4, 0.8, 0.6, 0.4],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Mini hearts constellation */}
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
            d="M5 4.5a1 1 0 0 0-1.4 0 1 1 0 0 0 0 1.4l.7.7.7-.7a1 1 0 0 0 0-1.4z"
            fill={accentColor}
            fillOpacity="0.6"
            animate={sparkleControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              sparkling: { 
                scale: [1, 1.2, 1],
                rotate: [0, 10, 0],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M19 4.5a1 1 0 0 0-1.4 0 1 1 0 0 0 0 1.4l.7.7.7-.7a1 1 0 0 0 0-1.4z"
            fill={accentColor}
            fillOpacity="0.6"
            animate={sparkleControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              sparkling: { 
                scale: [1, 1.2, 1],
                rotate: [0, -10, 0],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }
              }
            }}
          />
          <motion.path
            d="M2 18.5a0.8 0.8 0 0 0-1.1 0 0.8 0.8 0 0 0 0 1.1l.55.55.55-.55a0.8 0.8 0 0 0 0-1.1z"
            fill={stroke}
            fillOpacity="0.5"
            animate={sparkleControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              sparkling: { 
                scale: [1, 1.3, 1],
                rotate: [0, 15, 0],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }
              }
            }}
          />
          <motion.path
            d="M22 18.5a0.8 0.8 0 0 0-1.1 0 0.8 0.8 0 0 0 0 1.1l.55.55.55-.55a0.8 0.8 0 0 0 0-1.1z"
            fill={stroke}
            fillOpacity="0.5"
            animate={sparkleControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              sparkling: { 
                scale: [1, 1.3, 1],
                rotate: [0, -15, 0],
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

export { HeartIcon };

// USAGE EXAMPLES:

{/* Favorites/wishlist */}
{/* <HeartIcon 
  onClick={(e) => {
    e.preventDefault();
    toggleFavorite();
  }}
  label="Add to Favorites"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#ef4444"
  fillColor="#ef444420"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* Like button */}
{/* <HeartIcon 
  onClick={(e) => {
    e.preventDefault();
    handleLike();
  }}
  label="Like"
  width={28}
  height={28}
  stroke="#ec4899"
  accentColor="#f43f5e"
  fillColor="#ec489920"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#be1866"
  glowEffect={true}
/> */}

{/* Love/relationship page */}
{/* <HeartIcon 
  href="/love-stories"
  target="_self"
  label="Love Stories"
  width={36}
  height={36}
  stroke="#e5e7eb"
  accentColor="#f59e0b"
  fillColor="#f59e0b25"
  strokeWidth={2}
  labelSize={20}
  labelColor="#f3f4f6"
  labelWeight={700}
  glowEffect={true}
/> */}

{/* Health/wellness */}
{/* <HeartIcon 
  href="/health"
  target="_self"
  label="Heart Health"
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

{/* Donation/charity */}
{/* <HeartIcon 
  href="/donate"
  target="_self"
  label="Donate"
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

{/* Valentine's/romantic theme */}
{/* <HeartIcon 
  href="/valentine"
  target="_self"
  label="Valentine's Day"
  width={32}
  height={32}
  stroke="#fbbf24"
  accentColor="#f472b6"
  fillColor="#f472b630"
  strokeWidth={2}
  labelSize={17}
  labelColor="#92400e"
  glowEffect={true}
/> */}
