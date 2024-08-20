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
    <div className="min-h-screen bg-gray-900 text-white pt-20">
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Choose Your Manga Mood</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {moods.map(({ name, emoji }) => (
            <Link key={name} href={`/manga/${name.toLowerCase()}`}>
              <div className="bg-gray-800 rounded-lg p-4 text-center hover:bg-gray-700 transition duration-300">
                <span className="text-3xl mb-2 block">{emoji}</span>
                <span className="text-sm">{name}</span>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}