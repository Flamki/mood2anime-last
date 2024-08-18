// types/index.ts

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

export interface Manga {
  id: number;
  title: string;
  synopsis: string;
  main_picture: {
    medium: string;
    large: string;
  };
  genres: { id: number; name: string }[];
  mean?: number | null;
  num_volumes?: number | null;
  num_chapters?: number | null;
}

export interface ApiResponse {
  data: Anime[] | Manga[];
}