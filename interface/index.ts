export type TFilter = "show" | "movie" | "tvShow";

export interface IMarvel {
  id: number;
  cover_url: string;
  title: string;
  overview: string;
  type: TFilter;
  trailer_url: string;
}
