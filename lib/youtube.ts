import { Anime } from '../types';

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export async function getYouTubeVideoId(anime: Anime): Promise<string | null> {
  if (!API_KEY) {
    console.error('YouTube API key is not set');
    return null;
  }

  const query = `${anime.title} anime trailer`;
  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}&type=video&maxResults=1`;

  try {
    console.log(`YouTube API: Sending request for query: ${query}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      console.error(`YouTube API: Request failed. Status: ${response.status}`);
      return null;
    }
    
    const data = await response.json();
    
    if (data.items && data.items.length > 0) {
      const videoId = data.items[0].id.videoId;
      console.log(`YouTube API: Found video ID: ${videoId}`);
      return videoId;
    } else {
      console.log('YouTube API: No videos found for the query');
      return null;
    }
  } catch (error) {
    console.error('YouTube API: Error fetching video:', error);
    return null;
  }
}