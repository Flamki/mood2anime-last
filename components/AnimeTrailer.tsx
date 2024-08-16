import Image from 'next/image';

interface AnimeTrailerProps {
  videoId: string | null;
  animeTitle: string;
  animeImage: string;
}

export default function AnimeTrailer({ videoId, animeTitle, animeImage }: AnimeTrailerProps) {
  if (videoId) {
    return (
      <div className="aspect-w-16 aspect-h-9 w-full max-w-2xl">
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full rounded-lg shadow-lg"
        ></iframe>
      </div>
    );
  } else {
    return (
      <div className="w-full max-w-2xl">
        <Image 
          src={animeImage} 
          alt={`${animeTitle} cover`}
          width={500}
          height={300}
          layout="responsive"
          className="rounded-lg shadow-lg"
        />
        <p className="text-white text-sm mt-2">
          No trailer available. Showing anime cover image instead.
        </p>
      </div>
    );
  }
}