import Link from 'next/link';

export default function MemePage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <Link 
        href="/meme/moods" 
        className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-purple-100 transition duration-300"
      >
        Find anime memes based on your mood
      </Link>
    </div>
  );
}