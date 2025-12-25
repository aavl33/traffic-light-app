import {useEffect} from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { store } from './store';
import { MainPage } from '@/pages/MainPage';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    background: {
      default: '#f5f5f5',
    },
  },
});

const App = () => {
  useEffect(() => {
    const link = document.createElement('link');
    link.rel = 'icon';
    link.href = 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><circle cx="12" cy="6" r="4" fill="%234caf50"/><circle cx="12" cy="12" r="4" fill="%23ff9800"/><circle cx="12" cy="18" r="4" fill="%23f44336"/></svg>';
    document.head.appendChild(link);
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MainPage />
      </ThemeProvider>
    </Provider>
  );
};

export default App;
