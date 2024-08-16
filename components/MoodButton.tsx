import { Mood } from '../types';

interface MoodButtonProps {
  mood: Mood;
}

export default function MoodButton({ mood }: MoodButtonProps) {
  const getEmoji = (mood: Mood): string => {
    switch (mood) {
      case 'happy': return '😊';
      case 'sad': return '😢';
      case 'majestic': return '👑';
      case 'crazy': return '🤪';
      default: return '😐';
    }
  };

  return (
    <button className="bg-white text-purple-600 font-semibold py-3 px-6 rounded-full shadow-lg hover:bg-purple-100 transition duration-300 text-xl">
      {getEmoji(mood)} {mood.charAt(0).toUpperCase() + mood.slice(1)}
    </button>
  );
}