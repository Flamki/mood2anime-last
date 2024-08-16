export type Mood = 'happy' | 'sad' | 'majestic' | 'crazy';

export interface Anime {
  id: number;
  title: string;
  synopsis: string;
  mean: number;
  genres: { id: number; name: string }[];
  main_picture: {
    medium: string;
    large: string;
  };
}