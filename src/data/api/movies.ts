import { MovieListEntity } from '../models/movies';
import { apiClient } from './apiClient';
import { fetchMovieUrl, fetchSearchMovieUrl } from './apiUrls';


export const fetchMoviesList = async ({
  pageNumber = 1,
  releaseYear,
  rating,
  genres,
}: {
  pageNumber: number;
  releaseYear?: number;
  rating?: number;
  genres?: number;
}): Promise<MovieListEntity | undefined> => {
  try {
    const axiosResponse = await apiClient.get(fetchMovieUrl, {
      params: {
        page: pageNumber,
        primary_release_year: releaseYear,
        'vote_average.gte': rating,
        with_genres: genres,
      },
    });
    return axiosResponse.data;
  } catch (error: any) {
    console.error('Error fetching details:', error); 
    return undefined;
  }
};

export const fetchSearchMoviesList = async ({
  pageNumber = 1,
  searchQuery,
}: {
  pageNumber: number;
  searchQuery: string;
}): Promise<MovieListEntity | undefined> => {
  try {
    const axiosResponse = await apiClient.get(fetchSearchMovieUrl, {
      params: {
        page: pageNumber,
        query: searchQuery,
      },
    });
    return axiosResponse.data;
  } catch (error) {
    console.error('Error fetching details:', error);
    return undefined;
  }
};
