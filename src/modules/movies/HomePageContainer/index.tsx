import { Box, CircularProgress } from '@mui/material';
import MovieSearchBar from '../MovieSearchBar';
import MovieListFilterChip from '../MovieList/MovieListFilterChip';
import MovieListPage from '../MovieList';
import { useState } from 'react';
import FavouriteMovies from '../FavouritesMovies';
import { FilterEntities } from '../../../data/models/movies';
import { FilterTypes } from '../../../constant/movies';
import { MovieListContext } from '../../../custom-hooks/movieListContext';
import './style.css';
import BackToTop from '../BackToTop';

function HomePageContainer() {
  const filterInitialState: FilterEntities = {
    genres: null,
    rating: null,
    release_year: null,
    is_favorite: false,
  };
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState<FilterEntities>(filterInitialState);
  return (
    <Box className='movie-container-main'>
      <MovieListContext.Provider
        value={{
          filters: filters,
          searchQuery: searchQuery,
          setFilters: setFilters,
          setSearchQuery: setSearchQuery,
        }}
      >
        <Box className='movie-searchbox-main'>
          <MovieSearchBar />
        </Box>
        <br />
        <MovieListFilterChip />
        <br />
        <BackToTop />
        <br />
        {filters[FilterTypes.IS_FAVORIITE] ? (
          <FavouriteMovies />
        ) : (
          <MovieListPage />
        )}
      </MovieListContext.Provider>
    </Box>
  );
}

export default HomePageContainer;
