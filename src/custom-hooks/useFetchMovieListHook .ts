import { useCallback, useEffect, useRef, useState } from 'react';
import { useMovieListContext } from './movieListContext';
import { MovieListEntity } from '../data/models/movies';
import { LoadingStatus } from '../data/models/interfaces';
import useFetchMovieListFirstPage from './movielistfirstpage-hook';
import useFetchMovieListNextPage from './movielistnextpage-hook.ts';
import { debounce } from '@mui/material';

function useFetchMovieList() {
  const [pageNumber, setPageNumber] = useState(1);
  const [searchPageNumber, setSearchPageNumber] = useState(1);
  const { filters, searchQuery } = useMovieListContext();
  const [movieData, setMovieData] = useState<MovieListEntity | undefined>();
  const [nextPageLoadingStatus, setNextPageLoadingStatus] = useState(
    LoadingStatus.IDLE
  );
  const [loadingStatus, setLoadingStatus] = useState(LoadingStatus.IDLE);

  const observer = useRef<IntersectionObserver | null>(null);

  const lastElementRef = useCallback(
    (node: HTMLElement | null) => {
      if (loadingStatus === LoadingStatus.LOADING) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          if (searchQuery.length > 0) {
            setSearchPageNumber((prev) => prev + 1);
          } else {
            setPageNumber((prev) => prev + 1);
          }
        }
      });

      if (node) observer.current.observe(node);
    },
    [loadingStatus, searchQuery]
  );

  const { fetchMovies, fetchSearchMovies } = useFetchMovieListFirstPage(
    setMovieData,
    loadingStatus,
    setLoadingStatus
  );
  const { fetchMovieNextPage, fetchSearchMovieNextPage } =
    useFetchMovieListNextPage(
      setMovieData,
      nextPageLoadingStatus,
      setNextPageLoadingStatus
    );

  const debouncedFetchSearchMovie = debounce(() => {
    fetchSearchMovies(1);
  }, 450);

  const selectApiCall = () => {
    if (searchQuery.length > 0) {
      if (searchPageNumber > 1) {
        fetchSearchMovieNextPage(searchPageNumber);
      } else {
        debouncedFetchSearchMovie();
      }
    } else {
      if (pageNumber > 1) {
        fetchMovieNextPage(pageNumber);
      } else {
        fetchMovies(1);
      }
    }
  };

  useEffect(() => {
    if (searchQuery) {
      setSearchPageNumber(1);
      debouncedFetchSearchMovie();
    }
  }, [searchQuery]);

  useEffect(() => {
    selectApiCall();
  }, [searchQuery, filters, pageNumber, searchPageNumber]);

  return {
    movieData,
    loadingStatus,
    lastElementRef,
    selectApiCall,
    nextPageLoadingStatus,
  };
}

export default useFetchMovieList;
