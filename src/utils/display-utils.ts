import { FilterTypes } from '../constant/movies';
import { FilterEntities } from '../data/models/movies';

export class DisplayUtils {
  static getDecimalValue = (value: number, precision: number = 1): number => {
    return parseFloat(value.toFixed(precision));
  };

  static filterWiseValue = (
    filters: FilterEntities,
    filterType: string
  ): string => {
    switch (filterType) {
      case FilterTypes.RELEASE_YEAR:
        return filters.release_year
          ? `Release year: ${filters.release_year}`
          : 'Release year';
      case FilterTypes.RATING:
        return filters.rating ? `Rating: ${filters.rating}` : 'Rating';
      case FilterTypes.IS_FAVORIITE:
        return 'Favourite';
      case FilterTypes.GENRES:
        return filters.genres
          ? `Genre: ${DisplayUtils.genreFilterLabel(filters.genres)}`
          : 'Genre';
      default:
        return 'Unknown filter';
    }
  };

  static genreFilterLabel = (genre: number) => {
    switch (genre) {
      case 28:
        return 'Action';
      case 12:
        return 'Adventure';
      case 16:
        return 'Animation';
      case 35:
        return 'Comedy';
      case 80:
        return 'Crime';
      case 99:
        return 'Documentary';
      case 18:
        return 'Drama';
      case 10751:
        return 'Family';
      case 14:
        return 'Fantasy';
      case 36:
        return 'History';
      case 27:
        return 'Horror';
      case 10402:
        return 'Music';
      case 9648:
        return 'Mystery';
      case 10749:
        return 'Romance';
      case 878:
        return 'Science Fiction';
      case 10770:
        return 'TV Movie';
      case 53:
        return 'Thriller';
      case 10752:
        return 'War';
      case 37:
        return 'Western';
      default:
        return 'Unknown';
    }
  };
}
