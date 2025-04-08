'use client'
import { useEffect, useRef, useState, useCallback } from 'react';

interface DrawingCanvasProps {
  onSave: (dataUrl: string) => void;
  onClose: () => void;
}

interface DrawingOptions {
  color: string;
  width: number;
  tool: 'pen' | 'brush' | 'pencil' | 'eraser';
}

export default function DrawingCanvas({ onSave, onClose }: DrawingCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [options, setOptions] = useState<DrawingOptions>({
    color: '#000000',
    width: 2,
    tool: 'pen'
  });

  const initializeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    canvas.width = window.innerWidth * 0.8;
    canvas.height = window.innerHeight * 0.6;

    // Get context
    const context = canvas.getContext('2d');
    if (!context) return;

    // Set default styles
    context.lineCap = 'round';
    context.strokeStyle = options.color;
    context.lineWidth = options.width;
    contextRef.current = context;
  }, [options.color, options.width]);

  useEffect(() => {
    initializeCanvas();
  }, [initializeCanvas]);

  useEffect(() => {
    if (!contextRef.current) return;
    
    contextRef.current.strokeStyle = options.color;
    contextRef.current.lineWidth = options.width;
    
    if (options.tool === 'brush') {
      contextRef.current.lineWidth = options.width * 2;
      contextRef.current.shadowBlur = 10;
      contextRef.current.shadowColor = options.color;
    } else {
      contextRef.current.shadowBlur = 0;
    }
    
    if (options.tool === 'eraser') {
      contextRef.current.globalCompositeOperation = 'destination-out';
    } else {
      contextRef.current.globalCompositeOperation = 'source-over';
    }
  }, [options.color, options.width, options.tool]);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas || !contextRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
    setIsDrawing(true);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !contextRef.current || !canvasRef.current) return;

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const handleSave = () => {
    if (!canvasRef.current) return;
    const dataUrl = canvasRef.current.toDataURL('image/png');
    onSave(dataUrl);
    onClose();
  };

  const clearCanvas = () => {
    if (!canvasRef.current || !contextRef.current) return;
    contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 w-[85%] max-h-[90vh]">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <select
              value={options.tool}
              onChange={(e) => setOptions({ ...options, tool: e.target.value as DrawingOptions['tool'] })}
              className="px-3 py-2 rounded-md border border-gray-200 dark:border-gray-700 
                bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="pen">Pen</option>
              <option value="brush">Brush</option>
              <option value="pencil">Pencil</option>
              <option value="eraser">Eraser</option>
            </select>
            
            <input
              type="color"
              value={options.color}
              onChange={(e) => setOptions({ ...options, color: e.target.value })}
              className="w-10 h-10 rounded cursor-pointer"
            />
            
            <input
              type="range"
              min="1"
              max="20"
              value={options.width}
              onChange={(e) => setOptions({ ...options, width: parseInt(e.target.value) })}
              className="w-32"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={clearCanvas}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Clear
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-500 
                hover:bg-blue-600 rounded-lg transition-colors"
            >
              Save
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 
                hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
        
        <canvas
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          className="border border-gray-200 dark:border-gray-700 rounded-lg bg-white"
        />
      </div>
    </div>
  );
} 