
import { useState, useEffect, useRef } from 'react';

export const useMouseActivity = () => {
  const [isMouseActive, setIsMouseActive] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();

  useEffect(() => {
    const handleMouseMove = () => {
      setIsMouseActive(true);
      
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      timeoutRef.current = setTimeout(() => {
        setIsMouseActive(false);
      }, 2000); // Após 2 segundos sem movimento, remove a dinamicidade
    };

    const handleMouseLeave = () => {
      setIsMouseActive(false);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return isMouseActive;
};
