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
    console.log(`YouTube API: Sending request for query: ${query}`);
    const response = await fetch(url);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`YouTube API: Request failed. Status: ${response.status}. Error: ${errorText}`);
      
      if (response.status === 403) {
        console.error('YouTube API: Quota exceeded. Switching to fallback method.');
        return getFallbackVideoId(query);
      }
      
      return null;
    }
    
    const data = await response.json();
    console.log('YouTube API: Response received', JSON.stringify(data, null, 2));
    
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

function getFallbackVideoId(query: string): string | null {
  console.log('Using fallback method to get video ID');
  // Implement your fallback logic here
  return null;
}