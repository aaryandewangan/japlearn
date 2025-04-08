'use client';

import React, { useRef, useEffect, useState } from 'react';

interface StrokeOrderProps {
  character: string;
}

// Stroke data for hiragana characters
const strokeData: { [key: string]: number[][][] } = {
  'あ': [
    // First stroke - diagonal line from top-right to bottom-left
    [[140, 60], [60, 120]], 
    // Second stroke - horizontal line with slight angle
    [[60, 120], [160, 140]], 
  ],
  'い': [
    // Vertical line with slight curve
    [[100, 40], [90, 100], [100, 160]],
    // Horizontal line crossing the vertical
    [[50, 100], [150, 100]],
  ],
  'う': [
    // Single curved stroke
    [[60, 60], [120, 60], [140, 100], [120, 140], [60, 140]],
  ],
  // Add more characters as needed
};

const StrokeOrder: React.FC<StrokeOrderProps> = ({ character }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentStroke, setCurrentStroke] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const animationRef = useRef<number | undefined>(undefined);

  const drawStrokes = (ctx: CanvasRenderingContext2D, upToStroke: number) => {
    ctx.clearRect(0, 0, 200, 200);
    if (!strokeData[character]) return;

    // Set up the canvas context
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 14;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Optional grid for reference (can be removed in production)
    const drawGrid = false;
    if (drawGrid) {
      ctx.strokeStyle = '#e5e7eb40';
      ctx.lineWidth = 1;
      // Draw grid lines
      for (let i = 0; i <= 200; i += 40) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, 200);
        ctx.moveTo(0, i);
        ctx.lineTo(200, i);
        ctx.stroke();
      }
    }

    // Draw strokes
    ctx.strokeStyle = '#2563eb';
    ctx.lineWidth = 14;

    for (let i = 0; i <= upToStroke; i++) {
      const stroke = strokeData[character][i];
      ctx.beginPath();
      ctx.moveTo(stroke[0][0], stroke[0][1]);
      
      if (stroke.length === 3 && i === 0) {
        // For curved lines, use quadraticCurveTo
        ctx.quadraticCurveTo(
          stroke[1][0], stroke[1][1], // control point
          stroke[2][0], stroke[2][1]  // end point
        );
      } else {
        // For straight lines, use lineTo
        for (let j = 1; j < stroke.length; j++) {
          ctx.lineTo(stroke[j][0], stroke[j][1]);
        }
      }
      
      ctx.stroke();
    }
  };

  const animate = () => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    if (currentStroke < strokeData[character].length) {
      drawStrokes(ctx, currentStroke);
      setCurrentStroke(prev => prev + 1);
      animationRef.current = requestAnimationFrame(() => {
        setTimeout(animate, 1000); // Delay between strokes
      });
    } else {
      setIsPlaying(false);
      setCurrentStroke(0);
    }
  };

  const toggleAnimation = () => {
    if (isPlaying) {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      setIsPlaying(false);
      setCurrentStroke(0);
    } else {
      setIsPlaying(true);
      animate();
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set initial state
    drawStrokes(ctx, -1);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [character]);

  return (
    <div className="relative">
      <canvas
        ref={canvasRef}
        width={200}
        height={200}
        className="w-full aspect-square bg-gray-50 dark:bg-gray-700 rounded-lg"
      />
      <button
        onClick={toggleAnimation}
        className="absolute bottom-4 right-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
      >
        {isPlaying ? 'Reset' : 'Play'}
      </button>
    </div>
  );
};

export default StrokeOrder; 