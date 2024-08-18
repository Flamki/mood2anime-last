import React from 'react';

export default function TalkToFavPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Talk to Your Fav</h1>
        <p className="text-xl text-gray-600 mb-6">
          Coming soon! You&apos;ll be able to chat with your favorite anime characters!
        </p>
        <div className="text-lg text-gray-700">
          <p>Imagine conversing with:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Naruto Uzumaki</li>
            <li>Monkey D. Luffy</li>
            <li>Sailor Moon</li>
            <li>And many more!</li>
          </ul>
        </div>
      </div>
    </div>
  );
}