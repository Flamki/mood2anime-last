// app/manga/page.tsx
import Link from 'next/link';

export default function MangaPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <Link 
        href="/manga/moods" 
        className="bg-blue-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-blue-700 transition duration-300"
      >
        Find manga based on your mood
      </Link>
    </div>
  );
}