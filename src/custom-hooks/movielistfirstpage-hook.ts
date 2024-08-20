import { Dispatch, SetStateAction } from 'react';
import { FilterTypes } from '../constant/movies';
import { fetchMoviesList, fetchSearchMoviesList } from '../data/api/movies';
import { LoadingStatus } from '../data/models/interfaces';
import { MovieListEntity } from '../data/models/movies';
import { useMovieListContext } from './movieListContext';

function useFetchMovieListFirstPage(
  setMovieData: Dispatch<SetStateAction<MovieListEntity | undefined>>,
  loadingStatus: LoadingStatus,
  setLoadingStatus: Dispatch<SetStateAction<LoadingStatus>>
) {
  const { filters, searchQuery } = useMovieListContext();
  

  const fetchMovies = async (page: number) => {
    if (loadingStatus === LoadingStatus.LOADING) return;
    setLoadingStatus(LoadingStatus.LOADING);
    const response = await fetchMoviesList({
      pageNumber: page,
      releaseYear: filters[FilterTypes.RELEASE_YEAR] ?? undefined,
      rating: filters[FilterTypes.RATING] ?? undefined,
      genres: filters[FilterTypes.GENRES] ?? undefined,
    });
    if (response) {
      setMovieData((prevData) => {
        if (page > 1 && prevData) {
          return {
            ...response,
            results: [...prevData.results, ...response.results],
          };
        }
        return response;
      });
      setLoadingStatus(LoadingStatus.IDLE);
    } else {
      setLoadingStatus(LoadingStatus.FAILED);
    }
  };

  const fetchSearchMovies = async (page: number) => {
    setLoadingStatus(LoadingStatus.LOADING);

    const response = await fetchSearchMoviesList({
      pageNumber: page,
      searchQuery: searchQuery,
    });

    if (response) {
      setMovieData((prevData) => {
        if (page > 1 && prevData) {
          return {
            ...response,
            results: [...prevData.results, ...response.results],
          };
        }
        return response;
      });
      setLoadingStatus(LoadingStatus.IDLE);
    } else {
      setLoadingStatus(LoadingStatus.FAILED);
    }
  };

  return {
    fetchMovies,
    fetchSearchMovies,
  };
}

export default useFetchMovieListFirstPage;
