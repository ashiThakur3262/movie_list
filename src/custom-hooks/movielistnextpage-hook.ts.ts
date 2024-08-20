import { Dispatch, SetStateAction } from 'react';
import { FilterTypes } from '../constant/movies';
import { fetchMoviesList, fetchSearchMoviesList } from '../data/api/movies';
import { LoadingStatus } from '../data/models/interfaces';
import { MovieListEntity } from '../data/models/movies';
import { useMovieListContext } from './movieListContext';

function useFetchMovieListNextPage(
  setMovieData: Dispatch<SetStateAction<MovieListEntity | undefined>>,
  loadingStatus: LoadingStatus,
  setLoadingStatus: Dispatch<SetStateAction<LoadingStatus>>
) {
  const { filters, searchQuery } = useMovieListContext();

  const fetchSearchMovieNextPage = async (updatedPageNumber: number) => {
    if (loadingStatus === LoadingStatus.LOADING) return;
    setLoadingStatus(LoadingStatus.LOADING);

    const response = await fetchSearchMoviesList({
      pageNumber: updatedPageNumber,
      searchQuery: searchQuery,
    });
    if (response) {
      setMovieData((prevData) => {
        const allResults = [...(prevData?.results ?? []), ...response.results];

        const uniqueResults = Array.from(
          new Map(allResults.map((item) => [item.id, item])).values()
        );

        const newData: MovieListEntity = {
          page: response.page,
          total_pages: response.total_pages,
          total_results: response.total_results,
          results: uniqueResults,
        };
        return newData;
      });
      setLoadingStatus(LoadingStatus.IDLE);
    } else {
      setLoadingStatus(LoadingStatus.FAILED);
    }
  };

  const fetchMovieNextPage = async (updatedPageNumber: number) => {
    if (loadingStatus === LoadingStatus.LOADING) return;
    setLoadingStatus(LoadingStatus.LOADING);

    const response = await fetchMoviesList({
      pageNumber: updatedPageNumber,
      releaseYear: filters[FilterTypes.RELEASE_YEAR] ?? undefined,
      rating: filters[FilterTypes.RATING] ?? undefined,
      genres: filters[FilterTypes.GENRES] ?? undefined,
    });
    if (response) {
      setMovieData((prevData) => {
        const allResults = [...(prevData?.results ?? []), ...response.results];

        const uniqueResults = Array.from(
          new Map(allResults.map((item) => [item.id, item])).values()
        );

        const newData: MovieListEntity = {
          page: response.page,
          total_pages: response.total_pages,
          total_results: response.total_results,
          results: uniqueResults,
        };
        return newData;
      });
      setLoadingStatus(LoadingStatus.IDLE);
    } else {
      setLoadingStatus(LoadingStatus.FAILED);
    }
  };

  return {
    fetchMovieNextPage,
    fetchSearchMovieNextPage,
  };
}

export default useFetchMovieListNextPage;
