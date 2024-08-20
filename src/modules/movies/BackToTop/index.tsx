import ArrowUpwardOutlinedIcon from '@mui/icons-material/ArrowUpwardOutlined';
import { Box, IconButton, Typography } from '@mui/material';
import { useScrollPosition } from '../../../custom-hooks/scrollposition-hook';
import { useEffect, useState } from 'react';

function BackToTop() {
  const [setScroll, getScroll] = useScrollPosition();
  const [backToTop, setBackToTop] = useState(false);
  const handleClick = () => {
    setScroll();
  };

  const scrollPosition = getScroll();
  useEffect(() => {
    if (scrollPosition > 1000) {
      setBackToTop(true);
    } else {
      setBackToTop(false);
    }
  }, [scrollPosition]);

  return backToTop ? (
    <IconButton
      sx={{
        position: 'fixed',
        bottom: 10,
        left: '50%',
        transform: 'translateX(-50%)',
        p: '1rem',
        backgroundColor: '#FAF9F6',
        borderRadius: '32px',
        '&:hover': {
          backgroundColor: '#FAF9F6',
        },
        zIndex: 1,
      }}
      onClick={handleClick}
    >
      <ArrowUpwardOutlinedIcon />
      <Box width='8px' />
      <Typography>Back to top</Typography>
    </IconButton>
  ) : undefined;
}

export default BackToTop;
