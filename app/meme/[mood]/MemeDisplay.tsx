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

  const getMemeSubreddit = (mood: string): string[] => {
    const moodSubreddits: Record<string, string[]> = {
      funny: ['AnimeFunny', 'animememes', 'Animemes'],
      wholesome: ['wholesomeanimemes', 'wholesomememes', 'WholesomeAnimemes'],
      savage: ['Animemes', 'animememes', 'goodanimemes'],
      cute: ['awwnime', 'cutelittlefangs', 'AnimeGirls'],
      epic: ['Animemes', 'animegifs', 'anime'],
      cringe: ['animememes', 'Animemes', 'goodanimemes'],
      relatable: ['anime_irl', 'animememes', 'Animemes'],
      nostalgic: ['Animemes', 'retrogames', '90sAnime'],
      dank: ['Animemes', 'goodanimemes', 'dankmemes'],
      nerdy: ['Animemes', 'anime', 'otaku'],
      otaku: ['otakumemes', 'anime', 'Animemes'],
      spicy: ['AnimemesWithNoRules', 'Animemes', 'goodanimemes'],
      'fan service': ['animememes', 'Animemes', 'ecchi'],
      'plot twist': ['Animemes', 'goodanimemes', 'anime']
    };
    return moodSubreddits[mood.toLowerCase()] || ['Animemes', 'animememes', 'goodanimemes'];
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

  const isGalleryLink = (url: string): boolean => {
    return url.includes('reddit.com/gallery/');
  };

  const fetchMeme = useCallback(async (subredditIndex = 0) => {
    console.log('Fetching meme for mood:', initialMood);
    setLoading(true);
    setError(null);
    try {
      const accessToken = await getAccessToken();
      const subreddits = getMemeSubreddit(initialMood);
      if (subredditIndex >= subreddits.length) {
        throw new Error(`No suitable memes found for mood: ${initialMood}`);
      }
      const subreddit = subreddits[subredditIndex];
      console.log(`Fetching from subreddit: ${subreddit} (attempt ${subredditIndex + 1})`);
      const response = await fetch(`https://oauth.reddit.com/r/${subreddit}/random`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error fetching from ${subreddit}: ${errorText}`);
        return fetchMeme(subredditIndex + 1); // Try the next subreddit
      }

      const data = await response.json();
      console.log('API response:', data);

      if (!data || !Array.isArray(data) || data.length === 0 || !data[0].data || !data[0].data.children || data[0].data.children.length === 0) {
        console.error(`Invalid or empty response for subreddit: ${subreddit}`);
        return fetchMeme(subredditIndex + 1); // Try the next subreddit
      }

      const memeData = data[0].data.children[0].data;
      if (!memeData.title || !memeData.url) {
        console.error(`Incomplete meme data for subreddit: ${subreddit}`);
        return fetchMeme(subredditIndex + 1); // Try the next subreddit
      }

      // Handle gallery links
      if (isGalleryLink(memeData.url)) {
        if (memeData.gallery_data && memeData.media_metadata) {
          const firstImageId = memeData.gallery_data.items[0].media_id;
          const firstImage = memeData.media_metadata[firstImageId];
          if (firstImage && firstImage.s) {
            memeData.url = firstImage.s.u;
          } else {
            console.error(`Invalid gallery data for subreddit: ${subreddit}`);
            return fetchMeme(subredditIndex + 1); // Try the next subreddit
          }
        } else {
          console.error(`Invalid gallery data for subreddit: ${subreddit}`);
          return fetchMeme(subredditIndex + 1); // Try the next subreddit
        }
      }

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
      setError(`Failed to fetch meme. ${error instanceof Error ? error.message : String(error)}`);
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
          alert('Meme link copied! You can now paste it in  .');
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
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        <div className="text-red-500 text-2xl p-6 text-center">
          {error}
          <button 
            onClick={() => fetchMeme()} 
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
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
          {meme.isVideo || isYouTubeLink(meme.url) ? (
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
            <button onClick={() => fetchMeme()} className="bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-500 transition duration-300">
              Next
              </button>
        </div>
      </div>
    </div>
  </div>
);
}