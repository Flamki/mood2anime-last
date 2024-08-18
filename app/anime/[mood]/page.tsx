import { Mood } from '../../../types';
import AnimeDisplay from './AnimeDisplay';

interface AnimePageProps {
  params: {
    mood: Mood;
  };
}

export default function AnimePage({ params }: AnimePageProps) {
  return (
    <div className="min-h-screen">
      <AnimeDisplay initialMood={params.mood} />
    </div>
  );
}