import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const PaletteIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#8b5cf6",
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
  const paintControls = useAnimation();
  const colorControls = useAnimation();
  const splashControls = useAnimation();
  const mixControls = useAnimation();

  // Reset all controls on mount
  useEffect(() => {
    const resetControls = async () => {
      await controls.start("normal");
      await containerControls.start("normal");
      await paintControls.start("idle");
      await colorControls.start("idle");
      await splashControls.start("idle");
      await mixControls.start("idle");
    };
    resetControls();
  }, []);

  const handleMouseEnter = async () => {
    // Stop any ongoing animations first
    await controls.stop();
    await containerControls.stop();
    await paintControls.stop();
    await colorControls.stop();
    await splashControls.stop();
    await mixControls.stop();

    // Start new animations
    controls.start("animate");
    containerControls.start("hover");
    paintControls.start("painting");
    colorControls.start("flowing");
    splashControls.start("splashing");
    mixControls.start("mixing");
  };

  const handleMouseLeave = async () => {
    // Stop any ongoing animations first
    await controls.stop();
    await containerControls.stop();
    await paintControls.stop();
    await colorControls.stop();
    await splashControls.stop();
    await mixControls.stop();

    // Reset to normal state
    controls.start("normal");
    containerControls.start("normal");
    paintControls.start("idle");
    colorControls.start("idle");
    splashControls.start("idle");
    mixControls.start("idle");
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  // Content component that contains the icon and animations
  const IconContent = () => (
    <motion.div
      key={`palette-${Date.now()}`}
      animate={containerControls}
      variants={{
        normal: {
          scale: 1,
          rotate: 0,
          filter: glowEffect
            ? "drop-shadow(0 0 0px rgba(139, 92, 246, 0))"
            : "none",
        },
        hover: {
          scale: 1.05,
          rotate: -2,
          filter: glowEffect
            ? "drop-shadow(0 0 10px rgba(139, 92, 246, 0.4))"
            : "none",
        },
      }}
      transition={{
        duration: 0.2,
        ease: "easeOut",
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
        color: "inherit",
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
          {/* Gradient for modern palette effect */}
          <linearGradient
            id="paletteGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor={stroke} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={stroke} />
          </linearGradient>

          {/* Rainbow gradient for color mixing */}
          <linearGradient
            id="rainbowGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="16%" stopColor="#f97316" />
            <stop offset="32%" stopColor="#f59e0b" />
            <stop offset="48%" stopColor="#22c55e" />
            <stop offset="64%" stopColor="#3b82f6" />
            <stop offset="80%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#ec4899" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-50 0;50 0;-50 0"
              dur="3s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Paint splash gradient */}
          <radialGradient id="splashGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Color mixing gradient */}
          <radialGradient id="mixGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.7" />
            <stop offset="30%" stopColor="#ef4444" stopOpacity="0.5" />
            <stop offset="60%" stopColor={accentColor} stopOpacity="0.3" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Paint drop gradient */}
          <linearGradient
            id="paintDropGradient"
            x1="0%"
            y1="0%"
            x2="0%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#22c55e" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.6" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.4" />
          </linearGradient>

          {/* Brush stroke gradient */}
          <linearGradient
            id="brushGradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#22c55e" stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Color mixing background aura */}
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="url(#mixGradient)"
          animate={mixControls}
          variants={{
            idle: {
              scale: 0.8,
              opacity: 0,
            },
            mixing: {
              scale: [0.8, 1.3, 0.8],
              opacity: [0, 0.5, 0],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            },
          }}
        />

        {/* Main palette shape with enhanced animation */}
        <motion.path
          d="M12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.3 1 4.7.6 1.4 1.4 2.6 2.4 3.6 1 1 2.2 1.8 3.6 2.4C10.4 23.3 11.2 23.6 12 23.6c.8 0 1.6-.3 2.2-.9.6-.6.9-1.4.9-2.2 0-.8-.3-1.6-.9-2.2C13.6 17.7 13.3 17 13.3 16.2c0-.8.3-1.6.9-2.2.6-.6 1.4-.9 2.2-.9.8 0 1.6.3 2.2.9.6.6.9 1.4.9 2.2 0 .8-.3 1.6-.9 2.2-.6.6-1.4.9-2.2.9h-3.1"
          stroke="url(#paletteGradient)"
          strokeWidth={strokeWidth}
          fill={fillColor}
          strokeDasharray="85"
          animate={controls}
          transition={{
            duration: DURATION * 2,
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
              strokeDashoffset: [85, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
            },
          }}
        />

        {/* Color mixing overlay */}
        <motion.path
          d="M12 2C6.5 2 2 6.5 2 12c0 1.7.4 3.3 1 4.7.6 1.4 1.4 2.6 2.4 3.6 1 1 2.2 1.8 3.6 2.4C10.4 23.3 11.2 23.6 12 23.6c.8 0 1.6-.3 2.2-.9.6-.6.9-1.4.9-2.2 0-.8-.3-1.6-.9-2.2C13.6 17.7 13.3 17 13.3 16.2c0-.8.3-1.6.9-2.2.6-.6 1.4-.9 2.2-.9.8 0 1.6.3 2.2.9.6.6.9 1.4.9 2.2 0 .8-.3 1.6-.9 2.2-.6.6-1.4.9-2.2.9h-3.1"
          stroke="url(#rainbowGradient)"
          strokeWidth={strokeWidth * 0.6}
          fill="none"
          animate={colorControls}
          variants={{
            idle: { opacity: 0 },
            flowing: {
              opacity: [0, 0.8, 0],
              transition: {
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              },
            },
          }}
        />

        {/* Paint wells/color spots */}
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
          {/* Red paint well */}
          <motion.circle
            cx="7"
            cy="9"
            r="1.5"
            fill="#ef4444"
            fillOpacity="0.8"
            animate={paintControls}
            variants={{
              idle: { scale: 1 },
              painting: {
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />

          {/* Blue paint well */}
          <motion.circle
            cx="11"
            cy="7"
            r="1.5"
            fill="#3b82f6"
            fillOpacity="0.8"
            animate={paintControls}
            variants={{
              idle: { scale: 1 },
              painting: {
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                },
              },
            }}
          />

          {/* Yellow paint well */}
          <motion.circle
            cx="15"
            cy="8"
            r="1.5"
            fill="#f59e0b"
            fillOpacity="0.8"
            animate={paintControls}
            variants={{
              idle: { scale: 1 },
              painting: {
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                },
              },
            }}
          />

          {/* Green paint well */}
          <motion.circle
            cx="17"
            cy="12"
            r="1.5"
            fill="#22c55e"
            fillOpacity="0.8"
            animate={paintControls}
            variants={{
              idle: { scale: 1 },
              painting: {
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                },
              },
            }}
          />

          {/* Purple paint well */}
          <motion.circle
            cx="6"
            cy="13"
            r="1.5"
            fill={accentColor}
            fillOpacity="0.8"
            animate={paintControls}
            variants={{
              idle: { scale: 1 },
              painting: {
                scale: [1, 1.2, 1],
                opacity: [0.8, 1, 0.8],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                },
              },
            }}
          />
        </motion.g>

        {/* Paint brush with animation */}
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
              scale: [0.7, 1],
            },
          }}
        >
          <motion.path
            d="M19 14l-3 3"
            stroke="url(#paletteGradient)"
            strokeWidth={strokeWidth + 0.5}
            strokeDasharray="4.24"
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
                strokeDashoffset: [4.24, 0],
                opacity: [0, 1],
              },
            }}
          />

          {/* Brush tip */}
          <motion.circle
            cx="19"
            cy="14"
            r="1"
            fill={accentColor}
            animate={paintControls}
            variants={{
              idle: { opacity: 0.7 },
              painting: {
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />
        </motion.g>

        {/* Paint splatters */}
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
            cx="4"
            cy="6"
            r="0.8"
            fill="url(#splashGradient)"
            animate={splashControls}
            variants={{
              idle: { opacity: 0.4 },
              splashing: {
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.5, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.circle
            cx="20"
            cy="8"
            r="0.6"
            fill="url(#splashGradient)"
            animate={splashControls}
            variants={{
              idle: { opacity: 0.4 },
              splashing: {
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.6, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              },
            }}
          />
          <motion.circle
            cx="3"
            cy="18"
            r="0.5"
            fill="url(#splashGradient)"
            animate={splashControls}
            variants={{
              idle: { opacity: 0.4 },
              splashing: {
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.7, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                },
              },
            }}
          />
        </motion.g>

        {/* Floating paint drops */}
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
            cx="9"
            cy="16"
            r="0.4"
            fill="url(#paintDropGradient)"
            animate={paintControls}
            variants={{
              idle: {
                y: 0,
                opacity: 0.5,
                scale: 1,
              },
              painting: {
                y: [-2, 2, -2],
                opacity: [0.5, 0.9, 0.5],
                scale: [1, 1.3, 1],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.circle
            cx="14"
            cy="18"
            r="0.3"
            fill="url(#paintDropGradient)"
            animate={paintControls}
            variants={{
              idle: {
                y: 0,
                opacity: 0.5,
                scale: 1,
              },
              painting: {
                y: [2, -2, 2],
                opacity: [0.5, 0.9, 0.5],
                scale: [1, 1.4, 1],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.8,
                },
              },
            }}
          />
          <motion.circle
            cx="5"
            cy="20"
            r="0.25"
            fill="url(#paintDropGradient)"
            animate={paintControls}
            variants={{
              idle: {
                y: 0,
                opacity: 0.4,
                scale: 1,
              },
              painting: {
                y: [-1, 1, -1],
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.5, 1],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                },
              },
            }}
          />
        </motion.g>

        {/* Brush strokes */}
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
            d="M21 11c-2 1-4-1-6 1"
            stroke="url(#brushGradient)"
            strokeWidth="1.5"
            fill="none"
            animate={paintControls}
            variants={{
              idle: {
                pathLength: 1,
                opacity: 0.3,
              },
              painting: {
                pathLength: [0, 1, 0.8, 1],
                opacity: [0.3, 0.8, 0.6, 0.3],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.path
            d="M22 16c-1.5 0.5-3-0.5-4.5 0.5"
            stroke="url(#brushGradient)"
            strokeWidth="1.2"
            fill="none"
            animate={paintControls}
            variants={{
              idle: {
                pathLength: 1,
                opacity: 0.3,
              },
              painting: {
                pathLength: [0, 1, 0.7, 1],
                opacity: [0.3, 0.7, 0.5, 0.3],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              },
            }}
          />
        </motion.g>

        {/* Color wheel accent */}
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
            stroke="url(#rainbowGradient)"
            strokeWidth="2"
            fill="none"
            animate={colorControls}
            variants={{
              idle: {
                rotate: 0,
                opacity: 0.4,
              },
              flowing: {
                rotate: [0, 360, 720],
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "linear",
                },
              },
            }}
          />
        </motion.g>

        {/* Artistic sparkles */}
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
              scale: [0, 1],
            },
          }}
        >
          <motion.path
            d="M2 4l1 1-1 1-1-1z"
            fill={accentColor}
            fillOpacity="0.6"
            animate={splashControls}
            variants={{
              idle: {
                scale: 1,
                rotate: 0,
              },
              splashing: {
                scale: [1, 1.3, 1],
                rotate: [0, 180, 360],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.path
            d="M22 20l0.5 0.5-0.5 0.5-0.5-0.5z"
            fill="#22c55e"
            fillOpacity="0.6"
            animate={splashControls}
            variants={{
              idle: {
                scale: 1,
                rotate: 0,
              },
              splashing: {
                scale: [1, 1.4, 1],
                rotate: [0, -180, -360],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                },
              },
            }}
          />
          <motion.path
            d="M1 22l0.8 0.8-0.8 0.8-0.8-0.8z"
            fill="#f59e0b"
            fillOpacity="0.6"
            animate={splashControls}
            variants={{
              idle: {
                scale: 1,
                rotate: 0,
              },
              splashing: {
                scale: [1, 1.2, 1],
                rotate: [0, 90, 180],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1.2,
                },
              },
            }}
          />
        </motion.g>

        {/* Paint mixing swirls */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(8),
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
            d="M8 11c1-1 2 1 3-1s2 1 3-1"
            stroke="#ef4444"
            strokeWidth="0.8"
            fill="none"
            opacity="0.4"
            animate={mixControls}
            variants={{
              idle: {
                pathLength: 1,
                opacity: 0.4,
              },
              mixing: {
                pathLength: [0, 1, 0.5, 1],
                opacity: [0.4, 0.8, 0.6, 0.4],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.path
            d="M9 14c1.5-0.5 2.5 0.5 4-0.5s2.5 0.5 4-0.5"
            stroke="#3b82f6"
            strokeWidth="0.6"
            fill="none"
            opacity="0.4"
            animate={mixControls}
            variants={{
              idle: {
                pathLength: 1,
                opacity: 0.4,
              },
              mixing: {
                pathLength: [0, 1, 0.7, 1],
                opacity: [0.4, 0.7, 0.5, 0.4],
                transition: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                },
              },
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
              x: 0,
            },
            hover: {
              opacity: 1,
              x: 2,
            },
          }}
          style={{
            color: labelColor || stroke,
            fontSize: labelSize,
            fontWeight: labelWeight,
            userSelect: "none",
            textShadow: glowEffect ? `0 0 4px ${accentColor}30` : "none",
            transition: "text-shadow 0.2s ease",
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
          display: "inline-block",
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

export { PaletteIcon };

// USAGE EXAMPLES:

{
  /* Art/design tools */
}
{
  /* <PaletteIcon 
  href="/design-tools"
  target="_self"
  label="Design Tools"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#8b5cf6"
  fillColor="#8b5cf620"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */
}

{
  /* Color picker/customization */
}
{
  /* <PaletteIcon 
  onClick={(e) => {
    e.preventDefault();
    openColorPicker();
  }}
  label="Colors"
  width={28}
  height={28}
  stroke="#ec4899"
  accentColor="#f472b6"
  fillColor="#ec489920"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#be1866"
  glowEffect={true}
/> */
}

{
  /* Creative/art page */
}
{
  /* <PaletteIcon 
  href="/gallery"
  target="_self"
  label="Art Gallery"
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
/> */
}

{
  /* Theme customization */
}
{
  /* <PaletteIcon 
  onClick={(e) => {
    e.preventDefault();
    toggleThemeCustomizer();
  }}
  label="Customize Theme"
  width={24}
  height={24}
  stroke="#10b981"
  accentColor="#059669"
  fillColor="#10b98120"
  strokeWidth={1.8}
  labelSize={14}
  labelColor="#065f46"
  glowEffect={false}
/> */
}

{
  /* Branding/brand colors */
}
{
  /* <PaletteIcon 
  href="/branding"
  target="_self"
  label="Brand Colors"
  width={30}
  height={30}
  stroke="#1f2937"
  accentColor="#3b82f6"
  fillColor="#3b82f615"
  strokeWidth={2.2}
  labelSize={16}
  labelColor="#374151"
  glowEffect={true}
/> */
}

{
  /* Artwork/portfolio */
}
{
  /* <PaletteIcon 
  href="/portfolio"
  target="_self"
  label="My Artwork"
  width={26}
  height={26}
  stroke="#7c3aed"
  accentColor="#a855f7"
  fillColor="#7c3aed25"
  strokeWidth={2}
  labelSize={15}
  labelColor="#581c87"
  glowEffect={true}
/> */
}
