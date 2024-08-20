import { Box } from '@mui/material';
import { LoadingFailed } from '../LoadingFailed';

export const PageLoadingFailed = ({
  onReload,
  backgroundColor,
}: {
  onReload: () => void;
  backgroundColor?: string;
}) => (
  <Box
    sx={{
      display: 'flex',
      height: '30vh',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      backgroundColor: backgroundColor ?? undefined,
    }}
  >
    <LoadingFailed onReload={onReload} />
  </Box>
);
