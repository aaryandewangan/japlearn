'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { calculateSimilarity } from '@/app/utils/characterSimilarity';

interface WritingCanvasProps {
  character: string;
  onClear: () => void;
  onSimilarityCheck?: (similarity: number) => void;
}

const WritingCanvas: React.FC<WritingCanvasProps> = ({ character, onClear, onSimilarityCheck }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const referenceCanvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [lastX, setLastX] = useState(0);
  const [lastY, setLastY] = useState(0);

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.strokeStyle = '#2563eb'; // blue-600
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.lineWidth = 8;
    setContext(ctx);

    // Set canvas size
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    ctx.scale(dpr, dpr);
    
    // Draw guide character
    ctx.font = '200px "Noto Sans JP"';
    ctx.fillStyle = '#94a3b8'; // slate-400
    ctx.globalAlpha = 0.1;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(character, rect.width / 2, rect.height / 2);
    ctx.globalAlpha = 1;
  }, [character]);

  const initializeReferenceCanvas = useCallback(() => {
    const refCanvas = referenceCanvasRef.current;
    if (!refCanvas) return;

    const refCtx = refCanvas.getContext('2d');
    if (!refCtx) return;

    refCtx.font = '200px "Noto Sans JP"';
    refCtx.fillStyle = '#000000';
    refCtx.textAlign = 'center';
    refCtx.textBaseline = 'middle';
    refCtx.fillText(character, refCanvas.width / 2, refCanvas.height / 2);
  }, [character]);

  useEffect(() => {
    initializeCanvas();
    initializeReferenceCanvas();
  }, [initializeCanvas, initializeReferenceCanvas]);

  const getCoordinates = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();
    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top
      };
    }
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  }, []);

  const checkSimilarity = useCallback(() => {
    if (!canvasRef.current || !referenceCanvasRef.current || !onSimilarityCheck) return;
    const similarity = calculateSimilarity(canvasRef.current, referenceCanvasRef.current);
    onSimilarityCheck(similarity);
  }, [onSimilarityCheck]);

  const clearCanvas = useCallback(() => {
    if (!context || !canvasRef.current) return;
    context.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    onClear();
  }, [context, onClear]);

  const startDrawing = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const coords = getCoordinates(e);
    setLastX(coords.x);
    setLastY(coords.y);
  }, [getCoordinates]);

  const draw = useCallback((e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !context) return;

    e.preventDefault();
    const coords = getCoordinates(e);
    
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(coords.x, coords.y);
    context.stroke();

    setLastX(coords.x);
    setLastY(coords.y);
    
    checkSimilarity();
  }, [isDrawing, context, lastX, lastY, getCoordinates, checkSimilarity]);

  const stopDrawing = useCallback(() => {
    setIsDrawing(false);
  }, []);

  return (
    <div className="w-full">
      <canvas
        ref={canvasRef}
        className="w-full aspect-square bg-white dark:bg-gray-800 rounded-lg border-2 border-gray-200 dark:border-gray-700 touch-none"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        onMouseOut={stopDrawing}
        onTouchStart={startDrawing}
        onTouchMove={draw}
        onTouchEnd={stopDrawing}
      />
      {/* Hidden reference canvas */}
      <canvas
        ref={referenceCanvasRef}
        className="hidden"
        width={500}
        height={500}
      />
    </div>
  );
};

export default WritingCanvas;