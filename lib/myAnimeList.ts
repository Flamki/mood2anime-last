import { Mood, Anime } from '../types';

const API_URL = 'https://api.myanimelist.net/v2';
const CLIENT_ID = process.env.NEXT_PUBLIC_MAL_CLIENT_ID;

const moodGenres: Record<Mood, string> = {
  happy: 'Comedy',
  sad: 'Drama',
  majestic: 'Fantasy',
  crazy: 'Action',
};

export async function getAnimeByMood(mood: Mood): Promise<Anime> {
  if (!CLIENT_ID) {
    throw new Error('MyAnimeList Client ID is not set in environment variables');
  }

  const genre = moodGenres[mood] || 'Comedy';

  const response = await fetch(`${API_URL}/anime?q=${genre}&limit=1`, {
    headers: {
      'X-MAL-CLIENT-ID': CLIENT_ID,
    },
  });

  if (!response.ok) {
    throw new Error('Failed to fetch anime from MyAnimeList API');
  }

  const data = await response.json();
  return data.data[0].node;
}
