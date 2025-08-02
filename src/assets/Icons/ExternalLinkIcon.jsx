import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const ExternalLinkIcon = ({
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
  const launchControls = useAnimation();
  const portalControls = useAnimation();
  const trailControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    launchControls.start("launching");
    portalControls.start("opening");
    trailControls.start("trailing");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    launchControls.start("idle");
    portalControls.start("closed");
    trailControls.start("idle");
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
          rotate: 5,
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
          <linearGradient id="externalGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stroke} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={stroke} />
          </linearGradient>
          
          {/* Animated gradient for launch trail */}
          <linearGradient id="launchTrailGradient" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor={stroke} stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-50 50;50 -50;-50 50"
              dur="2s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Pulsing gradient for portal effect */}
          <radialGradient id="portalGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.9" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Launch ripple gradient */}
          <radialGradient id="rippleGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.2" />
          </radialGradient>

          {/* Gateway glow gradient */}
          <linearGradient id="gatewayGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor={stroke} stopOpacity="0.6" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.8" />
          </linearGradient>
        </defs>

        {/* Launch ripple background */}
        <motion.circle
          cx="18"
          cy="6"
          r="8"
          fill="url(#rippleGradient)"
          animate={launchControls}
          variants={{
            idle: { 
              scale: 0.5,
              opacity: 0 
            },
            launching: { 
              scale: [0.5, 1.5, 2],
              opacity: [0, 0.6, 0],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeOut"
              }
            }
          }}
        />

        {/* Main box/window with enhanced animation */}
        <motion.path
          d="M3 3h6l4 4-4 4H3a2 2 0 01-2-2V5a2 2 0 012-2z"
          stroke="url(#externalGradient)"
          strokeWidth={strokeWidth}
          fill={fillColor}
          strokeDasharray="32"
          animate={controls}
          transition={{
            duration: DURATION * 1.2,
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
              strokeDashoffset: [32, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
            },
          }}
        />

        {/* Portal opening effect */}
        <motion.circle
          cx="7"
          cy="7"
          r="3"
          fill="url(#portalGradient)"
          animate={portalControls}
          variants={{
            closed: { 
              scale: 0,
              opacity: 0 
            },
            opening: { 
              scale: [0, 1.2, 0.8, 1],
              opacity: [0, 0.8, 0.6, 0.4],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* External arrow with launch animation */}
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
              x: 0,
              y: 0,
              transition: { delay: 0 },
            },
            animate: {
              opacity: [0, 1],
              scale: [0.8, 1],
              x: [5, 0],
              y: [5, 0],
            },
          }}
        >
          <motion.path
            d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"
            stroke="url(#externalGradient)"
            strokeWidth={strokeWidth}
            strokeDasharray="30"
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
                strokeDashoffset: [30, 0],
                opacity: [0, 1],
              },
            }}
          />
        </motion.g>

        {/* Launch arrow with enhanced animation */}
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
            d="M15 3h6v6"
            stroke="url(#externalGradient)"
            strokeWidth={strokeWidth + 0.5}
            strokeDasharray="12"
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
                strokeDashoffset: [12, 0],
                opacity: [0, 1],
              },
            }}
          />
          
          <motion.path
            d="M21 3l-8 8"
            stroke="url(#externalGradient)"
            strokeWidth={strokeWidth + 0.5}
            strokeDasharray="11.31"
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
                transition: { delay: 0 },
              },
              animate: {
                strokeDashoffset: [11.31, 0],
                opacity: [0, 1],
              },
            }}
          />
        </motion.g>

        {/* Launch trail effect */}
        <motion.path
          d="M21 3l-8 8"
          stroke="url(#launchTrailGradient)"
          strokeWidth={strokeWidth * 2}
          animate={trailControls}
          variants={{
            idle: { opacity: 0 },
            trailing: { 
              opacity: [0, 0.8, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Launch particles */}
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
            cx="19"
            cy="5"
            r="0.8"
            fill={accentColor}
            animate={launchControls}
            variants={{
              idle: { opacity: 0.5 },
              launching: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.4, 1],
                x: [0, 2, 4],
                y: [0, -2, -4],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }
              }
            }}
          />
          <motion.circle
            cx="19"
            cy="5"
            r="0.4"
            fill={stroke}
            animate={launchControls}
            variants={{
              idle: { opacity: 0.8 },
              launching: { 
                opacity: [0.8, 1, 0.8],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Gateway connection lines */}
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
            d="M10 4l2-1"
            stroke={accentColor}
            strokeWidth="1"
            animate={launchControls}
            variants={{
              idle: { opacity: 0.4 },
              launching: { 
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M10 10l2 1"
            stroke={accentColor}
            strokeWidth="1"
            animate={launchControls}
            variants={{
              idle: { opacity: 0.4 },
              launching: { 
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }
            }}
          />
        </motion.g>

        {/* Floating launch particles */}
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
            cx="16"
            cy="7"
            r="0.3"
            fill={stroke}
            animate={trailControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.3 
              },
              trailing: { 
                x: [0, 3, 6],
                y: [0, -3, -6],
                opacity: [0.3, 0.8, 0],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeOut"
                }
              }
            }}
          />
          <motion.circle
            cx="17"
            cy="6"
            r="0.2"
            fill={stroke}
            animate={trailControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.3 
              },
              trailing: { 
                x: [0, 4, 8],
                y: [0, -4, -8],
                opacity: [0.3, 0.8, 0],
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
            cx="15"
            cy="8"
            r="0.25"
            fill={accentColor}
            animate={trailControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.4 
              },
              trailing: { 
                x: [0, 2, 4],
                y: [0, -2, -4],
                opacity: [0.4, 0.9, 0],
                transition: {
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.6
                }
              }
            }}
          />
        </motion.g>

        {/* Launch vector lines */}
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
            d="M22 1l-1 2"
            stroke={accentColor}
            strokeWidth="0.8"
            animate={launchControls}
            variants={{
              idle: { opacity: 0.3 },
              launching: { 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M23 2l-2 1"
            stroke={accentColor}
            strokeWidth="0.6"
            animate={launchControls}
            variants={{
              idle: { opacity: 0.3 },
              launching: { 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }
              }
            }}
          />
        </motion.g>

        {/* Portal destination indicator */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(8),
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
            cx="21"
            cy="3"
            r="1.5"
            fill="url(#gatewayGradient)"
            animate={portalControls}
            variants={{
              closed: { opacity: 0.2 },
              opening: { 
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 1.2, 1],
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
              x: 3
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

export { ExternalLinkIcon };

// USAGE EXAMPLES:

{/* External website link */}
{/* <ExternalLinkIcon 
  href="https://example.com"
  target="_blank"
  rel="noopener noreferrer"
  label="Visit Site"
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

{/* Documentation link */}
{/* <ExternalLinkIcon 
  href="https://docs.example.com"
  target="_blank"
  label="Documentation"
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

{/* API reference */}
{/* <ExternalLinkIcon 
  href="https://api.example.com"
  target="_blank"
  rel="noopener noreferrer"
  label="API Reference"
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

{/* Social media link */}
{/* <ExternalLinkIcon 
  href="https://twitter.com/username"
  target="_blank"
  rel="noopener noreferrer"
  label="Follow Us"
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

{/* Custom external action */}
{/* <ExternalLinkIcon 
  onClick={(e) => {
    e.preventDefault();
    window.open('https://example.com', '_blank');
    trackExternalClick('example-link');
  }}
  label="Launch App"
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

{/* Download link */}
{/* <ExternalLinkIcon 
  href="/downloads/file.pdf"
  target="_blank"
  rel="noopener"
  label="Download PDF"
  width={26}
  height={26}
  stroke="#dc2626"
  accentColor="#ef4444"
  fillColor="#dc262620"
  strokeWidth={2}
  labelSize={15}
  labelColor="#7f1d1d"
  glowEffect={true}
/> */}
