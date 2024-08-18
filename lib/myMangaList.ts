// lib/myMangaList.ts

import { Manga, Mood } from '../types';

const API_URL = '/api/manga';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: Manga[];
  timestamp: number;
}

const cache: Record<string, CacheEntry> = {};

const moodKeywords: Record<string, string[]> = {
  'Happy': ['comedy', 'slice of life', 'feel-good', 'lighthearted'],
  'Sad': ['drama', 'tragedy', 'emotional', 'tear-jerker'],
  'Funny': ['comedy', 'parody', 'gag', 'humor'],
  'Epic': ['action', 'fantasy', 'grand', 'epic'],
  'Chill': ['slice of life', 'iyashikei', 'relaxing', 'calm'],
  'Crazy': ['absurd', 'bizarre', 'surreal', 'over-the-top'],
  'Majestic': ['fantasy', 'historical', 'grand', 'epic'],
  'Nostalgic': ['80s', '90s', 'retro', 'childhood'],
  'Romantic': ['romance', 'love', 'shoujo', 'josei'],
  'Mysterious': ['mystery', 'suspense', 'thriller', 'detective'],
  'Yandere': ['psychological', 'romance', 'horror', 'obsession'],
  'Angry': ['action', 'violent', 'intense', 'rage'],
  'Lonely': ['psychological', 'drama', 'introspective', 'solitude'],
  'Sports': ['sports', 'competition', 'teamwork', 'athletic'],
  'Power-ups': ['shounen', 'action', 'super power', 'transformation'],
  'Heartwarming': ['family', 'friendship', 'emotional', 'uplifting'],
  'Dark': ['psychological', 'horror', 'thriller', 'gore'],
  'Fan service': ['ecchi', 'harem', 'fanservice', 'sexy'],
  'Heroic': ['superhero', 'action', 'justice', 'hero'],
  'Overpowered': ['action', 'fantasy', 'OP protagonist', 'strong'],
  'Plot Twist': ['mystery', 'thriller', 'psychological', 'mindbending'],
  'Melancholic': ['drama', 'slice of life', 'emotional', 'bittersweet'],
  'Hype': ['action', 'shounen', 'exciting', 'adrenaline']
};

async function fetchMangaForKeyword(keyword: string): Promise<Manga[]> {
  if (cache[keyword] && Date.now() - cache[keyword].timestamp < CACHE_DURATION) {
    console.log(`Returning cached data for keyword: ${keyword}`);
    return cache[keyword].data;
  }

  console.log(`Fetching manga data for keyword: ${keyword}`);
  const response = await fetch(`${API_URL}?query=${encodeURIComponent(keyword)}`);
  
  if (!response.ok) {
    const errorText = await response.text();
    console.error(`API request failed for keyword "${keyword}":`, {
      status: response.status,
      statusText: response.statusText,
      errorText: errorText,
    });
    throw new Error(`API request failed: ${response.status}. ${errorText}`);
  }

  const data = await response.json();
  console.log(`Received data for keyword "${keyword}":`, data);

  if (!data.data || !Array.isArray(data.data)) {
    console.error(`Invalid API response for keyword "${keyword}":`, data);
    throw new Error(`Invalid API response: ${JSON.stringify(data)}`);
  }

  const mangaList = data.data.map((item: any) => ({
    id: item.node.id,
    title: item.node.title,
    synopsis: item.node.synopsis,
    main_picture: item.node.main_picture,
    genres: item.node.genres,
    mean: item.node.mean,
    num_volumes: item.node.num_volumes,
    num_chapters: item.node.num_chapters,
  }));

  cache[keyword] = { data: mangaList, timestamp: Date.now() };
  return mangaList;
}

function getRelevantGenres(mood: string): string[] {
  const genreMap: Record<string, string[]> = {
    'Happy': ['comedy', 'slice of life', 'shoujo'],
    'Sad': ['drama', 'tragedy', 'psychological'],
    'Funny': ['comedy', 'parody', 'gag humor'],
    'Epic': ['action', 'fantasy', 'sci-fi', 'adventure'],
    'Chill': ['slice of life', 'iyashikei', 'shoujo'],
    'Crazy': ['psychological', 'thriller', 'horror'],
    'Majestic': ['fantasy', 'historical', 'supernatural'],
    'Nostalgic': ['historical', 'drama', 'slice of life'],
    'Romantic': ['romance', 'shoujo', 'josei'],
    'Mysterious': ['mystery', 'thriller', 'psychological'],
    'Yandere': ['psychological', 'thriller', 'horror'],
    'Angry': ['action', 'martial arts', 'seinen'],
    'Lonely': ['psychological', 'drama', 'slice of life'],
    'Sports': ['sports', 'shounen', 'school', 'comedy'],
    'Power-ups': ['action', 'shounen', 'super power'],
    'Heartwarming': ['slice of life', 'drama', 'shoujo'],
    'Dark': ['psychological', 'horror', 'thriller', 'seinen'],
    'Fan service': ['ecchi', 'harem', 'shounen'],
    'Heroic': ['action', 'shounen', 'super power'],
    'Overpowered': ['action', 'fantasy', 'shounen'],
    'Plot Twist': ['mystery', 'psychological', 'thriller'],
    'Melancholic': ['drama', 'psychological', 'slice of life'],
    'Hype': ['action', 'shounen', 'sports']
  };

  return genreMap[mood] || [];
}

export async function getMangaByMood(mood: Mood): Promise<Manga> {
  console.log(`getMangaByMood: Starting for mood: ${mood}`);
  const normalizedMood = mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
  const keywords = moodKeywords[normalizedMood];
  console.log(`Keywords for mood ${normalizedMood}:`, keywords);
  
  if (!keywords || !Array.isArray(keywords)) {
    throw new Error(`Invalid mood: ${mood}`);
  }
  
  let allManga: Manga[] = [];
  let errors: string[] = [];

  for (const keyword of keywords) {
    try {
      console.log(`getMangaByMood: Fetching manga for keyword: ${keyword}`);
      const mangaList = await fetchMangaForKeyword(keyword);
      console.log(`Fetched ${mangaList.length} manga for keyword: ${keyword}`);
      allManga = allManga.concat(mangaList);
    } catch (error) {
      console.error(`getMangaByMood: Error fetching manga for keyword ${keyword}:`, error);
      errors.push(`${keyword}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  console.log(`getMangaByMood: Total manga fetched: ${allManga.length}`);

  // Filter manga based on genres
  const relevantGenres = getRelevantGenres(normalizedMood);
  console.log(`Relevant genres for ${normalizedMood}:`, relevantGenres);

  const filteredManga = allManga.filter((manga: Manga) => 
    manga && manga.genres && Array.isArray(manga.genres) &&
    manga.genres.some((genre: { id: number; name: string }) => 
      genre && genre.name && relevantGenres.includes(genre.name.toLowerCase())
    )
  );

  console.log(`getMangaByMood: Filtered manga count: ${filteredManga.length}`);
  console.log(`getMangaByMood: First few filtered manga:`, filteredManga.slice(0, 3).map((m: Manga) => ({
    title: m.title,
    genres: m.genres.map((g: { id: number; name: string }) => g.name)
  })));

  if (filteredManga.length === 0) {
    const errorMessage = `No suitable manga found for the mood: ${mood}. Total fetched: ${allManga.length}, Errors: ${errors.join(', ')}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const randomIndex = Math.floor(Math.random() * filteredManga.length);
  const selectedManga = filteredManga[randomIndex];
  console.log(`getMangaByMood: Selected manga: ${selectedManga.title}`);

  return selectedManga;
}