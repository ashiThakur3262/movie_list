import { createContext, Dispatch, SetStateAction, useContext } from 'react';
import { FilterEntities } from '../data/models/movies';

export interface FiltersAndSearchEntity {
  filters: FilterEntities;
  setFilters: Dispatch<SetStateAction<FilterEntities>>;
  searchQuery: string;
  setSearchQuery: Dispatch<SetStateAction<string>>;
}

export const MovieListContext = createContext<
  FiltersAndSearchEntity | undefined
>(undefined);

export const useMovieListContext = () => {
  const context = useContext(MovieListContext);

  if (!context) {
    throw new Error(
      'useMovieListContext must be used within a MovieListProvider'
    );
  }

  return context;
};
