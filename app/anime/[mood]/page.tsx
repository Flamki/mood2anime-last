import type { Metadata } from 'next'
import AnimeDisplay from './AnimeDisplay'

type Params = {
  params: {
    mood: string
  }
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  return {
    title: `${params.mood.charAt(0).toUpperCase() + params.mood.slice(1)} Anime | Mood2Anime`,
    description: `Discover ${params.mood} anime recommendations tailored to your current mood on Mood2Anime.`,
    openGraph: {
      title: `${params.mood.charAt(0).toUpperCase() + params.mood.slice(1)} Anime Recommendations`,
      description: `Find the perfect ${params.mood} anime to watch based on your mood.`,
    },
    twitter: {
      card: 'summary_large_image',
      title: `${params.mood.charAt(0).toUpperCase() + params.mood.slice(1)} Anime Recommendations`,
      description: `Discover ${params.mood} anime tailored to your mood on Mood2Anime.`,
    },
  }
}

export default function AnimePage({ params }: Params) {
  return (
    <div className="min-h-screen">
      <AnimeDisplay initialMood={params.mood} />
    </div>
  )
}