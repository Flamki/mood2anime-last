export type Mood = string;

export interface Anime {
  id: number;
  title: string;
  synopsis: string;
  main_picture: {
    medium: string;
    large: string;
  };
  genres: { id: number; name: string }[];
  mean?: number | null;
  num_episodes?: number | null;
}