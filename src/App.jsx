import { ThemeProvider, CssBaseline } from '@mui/material';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import theme from './theme/theme';
import RegistrationPage from './pages/RegistrationPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <RegistrationPage />
    </ThemeProvider>
  );
}

export default App;
