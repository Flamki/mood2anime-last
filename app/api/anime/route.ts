// File: pages/api/anime.ts (or app/api/anime/route.ts if using App Router)

import { NextApiRequest, NextApiResponse } from 'next';

const API_URL = 'https://api.myanimelist.net/v2';
const CLIENT_ID = process.env.NEXT_PUBLIC_MAL_CLIENT_ID;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { query } = req.query;

  if (!CLIENT_ID) {
    return res.status(500).json({ error: 'MyAnimeList Client ID is not set' });
  }

  const url = `${API_URL}/anime?q=${query}&limit=100&fields=id,title,synopsis,main_picture,genres`;

  try {
    const response = await fetch(url, {
      headers: {
        'X-MAL-CLIENT-ID': CLIENT_ID,
      },
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.status}`);
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch anime data' });
  }
}