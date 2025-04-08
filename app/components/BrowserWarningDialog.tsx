'use client'
import { useState, useEffect } from 'react';
import { FiX, FiAlertCircle } from 'react-icons/fi';

export default function BrowserWarningDialog() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const hasSeenWarning = localStorage.getItem('hasSeenBrowserWarning');
    if (!hasSeenWarning && !isChrome()) {
      setIsVisible(true);
    }
  }, []);

  const isChrome = () => {
    return navigator.userAgent.indexOf("Chrome") !== -1;
  };

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem('hasSeenBrowserWarning', 'true');
  };

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white dark:bg-gray-800 rounded-xl shadow-lg p-4 z-50 border border-gray-200 dark:border-gray-700">
      <div className="flex items-start gap-3">
        <FiAlertCircle className="text-yellow-500 text-xl flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <p className="text-gray-900 dark:text-white">
            Please use Chrome Browser for voice lessons, other browsers might not work for voice lessons
            <span className="block text-sm text-gray-500 dark:text-gray-400 mt-1">
              (Ignore if already using Chrome Browser)
            </span>
          </p>
        </div>
        <button 
          onClick={handleDismiss}
          className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <FiX size={20} />
        </button>
      </div>
    </div>
  );
} 