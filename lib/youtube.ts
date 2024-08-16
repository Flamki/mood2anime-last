const API_KEY = process.env.NEXT_PUBLIC_YOUTUBE_API_KEY;

export async function getYouTubeVideoId(query: string): Promise<string> {
  if (!API_KEY) {
    console.error('YouTube API key is not set in environment variables');
    throw new Error('YouTube API key is not set in environment variables');
  }

  const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(
    query
  )}&key=${API_KEY}&type=video&maxResults=1`;

  console.log(`Fetching YouTube video for query: "${query}"`);

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`YouTube API request failed: ${response.status} ${response.statusText}. ${errorText}`);
      throw new Error(`YouTube API request failed: ${response.status} ${response.statusText}. ${errorText}`);
    }

    const data = await response.json();
    console.log('YouTube API response:', JSON.stringify(data, null, 2));

    if (!data.items || data.items.length === 0) {
      console.error('No videos found for the given query');
      throw new Error('No videos found for the given query');
    }

    const videoId = data.items[0].id.videoId;
    console.log(`Found video ID: ${videoId}`);
    return videoId;
  } catch (error) {
    console.error('Error fetching YouTube video:', error);
    throw new Error('Failed to fetch video from YouTube API: ' + (error instanceof Error ? error.message : String(error)));
  }
}