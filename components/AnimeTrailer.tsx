import React from 'react';
import Image from 'next/image';

interface AnimeTrailerProps {
  videoId: string | null;
  animeTitle: string;
  animeImage: string;
}

export default function AnimeTrailer({ videoId, animeTitle, animeImage }: AnimeTrailerProps) {
  if (!videoId) {
    return (
      <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
        <Image
          src={animeImage}
          alt={`${animeTitle} cover`}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          style={{ objectFit: 'cover' }}
          className="rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg">
          <p>No trailer available for this anime</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full rounded-lg"
      />
    </div>
  );
}