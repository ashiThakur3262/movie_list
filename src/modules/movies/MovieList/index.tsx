import { Box, CircularProgress, Grid } from '@mui/material';
import MovieCard from '../MovieCard';
import CustomDetailPage from '../../../reusable-component/CustomDetailPage';
import useFetchMovieList from '../../../custom-hooks/useFetchMovieListHook ';
import { LoadingStatus } from '../../../data/models/interfaces';

function MovieListPage() {
  const {
    movieData,
    loadingStatus,
    nextPageLoadingStatus,
    lastElementRef,
    selectApiCall,
  } = useFetchMovieList();

  return (
    <Box
      sx={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }}
    >
      <CustomDetailPage
        loadingStatus={loadingStatus}
        detail={movieData}
        onReload={selectApiCall}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'start',
            alignContent: 'start',
            alignItems: 'start',
            flexDirection: 'column',
            width: '100%',
          }}
        >
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
            sx={{
              p: '1rem',
              boxSizing: 'border-box',
              overflowX: 'hidden',
            }}
          >
            {movieData?.results.map((movie, index) => (
              <Grid item xs={6} sm={4} md={2} lg={2.4} xl={2.4} key={index}>
                {index === movieData?.results.length - 1 ? (
                  <MovieCard movie={movie} lastElementRef={lastElementRef} />
                ) : (
                  <MovieCard movie={movie} />
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
        {nextPageLoadingStatus === LoadingStatus.LOADING ? <CircularProgress /> : undefined}
      </CustomDetailPage>
    </Box>
  );
}

export default MovieListPage;
