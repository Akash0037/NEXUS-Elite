
import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'framer-motion';

const CustomCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  const springX = useSpring(0, { stiffness: 150, damping: 20 });
  const springY = useSpring(0, { stiffness: 150, damping: 20 });

  // Detect desktop: no touch support AND screen width > 1024px
  useEffect(() => {
    const checkDesktop = () => {
      const hasNoTouch = !('ontouchstart' in window) && !(navigator.maxTouchPoints > 0);
      const isWideScreen = window.innerWidth > 1024;
      setIsDesktop(hasNoTouch && isWideScreen);
    };

    checkDesktop();
    window.addEventListener('resize', checkDesktop);
    return () => window.removeEventListener('resize', checkDesktop);
  }, []);

  useEffect(() => {
    if (!isDesktop) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX - 16);
      springY.set(e.clientY - 16);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') ||
        target.closest('a')
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [springX, springY, isDesktop]);

  // Don't render custom cursor on mobile/tablet
  if (!isDesktop) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 pointer-events-none z-[9999] rounded-full mix-blend-difference border-2 border-yellow-400"
        style={{
          x: springX,
          y: springY,
          scale: isHovering ? 2.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      />
      <motion.div
        className="fixed top-0 left-0 w-96 h-96 pointer-events-none z-[-1] rounded-full blur-[100px] opacity-20 bg-gradient-to-tr from-blue-600 to-yellow-500"
        style={{
          x: mousePos.x - 192,
          y: mousePos.y - 192,
        }}
      />
    </>
  );
};

export default CustomCursor;

