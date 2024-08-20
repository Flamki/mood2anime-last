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
    <div className="min-h-screen bg-gray-900 text-white">
      <header className="p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-blue-400">Mood2Anime</Link>
          <nav>
            <Link href="/moods" className="mr-4 hover:text-blue-400 transition duration-300">Anime</Link>
            <Link href="/manga/moods" className="mr-4 hover:text-blue-400 transition duration-300">Manga</Link>
            <Link href="/meme/moods" className="mr-4 text-blue-400 hover:text-blue-400 transition duration-300">Meme</Link>
            <Link href="/talk-to-fav" className="hover:text-blue-400 transition duration-300">Chat</Link>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-12">Choose Your Meme Mood</h1>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {moods.map(({ name, emoji }) => (
            <Link key={name} href={`/meme/${name.toLowerCase()}`}>
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