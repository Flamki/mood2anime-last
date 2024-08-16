// File: lib/myAnimeList.ts

import { Mood, Anime } from '../types';

const moodKeywords: Record<Mood, string[]> = {
  happy: ['comedy', 'slice of life', 'feel-good', 'lighthearted'],
  sad: ['drama', 'tragedy', 'emotional', 'melancholy'],
  majestic: ['fantasy', 'adventure', 'epic', 'grand'],
  crazy: ['action', 'thriller', 'supernatural', 'bizarre']
};

async function fetchAnime(query: string): Promise<any> {
  console.log(`fetchAnime: Sending request for query: ${query}`);
  const url = `/api/anime?query=${encodeURIComponent(query)}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`fetchAnime: API request failed. Status: ${response.status}. Error: ${errorText}`);
      throw new Error(`API request failed: ${response.status}. ${errorText}`);
    }

    const data = await response.json();
    if (data.error) {
      console.error(`fetchAnime: API returned an error: ${data.error}`);
      throw new Error(`API error: ${data.error}`);
    }
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
  let errors: string[] = [];

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
      errors.push(`Failed to fetch anime for keyword: ${keyword}`);
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
        errors.push('No anime found in broader search');
      }
    } catch (error) {
      console.error('getAnimeByMood: Error in broader anime search:', error);
      errors.push('Failed to perform broader anime search');
    }
  }

  // Filter out any null or undefined entries
  allAnime = allAnime.filter(anime => anime && anime.node);

  if (allAnime.length === 0) {
    console.error(`getAnimeByMood: No anime found for the mood: ${mood}. Errors: ${errors.join(', ')}`);
    // Instead of throwing an error, return a default or placeholder anime
    return {
      id: 0,
      title: "No Anime Found",
      synopsis: `We couldn't find an anime for the ${mood} mood. Please try a different mood or check the API connection.`,
      mean: 0,
      genres: [],
      main_picture: {
        medium: "https://via.placeholder.com/200x300?text=No+Anime+Found",
        large: "https://via.placeholder.com/400x600?text=No+Anime+Found"
      }
    };
  }

  const randomIndex = Math.floor(Math.random() * allAnime.length);
  const selectedAnime = allAnime[randomIndex].node as Anime;
  console.log(`getAnimeByMood: Selected anime: ${selectedAnime.title}`);

  return selectedAnime;
}