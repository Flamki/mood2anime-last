'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector('nav');
      if (window.scrollY > 50) {
        navbar?.classList.add('bg-black', 'bg-opacity-50', 'backdrop-filter', 'backdrop-blur-lg');
      } else {
        navbar?.classList.remove('bg-black', 'bg-opacity-50', 'backdrop-filter', 'backdrop-blur-lg');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const SocialLinks = () => (
    <div className="flex space-x-4">
      {/* Social link SVGs remain unchanged */}
    </div>
  );

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300">
        <div className="container mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center">
            <div className="relative w-[300px] h-[80px] md:w-[450px] md:h-[120px]">
              <Image
                src="/nav-name.png"
                alt="Mood2Anime"
                fill
                sizes="(max-width: 768px) 300px, 450px"
                style={{ objectFit: 'contain' }}
                priority
              />
            </div>
          </Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none md:hidden mr-2"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="hidden md:flex items-center space-x-6 mr-2">
            <Link href="/moods" className="text-white hover:text-green-300 transition-colors">Anime</Link>
            <Link href="/manga/moods" className="text-white hover:text-green-300 transition-colors">Manga</Link>
            <Link href="/meme/moods" className="text-white hover:text-green-300 transition-colors">Meme</Link>
            <Link href="/talk-to-fav" className="text-white hover:text-green-300 transition-colors">Chat</Link>
            <SocialLinks />
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50">
          <div className="container mx-auto p-4 flex flex-col h-full">
            <div className="flex justify-between items-center mb-8">
              <div className="relative w-[300px] h-[80px]">
                <Image
                  src="/nav-name.png"
                  alt="Mood2Anime"
                  fill
                  style={{ objectFit: 'contain' }}
                  priority
                />
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-white focus:outline-none"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col space-y-4">
              <Link href="/moods" className="text-white text-xl hover:text-green-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Anime</Link>
              <Link href="/manga/moods" className="text-white text-xl hover:text-green-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Manga</Link>
              <Link href="/meme/moods" className="text-white text-xl hover:text-green-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Meme</Link>
              <Link href="/talk-to-fav" className="text-white text-xl hover:text-green-300 transition-colors" onClick={() => setIsMenuOpen(false)}>Chat</Link>
            </div>
            <div className="mt-auto">
              <SocialLinks />
            </div>
          </div>
        </div>
      )}
    </>
  );
}