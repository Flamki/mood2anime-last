// components/Navigation.tsx

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
      <a href="https://discord.gg/thMY6CYSHw" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-300 transition-colors">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z"/>
        </svg>
      </a>
      <a href="https://www.instagram.com/mood2anime/" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-300 transition-colors">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </a>
      <a href="https://x.com/Mood2Anime" target="_blank" rel="noopener noreferrer" className="text-white hover:text-green-300 transition-colors">
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      </a>
    </div>
  );

  return (
    <>
      <nav className="fixed top-[40px] left-0 right-0 z-40 bg-transparent transition-all duration-300">
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