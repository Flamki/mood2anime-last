'use client';

import Link from 'next/link';

const moods: { name: string; emoji: string }[] = [
  { name: 'Funny', emoji: '😂' },
  { name: 'Wholesome', emoji: '🥰' },
  { name: 'Savage', emoji: '😎' },
  { name: 'Cute', emoji: '🥺' },
  { name: 'Epic', emoji: '🦸' },
  { name: 'Cringe', emoji: '😬' },
  { name: 'Relatable', emoji: '🤔' },
  { name: 'Nostalgic', emoji: '🕰️' },
  { name: 'Dank', emoji: '🌿' },
  { name: 'Nerdy', emoji: '🤓' },
  { name: 'Otaku', emoji: '🇯🇵' },
  { name: 'Spicy', emoji: '🌶️' }
];

export default function MemeMoodsPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 animate-gradient-x"></div>
      <div className="relative z-10 text-center w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-white mb-8">Choose Your Meme Mood</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {moods.map(({ name, emoji }) => (
            <Link key={name} href={`/meme/${name.toLowerCase()}`}>
              <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-sm text-white font-semibold py-3 px-4 rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 text-center cursor-pointer">
                <span className="text-2xl mr-2">{emoji}</span>
                <span className="text-sm">{name}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}