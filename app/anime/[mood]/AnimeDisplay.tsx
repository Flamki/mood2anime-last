// File: app/anime/[mood]/AnimeDisplay.tsx

'use client';

import { useState } from 'react';
import Link from 'next/link';
import AnimeTrailer from '../../../components/AnimeTrailer';
import { Mood, Anime } from '../../../types';
import { getAnimeByMood } from '../../../lib/myAnimeList';
import { getYouTubeVideoId } from '../../../lib/youtube';

interface AnimeDisplayProps {
  initialAnime: Anime;
  initialVideoId: string | null;
  mood: Mood;
}

export default function AnimeDisplay({ initialAnime, initialVideoId, mood }: AnimeDisplayProps) {
  const [anime, setAnime] = useState(initialAnime);
  const [videoId, setVideoId] = useState(initialVideoId);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchNextAnime = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log(`AnimeDisplay: Fetching new anime for mood: ${mood}`);
      const newAnime = await getAnimeByMood(mood);
      console.log('AnimeDisplay: Fetched new anime:', newAnime);
      setAnime(newAnime);

      try {
        console.log(`AnimeDisplay: Fetching YouTube video for: ${newAnime.title} anime trailer`);
        const newVideoId = await getYouTubeVideoId(`${newAnime.title} anime trailer`);
        console.log('AnimeDisplay: Fetched video ID:', newVideoId);
        setVideoId(newVideoId);
      } catch (youtubeError) {
        console.error('AnimeDisplay: Error fetching YouTube video:', youtubeError);
        setVideoId(null);
      }
    } catch (error) {
      console.error('AnimeDisplay: Error fetching anime:', error);
      setError(`Failed to fetch a new anime. Please try again. Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-white text-2xl">Loading...</div>;
  }

  if (error) {
    return (
      <div className="text-white text-2xl">
        <p>{error}</p>
        <p className="mt-2 text-sm">Please check the browser console for more detailed error information.</p>
        <button
          onClick={fetchNextAnime}
          className="mt-4 bg-white text-purple-600 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-purple-100 transition duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-8">
      <h1 className="text-4xl font-bold text-white mb-8">{anime.title}</h1>
      <div className="w-full max-w-4xl mb-8">
        <AnimeTrailer videoId={videoId} animeTitle={anime.title} animeImage={anime.main_picture.large} />
      </div>
      <p className="text-white text-lg mb-8 max-w-4xl">{anime.synopsis}</p>
      <div className="flex space-x-4">
        <button
          onClick={fetchNextAnime}
          className="bg-white text-purple-600 font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-purple-100 transition duration-300"
        >
          Next Anime
        </button>
        <Link href="/moods" className="bg-purple-600 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-purple-700 transition duration-300">
          Choose Another Mood
        </Link>
      </div>
    </div>
  );
}