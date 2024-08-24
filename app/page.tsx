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
  const [videoError, setVideoError] = useState<string | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [videoStatus, setVideoStatus] = useState('loading');
  const [videoSrc, setVideoSrc] = useState<string>('');

  useEffect(() => {
    const handleResize = () => {
      const smallScreen = window.innerWidth <= 768;
      setIsSmallScreen(smallScreen);
      setVideoSrc(smallScreen ? "/page-sm.mp4" : "/page.mp4");
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Initial check on mount

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (video && videoSrc) {
      const handleCanPlay = () => {
        setVideoStatus('canplay');
        video.play().catch(error => {
          console.error("Error attempting to play video:", error);
          setVideoError(`Play error: ${error.message}`);
          setVideoStatus('error');
        });
      };

      const handleError = (e: Event) => {
        const videoElement = e.target as HTMLVideoElement;
        const errorMessage = videoElement.error ? videoElement.error.message : 'Unknown error';
        console.error("Video error:", errorMessage);
        setVideoError(errorMessage);
        setVideoStatus('error');
      };

      const logVideoState = () => {
        console.log("Video network state:", video.networkState);
        console.log("Video ready state:", video.readyState);
        console.log("Current src:", video.currentSrc);
      };

      video.addEventListener('canplay', handleCanPlay);
      video.addEventListener('error', handleError);
      video.addEventListener('loadedmetadata', logVideoState);
      video.addEventListener('loadeddata', logVideoState);

      video.src = videoSrc;
      video.load();

      return () => {
        video.removeEventListener('canplay', handleCanPlay);
        video.removeEventListener('error', handleError);
        video.removeEventListener('loadedmetadata', logVideoState);
        video.removeEventListener('loadeddata', logVideoState);
        video.pause();
        video.src = '';
        video.load();
      };
    }
  }, [videoSrc]);

  // Safely remove preload link
  useEffect(() => {
    const removePreloadLink = () => {
      const link = document.querySelector('link[rel="preload"][href^="https://pagead2.googlesyndication.com"]');
      if (link && link.parentNode) {
        link.parentNode.removeChild(link);
      }
    };

    // Delay the removal slightly to ensure the DOM is fully loaded
    const timeoutId = setTimeout(removePreloadLink, 0);

    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <div className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video or Gradient */}
      <div className="absolute inset-0 z-0">
        {!videoError ? (
          <video
            ref={videoRef}
            loop
            muted
            playsInline
            className={`absolute top-0 left-0 w-full h-full object-cover ${styles.videoBackground}`}
            style={{ minHeight: '100%', minWidth: '100%' }}
          >
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
      
      {/* Debug info
      <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white p-2 text-xs">
        Video Status: {videoStatus}<br/>
        Error: {videoError || 'None'}<br/>
        Video Source: {videoSrc}
      </div> */}
    </div>
  );
}