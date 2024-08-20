import { Box, Button, Slider, Typography } from '@mui/material';
import { useState } from 'react';
import { FilterTypes } from '../../constant/movies';
import { useMovieListContext } from '../../custom-hooks/movieListContext';

function DateAndRatingFilter({
  minRange,
  maxRange,
  headingText,
  isDecimalData = false,
  isRatingFilter = false,
}: {
  minRange: number;
  maxRange: number;
  headingText: string;
  isDecimalData?: boolean;
  isRatingFilter?: boolean;
}) {
  const { filters, setFilters, setSearchQuery } = useMovieListContext();
  const filterKey = isRatingFilter
    ? FilterTypes.RATING
    : FilterTypes.RELEASE_YEAR;

  const filterValue = filters[filterKey];
  const [range, setRange] = useState(filterValue ?? maxRange);

  const handleChange = (_e: any, newValue: any) => {
    setRange(newValue);
  };

  const handleSubmit = (_e: any, newValue: any) => {
    setRange(newValue);

    setFilters((prevState) => ({
      ...prevState,
      [filterKey]: newValue,
      is_favorite: false,
    }));
  };

  const handleClear = () => {
    setRange(maxRange);
    setFilters((prevState) => ({
      ...prevState,
      [filterKey]: null,
    }));
    setSearchQuery('');
  };

  return (
    <Box sx={{ width: 300, padding: 2 }}>
      {filterValue ? (
        <Typography variant='h6' gutterBottom sx={{ color: 'white' }}>
          {`${headingText} ${range}`}
        </Typography>
      ) : (
        <Typography variant='h6' gutterBottom sx={{ color: 'white' }}>
          {`${headingText}`}
        </Typography>
      )}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Typography gutterBottom sx={{ color: 'white' }}>
          {`${minRange}`}
        </Typography>
        <Typography gutterBottom sx={{ color: 'white' }}>
          {`${maxRange}`}
        </Typography>
      </Box>
      <Slider
        value={range}
        onChange={handleChange}
        onChangeCommitted={handleSubmit}
        min={minRange}
        max={maxRange}
        step={isDecimalData ? 0.1 : 1}
        sx={{
          color: 'white',
          '& .MuiSlider-thumb': {
            color: 'white',
          },
          '& .MuiSlider-track': {
            color: '#808080',
          },
          '& .MuiSlider-rail': {
            color: 'red',
          },
        }}
        valueLabelDisplay='auto'
      />
      <Box
        sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}
      >
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

export default DateAndRatingFilter;
