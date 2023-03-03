export type TFilter = "all" | "movie" | "tvShow";

export interface IMarvel {
  id: number;
  cover_url: string;
  title: string;
  overview: string;
  type: TFilter;
  trailer_url: string;
}
