'use client'
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { jsPDF } from 'jspdf';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import TextStyle from '@tiptap/extension-text-style';
import Highlight from '@tiptap/extension-highlight';
import { 
  FiDownload, FiSave, FiTrash2, FiBold, FiItalic, FiList, 
  FiAlignLeft, FiAlignCenter, FiAlignRight, FiCode, 
  FiLink, FiImage, FiUnderline, FiType, FiEdit3 
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import Header from '@/app/components/layout/Header';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import CodeBlock from '@tiptap/extension-code-block';
import ConfirmDialog from '@/app/components/ConfirmDialog';
import DrawingCanvas from '@/app/components/DrawingCanvas';
import LimitWarningDialog from '@/app/components/LimitWarningDialog';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface DrawingState {
  isDrawing: boolean;
  lastX: number;
  lastY: number;
  bounds: {
    minX: number;
    minY: number;
    maxX: number;
    maxY: number;
  } | null;
}

const MenuBar = ({ 
  editor, 
  isDrawingMode, 
  setIsDrawingMode,
  onSaveDrawing,
  drawingSettings,
  setDrawingSettings
}: { 
  editor: any; 
  isDrawingMode: boolean;
  setIsDrawingMode: (value: boolean) => void;
  onSaveDrawing: () => void;
  drawingSettings: { tool: string; color: string; width: number };
  setDrawingSettings: (settings: any) => void;
}) => {
  if (!editor) return null;

  const addImage = () => {
    const url = window.prompt('Enter image URL:');
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
    }
  };

  const addLink = () => {
    const url = window.prompt('Enter URL:');
    if (url) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-2 p-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      {!isDrawingMode ? (
        <>
          <div className="flex items-center gap-1 p-1 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                editor.isActive('bold') ? 'bg-gray-200 dark:bg-gray-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              title="Bold"
            >
              <FiBold size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                editor.isActive('italic') ? 'bg-gray-200 dark:bg-gray-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              title="Italic"
            >
              <FiItalic size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleUnderline().run()}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                editor.isActive('underline') ? 'bg-gray-200 dark:bg-gray-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              title="Underline"
            >
              <FiUnderline size={18} />
            </button>
          </div>

          <div className="flex items-center gap-1 p-1 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <button
              onClick={() => editor.chain().focus().setTextAlign('left').run()}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                editor.isActive({ textAlign: 'left' }) ? 'bg-gray-200 dark:bg-gray-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              title="Align Left"
            >
              <FiAlignLeft size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('center').run()}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                editor.isActive({ textAlign: 'center' }) ? 'bg-gray-200 dark:bg-gray-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              title="Align Center"
            >
              <FiAlignCenter size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().setTextAlign('right').run()}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                editor.isActive({ textAlign: 'right' }) ? 'bg-gray-200 dark:bg-gray-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              title="Align Right"
            >
              <FiAlignRight size={18} />
            </button>
          </div>

          <div className="flex items-center gap-1 p-1 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <select
              onChange={(e) => editor.chain().focus().setColor(e.target.value).run()}
              className="p-2 rounded-md bg-transparent border border-gray-200 dark:border-gray-600 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                text-gray-600 dark:text-gray-300"
            >
              <option value="#000000">Black</option>
              <option value="#FF0000">Red</option>
              <option value="#0000FF">Blue</option>
              <option value="#008000">Green</option>
              <option value="#FFA500">Orange</option>
              <option value="#800080">Purple</option>
            </select>
            <select
              onChange={(e) => editor.chain().focus().setFontSize(e.target.value).run()}
              className="p-2 rounded-md bg-transparent border border-gray-200 dark:border-gray-600 text-sm
                focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400
                text-gray-600 dark:text-gray-300"
            >
              <option value="12px">Small</option>
              <option value="16px">Normal</option>
              <option value="20px">Large</option>
              <option value="24px">Huge</option>
            </select>
          </div>

          <div className="flex items-center gap-1 p-1 bg-white dark:bg-gray-700 rounded-lg shadow-sm">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                editor.isActive('bulletList') ? 'bg-gray-200 dark:bg-gray-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              title="Bullet List"
            >
              <FiList size={18} />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                editor.isActive('codeBlock') ? 'bg-gray-200 dark:bg-gray-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              title="Code Block"
            >
              <FiCode size={18} />
            </button>
            <button
              onClick={addLink}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                editor.isActive('link') ? 'bg-gray-200 dark:bg-gray-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              title="Add Link"
            >
              <FiLink size={18} />
            </button>
            <button
              onClick={addImage}
              className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors ${
                editor.isActive('image') ? 'bg-gray-200 dark:bg-gray-500 text-gray-900 dark:text-white' : 'text-gray-600 dark:text-gray-300'
              }`}
              title="Add Image"
            >
              <FiImage size={18} />
            </button>
          </div>
        </>
      ) : (
        <div className="flex items-center gap-4">
          <select
            value={drawingSettings.tool}
            onChange={(e) => setDrawingSettings({ ...drawingSettings, tool: e.target.value })}
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
            value={drawingSettings.color}
            onChange={(e) => setDrawingSettings({ ...drawingSettings, color: e.target.value })}
            className="w-10 h-10 rounded cursor-pointer"
          />
          
          <input
            type="range"
            min="1"
            max="20"
            value={drawingSettings.width}
            onChange={(e) => setDrawingSettings({ 
              ...drawingSettings, 
              width: parseInt(e.target.value) 
            })}
            className="w-32"
          />
        </div>
      )}

      <div className="ml-auto flex items-center gap-2">
        <button
          onClick={() => {
            if (isDrawingMode) {
              onSaveDrawing();
            }
            setIsDrawingMode(!isDrawingMode);
          }}
          className={`px-4 py-2 rounded-lg transition-colors ${
            isDrawingMode 
              ? 'bg-blue-500 text-white hover:bg-blue-600' 
              : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          {isDrawingMode ? 'Text Mode' : 'Drawing Mode'}
        </button>
      </div>
    </div>
  );
};

export default function NotesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [currentNote, setCurrentNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [noteToDelete, setNoteToDelete] = useState<string | null>(null);
  const [isDrawingMode, setIsDrawingMode] = useState(false);
  const [showLimitWarning, setShowLimitWarning] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const contextRef = useRef<CanvasRenderingContext2D | null>(null);
  const drawingState = useRef<DrawingState>({
    isDrawing: false,
    lastX: 0,
    lastY: 0,
    bounds: null
  });
  const [drawingSettings, setDrawingSettings] = useState({
    tool: 'pen',
    color: '#000000',
    width: 2
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Highlight,
      Underline,
      Link.configure({
        openOnClick: true,
        linkOnPaste: true,
      }),
      Image.configure({
        inline: true,
      }),
      TextAlign.configure({
        types: ['heading', 'paragraph'],
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-100 dark:bg-gray-700 rounded p-4 font-mono',
        },
      }),
    ],
    content: currentNote?.content || '',
    onUpdate: ({ editor }) => {
      if (currentNote) {
        setCurrentNote({
          ...currentNote,
          content: editor.getHTML()
        });
      }
    },
  });

  useEffect(() => {
    if (editor && currentNote) {
      editor.commands.setContent(currentNote.content);
    }
  }, [currentNote?.id, editor]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    
    if (status === 'authenticated') {
      fetchNotes();
    }
  }, [status, router]);

  const fetchNotes = async () => {
    try {
      const response = await fetch('/api/notes');
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to fetch notes');
      }
      const data = await response.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (error: any) {
      console.error('Error fetching notes:', error);
      toast.error(error.message || 'Failed to fetch notes');
      setNotes([]);
    }
  };

  const handleSave = async () => {
    if (!currentNote?.title || !currentNote?.content) {
      toast.error('Please add a title and content');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch('/api/notes', {
        method: currentNote.id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(currentNote),
      });

      if (response.ok) {
        toast.success('Note saved successfully');
        fetchNotes();
        if (!currentNote.id) {
          setCurrentNote(null);
        }
      }
    } catch (error) {
      toast.error('Failed to save note');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setNoteToDelete(id);
    setDeleteDialogOpen(true);
  };

  const confirmDelete = async () => {
    if (!noteToDelete) return;

    try {
      await fetch(`/api/notes/${noteToDelete}`, { method: 'DELETE' });
      toast.success('Note deleted successfully');
      fetchNotes();
      if (currentNote?.id === noteToDelete) {
        setCurrentNote(null);
      }
    } catch (error) {
      toast.error('Failed to delete note');
    }
    setNoteToDelete(null);
  };

  const exportAsTxt = () => {
    if (!currentNote) return;
    
    const element = document.createElement('a');
    const file = new Blob([currentNote.content], {type: 'text/plain'});
    element.href = URL.createObjectURL(file);
    element.download = `${currentNote.title}.txt`;
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const exportAsPdf = () => {
    if (!currentNote) return;

    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(currentNote.title, 20, 20);
    doc.setFontSize(12);
    
    const splitText = doc.splitTextToSize(currentNote.content, 180);
    doc.text(splitText, 20, 30);
    doc.save(`${currentNote.title}.pdf`);
  };

  const initializeCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    // Set canvas size to match parent container
    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.clientWidth;
    canvas.height = parent.clientHeight;

    context.lineCap = 'round';
    context.strokeStyle = '#000000';
    context.lineWidth = 2;
    contextRef.current = context;
  };

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!contextRef.current) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    drawingState.current = {
      isDrawing: true,
      lastX: x,
      lastY: y,
      bounds: {
        minX: x,
        minY: y,
        maxX: x,
        maxY: y
      }
    };
    
    contextRef.current.beginPath();
    contextRef.current.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!contextRef.current || !drawingState.current.isDrawing) return;

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Update bounds
    if (drawingState.current.bounds) {
      drawingState.current.bounds.minX = Math.min(drawingState.current.bounds.minX, x);
      drawingState.current.bounds.minY = Math.min(drawingState.current.bounds.minY, y);
      drawingState.current.bounds.maxX = Math.max(drawingState.current.bounds.maxX, x);
      drawingState.current.bounds.maxY = Math.max(drawingState.current.bounds.maxY, y);
    }

    contextRef.current.lineTo(x, y);
    contextRef.current.stroke();
  };

  const stopDrawing = () => {
    if (!contextRef.current) return;
    drawingState.current.isDrawing = false;
    contextRef.current.closePath();
  };

  useEffect(() => {
    if (isDrawingMode) {
      initializeCanvas();
    }
  }, [isDrawingMode]);

  useEffect(() => {
    if (!contextRef.current) return;
    
    contextRef.current.strokeStyle = drawingSettings.color;
    contextRef.current.lineWidth = drawingSettings.width;
    
    if (drawingSettings.tool === 'brush') {
      contextRef.current.lineWidth = drawingSettings.width * 2;
      contextRef.current.shadowBlur = 10;
      contextRef.current.shadowColor = drawingSettings.color;
    } else {
      contextRef.current.shadowBlur = 0;
    }
    
    if (drawingSettings.tool === 'eraser') {
      contextRef.current.globalCompositeOperation = 'destination-out';
    } else {
      contextRef.current.globalCompositeOperation = 'source-over';
    }
  }, [drawingSettings]);

  const handleCreateNewNote = () => {
    if (notes.length >= 10 && (notes.length - 10) % 5 === 0) {
      setShowLimitWarning(true);
    }

    setCurrentNote({ 
      id: '', 
      title: '', 
      content: '', 
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    });
  };

  const saveDrawingToEditor = () => {
    if (!canvasRef.current || !editor || !drawingState.current.bounds) return;
    
    const bounds = drawingState.current.bounds;
    const width = bounds.maxX - bounds.minX + 20;
    const height = bounds.maxY - bounds.minY + 20;
    
    // Create a temporary canvas with just the drawn area
    const tempCanvas = document.createElement('canvas');
    tempCanvas.width = width;
    tempCanvas.height = height;
    const tempCtx = tempCanvas.getContext('2d');
    
    if (tempCtx && contextRef.current) {
      // Copy the drawing with proper offset
      tempCtx.drawImage(
        canvasRef.current,
        bounds.minX, bounds.minY, width, height,  // Source coordinates
        0, 0, width, height                       // Destination coordinates
      );
      
      // Get the image data and check if it's empty
      const imageData = tempCtx.getImageData(0, 0, width, height).data;
      const isEmpty = imageData.every(pixel => pixel === 0);
      
      if (!isEmpty) {
        const dataUrl = tempCanvas.toDataURL('image/png');
        editor.chain().focus().setImage({ src: dataUrl }).run();
      }
    }
    
    // Reset bounds and clear canvas
    drawingState.current.bounds = null;
    if (contextRef.current) {
      contextRef.current.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    }
  };

  return (
    <>
      <Header />
      <div className="min-h-screen pt-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto p-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            {/* Notes List Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Notes</h2>
                    <button
                      onClick={handleCreateNewNote}
                      className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                        transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
                    >
                      <span>New Note</span>
                    </button>
                  </div>
                </div>
                <div className="divide-y divide-gray-200 dark:divide-gray-700">
                  {notes.map((note) => (
                    <motion.div
                      key={note.id}
                      whileHover={{ x: 4 }}
                      className={`p-4 cursor-pointer transition-colors duration-200 ${
                        currentNote?.id === note.id 
                          ? 'bg-blue-50 dark:bg-blue-900/30' 
                          : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                      }`}
                      onClick={() => setCurrentNote(note)}
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {note.title || 'Untitled'}
                        </h3>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(note.id);
                          }}
                          className="p-1 text-gray-400 hover:text-red-500 rounded-full 
                            hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                        {new Date(note.updatedAt).toLocaleDateString()}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>

            {/* Note Editor */}
            <div className="lg:col-span-4">
              {currentNote ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden"
                >
                  <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
                    <input
                      type="text"
                      value={currentNote.title}
                      onChange={(e) => setCurrentNote({ ...currentNote, title: e.target.value })}
                      placeholder="Note title"
                      className="text-xl font-bold bg-transparent border-none focus:outline-none 
                        text-gray-900 dark:text-white w-full"
                    />
                    <div className="flex items-center gap-2">
                      <button
                        onClick={exportAsTxt}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 
                          dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <FiDownload size={16} />
                        <span>TXT</span>
                      </button>
                      <button
                        onClick={exportAsPdf}
                        className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 
                          dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
                      >
                        <FiDownload size={16} />
                        <span>PDF</span>
                      </button>
                      <button
                        onClick={handleSave}
                        disabled={loading}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 
                          text-white rounded-lg transition-colors text-sm font-medium disabled:opacity-50"
                      >
                        <FiSave size={16} />
                        <span>Save</span>
                      </button>
                    </div>
                  </div>
                  <MenuBar 
                    editor={editor} 
                    isDrawingMode={isDrawingMode} 
                    setIsDrawingMode={setIsDrawingMode}
                    onSaveDrawing={saveDrawingToEditor}
                    drawingSettings={drawingSettings}
                    setDrawingSettings={setDrawingSettings}
                  />
                  <div className="p-4">
                    <div className="relative">
                      <EditorContent 
                        editor={editor} 
                        className="prose dark:prose-invert max-w-none min-h-[calc(100vh-400px)]"
                      />
                      {isDrawingMode && (
                        <div className="absolute inset-0 pointer-events-none">
                          <canvas
                            ref={canvasRef}
                            onMouseDown={startDrawing}
                            onMouseMove={draw}
                            onMouseUp={stopDrawing}
                            onMouseLeave={stopDrawing}
                            className="pointer-events-auto cursor-crosshair bg-transparent absolute"
                            style={{ 
                              touchAction: 'none',
                              mixBlendMode: 'multiply',
                              left: drawingState.current.bounds ? `${drawingState.current.bounds.minX}px` : 0,
                              top: drawingState.current.bounds ? `${drawingState.current.bounds.minY}px` : 0,
                              width: drawingState.current.bounds 
                                ? `${drawingState.current.bounds.maxX - drawingState.current.bounds.minX + 20}px`
                                : '100%',
                              height: drawingState.current.bounds 
                                ? `${drawingState.current.bounds.maxY - drawingState.current.bounds.minY + 20}px`
                                : '100%'
                            }}
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[calc(100vh-200px)] 
                  bg-white dark:bg-gray-800 rounded-xl shadow-lg">
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    Select a note or create a new one
                  </p>
                  <button
                    onClick={handleCreateNewNote}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg 
                      transition-colors duration-200 flex items-center gap-2 text-sm font-medium"
                  >
                    Create New Note
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <LimitWarningDialog
        isOpen={showLimitWarning}
        onClose={() => setShowLimitWarning(false)}
      />
      
      <ConfirmDialog
        isOpen={deleteDialogOpen}
        onClose={() => setDeleteDialogOpen(false)}
        onConfirm={confirmDelete}
        title="Delete Note"
        message="Are you sure you want to delete this note?"
        confirmText="Delete"
        type="danger"
      />
    </>
  );
} 