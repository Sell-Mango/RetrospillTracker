export interface Game {
  id: string;
  title: string;
  imgUrl?: string;
  description?: string;
  developer?: string;
  platform?: string;
  apiKey?: string;
  slug?: string;
  rating?: number | null;
  releaseDate?: string | null;
  genres?: string[];
  platforms?: string[];
}
