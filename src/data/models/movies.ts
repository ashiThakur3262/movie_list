export interface MovieListEntity {
  page: number;
  results: MovieListResultEntity[];
  total_pages: number;
  total_results: number;
}

export interface MovieListResultEntity {
  genre_ids: number[];
  id: number;
  original_title: string;
  original_name: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  vote_count: number;
}

export interface FilterEntities {
  genres: number | null;
  release_year: number | null;
  rating: number | null;
  is_favorite: boolean;
}

export interface IFilterValues {
  id: number;
  name: string;
}
