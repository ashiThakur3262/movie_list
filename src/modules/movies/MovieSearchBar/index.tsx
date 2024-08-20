import { InputAdornment, TextField } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import './style.css';
import { useMovieListContext } from '../../../custom-hooks/movieListContext';

function MovieSearchBar() {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const { searchQuery, setSearchQuery } = useMovieListContext();
  return (
    <TextField
      className='movie-search-bar'
      variant='outlined'
      value={searchQuery}
      size='medium'
      placeholder='Search Movie By Name'
      InputProps={{
        startAdornment: (
          <InputAdornment position='start'>
            <SearchOutlinedIcon />
          </InputAdornment>
        ),
      }}
      inputProps={{
        sx: {
          fontSize: '16px',
          p: 1,
        },
      }}
      onChange={handleChange}
    />
  );
}

export default MovieSearchBar;
