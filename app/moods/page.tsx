import Link from 'next/link';
import MoodButton from '../../components/MoodButton';
import { Mood } from '../../types';

const moods: Mood[] = ['happy', 'sad', 'majestic', 'crazy'];

export default function MoodsPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500">
      <h1 className="text-4xl font-bold text-white mb-8">Choose Your Mood</h1>
      <div className="grid grid-cols-2 gap-4">
        {moods.map((mood) => (
          <Link key={mood} href={`/anime/${mood}`}>
            <MoodButton mood={mood} />
          </Link>
        ))}
      </div>
    </div>
  );
}
