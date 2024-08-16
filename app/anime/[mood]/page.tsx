// File: app/anime/[mood]/page.tsx

import { getAnimeByMood } from '../../../lib/myAnimeList';
import { getYouTubeVideoId } from '../../../lib/youtube';
import { Mood } from '../../../types';
import AnimeDisplay from './AnimeDisplay';

interface AnimePageProps {
  params: {
    mood: Mood;
  };
}

export default async function AnimePage({ params }: AnimePageProps) {
  const { mood } = params;
  
  const anime = await getAnimeByMood(mood);
  let videoId = null;
  try {
    videoId = await getYouTubeVideoId(`${anime.title} anime trailer`);
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-8">
      <AnimeDisplay initialAnime={anime} initialVideoId={videoId} mood={mood} />
    </div>
  );
}