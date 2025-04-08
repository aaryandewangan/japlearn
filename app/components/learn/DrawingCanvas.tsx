"use client";

import React, { useRef, useState, useEffect } from 'react';

interface DrawingCanvasProps {
  onSubmit: (accuracy: number) => void;
  expectedCharacter: string;
}

const DrawingCanvas: React.FC<DrawingCanvasProps> = ({ onSubmit, expectedCharacter }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = 'black';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        setContext(ctx);
      }
    }
  }, []);

  const getCoordinates = (event: MouseEvent | React.Touch, canvas: HTMLCanvasElement) => {
    const rect = canvas.getBoundingClientRect();
    return {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas || !context) return;

    setIsDrawing(true);
    const coords = getCoordinates(
      'touches' in e ? e.touches[0] : e.nativeEvent,
      canvas
    );
    
    context.beginPath();
    context.moveTo(coords.x, coords.y);
    setLastPoint(coords);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    e.preventDefault();
    if (!isDrawing || !context || !canvasRef.current || !lastPoint) return;

    const coords = getCoordinates(
      'touches' in e ? e.touches[0] : e.nativeEvent,
      canvasRef.current
    );

    context.quadraticCurveTo(
      lastPoint.x,
      lastPoint.y,
      (coords.x + lastPoint.x) / 2,
      (coords.y + lastPoint.y) / 2
    );
    
    context.stroke();
    setLastPoint(coords);
  };

  const stopDrawing = () => {
    if (!isDrawing) return;
    setIsDrawing(false);
    setLastPoint(null);
    
    // Simulate character recognition with random accuracy
    const simulatedAccuracy = Math.random() * 30 + 70; // Random accuracy between 70-100
    onSubmit(simulatedAccuracy);
  };

  const clearCanvas = () => {
    if (context && canvasRef.current) {
      context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      context.beginPath();
    }
  };

  useEffect(() => {
    clearCanvas();
  }, [expectedCharacter]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative">
        <div className="absolute -top-16 left-1/2 transform -translate-x-1/2 text-6xl text-gray-300 font-japanese">
          {expectedCharacter}
        </div>
        <canvas
          ref={canvasRef}
          width={300}
          height={300}
          className="border-2 border-gray-200 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
      </div>
      <div className="mt-4 flex gap-4">
        <button
          onClick={clearCanvas}
          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
        >
          Clear
        </button>
        <button
          onClick={() => stopDrawing()}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default DrawingCanvas; 