import { Box, Card, CardContent, Stack, Typography } from '@mui/material';
import { MovieListResultEntity } from '../../../data/models/movies';
import MovieRating from '../MovieRating';
import { DateUtils } from '../../../utils/date-utils';
import { ImageUtils } from '../../../utils/image-url-utils';
import MarkFavourite from './MarkFavourite';
import noPosterImage from './../../../assets/no-poster-available.jpg';

function MovieCard({
  movie,
  lastElementRef,
}: {
  movie: MovieListResultEntity;
  lastElementRef?: any;
}) {
  const posterPath = movie.poster_path
    ? ImageUtils.getFullImageUrl(movie.poster_path)
    : noPosterImage;
  return (
    <Box sx={{ minWidth: 150 }} ref={lastElementRef}>
      <Card variant='elevation' sx={{ backgroundColor: '#343434' }}>
        <CardContent sx={{ p: 0 }}>
          <Stack>
            <Box sx={{ position: 'relative' }}>
              <img
                src={posterPath}
                style={{
                  width: '100%',
                  height: '350px'
                }}
              />
              <Box sx={{ paddingLeft: 1, paddingRight: 1 }}>
                <MovieRating rating={movie.vote_average} />
                <Typography
                  sx={{
                    fontSize: 18,
                    color: 'white',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    display: 'block',
                  }}
                >
                  {movie.original_title ?? movie.original_name}
                </Typography>

                <Typography sx={{ color: 'white' }} gutterBottom>
                  {`Year: ${
                    movie.release_date
                      ? DateUtils.getYear(movie.release_date)
                      : 'Not available'
                  }`}
                </Typography>
              </Box>
              <MarkFavourite movie={movie} />
            </Box>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
}

export default MovieCard;
