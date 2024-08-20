import { Box, Typography } from '@mui/material';
import GradeIcon from '@mui/icons-material/Grade';
import { DisplayUtils } from '../../../utils/display-utils';

function MovieRating({ rating }: { rating: number }) {
  return (
    <Box display='flex'>
      <GradeIcon
        sx={{ color: 'yellow', paddingRight: '4px' }}
        fontSize='small'
      />
      <Typography sx={{ color: '#E2DFD2' }}>
        {rating ? DisplayUtils.getDecimalValue(rating) : '--'}
      </Typography>
    </Box>
  );
}

export default MovieRating;
