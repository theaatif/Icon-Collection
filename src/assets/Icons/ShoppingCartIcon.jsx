import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const ShoppingCartIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#10b981",
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
  const cartControls = useAnimation();
  const itemControls = useAnimation();
  const wheelControls = useAnimation();
  const checkoutControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    cartControls.start("rolling");
    itemControls.start("bouncing");
    wheelControls.start("spinning");
    checkoutControls.start("purchasing");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    cartControls.start("idle");
    itemControls.start("idle");
    wheelControls.start("idle");
    checkoutControls.start("idle");
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
          x: 0,
          filter: glowEffect ? "drop-shadow(0 0 0px rgba(16, 185, 129, 0))" : "none"
        },
        hover: { 
          scale: 1.05, 
          rotate: -1,
          x: 2,
          filter: glowEffect ? "drop-shadow(0 0 10px rgba(16, 185, 129, 0.4))" : "none"
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
          {/* Gradient for modern cart effect */}
          <linearGradient id="cartGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={stroke} />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor={stroke} />
          </linearGradient>
          
          {/* Animated gradient for shopping flow */}
          <linearGradient id="shoppingFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor="transparent" />
            <animateTransform
              attributeName="gradientTransform"
              type="translate"
              values="-100 0;100 0;-100 0"
              dur="2.5s"
              repeatCount="indefinite"
            />
          </linearGradient>

          {/* Purchase success gradient */}
          <radialGradient id="purchaseGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.9" />
            <stop offset="70%" stopColor="#059669" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Item bounce gradient */}
          <linearGradient id="itemGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#ef4444" stopOpacity="0.6" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.4" />
          </linearGradient>

          {/* Wheel rotation gradient */}
          <radialGradient id="wheelGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={stroke} stopOpacity="0.8" />
            <stop offset="70%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={stroke} stopOpacity="0.4" />
          </radialGradient>

          {/* Cart trail gradient */}
          <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="transparent" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.3" />
          </linearGradient>
        </defs>

        {/* Purchase success aura */}
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="url(#purchaseGradient)"
          animate={checkoutControls}
          variants={{
            idle: { 
              scale: 0.8,
              opacity: 0 
            },
            purchasing: { 
              scale: [0.8, 1.3, 0.8],
              opacity: [0, 0.6, 0],
              transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Cart movement trail */}
        <motion.path
          d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
          stroke="url(#trailGradient)"
          strokeWidth={strokeWidth * 1.5}
          fill="none"
          animate={cartControls}
          variants={{
            idle: { opacity: 0 },
            rolling: { 
              opacity: [0, 0.5, 0],
              scaleX: [1, 1.1, 1],
              transition: {
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Main cart body with enhanced animation */}
        <motion.path
          d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
          stroke="url(#cartGradient)"
          strokeWidth={strokeWidth}
          fill={fillColor}
          strokeDasharray="55"
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
              strokeDashoffset: [55, 0],
              opacity: [0, 1],
              scale: [0.9, 1],
            },
          }}
        />

        {/* Shopping flow overlay */}
        <motion.path
          d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"
          stroke="url(#shoppingFlowGradient)"
          strokeWidth={strokeWidth * 0.6}
          fill="none"
          animate={cartControls}
          variants={{
            idle: { opacity: 0 },
            rolling: { 
              opacity: [0, 0.8, 0],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Cart wheels with rolling animation */}
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
          {/* Left wheel */}
          <motion.circle
            cx="9"
            cy="20"
            r="2"
            fill="url(#wheelGradient)"
            animate={wheelControls}
            variants={{
              idle: { rotate: 0 },
              spinning: { 
                rotate: [0, 360, 720],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear"
                }
              }
            }}
          />
          <motion.circle
            cx="9"
            cy="20"
            r="2"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
            strokeDasharray="12.57"
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
                strokeDashoffset: [12.57, 0],
                opacity: [0, 1],
              },
            }}
          />
          
          {/* Right wheel */}
          <motion.circle
            cx="20"
            cy="20"
            r="2"
            fill="url(#wheelGradient)"
            animate={wheelControls}
            variants={{
              idle: { rotate: 0 },
              spinning: { 
                rotate: [0, 360, 720],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                  delay: 0.1
                }
              }
            }}
          />
          <motion.circle
            cx="20"
            cy="20"
            r="2"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
            strokeDasharray="12.57"
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
                strokeDashoffset: [12.57, 0],
                opacity: [0, 1],
              },
            }}
          />
        </motion.g>

        {/* Cart items with bouncing animation */}
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
              scale: [0.6, 1],
            },
          }}
        >
          {/* Item 1 */}
          <motion.circle
            cx="10"
            cy="10"
            r="1.2"
            fill="url(#itemGradient)"
            animate={itemControls}
            variants={{
              idle: { y: 0 },
              bouncing: { 
                y: [-1, 1, -1],
                scale: [1, 1.1, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          {/* Item 2 */}
          <motion.circle
            cx="14"
            cy="9"
            r="1"
            fill="#f59e0b"
            fillOpacity="0.8"
            animate={itemControls}
            variants={{
              idle: { y: 0 },
              bouncing: { 
                y: [1, -1, 1],
                scale: [1, 1.15, 1],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.3
                }
              }
            }}
          />
          
          {/* Item 3 */}
          <motion.circle
            cx="17"
            cy="11"
            r="0.8"
            fill="#ef4444"
            fillOpacity="0.8"
            animate={itemControls}
            variants={{
              idle: { y: 0 },
              bouncing: { 
                y: [-0.5, 0.5, -0.5],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.6
                }
              }
            }}
          />
        </motion.g>

        {/* Cart handle */}
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
              scale: [0.7, 1],
            },
          }}
        >
          <motion.path
            d="M5 1v3"
            stroke={accentColor}
            strokeWidth={strokeWidth + 0.5}
            animate={cartControls}
            variants={{
              idle: { opacity: 0.8 },
              rolling: { 
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.1, 1],
                rotate: [0, 2, -2, 0],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Purchase sparkles */}
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
            cx="7"
            cy="5"
            r="0.8"
            fill={accentColor}
            animate={checkoutControls}
            variants={{
              idle: { opacity: 0.5 },
              purchasing: { 
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
            cx="19"
            cy="4"
            r="0.6"
            fill={accentColor}
            animate={checkoutControls}
            variants={{
              idle: { opacity: 0.5 },
              purchasing: { 
                opacity: [0.5, 1, 0.5],
                scale: [1, 1.5, 1],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }
            }}
          />
          <motion.circle
            cx="22"
            cy="8"
            r="0.4"
            fill={accentColor}
            animate={checkoutControls}
            variants={{
              idle: { opacity: 0.4 },
              purchasing: { 
                opacity: [0.4, 1, 0.4],
                scale: [1, 1.6, 1],
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

        {/* Floating shopping particles */}
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
            animate={cartControls}
            variants={{
              idle: { 
                x: 0,
                opacity: 0.4 
              },
              rolling: { 
                x: [0, 4, 8],
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeOut"
                }
              }
            }}
          />
          <motion.circle
            cx="2"
            cy="16"
            r="0.25"
            fill={stroke}
            animate={cartControls}
            variants={{
              idle: { 
                x: 0,
                opacity: 0.4 
              },
              rolling: { 
                x: [0, 3, 6],
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.3
                }
              }
            }}
          />
          <motion.circle
            cx="4"
            cy="8"
            r="0.2"
            fill={accentColor}
            animate={cartControls}
            variants={{
              idle: { 
                x: 0,
                opacity: 0.5 
              },
              rolling: { 
                x: [0, 2, 4],
                opacity: [0.5, 0.9, 0.5],
                transition: {
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeOut",
                  delay: 0.6
                }
              }
            }}
          />
        </motion.g>

        {/* Speed lines for cart motion */}
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
            d="M1 8h3"
            stroke={accentColor}
            strokeWidth="1"
            animate={cartControls}
            variants={{
              idle: { opacity: 0.3 },
              rolling: { 
                opacity: [0.3, 0.8, 0.3],
                scaleX: [1, 1.3, 1],
                transition: {
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M1 12h2.5"
            stroke={accentColor}
            strokeWidth="0.8"
            animate={cartControls}
            variants={{
              idle: { opacity: 0.3 },
              rolling: { 
                opacity: [0.3, 0.8, 0.3],
                scaleX: [1, 1.4, 1],
                transition: {
                  duration: 1.4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.2
                }
              }
            }}
          />
          <motion.path
            d="M2 16h2"
            stroke={accentColor}
            strokeWidth="0.6"
            animate={cartControls}
            variants={{
              idle: { opacity: 0.3 },
              rolling: { 
                opacity: [0.3, 0.8, 0.3],
                scaleX: [1, 1.2, 1],
                transition: {
                  duration: 1,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.4
                }
              }
            }}
          />
        </motion.g>

        {/* Checkout success indicator */}
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
            cx="15"
            cy="6"
            r="1.5"
            stroke={accentColor}
            strokeWidth="1"
            fill="none"
            animate={checkoutControls}
            variants={{
              idle: { opacity: 0.4 },
              purchasing: { 
                opacity: [0.4, 0.9, 0.4],
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
            d="M13.5 6l1 1 2-2"
            stroke={accentColor}
            strokeWidth="1.5"
            fill="none"
            animate={checkoutControls}
            variants={{
              idle: { 
                pathLength: 1,
                opacity: 0.4 
              },
              purchasing: { 
                pathLength: [0, 1, 1, 0],
                opacity: [0.4, 1, 0.8, 0.4],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* Cart quantity indicator */}
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
              scale: [0.3, 1],
            },
          }}
        >
          <motion.circle
            cx="21"
            cy="3"
            r="1.2"
            fill={accentColor}
            animate={itemControls}
            variants={{
              idle: { opacity: 0.8 },
              bouncing: { 
                opacity: [0.8, 1, 0.8],
                scale: [1, 1.2, 1],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.text
            x="21"
            y="3.5"
            fontSize="2.5"
            fill={stroke}
            textAnchor="middle"
            animate={itemControls}
            variants={{
              idle: { opacity: 0.9 },
              bouncing: { 
                opacity: [0.9, 1, 0.9],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          >
            3
          </motion.text>
        </motion.g>

        {/* Cart shake effect */}
        <motion.g
          animate={controls}
          transition={{
            duration: DURATION,
            delay: calculateDelay(9),
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
            d="M8 18c0-0.5 0.5-1 1-1s1 0.5 1 1"
            stroke={accentColor}
            strokeWidth="0.5"
            fill="none"
            opacity="0.4"
            animate={cartControls}
            variants={{
              idle: { 
                opacity: 0.4,
                pathLength: 1 
              },
              rolling: { 
                opacity: [0.4, 0.7, 0.4],
                pathLength: [0, 1, 0],
                transition: {
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          <motion.path
            d="M19 18c0-0.5 0.5-1 1-1s1 0.5 1 1"
            stroke={accentColor}
            strokeWidth="0.5"
            fill="none"
            opacity="0.4"
            animate={cartControls}
            variants={{
              idle: { 
                opacity: 0.4,
                pathLength: 1 
              },
              rolling: { 
                opacity: [0.4, 0.7, 0.4],
                pathLength: [0, 1, 0],
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

export { ShoppingCartIcon };

// USAGE EXAMPLES:

{/* E-commerce cart page */}
{/* <ShoppingCartIcon 
  href="/cart"
  target="_self"
  label="Shopping Cart"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#10b981"
  fillColor="#10b98120"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* Add to cart action */}
{/* <ShoppingCartIcon 
  onClick={(e) => {
    e.preventDefault();
    addToCart();
  }}
  label="Add to Cart"
  width={28}
  height={28}
  stroke="#059669"
  accentColor="#10b981"
  fillColor="#05966920"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#064e3b"
  glowEffect={true}
/> */}

{/* Checkout page */}
{/* <ShoppingCartIcon 
  href="/checkout"
  target="_self"
  label="Checkout"
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

{/* Mini cart dropdown */}
{/* <ShoppingCartIcon 
  onClick={(e) => {
    e.preventDefault();
    toggleCartDropdown();
  }}
  label="Cart (3)"
  width={24}
  height={24}
  stroke="#6b7280"
  accentColor="#3b82f6"
  fillColor="#3b82f620"
  strokeWidth={1.8}
  labelSize={14}
  labelColor="#4b5563"
  glowEffect={false}
/> */}

{/* Marketplace/store */}
{/* <ShoppingCartIcon 
  href="/store"
  target="_self"
  label="Store"
  width={30}
  height={30}
  stroke="#1f2937"
  accentColor="#ec4899"
  fillColor="#ec489915"
  strokeWidth={2.2}
  labelSize={16}
  labelColor="#374151"
  glowEffect={true}
/> */}

{/* Orders/purchase history */}
{/* <ShoppingCartIcon 
  href="/orders"
  target="_self"
  label="My Orders"
  width={26}
  height={26}
  stroke="#7c2d12"
  accentColor="#ea580c"
  fillColor="#ea580c25"
  strokeWidth={2}
  labelSize={15}
  labelColor="#7c2d12"
  glowEffect={true}
/> */}
