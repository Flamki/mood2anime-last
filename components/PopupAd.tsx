// components/PopupAd.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface PopupAdProps {
  message1: string;
  linkUrl1: string;
  message2: string;
  linkUrl2: string;
}

const PopupAd: React.FC<PopupAdProps> = ({ message1, linkUrl1, message2, linkUrl2 }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [bgColor, setBgColor] = useState('');
  const [textColor, setTextColor] = useState('');

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (!isVisible) {
      timeoutId = setTimeout(() => {
        setIsVisible(true);
        setRandomColors();
      }, 5000); // 5 seconds
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isVisible]);

  const setRandomColors = () => {
    const colors = [
      { bg: 'bg-gradient-to-r from-purple-400 to-pink-500', text: 'text-white' },
      { bg: 'bg-gradient-to-r from-green-400 to-blue-500', text: 'text-white' },
      { bg: 'bg-gradient-to-r from-yellow-400 to-red-500', text: 'text-black' },
      { bg: 'bg-gradient-to-r from-indigo-500 to-purple-500', text: 'text-white' },
      { bg: 'bg-gradient-to-r from-pink-500 to-yellow-500', text: 'text-white' },
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    setBgColor(randomColor.bg);
    setTextColor(randomColor.text);
  };

  useEffect(() => {
    setRandomColors();
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 right-4 ${bgColor} rounded-lg shadow-lg p-6 transition-all duration-300 transform hover:scale-105 max-w-sm`}>
      <div className="space-y-6">
        <Link href={linkUrl1} target="_blank" rel="noopener noreferrer" className="block">
          <p className={`${textColor} font-bold text-xl mb-2`}>{message1}</p>
          <p className={`${textColor} text-sm hover:underline`}>Click here</p>
        </Link>
        <div className="border-t border-white opacity-30"></div>
        <Link href={linkUrl2} target="_blank" rel="noopener noreferrer" className="block">
          <p className={`${textColor} font-bold text-xl mb-2`}>{message2}</p>
          <p className={`${textColor} text-sm hover:underline`}>Learn more</p>
        </Link>
      </div>
      <button
        onClick={handleClose}
        className={`absolute top-2 right-2 ${textColor} hover:text-gray-300`}
        aria-label="Close"
      >
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
  );
};

export default PopupAd;