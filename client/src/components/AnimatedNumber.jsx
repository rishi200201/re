import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * AnimatedNumber - Counts up when scrolled into view.
 * Parent component provides entrance animation; this only handles the counter.
 */
export default function AnimatedNumber({
  value,
  duration = 2,
  suffix = "",
  prefix = "",
  separator = false,
  className = "",
  ...props
}) {
  const [currentValue, setCurrentValue] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef();
  const isInView = useInView(ref, { once: true, threshold: 0.3 });

  useEffect(() => {
    if (!isInView) return;

    let startTime;
    setDone(false);

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setCurrentValue(Math.floor(value * easeOutQuart));

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCurrentValue(value);
        setDone(true);
      }
    };

    requestAnimationFrame(animate);
  }, [isInView, value, duration]);

  const formatNumber = (num) =>
    separator ? num.toLocaleString() : num.toString();

  // aria-busy suppresses intermediate announcements; aria-live="polite" fires
  // once when aria-busy transitions to false (animation complete).
  return (
    <span
      ref={ref}
      aria-live="polite"
      aria-atomic="true"
      aria-busy={isInView && !done}
      className={className}
      {...props}
    >
      {prefix}{formatNumber(currentValue)}{suffix}
    </span>
  );
}