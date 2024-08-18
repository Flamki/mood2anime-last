'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface Meme {
  title: string;
  url: string;
  author: string;
  subreddit: string;
  permalink: string;
  isVideo: boolean;
}

interface MemeDisplayProps {
  initialMood: string;
}

export default function MemeDisplay({ initialMood }: MemeDisplayProps) {
  const [meme, setMeme] = useState<Meme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const shareButtonRef = useRef<HTMLButtonElement>(null);
  const shareMenuRef = useRef<HTMLDivElement>(null);

  const getAccessToken = async () => {
    const clientId = process.env.NEXT_PUBLIC_REDDIT_CLIENT_ID;
    const clientSecret = process.env.NEXT_PUBLIC_REDDIT_CLIENT_SECRET;

    if (!clientId || !clientSecret) {
      throw new Error('Reddit API credentials are not set');
    }

    try {
      const response = await fetch('https://www.reddit.com/api/v1/access_token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`,
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to obtain access token: ${response.status} ${response.statusText}. ${errorText}`);
      }

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error('Error getting access token:', error);
      throw error;
    }
  };

  const getMemeSubreddit = (mood: string): string => {
    const moodSubreddits: Record<string, string> = {
      funny: 'AnimeFunny',
      wholesome: 'wholesomeanimemes',
      savage: 'Animemes',
      cute: 'awwnime',
      epic: 'Animemes',
      cringe: 'animememes',
      relatable: 'anime_irl',
      nostalgic: 'Animemes',
      dank: 'Animemes',
      nerdy: 'Animemes',
      otaku: 'otakumemes',
      spicy: 'AnimemesWithNoRules',
      'fan service': 'animememes',
      'plot twist': 'Animemes'
    };
    return moodSubreddits[mood.toLowerCase()] || 'Animemes';
  };

  const isYouTubeLink = (url: string): boolean => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  const getYouTubeEmbedUrl = (url: string): string => {
    let videoId = '';
    if (url.includes('youtu.be')) {
      videoId = url.split('/').pop() || '';
    } else if (url.includes('youtube.com')) {
      const urlParams = new URLSearchParams(new URL(url).search);
      videoId = urlParams.get('v') || '';
    }
    return `https://www.youtube.com/embed/${videoId}`;
  };

  const fetchMeme = useCallback(async () => {
    console.log('Fetching meme for mood:', initialMood);
    setLoading(true);
    setError(null);
    try {
      const accessToken = await getAccessToken();
      const subreddit = getMemeSubreddit(initialMood);
      console.log('Fetching from subreddit:', subreddit);
      const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/random`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`HTTP error! status: ${response.status}. ${errorText}`);
      }

      const data = await response.json();
      console.log('Meme data received:', data);
      
      if (!data || !Array.isArray(data) || data.length === 0 || !data[0].data || !data[0].data.children || data[0].data.children.length === 0) {
        throw new Error('Invalid meme data received');
      }

      const memeData = data[0].data.children[0].data;
      setMeme({
        title: memeData.title,
        url: memeData.url,
        author: memeData.author,
        subreddit: memeData.subreddit_name_prefixed,
        permalink: memeData.permalink,
        isVideo: memeData.is_video || isYouTubeLink(memeData.url)
      });
    } catch (error) {
      console.error('Error fetching meme:', error);
      setError(`Failed to fetch meme. Error: ${error instanceof Error ? error.message : String(error)}`);
    } finally {
      setLoading(false);
    }
  }, [initialMood]);

  const shareMeme = (platform: string) => {
    if (!meme) return;

    const shareUrl = `https://reddit.com${meme.permalink}`;
    const shareText = `Check out this meme from ${meme.subreddit}: ${meme.title}`;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, '_blank');
        break;
      case 'whatsapp':
        window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(shareText + ' ' + shareUrl)}`, '_blank');
        break;
      case 'discord':
        navigator.clipboard.writeText(`${shareText} ${shareUrl}`).then(() => {
          alert('Meme link copied! You can now paste it in Discord.');
        }).catch(err => {
          console.error('Failed to copy link: ', err);
        });
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl).then(() => {
          alert('Link copied to clipboard!');
        }).catch(err => {
          console.error('Failed to copy link: ', err);
        });
        break;
    }
    setShowShareMenu(false);
  };

  useEffect(() => {
    fetchMeme();
  }, [fetchMeme]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node) &&
          shareButtonRef.current && !shareButtonRef.current.contains(event.target as Node)) {
        setShowShareMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showShareMenu && shareMenuRef.current && shareButtonRef.current) {
      const rect = shareButtonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const menuHeight = shareMenuRef.current.offsetHeight;

      if (spaceBelow < menuHeight) {
        shareMenuRef.current.style.bottom = `${rect.height}px`;
        shareMenuRef.current.style.top = 'auto';
      } else {
        shareMenuRef.current.style.top = `${rect.height}px`;
        shareMenuRef.current.style.bottom = 'auto';
      }
    }
  }, [showShareMenu]);

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

  if (!meme) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-2xl p-6 text-center">
          No meme found
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-4">
      <div className="w-full max-w-4xl bg-gray-800 rounded-lg overflow-hidden shadow-xl">
        <div className="relative w-full bg-gray-700" style={{ height: '600px' }}>
          {meme.isVideo ? (
            isYouTubeLink(meme.url) ? (
              <iframe
                src={getYouTubeEmbedUrl(meme.url)}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            ) : (
              <video 
                src={meme.url} 
                controls 
                className="w-full h-full object-contain"
              >
                Your browser does not support the video tag.
              </video>
            )
          ) : (
            <Image
              src={meme.url}
              alt={meme.title}
              layout="fill"
              objectFit="contain"
            />
          )}
        </div>
        <div className="p-6">
          <h2 className="text-2xl font-bold text-white mb-2">{meme.title}</h2>
          <div className="text-gray-400 mb-4">
            Posted by u/{meme.author} in {meme.subreddit}
          </div>
          <div className="flex justify-between">
            <Link href="/meme/moods" className="bg-gray-700 text-white px-6 py-3 rounded hover:bg-gray-600 transition duration-300">
              Change Mood
            </Link>
            <div className="relative">
              <button 
                ref={shareButtonRef}
                onClick={() => setShowShareMenu(!showShareMenu)} 
                className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-500 transition duration-300"
              >
                Share Meme
              </button>
              {showShareMenu && (
                <div 
                  ref={shareMenuRef}
                  className="absolute right-0 w-48 bg-white rounded-md shadow-lg z-10"
                  style={{
                    transformOrigin: 'top right',
                    animation: 'scaleIn 0.2s ease-out',
                  }}
                >
                  <button onClick={() => shareMeme('twitter')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share on Twitter</button>
                  <button onClick={() => shareMeme('facebook')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share on Facebook</button>
                  <button onClick={() => shareMeme('whatsapp')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share on WhatsApp</button>
                  <button onClick={() => shareMeme('discord')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Share on Discord</button>
                  <button onClick={() => shareMeme('copy')} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Copy Link</button>
                </div>
              )}
            </div>
            <button onClick={fetchMeme} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-500 transition duration-300">
              Next Meme
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}