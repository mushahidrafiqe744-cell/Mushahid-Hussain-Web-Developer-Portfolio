import React, { useState, useEffect } from 'react';

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

  const active = isParentHovered || internalHover;

  useEffect(() => {
    let animationFrameId: number;
    let startTime: number | null = null;
    const duration = 700; // Smooth 0.7s count up

    if (active) {
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / duration, 1);
        const easeOut = 1 - Math.pow(1 - progress, 3);
        setDisplayValue(Math.round(easeOut * target));

        if (progress < 1) {
          animationFrameId = requestAnimationFrame(step);
        }
      };
      animationFrameId = requestAnimationFrame(step);
    } else {
      setDisplayValue(0);
    }

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
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
