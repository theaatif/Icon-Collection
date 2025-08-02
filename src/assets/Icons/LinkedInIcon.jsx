import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation, useSpring, useReducedMotion } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const LinkedInIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#0077B5",
  fillColor = "#0077B5",
  label = null,
  labelSize = 14,
  labelColor = null,
  labelWeight = 500,
  glowEffect = true,
  // Enhanced animation props
  animationDuration = 0.3,
  springConfig = { type: "spring", damping: 12, stiffness: 100 },
  hoverScale = 1.05,
  pressScale = 0.95,
  // Professional networking props
  connectionCount = 0,
  showConnectionBadge = false,
  maxConnectionCount = 500,
  // Accessibility props
  ariaLabel = "LinkedIn",
  role = "button",
  tabIndex = 0,
  // Theme props
  theme = "auto", // "light", "dark", "auto"
  // Animation variants
  animationVariant = "default", // "default", "pulse", "network", "career"
  // Link props
  href = null,
  target = "_blank",
  rel = "noopener noreferrer",
  onClick = null,
  LinkComponent = null,
  linkProps = {},
  ...props
}) => {
  const [isPressed, setIsPressed] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const prefersReducedMotion = useReducedMotion();
  const iconRef = useRef(null);

  // Animation controls
  const controls = useAnimation();
  const containerControls = useAnimation();
  const networkControls = useAnimation();
  const connectionControls = useAnimation();
  const careerControls = useAnimation();
  const professionalControls = useAnimation();
  const badgeControls = useAnimation();
  const particleControls = useAnimation();

  // Spring animations for smoother effects
  const scaleSpring = useSpring(1, { damping: 15, stiffness: 300 });
  const rotateSpring = useSpring(0, { damping: 20, stiffness: 200 });

  // Theme detection
  const [currentTheme, setCurrentTheme] = useState(theme);

  useEffect(() => {
    if (theme === "auto") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      setCurrentTheme(mediaQuery.matches ? "dark" : "light");
      
      const handler = (e) => setCurrentTheme(e.matches ? "dark" : "light");
      mediaQuery.addEventListener("change", handler);
      return () => mediaQuery.removeEventListener("change", handler);
    } else {
      setCurrentTheme(theme);
    }
  }, [theme]);

  // Enhanced animation variants
  const animationVariants = {
    default: {
      hover: {
        scale: hoverScale,
        rotate: 1,
        transition: springConfig
      },
      tap: {
        scale: pressScale,
        transition: { duration: 0.1 }
      }
    },
    pulse: {
      hover: {
        scale: [hoverScale, hoverScale * 1.1, hoverScale],
        transition: {
          scale: {
            repeat: Infinity,
            duration: 1.5,
            ease: "easeInOut"
          }
        }
      },
      tap: {
        scale: pressScale,
        transition: { duration: 0.1 }
      }
    },
    network: {
      hover: {
        scale: hoverScale,
        rotate: [0, 2, -1, 0],
        transition: {
          rotate: {
            repeat: Infinity,
            duration: 2,
            ease: "easeInOut"
          },
          scale: springConfig
        }
      },
      tap: {
        scale: pressScale,
        transition: { duration: 0.1 }
      }
    },
    career: {
      hover: {
        scale: hoverScale,
        y: [0, -2, 0],
        transition: {
          y: {
            repeat: Infinity,
            duration: 1.8,
            ease: "easeInOut"
          },
          scale: springConfig
        }
      },
      tap: {
        scale: pressScale,
        y: 1,
        transition: { duration: 0.1 }
      }
    }
  };

  const handleMouseEnter = () => {
    if (!prefersReducedMotion) {
      controls.start("animate");
      containerControls.start("hover");
      networkControls.start("networking");
      connectionControls.start("connecting");
      careerControls.start("growing");
      professionalControls.start("engaging");
      particleControls.start("floating");
      
      if (connectionCount > 0) {
        badgeControls.start("pulsing");
      }
    }
  };
  
  const handleMouseLeave = () => {
    if (!prefersReducedMotion) {
      controls.start("normal");
      containerControls.start("normal");
      networkControls.start("idle");
      connectionControls.start("idle");
      careerControls.start("idle");
      professionalControls.start("idle");
      particleControls.start("idle");
      badgeControls.start("idle");
    }
    setIsPressed(false);
  };

  const handleMouseDown = () => {
    setIsPressed(true);
    containerControls.start("tap");
  };

  const handleMouseUp = () => {
    setIsPressed(false);
    containerControls.start("hover");
  };

  const handleClick = (e) => {
    // Haptic feedback for mobile devices
    if (navigator.vibrate) {
      navigator.vibrate(50);
    }
    
    if (onClick) {
      onClick(e);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleClick(e);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    if (!prefersReducedMotion) {
      containerControls.start({
        boxShadow: `0 0 0 3px ${accentColor}40`,
        transition: springConfig
      });
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    containerControls.start({
      boxShadow: "0 0 0 0px transparent",
      transition: springConfig
    });
  };

  // Format connection count
  const displayConnectionCount = connectionCount > maxConnectionCount 
    ? `${maxConnectionCount}+` 
    : connectionCount.toString();

  // Theme-based colors
  const themeColors = {
    light: {
      background: "#ffffff",
      text: "#1f2937",
      shadow: "rgba(0, 0, 0, 0.1)"
    },
    dark: {
      background: "#1f2937",
      text: "#ffffff",
      shadow: "rgba(255, 255, 255, 0.1)"
    }
  };

  const currentThemeColors = themeColors[currentTheme];

  // Content component that contains the icon and animations
  const IconContent = () => (
    <motion.div
      ref={iconRef}
      animate={containerControls}
      variants={animationVariants[animationVariant]}
      whileHover={!prefersReducedMotion ? "hover" : undefined}
      whileTap={!prefersReducedMotion ? "tap" : undefined}
      initial="normal"
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
        color: "inherit",
        borderRadius: "12px",
        position: "relative",
        outline: "none"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      role={role}
      tabIndex={tabIndex}
      aria-label={`${ariaLabel}${connectionCount > 0 ? ` (${displayConnectionCount} connections)` : ""}`}
      aria-pressed={isPressed}
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
          {/* LinkedIn brand gradient */}
          <linearGradient id="linkedinGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#004182" />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#00A0DC" />
          </linearGradient>
          
          {/* Animated professional network gradient */}
          <linearGradient id="networkFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0;100 0;-100 0"
              dur={`${2 / (prefersReducedMotion ? 0.5 : 1)}s`}
              repeatCount={prefersReducedMotion ? "1" : "indefinite"}
            />
          </linearGradient>

          {/* Professional networking gradient */}
          <radialGradient id="professionalGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor="#004182" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Connection badge gradient */}
          <radialGradient id="connectionBadgeGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor={accentColor} stopOpacity="0.9" />
            <stop offset="100%" stopColor="#004182" stopOpacity="0.7" />
          </radialGradient>

          {/* Career growth gradient */}
          <radialGradient id="careerGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#00A0DC" stopOpacity="0.6" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Professional particle gradient */}
          <radialGradient id="professionalParticleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.9" />
            <stop offset="70%" stopColor="#004182" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#00A0DC" stopOpacity="0.3" />
          </radialGradient>
        </defs>

        {/* Professional networking aura */}
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="url(#careerGradient)"
          animate={networkControls}
          variants={{
            idle: { 
              scale: 0.8,
              opacity: 0 
            },
            networking: { 
              scale: [0.8, 1.3, 0.8],
              opacity: [0, 0.5, 0],
              transition: {
                duration: prefersReducedMotion ? 1 : 2.5,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Official LinkedIn logo with enhanced animations */}
        <motion.g
          animate={controls}
          transition={{
            duration: animationDuration * 1.5,
            delay: calculateDelay(0),
            ease: "easeInOut",
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
              scale: [0.9, 1],
              rotate: [0, 2],
            },
          }}
        >
          <motion.path
            d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
            fill="url(#linkedinGradient)"
            animate={controls}
            transition={{
              duration: animationDuration * 1.5,
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
                scale: [0.9, 1],
              },
            }}
          />
        </motion.g>

        {/* Professional network overlay */}
        <motion.path
          d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
          fill="url(#networkFlowGradient)"
          animate={networkControls}
          variants={{
            idle: { opacity: 0 },
            networking: { 
              opacity: [0, 0.6, 0],
              transition: {
                duration: prefersReducedMotion ? 1 : 2,
                repeat: prefersReducedMotion ? 0 : Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Connection badge */}
        {showConnectionBadge && connectionCount > 0 && (
          <motion.g
            animate={controls}
            transition={{
              duration: animationDuration,
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
              cx="18"
              cy="6"
              r="2"
              fill="url(#connectionBadgeGradient)"
              animate={badgeControls}
              variants={{
                idle: { 
                  scale: 1,
                  opacity: 0.9 
                },
                pulsing: { 
                  scale: [1, 1.2, 1],
                  opacity: [0.9, 1, 0.9],
                  transition: {
                    duration: prefersReducedMotion ? 0.5 : 1.5,
                    repeat: prefersReducedMotion ? 0 : Infinity,
                    ease: "easeInOut"
                  }
                }
              }}
            />
            
            <motion.circle
              cx="18"
              cy="6"
              r="1.2"
              fill={accentColor}
              animate={badgeControls}
              variants={{
                idle: { opacity: 1 },
                pulsing: { 
                  opacity: [1, 0.8, 1],
                  scale: [1, 1.1, 1],
                  transition: {
                    duration: prefersReducedMotion ? 0.5 : 1.5,
                    repeat: prefersReducedMotion ? 0 : Infinity,
                    ease: "easeInOut"
                  }
                }
              }}
            />
            
            <motion.text
              x="18"
              y="6.5"
              fontSize={connectionCount > 99 ? "1.6" : "2"}
              fill="white"
              textAnchor="middle"
              fontWeight="600"
              animate={badgeControls}
              variants={{
                idle: { opacity: 1 },
                pulsing: { 
                  opacity: [1, 0.9, 1],
                  transition: {
                    duration: prefersReducedMotion ? 0.5 : 1.5,
                    repeat: prefersReducedMotion ? 0 : Infinity,
                    ease: "easeInOut"
                  }
                }
              }}
            >
              {displayConnectionCount}
            </motion.text>
          </motion.g>
        )}

        {/* Professional network nodes */}
        <motion.g
          animate={controls}
          transition={{
            duration: animationDuration,
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
          {[...Array(8)].map((_, index) => (
            <motion.circle
              key={index}
              cx={6 + (index % 4) * 4}
              cy={6 + Math.floor(index / 4) * 12}
              r={0.2 + (index % 3) * 0.1}
              fill="url(#professionalParticleGradient)"
              animate={particleControls}
              variants={{
                idle: { 
                  x: 0,
                  y: 0,
                  opacity: 0.3,
                  scale: 1
                },
                floating: { 
                  x: [0, (index % 2 ? 1 : -1) * (1.5 + index * 0.3), 0],
                  y: [0, (index % 2 ? -1 : 1) * (1 + index * 0.2), 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [1, 1.3 + index * 0.1, 1],
                  transition: {
                    duration: prefersReducedMotion ? 1 : (2.5 + index * 0.2),
                    repeat: prefersReducedMotion ? 0 : Infinity,
                    ease: "easeInOut",
                    delay: index * 0.15
                  }
                }
              }}
            />
          ))}
        </motion.g>

        {/* Connection lines representing network */}
        <motion.g
          animate={controls}
          transition={{
            duration: animationDuration,
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
          {[
            { x1: 12, y1: 3, x2: 18, y2: 6, delay: 0 },
            { x1: 6, y1: 6, x2: 12, y2: 12, delay: 0.2 },
            { x1: 18, y1: 18, x2: 12, y2: 12, delay: 0.4 },
            { x1: 6, y1: 18, x2: 12, y2: 21, delay: 0.6 }
          ].map((line, index) => (
            <motion.path
              key={index}
              d={`M${line.x1} ${line.y1}L${line.x2} ${line.y2}`}
              stroke={accentColor}
              strokeWidth="0.5"
              opacity="0.4"
              animate={connectionControls}
              variants={{
                idle: { 
                  pathLength: 1,
                  opacity: 0.4 
                },
                connecting: { 
                  pathLength: [0, 1, 0.8, 1],
                  opacity: [0.4, 0.8, 0.6, 0.4],
                  transition: {
                    duration: prefersReducedMotion ? 1 : 2.5,
                    repeat: prefersReducedMotion ? 0 : Infinity,
                    ease: "easeInOut",
                    delay: line.delay
                  }
                }
              }}
            />
          ))}
        </motion.g>

        {/* Career growth indicators */}
        <motion.g
          animate={controls}
          transition={{
            duration: animationDuration,
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
          {/* Upward trending arrow */}
          <motion.path
            d="M2 18l4-4 4 4 6-6"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
            opacity="0.6"
            animate={careerControls}
            variants={{
              idle: { 
                pathLength: 1,
                opacity: 0.6 
              },
              growing: { 
                pathLength: [0, 1, 1, 0.8],
                opacity: [0.6, 1, 0.8, 0.6],
                transition: {
                  duration: prefersReducedMotion ? 1 : 3,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.path
            d="M20 12l-3-3v2h-3v2h3v2z"
            fill={accentColor}
            opacity="0.7"
            animate={careerControls}
            variants={{
              idle: { opacity: 0.7 },
              growing: { 
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.2, 1],
                transition: {
                  duration: prefersReducedMotion ? 1 : 2,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Professional sparkles */}
        <motion.g
          animate={controls}
          transition={{
            duration: animationDuration,
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
          {[
            { x: 2, y: 2, color: accentColor, size: 0.5 },
            { x: 22, y: 22, color: "#00A0DC", size: 0.3 },
            { x: 2, y: 22, color: "#004182", size: 0.4 },
            { x: 22, y: 2, color: accentColor, size: 0.35 }
          ].map((sparkle, index) => (
            <motion.path
              key={index}
              d={`M${sparkle.x} ${sparkle.y}l${sparkle.size} ${sparkle.size}-${sparkle.size} ${sparkle.size}-${sparkle.size}-${sparkle.size}z`}
              fill={sparkle.color}
              fillOpacity="0.7"
              animate={professionalControls}
              variants={{
                idle: { 
                  scale: 1,
                  rotate: 0 
                },
                engaging: { 
                  scale: [1, 1.4 + index * 0.2, 1],
                  rotate: [0, 180 * (index % 2 ? 1 : -1), 360 * (index % 2 ? 1 : -1)],
                  transition: {
                    duration: prefersReducedMotion ? 1 : (2.5 + index * 0.3),
                    repeat: prefersReducedMotion ? 0 : Infinity,
                    ease: "easeInOut",
                    delay: index * 0.3
                  }
                }
              }}
            />
          ))}
        </motion.g>

        {/* Professional achievement badge */}
        <motion.g
          animate={controls}
          transition={{
            duration: animationDuration,
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
            animate={professionalControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.4 
              },
              engaging: { 
                scale: [1, 1.3, 1],
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: prefersReducedMotion ? 1 : 2.5,
                  repeat: prefersReducedMotion ? 0 : Infinity,
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
            animate={professionalControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.6 
              },
              engaging: { 
                scale: [1, 1.4, 1],
                opacity: [0.6, 1, 0.6],
                transition: {
                  duration: prefersReducedMotion ? 1 : 2.5,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Professional expertise indicators */}
        <motion.g
          animate={controls}
          transition={{
            duration: animationDuration,
            delay: calculateDelay(7),
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
          {/* Skills/endorsements visualization */}
          <motion.rect
            x="19"
            y="4"
            width="1.5"
            height="1.5"
            rx="0.2"
            fill={accentColor}
            fillOpacity="0.6"
            animate={careerControls}
            variants={{
              idle: { opacity: 0.6 },
              growing: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.3, 1],
                transition: {
                  duration: prefersReducedMotion ? 1 : 2,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.rect
            x="3.5"
            y="18"
            width="1.2"
            height="1.2"
            rx="0.2"
            fill="#00A0DC"
            fillOpacity="0.6"
            animate={careerControls}
            variants={{
              idle: { opacity: 0.6 },
              growing: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.4, 1],
                transition: {
                  duration: prefersReducedMotion ? 1 : 2.2,
                  repeat: prefersReducedMotion ? 0 : Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }
            }}
          />
          
          <motion.rect
            x="20"
            y="19"
            width="1"
            height="1"
            rx="0.2"
            fill="#004182"
            fillOpacity="0.6"
            animate={careerControls}
            variants={{
              idle: { opacity: 0.6 },
              growing: { 
                opacity: [0.6, 1, 0.6],
                scale: [1, 1.5, 1],
                transition: {
                  duration: prefersReducedMotion ? 1 : 1.8,
                  repeat: prefersReducedMotion ? 0 : Infinity,
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
            color: labelColor || currentThemeColors.text,
            fontSize: labelSize,
            fontWeight: labelWeight,
            userSelect: "none",
            textShadow: glowEffect ? `0 0 4px ${accentColor}30` : "none",
            transition: "all 0.2s ease",
            fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          }}
        >
          {label}
        </motion.span>
      )}

      {/* Screen reader announcement for connections */}
      {connectionCount > 0 && (
        <span 
          className="sr-only" 
          aria-live="polite"
          style={{
            position: "absolute",
            width: "1px",
            height: "1px",
            padding: "0",
            margin: "-1px",
            overflow: "hidden",
            clip: "rect(0, 0, 0, 0)",
            whiteSpace: "nowrap",
            border: "0"
          }}
        >
          {`${displayConnectionCount} professional connections`}
        </span>
      )}
    </motion.div>
  );

  // Conditional rendering based on link type
  if (LinkComponent) {
    return (
      <LinkComponent {...linkProps}>
        <IconContent />
      </LinkComponent>
    );
  } else if (href) {
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
    return <IconContent />;
  }
};

export { LinkedInIcon };

// ENHANCED USAGE EXAMPLES:

{/* LinkedIn profile with connections */}
{/* <LinkedInIcon 
  href="https://linkedin.com/in/username"
  target="_blank"
  rel="noopener noreferrer"
  label="LinkedIn Profile"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#0077B5"
  fillColor="#0077B5"
  connectionCount={250}
  showConnectionBadge={true}
  animationVariant="network"
  springConfig={{ type: "spring", damping: 10, stiffness: 150 }}
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
  ariaLabel="Visit LinkedIn profile"
/> */}

{/* Career growth animation variant */}
{/* <LinkedInIcon 
  onClick={(e) => {
    e.preventDefault();
    openLinkedInPage();
  }}
  label="Professional Network"
  width={28}
  height={28}
  animationVariant="career"
  theme="dark"
  connectionCount={500}
  showConnectionBadge={true}
  maxConnectionCount={500}
  strokeWidth={2.5}
  labelSize={16}
  glowEffect={true}
  hoverScale={1.1}
  pressScale={0.9}
/> */}

{/* Professional networking with pulse animation */}
{/* <LinkedInIcon 
  LinkComponent={Link}
  linkProps={{ to: "/networking" }}
  label="Professional Networking"
  width={36}
  height={36}
  animationVariant="pulse"
  connectionCount={150}
  showConnectionBadge={true}
  animationDuration={0.4}
  role="link"
  ariaLabel="Professional networking opportunities"
  tabIndex={0}
  strokeWidth={2}
  labelSize={20}
  labelWeight={700}
  glowEffect={true}
/> */}
