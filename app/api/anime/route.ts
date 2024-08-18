import { NextResponse } from 'next/server';
import NodeCache from 'node-cache';

const API_URL = 'https://api.myanimelist.net/v2';
const CLIENT_ID = process.env.NEXT_PUBLIC_MAL_CLIENT_ID;

// Create a cache with a default TTL of 1 hour
const cache = new NodeCache({ stdTTL: 3600 });

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter is required' }, { status: 400 });
  }

  console.log(`API Route: Received request for query: ${query}`);

  if (!CLIENT_ID) {
    console.error('API Route: MyAnimeList Client ID is not set');
    return NextResponse.json({ error: 'MyAnimeList Client ID is not set' }, { status: 500 });
  }

  // Check if the data is in the cache
  const cachedData = cache.get(query);
  if (cachedData) {
    console.log(`API Route: Returning cached data for query: ${query}`);
    return NextResponse.json(cachedData);
  }

  const url = `${API_URL}/anime?q=${query}&limit=100&fields=id,title,synopsis,main_picture,genres,mean,num_episodes`;

  try {
    console.log(`API Route: Sending request to MyAnimeList API: ${url}`);
    const response = await fetch(url, {
      headers: {
        'X-MAL-CLIENT-ID': CLIENT_ID,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API Route: MyAnimeList API request failed. Status: ${response.status}. Error: ${errorText}`);
      return NextResponse.json({ error: `MyAnimeList API request failed: ${response.status}. ${errorText}` }, { status: response.status });
    }

    const data = await response.json();
    console.log(`API Route: Received data from MyAnimeList API. Number of items: ${data.data ? data.data.length : 0}`);
    
    // Store the data in the cache
    cache.set(query, data);

    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching anime data:', error);
    return NextResponse.json({ error: 'Failed to fetch anime data' }, { status: 500 });
  }
}