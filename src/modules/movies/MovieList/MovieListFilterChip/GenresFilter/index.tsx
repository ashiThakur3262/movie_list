import { Box, Button, Typography } from '@mui/material';
import { FilterTypes, genresList } from '../../../../../constant/movies';
import { IFilterValues } from '../../../../../data/models/movies';
import { useMovieListContext } from '../../../../../custom-hooks/movieListContext';

function GenresFilter() {
  const { filters, setFilters, setSearchQuery } = useMovieListContext();
  const handleClear = () => {
    setFilters((prevState) => ({
      ...prevState,
      genres: null,
    }));
  };

  const handleClick = (genre: IFilterValues) => {
    setFilters((prevState) => ({
      ...prevState,
      genres: genre.id,
      is_favorite: false,
    }));
    setSearchQuery('');
  };

  return (
    <Box>
      <Box
        sx={{
          maxHeight: '200px',
          overflowY: 'auto',
          backgroundColor: '#343434',
          color: 'white',
          padding: '8px',
        }}
      >
        {genresList.map((genre) => (
          <Box
            key={genre.id}
            onClick={() => handleClick(genre)}
            sx={{
              padding: '4px 8px',
              cursor: 'pointer',
              backgroundColor:
                filters[FilterTypes.GENRES] === genre.id
                  ? 'rgba(255, 255, 255, 0.2)'
                  : 'transparent',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
              },
              border:
                filters[FilterTypes.GENRES] === genre.id
                  ? '1px solid white'
                  : 'none',
              borderRadius: '4px',
              marginLeft: '4px',
              marginBottom: '4px',
              fontSize: '14px',
              fontWeight: 'bold',
              textTransform: 'capitalize',
              letterSpacing: '0.5px',
            }}
          >
            <Typography key={genre.id} sx={{ padding: '4px 0' }}>
              {genre.name}
            </Typography>
          </Box>
        ))}
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          variant='text'
          onClick={handleClear}
          sx={{
            borderColor: 'transparent',
            '&:focus': {
              outline: 'none',
              borderColor: 'transparent',
            },
            color: 'white',
            fontSize: '12px',
          }}
          disableRipple
        >
          Clear All
        </Button>
      </Box>
    </Box>
  );
}

export default GenresFilter;
