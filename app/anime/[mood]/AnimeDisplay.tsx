'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Anime, Mood } from '../../../types';
import { getAnimeByMood } from '../../../lib/myAnimeList';
import CustomLoader from '@/components/CustomLoader';

interface AnimeDisplayProps {
  initialMood: Mood;
}

export default function AnimeDisplay({ initialMood }: AnimeDisplayProps) {
  const [anime, setAnime] = useState<Anime | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const fetchAnime = useCallback(async () => {
    setLoading(true);
    setError(null);
    setExpanded(false);
    try {
      const newAnime = await getAnimeByMood(initialMood);
      setAnime(newAnime);
    } catch (error) {
      console.error('Error fetching anime:', error);
      setError(`Failed to fetch anime. Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  }, [initialMood]);

  useEffect(() => {
    fetchAnime();
  }, [fetchAnime]);

  const truncateSynopsis = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if (loading) {
    return <CustomLoader />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-red-500 text-xl sm:text-2xl p-4 sm:p-6 text-center">
          {error}
        </div>
      </div>
    );
  }

  if (!anime) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-xl sm:text-2xl p-4 sm:p-6 text-center">
          No anime found
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-2 sm:p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex justify-center items-start p-4">
            <div className="relative w-full" style={{ maxWidth: '300px' }}>
              <Image
                src={anime.main_picture.large}
                alt={anime.title}
                width={300}
                height={450}
                layout="responsive"
                className="rounded-lg"
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4 sm:p-6">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">{anime.title}</h2>
            <div className="flex items-center text-gray-400 mb-2 sm:mb-4 text-sm sm:text-base">
              <span className="mr-2">{anime.mean ? `⭐ ${anime.mean.toFixed(1)}/10` : 'Not rated'}</span>
              <span className="mr-2">•</span>
              <span>{anime.num_episodes ? `${anime.num_episodes} episodes` : 'Unknown episodes'}</span>
            </div>
            <div className="flex flex-wrap gap-1 sm:gap-2 mb-2 sm:mb-4">
              {anime.genres.map(genre => (
                <span key={genre.id} className="px-2 py-1 bg-blue-600 text-white text-xs sm:text-sm rounded">
                  {genre.name}
                </span>
              ))}
            </div>
            <div className="text-gray-300 mb-4 sm:mb-6 text-sm sm:text-base">
              <p className={`${expanded ? '' : 'line-clamp-3'}`}>
                {expanded ? anime.synopsis : truncateSynopsis(anime.synopsis, 150)}
              </p>
              {anime.synopsis.length > 150 && (
                <button 
                  onClick={() => setExpanded(!expanded)} 
                  className="text-blue-400 hover:underline mt-1 sm:mt-2 text-sm"
                >
                  {expanded ? 'Read Less' : 'Read More'}
                </button>
              )}
            </div>
            <div className="flex justify-between">
              <Link href="/moods" className="bg-gray-700 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base hover:bg-gray-600">
                Change Mood
              </Link>
              <button onClick={fetchAnime} className="bg-blue-600 text-white px-3 py-1 sm:px-4 sm:py-2 rounded text-sm sm:text-base hover:bg-blue-500">
                Next Anime
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}