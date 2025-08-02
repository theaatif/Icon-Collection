import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const InstagramIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#E4405F",
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
  const lensControls = useAnimation();
  const flashControls = useAnimation();
  const storyControls = useAnimation();
  const likeControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    lensControls.start("focusing");
    flashControls.start("flashing");
    storyControls.start("scrolling");
    likeControls.start("loving");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    lensControls.start("idle");
    flashControls.start("idle");
    storyControls.start("idle");
    likeControls.start("idle");
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
          filter: glowEffect ? "drop-shadow(0 0 0px rgba(228, 64, 95, 0))" : "none"
        },
        hover: { 
          scale: 1.05, 
          rotate: -2,
          filter: glowEffect ? "drop-shadow(0 0 12px rgba(228, 64, 95, 0.4))" : "none"
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
          {/* Instagram brand gradient */}
          <linearGradient id="instagramGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#feda75" />
            <stop offset="30%" stopColor="#fa7e1e" />
            <stop offset="60%" stopColor="#d62976" />
            <stop offset="100%" stopColor="#962fbf" />
          </linearGradient>
          
          {/* Animated story gradient */}
          <linearGradient id="storyGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="30%" stopColor="#feda75" stopOpacity="0.8" />
            <stop offset="70%" stopColor="#d62976" stopOpacity="0.6" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0;100 0;-100 0"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Camera lens gradient */}
          <radialGradient id="lensGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor="#962fbf" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Flash gradient */}
          <radialGradient id="flashGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor="#feda75" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#fa7e1e" stopOpacity="0.4" />
          </radialGradient>

          {/* Like/heart gradient */}
          <linearGradient id="likeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#ff006e" />
            <stop offset="50%" stopColor="#d62976" />
            <stop offset="100%" stopColor="#962fbf" />
          </linearGradient>

          {/* Photo/post gradient */}
          <radialGradient id="photoGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#fa7e1e" stopOpacity="0.6" />
            <stop offset="70%" stopColor="#d62976" stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Story ring background */}
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="url(#photoGradient)"
          animate={storyControls}
          variants={{
            idle: { 
              scale: 0.8,
              opacity: 0 
            },
            scrolling: { 
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

        {/* Main Instagram camera square with enhanced animation */}
        <motion.rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="6"
          ry="6"
          stroke="url(#instagramGradient)"
          strokeWidth={strokeWidth}
          fill={fillColor}
          strokeDasharray="72"
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
              strokeDashoffset: [72, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
            },
          }}
        />

        {/* Story ring overlay */}
        <motion.rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="6"
          ry="6"
          stroke="url(#storyGradient)"
          strokeWidth={strokeWidth * 0.6}
          fill="none"
          animate={storyControls}
          variants={{
            idle: { opacity: 0 },
            scrolling: { 
              opacity: [0, 0.8, 0],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Camera lens with focusing animation */}
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
          <motion.circle
            cx="12"
            cy="12"
            r="5"
            stroke="url(#instagramGradient)"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray="31.42"
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
                strokeDashoffset: [31.42, 0],
                opacity: [0, 1],
              },
            }}
          />
          
          {/* Lens focus ring */}
          <motion.circle
            cx="12"
            cy="12"
            r="5"
            fill="url(#lensGradient)"
            animate={lensControls}
            variants={{
              idle: { 
                scale: 0.9,
                opacity: 0.3 
              },
              focusing: { 
                scale: [0.9, 1.1, 0.9],
                opacity: [0.3, 0.7, 0.3],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Inner lens with aperture effect */}
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
            cx="12"
            cy="12"
            r="3"
            stroke="url(#instagramGradient)"
            strokeWidth={strokeWidth * 0.8}
            fill="none"
            strokeDasharray="18.85"
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
                strokeDashoffset: [18.85, 0],
                opacity: [0, 1],
              },
            }}
          />
          
          {/* Aperture center */}
          <motion.circle
            cx="12"
            cy="12"
            r="1.5"
            fill={accentColor}
            fillOpacity="0.6"
            animate={lensControls}
            variants={{
              idle: { scale: 1 },
              focusing: { 
                scale: [1, 1.2, 1],
                opacity: [0.6, 0.9, 0.6],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Camera flash with enhanced animation */}
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
              scale: [0.3, 1],
            },
          }}
        >
          <motion.circle
            cx="17"
            cy="7"
            r="1.5"
            fill="url(#flashGradient)"
            animate={flashControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.7 
              },
              flashing: { 
                scale: [1, 1.4, 1],
                opacity: [0.7, 1, 0.7],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.circle
            cx="17"
            cy="7"
            r="0.8"
            fill="#ffffff"
            animate={flashControls}
            variants={{
              idle: { opacity: 0.8 },
              flashing: { 
                opacity: [0.8, 1, 0.8],
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

        {/* Like/heart particles */}
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
            cy="6"
            r="0.8"
            fill="url(#likeGradient)"
            animate={likeControls}
            variants={{
              idle: { opacity: 0.5 },
              loving: { 
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
            cx="18"
            cy="18"
            r="0.6"
            fill="url(#likeGradient)"
            animate={likeControls}
            variants={{
              idle: { opacity: 0.5 },
              loving: { 
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
            cx="6"
            cy="18"
            r="0.4"
            fill="url(#likeGradient)"
            animate={likeControls}
            variants={{
              idle: { opacity: 0.4 },
              loving: { 
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

        {/* Floating engagement particles */}
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
            cx="3"
            cy="12"
            r="0.3"
            fill={stroke}
            animate={storyControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.3 
              },
              scrolling: { 
                x: [0, 3, 6],
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
            cx="21"
            cy="8"
            r="0.25"
            fill={stroke}
            animate={storyControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.3 
              },
              scrolling: { 
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
            cx="2"
            cy="20"
            r="0.2"
            fill={accentColor}
            animate={storyControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.4 
              },
              scrolling: { 
                x: [0, 2, 4],
                y: [0, -1, -2],
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

        {/* Photo frame indicators */}
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
            d="M7 3l-1 1"
            stroke={accentColor}
            strokeWidth="1"
            animate={lensControls}
            variants={{
              idle: { opacity: 0.4 },
              focusing: { 
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.path
            d="M17 3l1 1"
            stroke={accentColor}
            strokeWidth="1"
            animate={lensControls}
            variants={{
              idle: { opacity: 0.4 },
              focusing: { 
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }
              }
            }}
          />
          
          <motion.path
            d="M7 21l-1-1"
            stroke={accentColor}
            strokeWidth="1"
            animate={lensControls}
            variants={{
              idle: { opacity: 0.4 },
              focusing: { 
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }
            }}
          />
          
          <motion.path
            d="M17 21l1-1"
            stroke={accentColor}
            strokeWidth="1"
            animate={lensControls}
            variants={{
              idle: { opacity: 0.4 },
              focusing: { 
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.3, 1],
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

        {/* Viewfinder cross */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
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
              scale: [0.5, 1],
            },
          }}
        >
          <motion.circle
            cx="12"
            cy="12"
            r="0.8"
            stroke={accentColor}
            strokeWidth="1.5"
            fill="none"
            animate={lensControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.3 
              },
              focusing: { 
                scale: [1, 1.2, 1],
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
            animate={lensControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.5 
              },
              focusing: { 
                scale: [1, 1.3, 1],
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
              scale: [0, 1],
            },
          }}
        >
          <motion.path
            d="M1 6l0.5 0.5-0.5 0.5-0.5-0.5z"
            fill="#feda75"
            fillOpacity="0.7"
            animate={likeControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              loving: { 
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
            d="M23 18l0.3 0.3-0.3 0.3-0.3-0.3z"
            fill="#d62976"
            fillOpacity="0.7"
            animate={likeControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              loving: { 
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
            d="M1 18l0.4 0.4-0.4 0.4-0.4-0.4z"
            fill="#962fbf"
            fillOpacity="0.6"
            animate={likeControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              loving: { 
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
            d="M23 6l0.35 0.35-0.35 0.35-0.35-0.35z"
            fill="#fa7e1e"
            fillOpacity="0.6"
            animate={likeControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              loving: { 
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

export { InstagramIcon };

// USAGE EXAMPLES:

{/* Instagram profile */}
{/* <InstagramIcon 
  href="https://instagram.com/username"
  target="_blank"
  rel="noopener noreferrer"
  label="Follow on Instagram"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#E4405F"
  fillColor="#E4405F20"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* Share on Instagram */}
{/* <InstagramIcon 
  onClick={(e) => {
    e.preventDefault();
    shareOnInstagram();
  }}
  label="Share on Instagram"
  width={28}
  height={28}
  stroke="#e1306c"
  accentColor="#d62976"
  fillColor="#e1306c15"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#e1306c"
  glowEffect={true}
/> */}

{/* Instagram feed/stories */}
{/* <InstagramIcon 
  href="/instagram-feed"
  target="_self"
  label="Stories"
  width={36}
  height={36}
  stroke="#e5e7eb"
  accentColor="#fa7e1e"
  fillColor="#fa7e1e25"
  strokeWidth={2}
  labelSize={20}
  labelColor="#f3f4f6"
  labelWeight={700}
  glowEffect={true}
/> */}

{/* Social login with Instagram */}
{/* <InstagramIcon 
  onClick={(e) => {
    e.preventDefault();
    loginWithInstagram();
  }}
  label="Login with Instagram"
  width={24}
  height={24}
  stroke="#374151"
  accentColor="#962fbf"
  fillColor="#96309f20"
  strokeWidth={1.8}
  labelSize={14}
  labelColor="#6b7280"
  glowEffect={false}
/> */}

{/* Photography/gallery page */}
{/* <InstagramIcon 
  href="/gallery"
  target="_self"
  label="Photo Gallery"
  width={30}
  height={30}
  stroke="#1f2937"
  accentColor="#d62976"
  fillColor="#d6297615"
  strokeWidth={2.2}
  labelSize={16}
  labelColor="#374151"
  glowEffect={true}
/> */}

{/* Instagram embed/widget */}
{/* <InstagramIcon 
  onClick={(e) => {
    e.preventDefault();
    openInstagramEmbed();
  }}
  label="Instagram Posts"
  width={26}
  height={26}
  stroke="#feda75"
  accentColor="#fa7e1e"
  fillColor="#feda7525"
  strokeWidth={2}
  labelSize={15}
  labelColor="#92400e"
  glowEffect={true}
/> */}
