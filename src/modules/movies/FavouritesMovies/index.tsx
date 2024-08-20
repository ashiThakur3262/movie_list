import { Box, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { MovieListResultEntity } from '../../../data/models/movies';
import MovieCard from '../MovieCard';

function FavouriteMovies() {
  const [favouriteMovies, setFavouriteMovies] = useState<
    MovieListResultEntity[]
  >([]);
  useEffect(() => {
    const existingFavorites = localStorage.getItem('favourites');
    const favoritesList: MovieListResultEntity[] = existingFavorites
      ? JSON.parse(existingFavorites)
      : [];
    setFavouriteMovies(favoritesList);
  }, [favouriteMovies]);
  return (
    <Box sx={{ p: 2 }}>
      <Typography variant='h4' gutterBottom>
        Favorites
      </Typography>
      <Box
        sx={{
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <Box>
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
          >
            {favouriteMovies?.map((movie, index) => (
              <Grid item xs={6} sm={4} md={2} lg={2.4} xl={2.4} key={index}>
                <MovieCard movie={movie} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
}

export default FavouriteMovies;
