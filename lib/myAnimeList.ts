// File: lib/myAnimeList.ts

import { Mood, Anime } from '../types';

const API_URL = 'https://api.myanimelist.net/v2';
const CLIENT_ID = process.env.NEXT_PUBLIC_MAL_CLIENT_ID;

const moodKeywords: Record<Mood, string[]> = {
  happy: ['comedy', 'slice of life', 'feel-good'],
  sad: ['drama', 'tragedy', 'emotional'],
  majestic: ['fantasy', 'adventure', 'epic'],
  crazy: ['action', 'thriller', 'supernatural'],
};

async function fetchAnime(query: string): Promise<any> {
  console.log(`fetchAnime: Sending request for query: ${query}`);
  const url = `${API_URL}/anime?q=${encodeURIComponent(query)}&limit=100&fields=id,title,synopsis,main_picture,genres`;

  if (!CLIENT_ID) {
    throw new Error('MyAnimeList Client ID is not set');
  }

  try {
    const response = await fetch(url, {
      headers: {
        'X-MAL-CLIENT-ID': CLIENT_ID,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`fetchAnime: API request failed. Status: ${response.status}. Error: ${errorText}`);
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    console.log(`fetchAnime: Received data. Number of items: ${data.data ? data.data.length : 0}`);
    return data;
  } catch (error) {
    console.error('fetchAnime: Error:', error);
    throw error;
  }
}

export async function getAnimeByMood(mood: Mood): Promise<Anime> {
  console.log(`getAnimeByMood: Starting for mood: ${mood}`);

  const keywords = moodKeywords[mood];
  let allAnime: any[] = [];

  for (const keyword of keywords) {
    try {
      console.log(`getAnimeByMood: Fetching anime for keyword: ${keyword}`);
      const data = await fetchAnime(keyword);
      if (data.data && data.data.length > 0) {
        console.log(`getAnimeByMood: Fetched ${data.data.length} anime for keyword: ${keyword}`);
        allAnime = allAnime.concat(data.data);
      } else {
        console.log(`getAnimeByMood: No anime found for keyword: ${keyword}`);
      }
    } catch (error) {
      console.error(`getAnimeByMood: Error fetching anime for keyword ${keyword}:`, error);
    }
  }

  console.log(`getAnimeByMood: Total anime fetched: ${allAnime.length}`);

  if (allAnime.length === 0) {
    console.log('getAnimeByMood: No anime found for mood-specific keywords. Trying a broader search...');
    try {
      const data = await fetchAnime('');
      if (data.data && data.data.length > 0) {
        allAnime = data.data;
        console.log(`getAnimeByMood: Fetched ${allAnime.length} anime in broader search`);
      } else {
        console.log('getAnimeByMood: No anime found in broader search');
      }
    } catch (error) {
      console.error('getAnimeByMood: Error in broader anime search:', error);
    }
  }

  if (allAnime.length === 0) {
    console.error(`getAnimeByMood: No anime found for the mood: ${mood}`);
    throw new Error(`No anime found for the mood: ${mood}`);
  }

  const randomIndex = Math.floor(Math.random() * allAnime.length);
  const selectedAnime = allAnime[randomIndex].node as Anime;
  console.log(`getAnimeByMood: Selected anime: ${selectedAnime.title}`);

  return selectedAnime;
}