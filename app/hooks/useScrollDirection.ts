import { useState, useEffect } from 'react';

type ScrollDirection = 'up' | 'down' | null;

const useScrollDirection = (): ScrollDirection => {
  const [scrollDirection, setScrollDirection] = useState<ScrollDirection>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if( currentScrollY === lastScrollY) {
        return; // No change in scroll position  
      }

      if (currentScrollY > lastScrollY && currentScrollY > 50) { // Scrolling down, past a threshold
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) { // Scrolling up
        setScrollDirection('up');
      } else if (currentScrollY === 0) { // At the very top
        setScrollDirection('up'); // Or 'up' if you prefer header visible at top
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return scrollDirection;
};

export default useScrollDirection;