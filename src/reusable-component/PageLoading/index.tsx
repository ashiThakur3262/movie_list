import { Box, CircularProgress } from '@mui/material';

export const PageLoading = ({height}: {height?: string}) => (
  <Box
    sx={{
      display: 'flex',
      height: height ? height : '30vh',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minWidth: '100%',
    }}
  >
    <CircularProgress />
  </Box>
);
