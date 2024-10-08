// app/talk-to-fav/page.tsx

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const characters = [
  { id: 1, name: "Naruto Uzumaki", image: "/images/naruto.jpg" },
  { id: 2, name: "Monkey D. Luffy", image: "/images/luffy.jpg" },
  { id: 3, name: "Goku", image: "/images/goku.jpeg" },
  { id: 4, name: "Lelouch vi Britannia", image: "/images/zero.jpeg" },
  { id: 5, name: "Gojo Satoru", image: "/images/gojo.png" },
  { id: 6, name: "Light Yagami", image: "/images/light.jpg" },
  { id: 7, name: "Tanjiro Kamado", image: "/images/demon.jpeg" },
];

export default function TalkToFavPage() {
  const [currentCard, setCurrentCard] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(true);

  const nextCard = useCallback(() => {
    setCurrentCard((prev) => (prev + 1) % characters.length);
  }, []);

  const handleCardClick = () => {
    nextCard();
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlaying) {
      interval = setInterval(nextCard, 3000);
    }
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextCard]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    setIsValidEmail(true);
  };

  const handleSubscribe = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsValidEmail(false);
      return;
    }
    const subscribeUrl = `https://magic.beehiiv.com/v1/96e62a4e-0013-470b-bdbf-74d89aa69443?email=${encodeURIComponent(email)}`;
    window.open(subscribeUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white overflow-x-hidden pt-16 md:pt-20">
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-bold text-center mb-6 md:mb-8">Talk to Your Fav</h1>
        
        <div className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12 text-blue-400 animate-pulse">
          Coming Soon!
        </div>


        <div className="relative h-64 md:h-96 mb-8 md:mb-16 mx-auto">
          {characters.map((character, index) => (
            <div
              key={character.id}
              className={`absolute top-0 left-0 w-full h-full transition-all duration-500 ease-in-out ${
                index === currentCard ? 'z-10 opacity-100 scale-100' : 
                index < currentCard ? 'opacity-0 scale-95 -translate-x-full' : 
                'opacity-0 scale-95 translate-x-full'
              }`}
              onClick={handleCardClick}
            >
              <Image
                src={character.image}
                alt={character.name}
                layout="fill"
                objectFit="cover"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-gray-900 to-transparent">
                <h2 className="text-xl md:text-2xl font-bold">{character.name}</h2>
              </div>
            </div>
          ))}
        </div>

        {/* Awesome Subscribe Section */}
        <div className="mb-16 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-deep-purple via-neon-blue to-neon-pink opacity-50 animate-gradient-x"></div>
          <div className="relative bg-black bg-opacity-70 rounded-2xl p-8 backdrop-blur-lg border border-neon-blue shadow-neon">
            <h3 className="text-4xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-neon-blue to-neon-pink animate-pulse-neon">
              Join the Mood2Anime Universe!
            </h3>
            <p className="text-lg mb-8 text-center text-gray-300">
              Be the first to unlock exclusive anime content, early access features, and join our vibrant community!
            </p>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative w-full max-w-md">
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-6 py-4 rounded-full text-gray-900 text-lg bg-white bg-opacity-20 backdrop-blur-sm border-2 border-neon-blue focus:outline-none focus:ring-2 focus:ring-neon-pink transition-all duration-300 ${
                    !isValidEmail ? 'border-red-500' : ''
                  }`}
                />
              </div>
              <button
                onClick={handleSubscribe}
                className="group relative px-8 py-4 overflow-hidden rounded-full bg-white bg-opacity-20 backdrop-blur-sm text-lg font-bold text-white transition-all duration-300 hover:bg-opacity-30 hover:shadow-neon-strong"
              >
                <span className="relative z-10">Subscribe Now</span>
                <div className="absolute inset-0 h-full w-full scale-0 rounded-full bg-gradient-to-r from-neon-blue to-neon-pink transition-all duration-300 group-hover:scale-100"></div>
              </button>
            </div>
            {!isValidEmail && (
              <p className="text-red-400 mt-2 text-center">Please enter a valid email address.</p>
            )}
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6 md:p-8 shadow-xl">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 text-blue-400">About This Project</h2>
          <p className="mb-4 text-sm md:text-base">
            We&apos;re pushing the boundaries of AI and deep learning to make your anime dreams a reality. 
            Imagine conversing with your favorite characters as if they were right beside you!
          </p>
          <p className="mb-4 text-sm md:text-base">
            Our cutting-edge technology combines natural language processing, emotion recognition, 
            and character personality modeling to create an unprecedented level of interaction. 
            We&apos;re utilizing advanced neural networks, including transformer architectures and 
            generative adversarial networks (GANs), to synthesize character voices and expressions.
          </p>
          <p className="mb-6 text-sm md:text-base">
            This ambitious project involves:
          </p>
          <ul className="list-disc list-inside mb-6 pl-4 text-sm md:text-base">
            <li>Developing character-specific language models</li>
            <li>Creating dynamic response generation algorithms</li>
            <li>Implementing real-time voice synthesis and emotion mapping</li>
            <li>Designing an immersive AR/VR interface for character interactions</li>
          </ul>
          <p className="text-base md:text-lg font-semibold">
            Your support can help bring these beloved characters to life. Join us in revolutionizing 
            the way fans connect with their favorite anime universes!
          </p>
        </div>

        <div className="mt-8 md:mt-12 text-center">
          <Link 
            href="https://www.buymeacoffee.com/bbook43811" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-blue-500 text-white px-6 md:px-8 py-2 md:py-3 rounded-full text-lg md:text-xl font-bold hover:bg-blue-600 transition duration-300 inline-block animate-pulse"
          >
            Support This Vision
          </Link>
          <p className="mt-4 text-xs md:text-sm opacity-75">
            Every contribution brings us closer to making anime interactions a reality!
          </p>
        </div>
      </main>
    </div>
  );
}