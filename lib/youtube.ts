// File: lib/youtube.ts

const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export async function getYouTubeVideoId(query: string): Promise<string | null> {
  if (!API_KEY) {
    console.error('YouTube API key is not set');
    return null;
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}&type=video&maxResults=1`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`YouTube API request failed: ${response.status}`);
    }
    const data = await response.json();
    if (data.items && data.items.length > 0) {
      return data.items[0].id.videoId;
    } else {
      console.log('No YouTube videos found for the query');
      return null;
    }
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    return null;
  }
}