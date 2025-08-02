import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const FireIcon = ({
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
  const flameControls = useAnimation();
  const emberControls = useAnimation();
  const heatControls = useAnimation();

  // Reset all controls on mount
  useEffect(() => {
    const resetControls = async () => {
      await controls.start("normal");
      await containerControls.start("normal");
      await flameControls.start("idle");
      await emberControls.start("idle");
      await heatControls.start("idle");
    };
    resetControls();
  }, []);

  const handleMouseEnter = async () => {
    // Stop any ongoing animations first
    await controls.stop();
    await containerControls.stop();
    await flameControls.stop();
    await emberControls.stop();
    await heatControls.stop();

    // Start new animations
    controls.start("animate");
    containerControls.start("hover");
    flameControls.start("burning");
    emberControls.start("floating");
    heatControls.start("radiating");
  };

  const handleMouseLeave = async () => {
    // Stop any ongoing animations first
    await controls.stop();
    await containerControls.stop();
    await flameControls.stop();
    await emberControls.stop();
    await heatControls.stop();

    // Reset to normal state
    controls.start("normal");
    containerControls.start("normal");
    flameControls.start("idle");
    emberControls.start("idle");
    heatControls.start("idle");
  };

  const handleClick = (e) => {
    if (onClick) {
      onClick(e);
    }
  };

  // Content component that contains the icon and animations
  const IconContent = () => (
    <motion.div
      key={`fire-${Date.now()}`}
      animate={containerControls}
      variants={{
        normal: {
          scale: 1,
          rotate: 0,
          filter: glowEffect
            ? "drop-shadow(0 0 0px rgba(245, 158, 11, 0))"
            : "none",
        },
        hover: {
          scale: 1.05,
          rotate: 1,
          filter: glowEffect
            ? "drop-shadow(0 0 12px rgba(245, 158, 11, 0.4))"
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
          {/* Gradient for flame effect */}
          <linearGradient id="flameGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="30%" stopColor="#ea580c" />
            <stop offset="60%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#fbbf24" />
          </linearGradient>

          {/* Animated gradient for flickering flames */}
          <linearGradient
            id="flickerGradient"
            x1="0%"
            y1="100%"
            x2="0%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#dc2626" stopOpacity="0.9" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.7" />
            <stop offset="100%" stopColor="#fbbf24" stopOpacity="0.5" />
            <animateTransform
              attributeName="gradientTransform"
              type="scale"
              values="1 0.8;1 1.2;1 0.9;1 1.1;1 0.8"
              dur="2s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Heat wave gradient */}
          <radialGradient id="heatGradient" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ea580c" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Ember gradient */}
          <radialGradient id="emberGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor="#dc2626" stopOpacity="0.3" />
          </radialGradient>

          {/* Fire core gradient */}
          <radialGradient id="fireCoreGradient" cx="50%" cy="70%" r="40%">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.9" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.5" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Smoke gradient */}
          <linearGradient id="smokeGradient" x1="0%" y1="100%" x2="0%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={stroke} stopOpacity="0.3" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0.1" />
          </linearGradient>
        </defs>

        {/* Heat wave background */}
        <motion.ellipse
          cx="12"
          cy="18"
          rx="8"
          ry="4"
          fill="url(#heatGradient)"
          animate={heatControls}
          variants={{
            idle: {
              scale: 0.8,
              opacity: 0,
            },
            radiating: {
              scale: [0.8, 1.2, 0.8],
              opacity: [0, 0.6, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              },
            },
          }}
        />

        {/* Fire core glow */}
        <motion.ellipse
          cx="12"
          cy="16"
          rx="4"
          ry="6"
          fill="url(#fireCoreGradient)"
          animate={flameControls}
          variants={{
            idle: {
              scale: 0.9,
              opacity: 0.3,
            },
            burning: {
              scale: [0.9, 1.1, 0.95, 1.05, 0.9],
              opacity: [0.3, 0.7, 0.5, 0.6, 0.3],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            },
          }}
        />

        {/* Main flame path with enhanced animation */}
        <motion.path
          d="M8.5 14.5c0-5 3.5-10 3.5-10s3.5 5 3.5 10a3.5 3.5 0 1 1-7 0"
          stroke="url(#flameGradient)"
          strokeWidth={strokeWidth}
          fill={fillColor}
          strokeDasharray="45"
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
              strokeDashoffset: [45, 0],
              opacity: [0, 1],
              scale: [0.8, 1],
            },
          }}
        />

        {/* Flickering flame overlay */}
        <motion.path
          d="M8.5 14.5c0-5 3.5-10 3.5-10s3.5 5 3.5 10a3.5 3.5 0 1 1-7 0"
          fill="url(#flickerGradient)"
          stroke="none"
          animate={flameControls}
          variants={{
            idle: { opacity: 0.2 },
            burning: {
              opacity: [0.2, 0.6, 0.3, 0.5, 0.2],
              scaleY: [1, 1.1, 0.9, 1.05, 1],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              },
            },
          }}
        />

        {/* Inner flame layers */}
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
          {/* Core flame */}
          <motion.path
            d="M10 14c0-3 2-6 2-6s2 3 2 6a2 2 0 1 1-4 0"
            fill={accentColor}
            fillOpacity="0.6"
            animate={flameControls}
            variants={{
              idle: { scaleY: 1 },
              burning: {
                scaleY: [1, 1.2, 0.9, 1.1, 1],
                opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />

          {/* Inner core */}
          <motion.path
            d="M11 13.5c0-2 1-4 1-4s1 2 1 4a1 1 0 1 1-2 0"
            fill="#fbbf24"
            fillOpacity="0.8"
            animate={flameControls}
            variants={{
              idle: { scaleY: 1 },
              burning: {
                scaleY: [1, 1.3, 0.8, 1.2, 1],
                opacity: [0.8, 1, 0.6, 0.9, 0.8],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2,
                },
              },
            }}
          />
        </motion.g>

        {/* Flame tips with dancing motion */}
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
            cx="10"
            cy="6"
            r="0.8"
            fill="#fbbf24"
            animate={flameControls}
            variants={{
              idle: { opacity: 0.6 },
              burning: {
                opacity: [0.6, 1, 0.4, 0.8, 0.6],
                scale: [1, 1.4, 0.8, 1.2, 1],
                x: [0, -1, 1, -0.5, 0],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.circle
            cx="14"
            cy="7"
            r="0.6"
            fill="#fbbf24"
            animate={flameControls}
            variants={{
              idle: { opacity: 0.6 },
              burning: {
                opacity: [0.6, 1, 0.4, 0.8, 0.6],
                scale: [1, 1.5, 0.7, 1.3, 1],
                x: [0, 1, -1, 0.5, 0],
                transition: {
                  duration: 1.6,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                },
              },
            }}
          />
          <motion.circle
            cx="12"
            cy="5"
            r="0.4"
            fill="#fbbf24"
            animate={flameControls}
            variants={{
              idle: { opacity: 0.7 },
              burning: {
                opacity: [0.7, 1, 0.3, 0.9, 0.7],
                scale: [1, 1.6, 0.6, 1.4, 1],
                y: [0, -1, 1, -0.5, 0],
                transition: {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6,
                },
              },
            }}
          />
        </motion.g>

        {/* Floating embers */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
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
          <motion.circle
            cx="6"
            cy="12"
            r="0.3"
            fill="url(#emberGradient)"
            animate={emberControls}
            variants={{
              idle: {
                y: 0,
                x: 0,
                opacity: 0.4,
                scale: 1,
              },
              floating: {
                y: [-3, -6, -9],
                x: [-1, 1, -0.5],
                opacity: [0.4, 0.8, 0],
                scale: [1, 1.2, 0.5],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                },
              },
            }}
          />
          <motion.circle
            cx="18"
            cy="14"
            r="0.25"
            fill="url(#emberGradient)"
            animate={emberControls}
            variants={{
              idle: {
                y: 0,
                x: 0,
                opacity: 0.4,
                scale: 1,
              },
              floating: {
                y: [-4, -8, -12],
                x: [1, -1, 0.5],
                opacity: [0.4, 0.9, 0],
                scale: [1, 1.3, 0.3],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.5,
                },
              },
            }}
          />
          <motion.circle
            cx="8"
            cy="8"
            r="0.2"
            fill="url(#emberGradient)"
            animate={emberControls}
            variants={{
              idle: {
                y: 0,
                x: 0,
                opacity: 0.3,
                scale: 1,
              },
              floating: {
                y: [-2, -4, -6],
                x: [0.5, -0.5, 1],
                opacity: [0.3, 0.7, 0],
                scale: [1, 1.4, 0.2],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1,
                },
              },
            }}
          />
          <motion.circle
            cx="16"
            cy="10"
            r="0.15"
            fill="url(#emberGradient)"
            animate={emberControls}
            variants={{
              idle: {
                y: 0,
                x: 0,
                opacity: 0.3,
                scale: 1,
              },
              floating: {
                y: [-5, -10, -15],
                x: [-0.5, 0.5, -1],
                opacity: [0.3, 0.8, 0],
                scale: [1, 1.5, 0.1],
                transition: {
                  duration: 3.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 1.5,
                },
              },
            }}
          />
        </motion.g>

        {/* Smoke wisps */}
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
              scale: [0.8, 1],
            },
          }}
        >
          <motion.path
            d="M11 3c0-1 1-2 1-2"
            stroke="url(#smokeGradient)"
            strokeWidth="1.5"
            fill="none"
            animate={flameControls}
            variants={{
              idle: { opacity: 0.2 },
              burning: {
                opacity: [0.2, 0.5, 0.1, 0.3, 0.2],
                pathLength: [0, 1, 0.8, 1, 0],
                transition: {
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.path
            d="M13 2.5c0-0.5 0.5-1 0.5-1"
            stroke="url(#smokeGradient)"
            strokeWidth="1"
            fill="none"
            animate={flameControls}
            variants={{
              idle: { opacity: 0.1 },
              burning: {
                opacity: [0.1, 0.4, 0.05, 0.25, 0.1],
                pathLength: [0, 1, 0.6, 1, 0],
                transition: {
                  duration: 4.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5,
                },
              },
            }}
          />
        </motion.g>

        {/* Fire sparks */}
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
              scale: [0, 1],
            },
          }}
        >
          <motion.circle
            cx="4"
            cy="16"
            r="0.5"
            fill={accentColor}
            animate={emberControls}
            variants={{
              idle: { opacity: 0.3 },
              floating: {
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.circle
            cx="20"
            cy="18"
            r="0.3"
            fill={accentColor}
            animate={emberControls}
            variants={{
              idle: { opacity: 0.3 },
              floating: {
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.6, 1],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4,
                },
              },
            }}
          />
        </motion.g>

        {/* Heat distortion lines */}
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
          <motion.path
            d="M6 20c2-1 4 1 6-1s4 1 6-1"
            stroke={accentColor}
            strokeWidth="0.5"
            fill="none"
            opacity="0.3"
            animate={heatControls}
            variants={{
              idle: {
                opacity: 0.3,
                pathLength: 1,
              },
              radiating: {
                opacity: [0.3, 0.6, 0.3],
                pathLength: [0, 1, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              },
            }}
          />
          <motion.path
            d="M7 22c1.5-0.5 3 0.5 4.5-0.5s3 0.5 4.5-0.5"
            stroke={accentColor}
            strokeWidth="0.4"
            fill="none"
            opacity="0.2"
            animate={heatControls}
            variants={{
              idle: {
                opacity: 0.2,
                pathLength: 1,
              },
              radiating: {
                opacity: [0.2, 0.5, 0.2],
                pathLength: [0, 1, 0],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3,
                },
              },
            }}
          />
        </motion.g>

        {/* Fire base glow */}
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
              scale: [0.8, 1],
            },
          }}
        >
          <motion.ellipse
            cx="12"
            cy="17.5"
            rx="3"
            ry="1"
            fill={accentColor}
            fillOpacity="0.4"
            animate={heatControls}
            variants={{
              idle: { opacity: 0.4 },
              radiating: {
                opacity: [0.4, 0.7, 0.4],
                scaleX: [1, 1.2, 1],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
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
            textShadow: glowEffect ? `0 0 4px ${accentColor}40` : "none",
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

export { FireIcon };

// USAGE EXAMPLES:

{
  /* Trending content */
}
{
  /* <FireIcon 
  href="/trending"
  target="_self"
  label="Trending"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#f59e0b"
  fillColor="#f59e0b20"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */
}

{
  /* Hot topics/popular */
}
{
  /* <FireIcon 
    onClick={(e) => {
        e.preventDefault();
        showHotContent();
    }}
    label="Hot Topics"
    width={28}
    height={28}
    stroke="#dc2626"
    accentColor="#ef4444"
    fillColor="#dc262620"
    strokeWidth={2.5}
    labelSize={16}
    labelColor="#7f1d1d"
    glowEffect={true}
    /> */
}

{
  /* Energy/performance boost */
}
{
  /* <FireIcon 
  href="/boost"
  target="_self"
  label="Boost Performance"
  width={36}
  height={36}
  stroke="#e5e7eb"
  accentColor="#f97316"
  fillColor="#f9731625"
  strokeWidth={2}
  labelSize={20}
  labelColor="#f3f4f6"
  labelWeight={700}
  glowEffect={true}
/> */
}

{
  /* Passion/motivation */
}
{
  /* <FireIcon 
  href="/motivation"
  target="_self"
  label="Get Motivated"
  width={24}
  height={24}
  stroke="#92400e"
  accentColor="#f59e0b"
  fillColor="#f59e0b30"
  strokeWidth={1.8}
  labelSize={14}
  labelColor="#78350f"
  glowEffect={false}
/> */
}

{
  /* Gaming/achievements */
}
{
  /* <FireIcon 
  onClick={(e) => {
    e.preventDefault();
    showAchievements();
  }}
  label="Fire Streak!"
  width={30}
  height={30}
  stroke="#1f2937"
  accentColor="#dc2626"
  fillColor="#dc262615"
  strokeWidth={2.2}
  labelSize={16}
  labelColor="#374151"
  glowEffect={true}
/> */
}

{
  /* Fitness/burn calories */
}
{
  /* <FireIcon 
  href="/workout"
  target="_self"
  label="Burn Calories"
  width={26}
  height={26}
  stroke="#059669"
  accentColor="#f59e0b"
  fillColor="#f59e0b25"
  strokeWidth={2}
  labelSize={15}
  labelColor="#065f46"
  glowEffect={true}
/> */
}
