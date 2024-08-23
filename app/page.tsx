'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaDiscord, FaInstagram, FaTwitter } from 'react-icons/fa';
import styles from './page.module.css';

const ButtonLink = ({ href, text }: { href: string; text: string }) => (
  <Link href={href} className={styles.buttonContainer}>
    <div className={styles.buttonText}>{text}</div>
  </Link>
);

const SocialLink = ({ href, icon }: { href: string; icon: React.ReactNode }) => (
  <a href={href} target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
    {icon}
  </a>
);

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
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video or Gradient */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-1/4 left-0 w-full h-auto object-cover transform -translate-y-1/4"
            style={{ minHeight: '100%', minWidth: '100%' }}
            onError={(e) => {
              console.error("Video error:", e);
              setVideoError(true);
            }}
          >
            <source src="/page.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-purple-400 via-pink-500 to-red-500" />
        )}
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center w-full max-w-md px-4">
        <h1 className="text-4xl font-bold text-white mb-8 text-shadow-lg">Mood2Anime</h1>
        <div className={styles.buttonGroup}>
          <ButtonLink href="/moods" text="ANIME" />
          <ButtonLink href="/manga/moods" text="MANGA" />
          <ButtonLink href="/meme/moods" text="MEME" />
          <ButtonLink href="/talk-to-fav" text="TALK TO YOUR FAV" />
          
          {/* Social Links - will only be visible on small screens */}
          <div className={styles.socialLinks}>
            <SocialLink href="https://discord.gg/thMY6CYSHw" icon={<FaDiscord />} />
            <SocialLink href="https://www.instagram.com/mood2anime/" icon={<FaInstagram />} />
            <SocialLink href="https://x.com/Mood2Anime" icon={<FaTwitter />} />
          </div>
        </div>
      </div>
    </div>
  );
}