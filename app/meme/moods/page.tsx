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
    <div className="min-h-screen bg-gray-900 text-white pt-16 md:pt-20">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-8 md:mb-12">Choose Your Meme Mood</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 md:gap-4">
          {moods.map(({ name, emoji }) => (
            <Link key={name} href={`/meme/${name.toLowerCase()}`}>
              <div className="bg-gray-800 rounded-lg p-3 md:p-4 text-center hover:bg-gray-700 transition duration-300">
                <span className="text-2xl md:text-3xl mb-1 md:mb-2 block">{emoji}</span>
                <span className="text-xs md:text-sm">{name}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}