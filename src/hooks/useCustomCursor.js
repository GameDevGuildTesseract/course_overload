import { useState, useEffect } from "react";

function useCustomCursor() {
  const [cursor1, setCursor1] = useState({ x: 0, y: 0 });
  const [cursor2, setCursor2] = useState({ x: 0, y: 0 });
  const [isOverLink, setIsOverLink] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setCursor1({ x: e.clientX, y: e.clientY });

      setTimeout(() => {
        setCursor2({ x: e.clientX, y: e.clientY });
      }, 200);
    };

    const handleMouseEnter = () => setIsOverLink(true);
    const handleMouseLeave = () => setIsOverLink(false);

    window.addEventListener("mousemove", handleMouseMove);

    document.querySelectorAll("a").forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.querySelectorAll("a").forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  return { cursor1, cursor2, isOverLink };
}

export default useCustomCursor;
