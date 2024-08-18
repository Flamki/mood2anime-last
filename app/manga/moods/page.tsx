'use client';

import Link from 'next/link';

const moods: { name: string; emoji: string }[] = [
  { name: 'Happy', emoji: '😊' },
  { name: 'Sad', emoji: '😢' },
  { name: 'Funny', emoji: '😂' },
  { name: 'Epic', emoji: '🦸' },
  { name: 'Chill', emoji: '😌' },
  { name: 'Crazy', emoji: '🤪' },
  { name: 'Majestic', emoji: '👑' },
  { name: 'Nostalgic', emoji: '🕰️' },
  { name: 'Romantic', emoji: '❤️' },
  { name: 'Mysterious', emoji: '🕵️' },
  { name: 'Yandere', emoji: '🔪' },
  { name: 'Angry', emoji: '😠' },
  { name: 'Lonely', emoji: '🥺' },
  { name: 'Sports', emoji: '🏅' },
  { name: 'Power-ups', emoji: '💪' },
  { name: 'Heartwarming', emoji: '🥰' },
  { name: 'Dark', emoji: '🌑' },
  { name: 'Fan service', emoji: '🌶️' },
  { name: 'Heroic', emoji: '🦸‍♂️' },
  { name: 'Overpowered', emoji: '💥' },
  { name: 'Plot Twist', emoji: '🔄' },
  { name: 'Melancholic', emoji: '🥀' },
  { name: 'Hype', emoji: '🔥' }
];

export default function MangaMoodsPage() {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden p-4">
      <div className="absolute inset-0 bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 animate-gradient-x"></div>
      <div className="relative z-10 text-center w-full max-w-6xl">
        <h1 className="text-4xl font-bold text-white mb-8">Choose Your Manga Mood</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {moods.map(({ name, emoji }) => (
            <Link key={name} href={`/manga/${name.toLowerCase()}`}>
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