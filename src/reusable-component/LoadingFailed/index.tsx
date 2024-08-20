import { Alert, Box, Button } from '@mui/material';

export const LoadingFailed = ({ onReload }: { onReload?: () => void }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Alert severity="warning">Loading Failed</Alert>
      {onReload ? <Button onClick={onReload}>Reload</Button> : undefined}
    </Box>
  );
};
