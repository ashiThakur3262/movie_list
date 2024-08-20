import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import HomePageContainer from './modules/movies/HomePageContainer/index.tsx';

const root = createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <HomePageContainer />
  </StrictMode>
);
