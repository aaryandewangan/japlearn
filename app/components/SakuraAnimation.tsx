'use client';

import { useEffect, useState } from 'react';
import { useTheme } from 'next-themes';
import styles from './SakuraAnimation.module.css';

const SakuraAnimation = () => {
  const { theme } = useTheme();
  const [petals, setPetals] = useState<Array<{ id: number; style: any }>>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const createPetal = () => {
      const left = Math.random() * 100;
      const animationDuration = 6 + Math.random() * 4;
      const size = 8 + Math.random() * 12;
      
      return {
        id: Math.random(),
        style: {
          left: `${left}%`,
          animationDuration: `${animationDuration}s`,
          width: `${size}px`,
          height: `${size}px`,
          background: mounted && theme === 'dark' ? '#ffd7e6' : '#ff9ebd',
          opacity: mounted && theme === 'dark' ? 0.8 : 0.5,
        },
      };
    };

    // Create initial petals
    const initialPetals = Array.from({ length: 30 }, createPetal);
    setPetals(initialPetals);

    // Add new petals periodically
    const interval = setInterval(() => {
      setPetals(prev => [...prev.slice(-29), createPetal()]);
    }, 300);

    return () => clearInterval(interval);
  }, [theme, mounted]);

  return (
    <div className={styles.sakuraContainer}>
      <div className={`${styles.tree} ${mounted && theme === 'dark' ? styles.treeDark : styles.treeLight}`}></div>
      {petals.map(petal => (
        <div
          key={petal.id}
          className={styles.petal}
          style={petal.style}
        />
      ))}
    </div>
  );
};

export default SakuraAnimation; 