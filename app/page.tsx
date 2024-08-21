'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import AdSense from '../components/AdSense';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error attempting to play video:", error);
        setVideoError(true);
      });
    }
  }, []);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden">
      {!videoError ? (
        <video
          ref={videoRef}
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-auto min-w-full min-h-full max-w-none object-cover md:object-center object-right"
          onError={(e) => {
            console.error("Video error:", e);
            setVideoError(true);
          }}
        >
          <source src="/page.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 md:bg-center bg-right bg-cover" />
      )}

      {/* Content Overlay */}
      <div className="relative z-10 text-center mt-16 px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-shadow-lg">Mood2Anime</h1>
        <div className="flex flex-col space-y-4">
          <Link 
            href="/moods" 
            className="bg-white bg-opacity-20 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-opacity-30 transition duration-300 backdrop-filter backdrop-blur-sm"
          >
            Anime
          </Link>
          <Link 
            href="/manga/moods" 
            className="bg-white bg-opacity-20 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-opacity-30 transition duration-300 backdrop-filter backdrop-blur-sm"
          >
            Manga
          </Link>
          <Link 
            href="/meme/moods" 
            className="bg-white bg-opacity-20 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-opacity-30 transition duration-300 backdrop-filter backdrop-blur-sm"
          >
            Meme
          </Link>
          <Link 
            href="/talk-to-fav" 
            className="bg-white bg-opacity-20 text-white font-semibold py-2 px-4 rounded-full shadow-lg hover:bg-opacity-30 transition duration-300 backdrop-filter backdrop-blur-sm"
          >
            Talk to Your Fav
          </Link>
        </div>

        {/* AdSense Component */}
        <div className="mt-8">
          <AdSense />
        </div>
      </div>
    </div>
  );
}