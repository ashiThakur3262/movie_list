import { Box, Chip, Popover } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useState } from 'react';
import GenresFilter from './GenresFilter';
import DateAndRatingFilter from '../../../../reusable-component/RangeFilter';
import { DisplayUtils } from '../../../../utils/display-utils';
import { filterChipsLabel, FilterTypes } from '../../../../constant/movies';
import { useMovieListContext } from '../../../../custom-hooks/movieListContext';
import './style.css';

function MovieListFilterChip() {
  const { filters, setFilters, setSearchQuery } = useMovieListContext();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);

  const handleClick = (
    event: React.MouseEvent<HTMLElement>,
    filter: string
  ) => {
    if (filter === FilterTypes.IS_FAVORIITE) {
      setFilters((prevState) => ({
        genres: null,
        rating: null,
        release_year: null,
        is_favorite: !prevState.is_favorite,
      }));
      setSearchQuery('');
    } else {
      setAnchorEl(event.currentTarget);
    }
    setSelectedFilter(filter);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedFilter(null);
  };

  const open = Boolean(anchorEl);
  const currentYear = new Date().getFullYear();

  const renderPopoverContent = () => {
    switch (selectedFilter) {
      case FilterTypes.GENRES:
        return <GenresFilter />;
      case FilterTypes.RELEASE_YEAR:
        return (
          <DateAndRatingFilter
            headingText='Selected Year: '
            maxRange={currentYear}
            minRange={1990}
          />
        );
      case FilterTypes.RATING:
        return (
          <DateAndRatingFilter
            headingText='Selected Rating > '
            maxRange={9}
            minRange={1}
            isDecimalData
            isRatingFilter={true}
          />
        );
      default:
        return null;
    }
  };

  const getClassName = (filterType: string) => {
    const isHighlighted = () => {
      switch (filterType) {
        case FilterTypes.RELEASE_YEAR:
          return !!filters[FilterTypes.RELEASE_YEAR];
        case FilterTypes.RATING:
          return !!filters[FilterTypes.RATING];
        case FilterTypes.GENRES:
          return !!filters[FilterTypes.GENRES];
        case FilterTypes.IS_FAVORIITE:
          return filters[FilterTypes.IS_FAVORIITE];
        default:
          return false;
      }
    };

    return isHighlighted()
      ? 'movie-list-filter-chip active'
      : 'movie-list-filter-chip inactive';
  };

  return (
    <Box className='movie-list-filter-chip-container'>
      {filterChipsLabel.map((filterType: string) => (
        <Chip
          className={getClassName(filterType)}
          key={filterType}
          label={`${DisplayUtils.filterWiseValue(filters, filterType)}`}
          size='medium'
          deleteIcon={<ArrowDropDownIcon />}
          onClick={(event) => handleClick(event, filterType)}
          onDelete={
            filterType !== FilterTypes.IS_FAVORIITE
              ? (event) => handleClick(event, filterType)
              : undefined
          }
          variant='outlined'
        />
      ))}
      <Popover
        className='custom-popover'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {renderPopoverContent()}
      </Popover>
    </Box>
  );
}

export default MovieListFilterChip;
