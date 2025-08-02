import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const SparklesIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#fbbf24",
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
  const twinkleControls = useAnimation();
  const shimmerControls = useAnimation();
  const magicControls = useAnimation();
  const stardustControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    twinkleControls.start("twinkling");
    shimmerControls.start("shimmering");
    magicControls.start("magical");
    stardustControls.start("floating");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    twinkleControls.start("idle");
    shimmerControls.start("idle");
    magicControls.start("idle");
    stardustControls.start("idle");
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
          filter: glowEffect ? "drop-shadow(0 0 0px rgba(251, 191, 36, 0))" : "none"
        },
        hover: { 
          scale: 1.05, 
          rotate: 3,
          filter: glowEffect ? "drop-shadow(0 0 12px rgba(251, 191, 36, 0.5))" : "none"
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
          {/* Gradient for magical sparkle effect */}
          <linearGradient id="sparkleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="30%" stopColor={accentColor} />
            <stop offset="70%" stopColor="#f472b6" />
            <stop offset="100%" stopColor={stroke} />
          </linearGradient>
          
          {/* Animated gradient for shimmer effect */}
          <linearGradient id="shimmerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="20%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="40%" stopColor={accentColor} stopOpacity="0.9" />
            <stop offset="60%" stopColor="#f472b6" stopOpacity="0.7" />
            <stop offset="80%" stopColor="#ffffff" stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0;100 0;-100 0"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Magical aura gradient */}
          <radialGradient id="magicalAuraGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="40%" stopColor="#f472b6" stopOpacity="0.3" />
            <stop offset="80%" stopColor="#a855f7" stopOpacity="0.1" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Star twinkle gradient */}
          <radialGradient id="twinkleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Stardust gradient */}
          <radialGradient id="stardustGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor="#f472b6" stopOpacity="0.3" />
          </radialGradient>

          {/* Magic trail gradient - FIXED */}
          <linearGradient id="magicTrailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor={accentColor} stopOpacity="0.7" />
            <stop offset="70%" stopColor="#f472b6" stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>

        {/* Magical aura background */}
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="url(#magicalAuraGradient)"
          animate={magicControls}
          variants={{
            idle: { 
              scale: 0.8,
              opacity: 0 
            },
            magical: { 
              scale: [0.8, 1.4, 0.8],
              opacity: [0, 0.6, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Main large sparkle/star with enhanced animation */}
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
              scale: [0.7, 1],
              rotate: [0, 15],
            },
          }}
        >
          <motion.path
            d="M12 2l3.09 6.31L22 9.27l-5.18 5.03L18.18 22L12 18.56 5.82 22l1.36-7.7L2 9.27l6.91-.96L12 2z"
            stroke="url(#sparkleGradient)"
            strokeWidth={strokeWidth}
            fill={fillColor}
            strokeDasharray="60"
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
                strokeDashoffset: [60, 0],
                opacity: [0, 1],
                scale: [0.8, 1],
              },
            }}
          />

          {/* Shimmer overlay on main star */}
          <motion.path
            d="M12 2l3.09 6.31L22 9.27l-5.18 5.03L18.18 22L12 18.56 5.82 22l1.36-7.7L2 9.27l6.91-.96L12 2z"
            stroke="url(#shimmerGradient)"
            strokeWidth={strokeWidth * 0.6}
            fill="none"
            animate={shimmerControls}
            variants={{
              idle: { opacity: 0 },
              shimmering: { 
                opacity: [0, 0.8, 0],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />

          {/* Star core glow */}
          <motion.circle
            cx="12"
            cy="12"
            r="2"
            fill="url(#twinkleGradient)"
            animate={twinkleControls}
            variants={{
              idle: { 
                scale: 0.8,
                opacity: 0.4 
              },
              twinkling: { 
                scale: [0.8, 1.3, 0.8],
                opacity: [0.4, 1, 0.4],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Small sparkles constellation */}
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
          {/* Top right sparkle */}
          <motion.g
            animate={twinkleControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              twinkling: { 
                scale: [1, 1.4, 1],
                rotate: [0, 180, 360],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          >
            <motion.path
              d="M18 6l1 2 2 1-2 1-1 2-1-2-2-1 2-1z"
              fill={accentColor}
              fillOpacity="0.8"
            />
            <motion.circle
              cx="18"
              cy="6"
              r="1"
              fill="url(#twinkleGradient)"
              animate={twinkleControls}
              variants={{
                idle: { opacity: 0.6 },
                twinkling: { 
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
          </motion.g>

          {/* Bottom left sparkle */}
          <motion.g
            animate={twinkleControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              twinkling: { 
                scale: [1, 1.3, 1],
                rotate: [0, -180, -360],
                transition: {
                  duration: 2.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }
            }}
          >
            <motion.path
              d="M6 18l0.8 1.6 1.6 0.8-1.6 0.8-0.8 1.6-0.8-1.6-1.6-0.8 1.6-0.8z"
              fill="#f472b6"
              fillOpacity="0.8"
            />
            <motion.circle
              cx="6"
              cy="18"
              r="0.8"
              fill="url(#twinkleGradient)"
              animate={twinkleControls}
              variants={{
                idle: { opacity: 0.5 },
                twinkling: { 
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.3, 1],
                  transition: {
                    duration: 1.8,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.4
                  }
                }
              }}
            />
          </motion.g>

          {/* Top left small sparkle */}
          <motion.g
            animate={twinkleControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              twinkling: { 
                scale: [1, 1.5, 1],
                rotate: [0, 90, 180],
                transition: {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8
                }
              }
            }}
          >
            <motion.path
              d="M4 8l0.6 1.2 1.2 0.6-1.2 0.6-0.6 1.2-0.6-1.2-1.2-0.6 1.2-0.6z"
              fill="#a855f7"
              fillOpacity="0.7"
            />
            <motion.circle
              cx="4"
              cy="8"
              r="0.6"
              fill="url(#twinkleGradient)"
              animate={twinkleControls}
              variants={{
                idle: { opacity: 0.4 },
                twinkling: { 
                  opacity: [0.4, 0.9, 0.4],
                  scale: [1, 1.4, 1],
                  transition: {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 0.8
                  }
                }
              }}
            />
          </motion.g>

          {/* Bottom right tiny sparkle */}
          <motion.g
            animate={twinkleControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              twinkling: { 
                scale: [1, 1.6, 1],
                rotate: [0, -90, -180],
                transition: {
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2
                }
              }
            }}
          >
            <motion.path
              d="M20 16l0.4 0.8 0.8 0.4-0.8 0.4-0.4 0.8-0.4-0.8-0.8-0.4 0.8-0.4z"
              fill={accentColor}
              fillOpacity="0.6"
            />
            <motion.circle
              cx="20"
              cy="16"
              r="0.4"
              fill="url(#twinkleGradient)"
              animate={twinkleControls}
              variants={{
                idle: { opacity: 0.3 },
                twinkling: { 
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.5, 1],
                  transition: {
                    duration: 1,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1.2
                  }
                }
              }}
            />
          </motion.g>
        </motion.g>

        {/* Floating stardust particles */}
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
            cx="8"
            cy="4"
            r="0.3"
            fill="url(#stardustGradient)"
            animate={stardustControls}
            variants={{
              idle: { 
                y: 0,
                x: 0,
                opacity: 0.4,
                scale: 1
              },
              floating: { 
                y: [-2, 2, -2],
                x: [-1, 1, -1],
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="16"
            cy="20"
            r="0.25"
            fill="url(#stardustGradient)"
            animate={stardustControls}
            variants={{
              idle: { 
                y: 0,
                x: 0,
                opacity: 0.4,
                scale: 1
              },
              floating: { 
                y: [2, -2, 2],
                x: [1, -1, 1],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.4, 1],
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
            cx="22"
            cy="8"
            r="0.2"
            fill="url(#stardustGradient)"
            animate={stardustControls}
            variants={{
              idle: { 
                y: 0,
                x: 0,
                opacity: 0.3,
                scale: 1
              },
              floating: { 
                y: [-1, 1, -1],
                x: [-0.5, 0.5, -0.5],
                opacity: [0.3, 0.7, 0.3],
                scale: [1, 1.5, 1],
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
            cx="2"
            cy="16"
            r="0.15"
            fill="url(#stardustGradient)"
            animate={stardustControls}
            variants={{
              idle: { 
                y: 0,
                x: 0,
                opacity: 0.3,
                scale: 1
              },
              floating: { 
                y: [1.5, -1.5, 1.5],
                x: [0.5, -0.5, 0.5],
                opacity: [0.3, 0.6, 0.3],
                scale: [1, 1.6, 1],
                transition: {
                  duration: 3.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9
                }
              }
            }}
          />
        </motion.g>

        {/* Magic wand trails */}
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
          <motion.path
            d="M3 21c3-2 6 1 9-1s6 1 9-1"
            stroke="url(#magicTrailGradient)"
            strokeWidth="1"
            fill="none"
            animate={magicControls}
            variants={{
              idle: { 
                pathLength: 1,
                opacity: 0.2 
              },
              magical: { 
                pathLength: [0, 1, 0.8, 1],
                opacity: [0.2, 0.6, 0.4, 0.2],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M2 3c2 1.5 4-0.5 6 1s4-0.5 6 1 4-0.5 6 1"
            stroke="url(#magicTrailGradient)"
            strokeWidth="0.8"
            fill="none"
            animate={magicControls}
            variants={{
              idle: { 
                pathLength: 1,
                opacity: 0.15 
              },
              magical: { 
                pathLength: [0, 1, 0.6, 1],
                opacity: [0.15, 0.5, 0.3, 0.15],
                transition: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }
              }
            }}
          />
        </motion.g>

        {/* Glittering accent dots */}
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
            cx="10"
            cy="2"
            r="0.5"
            fill={accentColor}
            animate={twinkleControls}
            variants={{
              idle: { opacity: 0.5 },
              twinkling: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 1.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.circle
            cx="14"
            cy="22"
            r="0.4"
            fill="#f472b6"
            animate={twinkleControls}
            variants={{
              idle: { opacity: 0.5 },
              twinkling: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.5, 1],
                transition: {
                  duration: 1.1,
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
            r="0.3"
            fill="#a855f7"
            animate={twinkleControls}
            variants={{
              idle: { opacity: 0.4 },
              twinkling: { 
                opacity: [0.4, 0.9, 0.4],
                scale: [1, 1.6, 1],
                transition: {
                  duration: 0.9,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }
              }
            }}
          />
          <motion.circle
            cx="2"
            cy="12"
            r="0.25"
            fill="#ffffff"
            animate={twinkleControls}
            variants={{
              idle: { opacity: 0.3 },
              twinkling: { 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.7, 1],
                transition: {
                  duration: 0.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.9
                }
              }
            }}
          />
        </motion.g>

        {/* Constellation connecting lines */}
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
          <motion.path
            d="M12 12l6-6"
            stroke={accentColor}
            strokeWidth="0.5"
            opacity="0.3"
            animate={shimmerControls}
            variants={{
              idle: { 
                pathLength: 1,
                opacity: 0.3 
              },
              shimmering: { 
                pathLength: [0, 1, 0.7, 1],
                opacity: [0.3, 0.7, 0.5, 0.3],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M12 12l-6 6"
            stroke="#f472b6"
            strokeWidth="0.4"
            opacity="0.25"
            animate={shimmerControls}
            variants={{
              idle: { 
                pathLength: 1,
                opacity: 0.25 
              },
              shimmering: { 
                pathLength: [0, 1, 0.8, 1],
                opacity: [0.25, 0.6, 0.4, 0.25],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }
            }}
          />
        </motion.g>

        {/* Central star burst */}
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
              scale: [0.5, 1],
            },
          }}
        >
          <motion.circle
            cx="12"
            cy="12"
            r="0.8"
            stroke={accentColor}
            strokeWidth="2"
            fill="none"
            animate={twinkleControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.4 
              },
              twinkling: { 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
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
            textShadow: glowEffect ? `0 0 4px ${accentColor}40` : "none",
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

export { SparklesIcon };

// USAGE EXAMPLES:

{/* AI/Magic features */}
{/* <SparklesIcon 
  href="/ai-features"
  target="_self"
  label="AI Magic"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#fbbf24"
  fillColor="#fbbf2420"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* Premium/special content */}
{/* <SparklesIcon 
  onClick={(e) => {
    e.preventDefault();
    showPremiumFeatures();
  }}
  label="Premium"
  width={28}
  height={28}
  stroke="#a855f7"
  accentColor="#f472b6"
  fillColor="#a855f720"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#581c87"
  glowEffect={true}
/> */}

{/* Enhancement/upgrade */}
{/* <SparklesIcon 
  href="/upgrade"
  target="_self"
  label="Enhance"
  width={36}
  height={36}
  stroke="#e5e7eb"
  accentColor="#fbbf24"
  fillColor="#fbbf2425"
  strokeWidth={2}
  labelSize={20}
  labelColor="#f3f4f6"
  labelWeight={700}
  glowEffect={true}
/> */}

{/* Achievement/celebration */}
{/* <SparklesIcon 
  onClick={(e) => {
    e.preventDefault();
    celebrateAchievement();
  }}
  label="Achievement!"
  width={24}
  height={24}
  stroke="#f59e0b"
  accentColor="#fbbf24"
  fillColor="#f59e0b30"
  strokeWidth={1.8}
  labelSize={14}
  labelColor="#78350f"
  glowEffect={false}
/> */}

{/* Magic/fantasy theme */}
{/* <SparklesIcon 
  href="/magic-world"
  target="_self"
  label="Enter Magic World"
  width={30}
  height={30}
  stroke="#1f2937"
  accentColor="#a855f7"
  fillColor="#a855f715"
  strokeWidth={2.2}
  labelSize={16}
  labelColor="#374151"
  glowEffect={true}
/> */}

{/* Special effects/filters */}
{/* <SparklesIcon 
  onClick={(e) => {
    e.preventDefault();
    applyMagicFilter();
  }}
  label="Add Sparkles"
  width={26}
  height={26}
  stroke="#ec4899"
  accentColor="#f472b6"
  fillColor="#ec489925"
  strokeWidth={2}
  labelSize={15}
  labelColor="#be1866"
  glowEffect={true}
/> */}
