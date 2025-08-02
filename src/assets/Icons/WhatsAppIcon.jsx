import React from "react";
import { motion, useAnimation } from "framer-motion";

const DURATION = 0.3;
const STAGGER_DELAY = 0.08;

const calculateDelay = (i) => {
  return i * STAGGER_DELAY + 0.1;
};

const WhatsAppIcon = ({
  width = 28,
  height = 28,
  strokeWidth = 2,
  stroke = "#ffffff",
  accentColor = "#25D366",
  fillColor = "#25D366",
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
  const messageControls = useAnimation();
  const chatControls = useAnimation();
  const bubbleControls = useAnimation();
  const typingControls = useAnimation();

  const handleMouseEnter = () => {
    controls.start("animate");
    containerControls.start("hover");
    messageControls.start("messaging");
    chatControls.start("chatting");
    bubbleControls.start("bubbling");
    typingControls.start("typing");
  };
  
  const handleMouseLeave = () => {
    controls.start("normal");
    containerControls.start("normal");
    messageControls.start("idle");
    chatControls.start("idle");
    bubbleControls.start("idle");
    typingControls.start("idle");
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
          filter: glowEffect ? "drop-shadow(0 0 0px rgba(37, 211, 102, 0))" : "none"
        },
        hover: { 
          scale: 1.05, 
          rotate: -1,
          filter: glowEffect ? "drop-shadow(0 0 12px rgba(37, 211, 102, 0.4))" : "none"
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
          {/* WhatsApp brand gradient */}
          <linearGradient id="whatsappGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#128C7E" />
            <stop offset="50%" stopColor={accentColor} />
            <stop offset="100%" stopColor="#075E54" />
          </linearGradient>
          
          {/* Animated message flow gradient */}
          <linearGradient id="messageFlowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
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

          {/* Chat bubble gradient */}
          <radialGradient id="bubbleGradient" cx="50%" cy="50%" r="60%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="70%" stopColor="#128C7E" stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>

          {/* Message notification gradient */}
          <radialGradient id="notificationGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
            <stop offset="40%" stopColor={accentColor} stopOpacity="0.8" />
            <stop offset="100%" stopColor="#128C7E" stopOpacity="0.4" />
          </radialGradient>

          {/* Chat activity gradient */}
          <radialGradient id="chatActivityGradient" cx="50%" cy="50%" r="70%">
            <stop offset="0%" stopColor="#DCF8C6" stopOpacity="0.6" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.4" />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>

        {/* Chat activity aura */}
        <motion.circle
          cx="12"
          cy="12"
          r="11"
          fill="url(#chatActivityGradient)"
          animate={chatControls}
          variants={{
            idle: { 
              scale: 0.8,
              opacity: 0 
            },
            chatting: { 
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

        {/* Official WhatsApp logo path */}
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
              scale: [0.9, 1],
              rotate: [0, 2],
            },
          }}
        >
          <motion.path
            d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
            fill="url(#whatsappGradient)"
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
                scale: [0.9, 1],
              },
            }}
          />
        </motion.g>

        {/* Message flow overlay */}
        <motion.path
          d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232"
          fill="url(#messageFlowGradient)"
          animate={messageControls}
          variants={{
            idle: { opacity: 0 },
            messaging: { 
              opacity: [0, 0.6, 0],
              transition: {
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut"
              }
            }
          }}
        />

        {/* Message notification indicator */}
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
            cx="18"
            cy="6"
            r="1.5"
            fill="url(#notificationGradient)"
            animate={messageControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.7 
              },
              messaging: { 
                scale: [1, 1.3, 1],
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
            cx="18"
            cy="6"
            r="0.8"
            fill="#ef4444"
            animate={messageControls}
            variants={{
              idle: { opacity: 0.8 },
              messaging: { 
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
          
          {/* Notification count */}
          <motion.text
            x="18"
            y="6.5"
            fontSize="2"
            fill={stroke}
            textAnchor="middle"
            animate={messageControls}
            variants={{
              idle: { opacity: 0.9 },
              messaging: { 
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

        {/* Floating message particles */}
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
            cx="5"
            cy="5"
            r="0.3"
            fill="url(#bubbleGradient)"
            animate={chatControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.4 
              },
              chatting: { 
                x: [0, 2, 4],
                y: [0, -1, -2],
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.circle
            cx="19"
            cy="19"
            r="0.25"
            fill="url(#bubbleGradient)"
            animate={chatControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.4 
              },
              chatting: { 
                x: [0, -2, -4],
                y: [0, 1, 2],
                opacity: [0.4, 0.7, 0.4],
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
            cx="3"
            cy="18"
            r="0.2"
            fill={accentColor}
            animate={chatControls}
            variants={{
              idle: { 
                x: 0,
                y: 0,
                opacity: 0.3 
              },
              chatting: { 
                x: [0, 1, 2],
                y: [0, -1, -2],
                opacity: [0.3, 0.6, 0.3],
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

        {/* WhatsApp center highlight */}
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
            cx="8"
            cy="8"
            r="1"
            stroke={accentColor}
            strokeWidth="1.5"
            fill="none"
            animate={chatControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.4 
              },
              chatting: { 
                scale: [1, 1.2, 1],
                opacity: [0.4, 0.8, 0.4],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
          
          <motion.circle
            cx="8"
            cy="8"
            r="0.3"
            fill={accentColor}
            animate={chatControls}
            variants={{
              idle: { 
                scale: 1,
                opacity: 0.6 
              },
              chatting: { 
                scale: [1, 1.3, 1],
                opacity: [0.6, 1, 0.6],
                transition: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }
            }}
          />
        </motion.g>

        {/* WhatsApp sparkles */}
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
          <motion.path
            d="M2 6l0.5 0.5-0.5 0.5-0.5-0.5z"
            fill={accentColor}
            fillOpacity="0.7"
            animate={messageControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              messaging: { 
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
            d="M22 18l0.3 0.3-0.3 0.3-0.3-0.3z"
            fill="#DCF8C6"
            fillOpacity="0.8"
            animate={messageControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              messaging: { 
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
            d="M1 20l0.4 0.4-0.4 0.4-0.4-0.4z"
            fill="#128C7E"
            fillOpacity="0.6"
            animate={messageControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              messaging: { 
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
            d="M23 2l0.35 0.35-0.35 0.35-0.35-0.35z"
            fill="#075E54"
            fillOpacity="0.6"
            animate={messageControls}
            variants={{
              idle: { 
                scale: 1,
                rotate: 0 
              },
              messaging: { 
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

export { WhatsAppIcon };

// USAGE EXAMPLES:

{/* WhatsApp contact */}
{/* <WhatsAppIcon 
  href="https://wa.me/1234567890"
  target="_blank"
  rel="noopener noreferrer"
  label="WhatsApp Chat"
  width={32}
  height={32}
  stroke="#ffffff"
  accentColor="#25D366"
  fillColor="#25D366"
  labelSize={18}
  labelColor="#1f2937"
  labelWeight={600}
  glowEffect={true}
/> */}

{/* WhatsApp Business */}
{/* <WhatsAppIcon 
  onClick={(e) => {
    e.preventDefault();
    openWhatsAppBusiness();
  }}
  label="WhatsApp Business"
  width={28}
  height={28}
  stroke="#ffffff"
  accentColor="#25D366"
  fillColor="#25D366"
  strokeWidth={2.5}
  labelSize={16}
  labelColor="#25D366"
  glowEffect={true}
/> */}

{/* WhatsApp Web */}
{/* <WhatsAppIcon 
  href="/whatsapp-web"
  target="_self"
  label="WhatsApp Web"
  width={36}
  height={36}
  stroke="#e5e7eb"
  accentColor="#25D366"
  fillColor="#25D366"
  strokeWidth={2}
  labelSize={20}
  labelColor="#f3f4f6"
  labelWeight={700}
  glowEffect={true}
/> */}
