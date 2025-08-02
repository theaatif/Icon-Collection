import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const FacebookIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#1877F2",
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
  const connectionControls = useAnimation();
  const waveControls = useAnimation();
  const engagementControls = useAnimation();
  const socialControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    connectionControls.start("connecting");
    waveControls.start("waving");
    engagementControls.start("engaging");
    socialControls.start("socializing");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    connectionControls.start("idle");
    waveControls.start("idle");
    engagementControls.start("idle");
    socialControls.start("idle");
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
          filter: glowEffect ? "drop-shadow(0 0 0px rgba(24, 119, 242, 0))" : "none"
        },
        hover: { 
          scale: 1.05, 
          rotate: 1,
          filter: glowEffect ? "drop-shadow(0 0 10px rgba(24, 119, 242, 0.4))" : "none"
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
          {/* Facebook brand gradient */}
          <linearGradient id="facebookGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stroke} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={stroke} />
          </linearGradient>
          
          {/* Animated social wave gradient */}
          <linearGradient id="socialWaveGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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

          {/* Connection network gradient */}
          <radialGradient id="networkGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor="#4267B2" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Engagement gradient */}
          <radialGradient id="engagementGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#42B883" stopOpacity="0.7" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Social activity gradient */}
          <linearGradient id="activityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.7" />
            <stop offset="50%" stopColor="#42B883" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FF6B35" stopOpacity="0.3" />
          </linearGradient>

          {/* News feed gradient */}
          <radialGradient id="feedGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#FF6B35" stopOpacity="0.6" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Social network aura */}
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="url(#networkGradient)"
          animate={connectionControls}
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

        {/* Main Facebook F with enhanced animation */}
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
              rotate: [0, 2],
            },
          }}
        >
          <motion.path
            d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
            stroke="url(#facebookGradient)"
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
                scale: [0.9, 1],
              },
            }}
          />
        </motion.g>

        {/* Social wave overlay */}
        <motion.path
          d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"
          stroke="url(#socialWaveGradient)"
          strokeWidth={strokeWidth * 0.6}
          fill="none"
          animate={waveControls}
          variants={{
            idle: { opacity: 0 },
            waving: { 
              opacity: [0, 0.8, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* News feed squares */}
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
          <motion.rect
            x="3"
            y="3"
            width="2"
            height="2"
            rx="0.3"
            fill="url(#engagementGradient)"
            animate={socialControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.5 
              },
              socializing: { 
                scale: [1, 1.3, 1],
                opacity: [0.5, 1, 0.5],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.rect
            x="19"
            y="19"
            width="2"
            height="2"
            rx="0.3"
            fill="url(#engagementGradient)"
            animate={socialControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.5 
              },
              socializing: { 
                scale: [1, 1.4, 1],
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
          
          <motion.rect
            x="3"
            y="19"
            width="1.5"
            height="1.5"
            rx="0.3"
            fill="url(#engagementGradient)"
            animate={socialControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.4 
              },
              socializing: { 
                scale: [1, 1.5, 1],
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
          
          <motion.rect
            x="19"
            y="3"
            width="1.5"
            height="1.5"
            rx="0.3"
            fill="url(#engagementGradient)"
            animate={socialControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.4 
              },
              socializing: { 
                scale: [1, 1.6, 1],
                opacity: [0.4, 0.9, 0.4],
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

        {/* Social connection particles */}
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
            cx="6"
            cy="6"
            r="0.4"
            fill="url(#activityGradient)"
            animate={engagementControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.4,
                scale: 1
              },
              engaging: { 
                x: [0, 2, 4],
                y: [0, -1, -2],
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
            cx="18"
            cy="18"
            r="0.35"
            fill="url(#activityGradient)"
            animate={engagementControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.4,
                scale: 1
              },
              engaging: { 
                x: [0, -2, -4],
                y: [0, 1, 2],
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
            cx="18"
            cy="6"
            r="0.3"
            fill="url(#activityGradient)"
            animate={engagementControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.3,
                scale: 1
              },
              engaging: { 
                x: [0, -1, -2],
                y: [0, 2, 4],
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
            cx="6"
            cy="18"
            r="0.25"
            fill="url(#activityGradient)"
            animate={engagementControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.3,
                scale: 1
              },
              engaging: { 
                x: [0, 1, 2],
                y: [0, -2, -4],
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

        {/* Social network nodes */}
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
            cy="3"
            r="0.6"
            fill={accentColor}
            animate={connectionControls}
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
            cx="3"
            cy="12"
            r="0.5"
            fill={accentColor}
            animate={connectionControls}
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
            cx="21"
            cy="12"
            r="0.5"
            fill={accentColor}
            animate={connectionControls}
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
            cy="21"
            r="0.6"
            fill={accentColor}
            animate={connectionControls}
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

        {/* Engagement indicator */}
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
            cx="19"
            cy="5"
            r="1.5"
            fill="url(#feedGradient)"
            animate={engagementControls}
            variants={{
              idle: { 
                scale: 0.8,
                opacity: 0.3 
              },
              engaging: { 
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
            d="M17.5 5l1-1 1 1"
            stroke="#FF6B35"
            strokeWidth="1"
            fill="none"
            animate={engagementControls}
            variants={{
              idle: { 
                opacity: 0.5,
                y: 0 
              },
              engaging: { 
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

        {/* Facebook center highlight */}
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
            animate={socialControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.3 
              },
              socializing: { 
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
            animate={socialControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.5 
              },
              socializing: { 
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
            d="M2 2l0.5 0.5-0.5 0.5-0.5-0.5z"
            fill={accentColor}
            fillOpacity="0.7"
            animate={engagementControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              engaging: { 
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
            d="M22 22l0.3 0.3-0.3 0.3-0.3-0.3z"
            fill="#42B883"
            fillOpacity="0.7"
            animate={engagementControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              engaging: { 
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
            d="M22 2l0.4 0.4-0.4 0.4-0.4-0.4z"
            fill="#FF6B35"
            fillOpacity="0.6"
            animate={engagementControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              engaging: { 
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
            d="M2 22l0.35 0.35-0.35 0.35-0.35-0.35z"
            fill="#4267B2"
            fillOpacity="0.6"
            animate={engagementControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              engaging: { 
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

export { FacebookIcon };

// USAGE EXAMPLES:

{/* Facebook profile */}
{/* <FacebookIcon 
  href="https://facebook.com/username"
  target="_blank"
  rel="noopener noreferrer"
  label="Follow on Facebook"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#1877F2"
  fillColor="#1877F220"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* Share on Facebook */}
{/* <FacebookIcon 
  onClick={(e) => {
    e.preventDefault();
    shareOnFacebook();
  }}
  label="Share on Facebook"
  width={28}
  height={28}
  stroke="#1877f2"
  accentColor="#4267B2"
  fillColor="#1877f215"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#1877f2"
  glowEffect={true}
/> */}

{/* Facebook feed/news */}
{/* <FacebookIcon 
  href="/facebook-feed"
  target="_self"
  label="News Feed"
  width={36}
  height={36}
  stroke="#e5e7eb"
  accentColor="#1877F2"
  fillColor="#1877F225"
  strokeWidth={2}
  labelSize={20}
  labelColor="#f3f4f6"
  labelWeight={700}
  glowEffect={true}
/> */}

{/* Social login with Facebook */}
{/* <FacebookIcon 
  onClick={(e) => {
    e.preventDefault();
    loginWithFacebook();
  }}
  label="Login with Facebook"
  width={24}
  height={24}
  stroke="#374151"
  accentColor="#4267B2"
  fillColor="#4267b220"
  strokeWidth={1.8}
  labelSize={14}
  labelColor="#6b7280"
  glowEffect={false}
/> */}

{/* Social media page */}
{/* <FacebookIcon 
  href="/social-media"
  target="_self"
  label="Social Media"
  width={30}
  height={30}
  stroke="#1f2937"
  accentColor="#1877F2"
  fillColor="#1877f215"
  strokeWidth={2.2}
  labelSize={16}
  labelColor="#374151"
  glowEffect={true}
/> */}

{/* Facebook embed/widget */}
{/* <FacebookIcon 
  onClick={(e) => {
    e.preventDefault();
    openFacebookEmbed();
  }}
  label="Facebook Posts"
  width={26}
  height={26}
  stroke="#42B883"
  accentColor="#1877F2"
  fillColor="#42b88325"
  strokeWidth={2}
  labelSize={15}
  labelColor="#059669"
  glowEffect={true}
/> */}
