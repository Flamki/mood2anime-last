import { Mood, Anime } from '../types';

const API_URL = '/api/anime';
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes

interface CacheEntry {
  data: Anime[];
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
  'Baka': ['comedy', 'school', 'slapstick', 'silly'],
  'Dark': ['psychological', 'horror', 'thriller', 'gore'],
  'Fan service': ['ecchi', 'harem', 'fanservice', 'sexy'],
  'Heroic': ['superhero', 'action', 'justice', 'hero'],
  'Overpowered': ['action', 'fantasy', 'OP protagonist', 'strong'],
  'Plot Twist': ['mystery', 'thriller', 'psychological', 'mindbending'],
  'Melancholic': ['drama', 'slice of life', 'emotional', 'bittersweet'],
  'Hype': ['action', 'shounen', 'exciting', 'adrenaline']
};

async function fetchAnimeForKeyword(keyword: string): Promise<Anime[]> {
  if (cache[keyword] && Date.now() - cache[keyword].timestamp < CACHE_DURATION) {
    console.log(`Returning cached data for keyword: ${keyword}`);
    return cache[keyword].data;
  }

  const response = await fetch(`${API_URL}?query=${encodeURIComponent(keyword)}`);
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API request failed: ${response.status}. ${errorText}`);
  }
  const data = await response.json();
  if (!data.data || !Array.isArray(data.data)) {
    throw new Error(`Invalid API response: ${JSON.stringify(data)}`);
  }
  const animeList = data.data.map((item: any) => ({
    id: item.node.id,
    title: item.node.title,
    synopsis: item.node.synopsis,
    main_picture: item.node.main_picture,
    genres: item.node.genres,
    mean: item.node.mean,
    num_episodes: item.node.num_episodes,
  }));

  console.log(`Sample anime genres for ${keyword}:`, animeList.slice(0, 3).map((a: Anime) => ({
    title: a.title,
    genres: a.genres.map((g: { id: number; name: string }) => g.name)
  })));

  cache[keyword] = { data: animeList, timestamp: Date.now() };
  return animeList;
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
    'Baka': ['comedy', 'school', 'shounen'],
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

export async function getAnimeByMood(mood: Mood): Promise<Anime> {
  console.log(`getAnimeByMood: Starting for mood: ${mood}`);
  const normalizedMood = mood.charAt(0).toUpperCase() + mood.slice(1).toLowerCase();
  const keywords = moodKeywords[normalizedMood];
  console.log(`Keywords for mood ${normalizedMood}:`, keywords);
  
  if (!keywords || !Array.isArray(keywords)) {
    throw new Error(`Invalid mood: ${mood}`);
  }
  
  let allAnime: Anime[] = [];
  let errors: string[] = [];

  for (const keyword of keywords) {
    try {
      console.log(`getAnimeByMood: Fetching anime for keyword: ${keyword}`);
      const animeList = await fetchAnimeForKeyword(keyword);
      console.log(`Fetched ${animeList.length} anime for keyword: ${keyword}`);
      allAnime = allAnime.concat(animeList);
    } catch (error) {
      console.error(`getAnimeByMood: Error fetching anime for keyword ${keyword}:`, error);
      errors.push(`${keyword}: ${error instanceof Error ? error.message : String(error)}`);
    }
  }

  console.log(`getAnimeByMood: Total anime fetched: ${allAnime.length}`);

  // Filter anime based on genres
  const relevantGenres = getRelevantGenres(normalizedMood);
  console.log(`Relevant genres for ${normalizedMood}:`, relevantGenres);

  const filteredAnime = allAnime.filter((anime: Anime) => 
    anime && anime.genres && Array.isArray(anime.genres) &&
    anime.genres.some((genre: { id: number; name: string }) => 
      genre && genre.name && relevantGenres.includes(genre.name.toLowerCase())
    )
  );

  console.log(`getAnimeByMood: Filtered anime count: ${filteredAnime.length}`);
  console.log(`getAnimeByMood: First few filtered anime:`, filteredAnime.slice(0, 3).map((a: Anime) => ({
    title: a.title,
    genres: a.genres.map((g: { id: number; name: string }) => g.name)
  })));

  if (filteredAnime.length === 0) {
    const errorMessage = `No suitable anime found for the mood: ${mood}. Total fetched: ${allAnime.length}, Errors: ${errors.join(', ')}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  const randomIndex = Math.floor(Math.random() * filteredAnime.length);
  const selectedAnime = filteredAnime[randomIndex];
  console.log(`getAnimeByMood: Selected anime: ${selectedAnime.title}`);

  return selectedAnime;
}