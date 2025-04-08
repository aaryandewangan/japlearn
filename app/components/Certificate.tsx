import React from 'react';

interface CertificateProps {
  userName: string;
  category: string;
  date: string;
  title: string;
}

export default function Certificate({ 
  userName, 
  category, 
  date, 
  title,
}: CertificateProps) {
  // Determine decorative characters based on category
  const decorations = category.toLowerCase() === 'hiragana' 
    ? {
        topLeft: 'あ',
        topRight: 'ひ',
        bottomLeft: 'ら',
        bottomRight: 'が',
      }
    : {
        topLeft: 'ア',
        topRight: 'カ',
        bottomLeft: 'タ',
        bottomRight: 'ナ',
      };

  // Dynamic completion message based on category
  const completionMessage = `has successfully completed all ${category} levels with excellence,
    demonstrating outstanding proficiency in Japanese writing.`;

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-2xl">
      {/* Border with gradient */}
      <div className="p-1 bg-gradient-to-br from-red-600 via-red-500 to-purple-600">
        <div className="bg-white p-16 relative">
          {/* Logo */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-red-600">
                JapLearn
              </span>
            </div>
          </div>

          {/* Certificate Content */}
          <div className="mt-16 text-center space-y-8">
            {/* Title */}
            <div>
              <h1 className="text-4xl font-bold text-gray-800 mb-2">{title}</h1>
              <div className="h-1 w-40 bg-gradient-to-r from-red-500 to-purple-500 mx-auto"></div>
            </div>

            {/* Main Content */}
            <div className="space-y-6 my-12">
              <p className="text-xl text-gray-600">This is to certify that</p>
              <p className="text-4xl font-bold text-gray-800 font-serif">{userName}</p>
              <p className="text-xl text-gray-700 italic max-w-2xl mx-auto">
                {completionMessage}
              </p>
            </div>

            {/* Date */}
            <div className="mt-12">
              <p className="text-lg text-gray-600">Awarded on</p>
              <p className="text-xl font-semibold text-gray-800">{date}</p>
            </div>

            {/* Japanese Decorations */}
            <div className="absolute top-8 left-8 text-red-600 text-5xl font-serif opacity-50">
              {decorations.topLeft}
            </div>
            <div className="absolute top-8 right-8 text-red-600 text-5xl font-serif opacity-50">
              {decorations.topRight}
            </div>
            <div className="absolute bottom-8 left-8 text-red-600 text-5xl font-serif opacity-50">
              {decorations.bottomLeft}
            </div>
            <div className="absolute bottom-8 right-8 text-red-600 text-5xl font-serif opacity-50">
              {decorations.bottomRight}
            </div>

            {/* Certificate Seal */}
            <div className="absolute bottom-12 right-12">
              <div className="w-28 h-28 rounded-full border-4 border-red-600 flex items-center justify-center bg-red-50">
                <div className="text-center">
                  <span className="text-red-600 text-2xl font-serif">合格</span>
                  <div className="text-xs text-red-600 mt-1">CERTIFIED</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 