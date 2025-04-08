'use client'

interface LimitWarningDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LimitWarningDialog({ isOpen, onClose }: LimitWarningDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl p-6 w-full max-w-md">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Friendly Reminder
        </h2>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Please Export your stuffs as pdf or text file and delete some of the notes to keep our database free from overloading. We are not limit your Notes Creation, but, doing so will surely make help us and other users too !! 🤗
        </p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
} 