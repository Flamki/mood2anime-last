// File: app/api/anime/route.ts

import { NextResponse } from 'next/server';

const API_URL = 'https://api.myanimelist.net/v2';
const CLIENT_ID = process.env.NEXT_PUBLIC_MAL_CLIENT_ID;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query');

  console.log(`API Route: Received request for query: ${query}`);

  if (!CLIENT_ID) {
    console.error('API Route: MyAnimeList Client ID is not set');
    return NextResponse.json({ error: 'MyAnimeList Client ID is not set' }, { status: 500 });
  }

  const url = `${API_URL}/anime?q=${query}&limit=100&fields=id,title,synopsis,main_picture,genres`;

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
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Route: Error fetching anime data:', error);
    return NextResponse.json({ error: 'Failed to fetch anime data' }, { status: 500 });
  }
}