import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <h1 className="text-4xl font-bold text-white mb-8">Mood2Anime</h1>
      <Link href="/moods" className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-purple-100 transition duration-300">
        Show me anime according to my mood
      </Link>
    </div>
  );
}