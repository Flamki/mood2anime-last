// app/manga/[mood]/page.tsx
import MangaDisplay from './MangaDisplay';

interface MangaPageProps {
  params: {
    mood: string;
  };
}

export default function MangaPage({ params }: MangaPageProps) {
  return (
    <div className="min-h-screen">
      <MangaDisplay initialMood={params.mood} />
    </div>
  );
}