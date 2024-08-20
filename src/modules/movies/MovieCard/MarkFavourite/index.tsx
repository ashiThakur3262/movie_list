import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import { MovieListResultEntity } from '../../../../data/models/movies';

function MarkFavourite({ movie }: { movie: MovieListResultEntity }) {
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  useEffect(() => {
    const existingFavorites = localStorage.getItem('favourites');
    const favoritesList: MovieListResultEntity[] = existingFavorites
      ? JSON.parse(existingFavorites)
      : [];
    setIsFavorite(favoritesList.some((fav) => fav.id === movie.id));
  }, [movie]);

  const handleSubmit = () => {
    const existingFavorites = localStorage.getItem('favourites');
    let favoritesList: MovieListResultEntity[] = existingFavorites
      ? JSON.parse(existingFavorites)
      : [];

    if (isFavorite) {
      favoritesList = favoritesList.filter((fav) => fav.id !== movie.id);
    } else {
      favoritesList.push(movie);
    }

    localStorage.setItem('favourites', JSON.stringify(favoritesList));
    setIsFavorite(!isFavorite);
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        clipPath: 'polygon(0 0, 100% 0, 100% 100%, 50% 75%, 0 100%)',
        backgroundColor: isFavorite
          ? 'rgb(139, 128, 0)'
          : 'rgb(52, 52, 52, 0.8)',
        padding: '4px',
        cursor: 'pointer',
      }}
      onClick={handleSubmit}
    >
      {isFavorite ? (
        <CheckOutlinedIcon />
      ) : (
        <AddOutlinedIcon sx={{ color: 'white' }} />
      )}
    </Box>
  );
}

export default MarkFavourite;
