import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Share2, X } from 'lucide-react';
import { useTodoStore } from '../store/todoStore';

export const ShareButton: React.FC = () => {
  const [showQR, setShowQR] = useState(false);
  const todos = useTodoStore((state) => state.todos);

  const shareUrl = `${window.location.origin}?data=${encodeURIComponent(
    JSON.stringify(todos)
  )}`;

  return (
    <div className="relative">
      <button
        onClick={() => setShowQR(true)}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-cyan-500/50 transition-all duration-300 hover:scale-105 group"
        aria-label="Share tasks"
      >
        <Share2 className="w-6 h-6 group-hover:rotate-12 transition-transform" />
      </button>

      {showQR && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-2xl max-w-sm w-full relative animate-fade-in">
            <button
              onClick={() => setShowQR(false)}
              className="absolute -top-3 -right-3 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
            
            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 text-center">
              Share Your Tasks
            </h3>
            
            <div className="bg-white p-4 rounded-lg mb-4 flex justify-center">
              <div className="qr-glow">
                <QRCodeSVG
                  value={shareUrl}
                  size={200}
                  level="H"
                  includeMargin
                  className="rounded-lg"
                />
              </div>
            </div>
            
            <p className="text-sm text-gray-600 dark:text-gray-400 text-center">
              Scan this QR code to share your task list
            </p>
          </div>
        </div>
      )}
    </div>
  );
};