import { motion, useMotionValue, useSpring } from "framer-motion";
import { useEffect, useState } from "react";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const cursorX = useSpring(mouseX, {
    stiffness: 1000,
    damping: 50,
    mass: 0.1,
  });

  const cursorY = useSpring(mouseY, {
    stiffness: 1000,
    damping: 50,
    mass: 0.1,
  });

  const ringX = useSpring(mouseX, {
    stiffness: 250,
    damping: 25,
    mass: 0.2,
  });

  const ringY = useSpring(mouseY, {
    stiffness: 250,
    damping: 25,
    mass: 0.2,
  });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      if (!isVisible) {
        setIsVisible(true);
      }

      const target = e.target as HTMLElement;

      setIsHovering(
        !!target.closest("button, a, [data-hoverable]")
      );
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", handleMouseMove, {
      passive: true,
    });

    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!isVisible) return null;

  return (
    <>
      {/* Main cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      >
        <motion.div
          className="relative w-4 h-4"
          style={{
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHovering ? 2 : 1,
          }}
          transition={{ duration: 0.15 }}
        >
          <div className="absolute inset-0 bg-cyber-blue rounded-full" />
          <div className="absolute inset-0 rounded-full border-2 border-white opacity-50" />
        </motion.div>
      </motion.div>

      {/* Trailing cursor */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
        }}
      >
        <motion.div
          className="w-12 h-12 rounded-full border border-cyber-blue/50"
          style={{
            translateX: "-50%",
            translateY: "-50%",
          }}
          animate={{
            scale: isHovering ? 1.5 : 1,
          }}
          transition={{ duration: 0.2 }}
        />
      </motion.div>
    </>
  );
}