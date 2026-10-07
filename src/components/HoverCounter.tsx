import React, { useState, useEffect, useRef } from 'react';

interface HoverCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  className?: string;
  isParentHovered?: boolean;
}

export const HoverCounter: React.FC<HoverCounterProps> = ({
  target,
  suffix = '',
  prefix = '',
  className = '',
  isParentHovered = false,
}) => {
  const [internalHover, setInternalHover] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);
  const animationFrameRef = useRef<number | null>(null);

  const active = isParentHovered || internalHover;

  useEffect(() => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }

    if (active) {
      let startTime: number | null = null;
      const duration = 750; // Smooth 0.75s count up

      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const current = Math.min(Math.round(easeOut * target), target);
        setDisplayValue(current);

        if (progress < 1) {
          animationFrameRef.current = requestAnimationFrame(step);
        } else {
          setDisplayValue(target);
          animationFrameRef.current = null;
        }
      };

      animationFrameRef.current = requestAnimationFrame(step);
    } else {
      setDisplayValue(0);
    }

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [active, target]);

  return (
    <span
      onMouseEnter={() => setInternalHover(true)}
      onMouseLeave={() => setInternalHover(false)}
      className={`tabular-nums transition-colors duration-300 ${className}`}
    >
      {prefix}{displayValue}{suffix}
    </span>
  );
};
