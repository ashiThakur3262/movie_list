import { useState, useEffect } from 'react';

export const useScrollPosition = (): [
  (pos?: number | undefined) => void,
  () => number
] => {
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentPosition = window.scrollY;
      setScrollPosition(currentPosition);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const setScroll = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getScroll = () => {
    return scrollPosition;
  };

  return [setScroll, getScroll];
};
