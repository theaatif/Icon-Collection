import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const XIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#000000",
  fillColor = "#000000",
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
  const tweetControls = useAnimation();
  const viralControls = useAnimation();
  const networkControls = useAnimation();
  const shareControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    tweetControls.start("tweeting");
    viralControls.start("trending");
    networkControls.start("connecting");
    shareControls.start("sharing");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    tweetControls.start("idle");
    viralControls.start("idle");
    networkControls.start("idle");
    shareControls.start("idle");
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
          filter: glowEffect ? "drop-shadow(0 0 0px rgba(0, 0, 0, 0))" : "none"
        },
        hover: { 
          scale: 1.05, 
          rotate: 2,
          filter: glowEffect ? "drop-shadow(0 0 8px rgba(0, 0, 0, 0.3))" : "none"
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
          {/* Gradient for modern X effect */}
          <linearGradient id="xGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={fillColor} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={fillColor} />
          </linearGradient>
          
          {/* Animated gradient for viral effect */}
          <linearGradient id="viralGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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

          {/* Network connection gradient */}
          <radialGradient id="networkGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor="#1e40af" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Tweet bubble gradient */}
          <radialGradient id="tweetBubbleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="50%" stopColor={stroke} stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Share effect gradient */}
          <linearGradient id="shareGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.7" />
            <stop offset="50%" stopColor="#10b981" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.3" />
          </linearGradient>

          {/* Trending pulse gradient */}
          <radialGradient id="trendingGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Network connection aura */}
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="url(#networkGradient)"
          animate={networkControls}
          variants={{
            idle: { 
              scale: 0.8,
              opacity: 0 
            },
            connecting: { 
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

        {/* Official X logo path with enhanced animation */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION * 1.5,
            delay: calculateDelay(0),
          }}
          variants={{
            normal: {
              opacity: 1,
              scale: 1,
              rotate: 0,
              transition: { delay: 0 },
            },
            animate: {
              opacity: [0, 1],
              scale: [0.8, 1],
              rotate: [0, 5],
            },
          }}
        >
          {/* Official X logo shape */}
          <motion.path
            d="M18.9 1.13h3.68l-8.04 9.19L24 22.87h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.13h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.54h2.04L6.48 3.22H4.3l13.31 17.45z"
            fill="url(#xGradient)"
            animate={controls}
            transition={{
              duration: DURATION * 1.5,
              delay: calculateDelay(0),
              ease: "easeInOut",
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
          />
        </motion.g>

        {/* Viral effect overlay */}
        <motion.g
          animate={viralControls}
          variants={{
            idle: { opacity: 0 },
            trending: { 
              opacity: [0, 0.6, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        >
          <motion.path
            d="M18.9 1.13h3.68l-8.04 9.19L24 22.87h-7.41l-5.8-7.58-6.64 7.58H.47l8.6-9.83L0 1.13h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.54h2.04L6.48 3.22H4.3l13.31 17.45z"
            fill="url(#viralGradient)"
          />
        </motion.g>

        {/* Tweet bubbles around the X */}
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
          <motion.circle
            cx="6"
            cy="6"
            r="1"
            fill="url(#tweetBubbleGradient)"
            animate={tweetControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.5 
              },
              tweeting: { 
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.circle
            cx="18"
            cy="18"
            r="0.8"
            fill="url(#tweetBubbleGradient)"
            animate={tweetControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.5 
              },
              tweeting: { 
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }
            }}
          />
          
          <motion.circle
            cx="18"
            cy="6"
            r="0.6"
            fill="url(#tweetBubbleGradient)"
            animate={tweetControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.4 
              },
              tweeting: { 
                scale: [1, 1.6, 1],
                opacity: [0.4, 0.9, 0.4],
                transition: {
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }
              }
            }}
          />
          
          <motion.circle
            cx="6"
            cy="18"
            r="0.7"
            fill="url(#tweetBubbleGradient)"
            animate={tweetControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.4 
              },
              tweeting: { 
                scale: [1, 1.7, 1],
                opacity: [0.4, 1, 0.4],
                transition: {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }
              }
            }}
          />
        </motion.g>

        {/* Social sharing particles */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(2),
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
            cx="3"
            cy="3"
            r="0.3"
            fill="url(#shareGradient)"
            animate={shareControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.4,
                scale: 1
              },
              sharing: { 
                x: [0, 3, 6],
                y: [0, -2, -4],
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }
              }
            }}
          />
          
          <motion.circle
            cx="21"
            cy="21"
            r="0.25"
            fill="url(#shareGradient)"
            animate={shareControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.4,
                scale: 1
              },
              sharing: { 
                x: [0, -3, -6],
                y: [0, 2, 4],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.5, 1],
                transition: {
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.6
                }
              }
            }}
          />
          
          <motion.circle
            cx="21"
            cy="3"
            r="0.2"
            fill="url(#shareGradient)"
            animate={shareControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.3,
                scale: 1
              },
              sharing: { 
                x: [0, -2, -4],
                y: [0, 3, 6],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.6, 1],
                transition: {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1.2
                }
              }
            }}
          />
          
          <motion.circle
            cx="3"
            cy="21"
            r="0.18"
            fill="url(#shareGradient)"
            animate={shareControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.3,
                scale: 1
              },
              sharing: { 
                x: [0, 2, 4],
                y: [0, -3, -6],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.7, 1],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.9
                }
              }
            }}
          />
        </motion.g>

        {/* Network connection nodes */}
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
            cx="12"
            cy="2"
            r="0.6"
            fill={accentColor}
            animate={networkControls}
            variants={{
              idle: { opacity: 0.4 },
              connecting: { 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.circle
            cx="2"
            cy="12"
            r="0.5"
            fill={accentColor}
            animate={networkControls}
            variants={{
              idle: { opacity: 0.4 },
              connecting: { 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }
            }}
          />
          
          <motion.circle
            cx="22"
            cy="12"
            r="0.5"
            fill={accentColor}
            animate={networkControls}
            variants={{
              idle: { opacity: 0.4 },
              connecting: { 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }
              }
            }}
          />
          
          <motion.circle
            cx="12"
            cy="22"
            r="0.6"
            fill={accentColor}
            animate={networkControls}
            variants={{
              idle: { opacity: 0.4 },
              connecting: { 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9
                }
              }
            }}
          />
        </motion.g>

        {/* Trending indicator */}
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
            cx="20"
            cy="4"
            r="1.5"
            fill="url(#trendingGradient)"
            animate={viralControls}
            variants={{
              idle: { 
                scale: 0.8,
                opacity: 0.3 
              },
              trending: { 
                scale: [0.8, 1.2, 0.8],
                opacity: [0.3, 0.7, 0.3],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.path
            d="M18.5 4l1-1 1 1"
            stroke="#ef4444"
            strokeWidth="1"
            fill="none"
            animate={viralControls}
            variants={{
              idle: { 
                opacity: 0.5,
                y: 0 
              },
              trending: { 
                opacity: [0.5, 1, 0.5],
                y: [0, -1, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* X center highlight */}
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
              scale: [0.3, 1],
            },
          }}
        >
          <motion.circle
            cx="12"
            cy="12"
            r="1"
            stroke={accentColor}
            strokeWidth="1.5"
            fill="none"
            animate={tweetControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.3 
              },
              tweeting: { 
                scale: [1, 1.3, 1],
                opacity: [0.3, 0.7, 0.3],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.circle
            cx="12"
            cy="12"
            r="0.3"
            fill={accentColor}
            animate={tweetControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.5 
              },
              tweeting: { 
                scale: [1, 1.4, 1],
                opacity: [0.5, 1, 0.5],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Social media sparkles */}
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
            d="M1 1l0.5 0.5-0.5 0.5-0.5-0.5z"
            fill={accentColor}
            fillOpacity="0.6"
            animate={shareControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              sharing: { 
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.path
            d="M23 23l0.3 0.3-0.3 0.3-0.3-0.3z"
            fill="#10b981"
            fillOpacity="0.6"
            animate={shareControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              sharing: { 
                scale: [1, 1.5, 1],
                rotate: [0, -180, -360],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }
              }
            }}
          />
          
          <motion.path
            d="M23 1l0.4 0.4-0.4 0.4-0.4-0.4z"
            fill="#f59e0b"
            fillOpacity="0.5"
            animate={shareControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              sharing: { 
                scale: [1, 1.3, 1],
                rotate: [0, 90, 180],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }
              }
            }}
          />
          
          <motion.path
            d="M1 23l0.35 0.35-0.35 0.35-0.35-0.35z"
            fill="#ef4444"
            fillOpacity="0.5"
            animate={shareControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              sharing: { 
                scale: [1, 1.6, 1],
                rotate: [0, -90, -180],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9
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

export { XIcon };

// USAGE EXAMPLES:

{/* X/Twitter profile */}
{/* <XIcon 
  href="https://x.com/username"
  target="_blank"
  rel="noopener noreferrer"
  label="Follow on X"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#000000"
  fillColor="#000000"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

 
{/* Share on X */}
{/* <XIcon 
  onClick={(e) => {
    e.preventDefault();
    shareOnX();
  }}
  label="Post on X"
  width={28}
  height={28}
  stroke="#ffffff"
  accentColor="#000000"
  fillColor="#000000"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#1f2937"
  glowEffect={true}
/> */}

{/* X feed/timeline */}
{/* <XIcon 
  href="/x-feed"
  target="_self"
  label="X Timeline"
  width={36}
  height={36}
  stroke="#e5e7eb"
  accentColor="#000000"
  fillColor="#000000"
  strokeWidth={2}
  labelSize={20}
  labelColor="#f3f4f6"
  labelWeight={700}
  glowEffect={true}
/> */}

{/* Social login with X */}
{/* <XIcon 
  onClick={(e) => {
    e.preventDefault();
    loginWithX();
  }}
  label="Login with X"
  width={24}
  height={24}
  stroke="#374151"
  accentColor="#000000"
  fillColor="#000000"
  strokeWidth={1.8}
  labelSize={14}
  labelColor="#6b7280"
  glowEffect={false}
/> */}

{/* X marketing page */}
{/* <XIcon 
  href="/social-media"
  target="_self"
  label="Social Media"
  width={30}
  height={30}
  stroke="#1f2937"
  accentColor="#000000"
  fillColor="#000000"
  strokeWidth={2.2}
  labelSize={16}
  labelColor="#374151"
  glowEffect={true}
/> */}
