import MemeDisplay from './MemeDisplay';

interface MemePageProps {
  params: {
    mood: string;
  };
}

export default function MemePage({ params }: MemePageProps) {
  return (
    <div className="min-h-screen">
      <MemeDisplay initialMood={params.mood} />
    </div>
  );
}