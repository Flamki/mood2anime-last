'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Manga } from '../../../types';
import { getMangaByMood } from '../../../lib/myMangaList';

interface MangaDisplayProps {
  initialMood: string;
}

export default function MangaDisplay({ initialMood }: MangaDisplayProps) {
  const [manga, setManga] = useState<Manga | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);

  const fetchManga = useCallback(async () => {
    setLoading(true);
    setError(null);
    setExpanded(false);
    try {
      const newManga = await getMangaByMood(initialMood);
      setManga(newManga);
    } catch (error) {
      console.error('Error fetching manga:', error);
      setError(`Failed to fetch manga. Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  }, [initialMood]);

  useEffect(() => {
    fetchManga();
  }, [fetchManga]);

  const truncateSynopsis = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/loader.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-red-500 text-2xl p-6 text-center">
          {error}
        </div>
      </div>
    );
  }

  if (!manga) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-2xl p-6 text-center">
          No manga found
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-2xl bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <div className="relative w-full bg-gray-700" style={{ height: '400px' }}>
          <Image
            src={manga.main_picture.large}
            alt={manga.title}
            layout="fill"
            objectFit="contain"
          />
        </div>
        <div className="p-6">
          <h2 className="text-3xl font-bold text-white mb-2 truncate">{manga.title}</h2>
          <div className="flex items-center text-gray-400 mb-4">
            <span className="mr-2">{manga.mean ? `⭐ ${manga.mean.toFixed(1)}/10` : 'Not rated'}</span>
            <span className="mr-2">•</span>
            <span>{manga.num_volumes ? `${manga.num_volumes} volumes` : 'Unknown volumes'}</span>
          </div>
          <div className="flex flex-wrap gap-2 mb-4">
            {manga.genres.map(genre => (
              <span key={genre.id} className="px-2 py-1 bg-blue-600 text-white text-sm rounded">
                {genre.name}
              </span>
            ))}
          </div>
          <div className="text-gray-300 mb-6">
            <p className={`${expanded ? '' : 'line-clamp-3'}`}>
              {expanded ? manga.synopsis : truncateSynopsis(manga.synopsis, 250)}
            </p>
            {manga.synopsis.length > 250 && (
              <button 
                onClick={() => setExpanded(!expanded)} 
                className="text-blue-400 hover:underline mt-2"
              >
                {expanded ? 'Read Less' : 'Read More'}
              </button>
            )}
          </div>
          <div className="flex justify-between">
            <Link href="/manga/moods" className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">
              Change Mood
            </Link>
            <button onClick={fetchManga} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500">
              Next Manga
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}