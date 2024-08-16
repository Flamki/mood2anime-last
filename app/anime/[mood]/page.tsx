import { getAnimeByMood } from '../../../lib/myAnimeList';
import { getYouTubeVideoId } from '../../../lib/youtube';
import AnimeTrailer from '../../../components/AnimeTrailer';
import { Mood } from '../../../types';

interface AnimePageProps {
  params: {
    mood: Mood;
  };
}

export default async function AnimePage({ params }: AnimePageProps) {
  const { mood } = params;

  try {
    console.log(`Fetching anime for mood: ${mood}`);
    const anime = await getAnimeByMood(mood);
    console.log('Fetched anime:', anime);

    let videoId: string | null = null;

    try {
      videoId = await getYouTubeVideoId(`${anime.title} anime trailer`);
    } catch (youtubeError) {
      console.error('Error fetching YouTube video:', youtubeError);
      // We'll continue without a video
    }

    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 p-8">
        <h1 className="text-4xl font-bold text-white mb-8">{anime.title}</h1>
        <AnimeTrailer videoId={videoId} animeTitle={anime.title} animeImage={anime.main_picture.large} />
        <p className="text-white text-lg mt-4">{anime.synopsis}</p>
      </div>
    );
  } catch (error) {
    console.error('Error in AnimePage:', error);
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-400 via-pink-500 to-purple-500 p-8">
        <h1 className="text-4xl font-bold text-white mb-8">Oops! Something went wrong</h1>
        <p className="text-white text-lg">We couldn't fetch an anime recommendation at this time. Please try again later.</p>
        {error instanceof Error && (
          <p className="text-white text-sm mt-4">Error details: {error.message}</p>
        )}
      </div>
    );
  }
}