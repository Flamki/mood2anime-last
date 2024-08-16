// File: components/AnimeTrailer.tsx

import Image from 'next/image';

interface AnimeTrailerProps {
  videoId: string | null;
  animeTitle: string;
  animeImage: string;
}

export default function AnimeTrailer({ videoId, animeTitle, animeImage }: AnimeTrailerProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="aspect-w-16 aspect-h-9 bg-gray-200 rounded-lg overflow-hidden" style={{ height: '480px' }}>
        {videoId ? (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        ) : (
          <div className="relative w-full h-full">
            <Image 
              src={animeImage} 
              alt={`${animeTitle} cover`} 
              layout="fill"
              objectFit="cover"
              className="rounded-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-lg flex-col">
              <p>No trailer available</p>
              <p className="text-sm mt-2">This could be due to:</p>
              <ul className="text-sm list-disc list-inside mt-1">
                <li>No trailer found for this anime</li>
                <li>YouTube API quota exceeded</li>
                <li>Network or API issues</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}