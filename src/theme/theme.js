import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#008060',
      light: '#E6F4F0',
      dark: '#006B51',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#0D9488',
    },
    error: {
      main: '#EF4444',
      light: '#FEF2F2',
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280',
      disabled: '#9CA3AF',
    },
    background: {
      default: '#F3F4F6',
      paper: '#FFFFFF',
    },
    divider: '#E5E7EB',
    grey: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
      fontSize: '1.75rem',
      lineHeight: 1.3,
      color: '#111827',
    },
    h6: {
      fontWeight: 600,
      fontSize: '1rem',
    },
    body1: {
      fontSize: '0.9375rem',
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.5,
    },
    caption: {
      fontSize: '0.75rem',
      color: '#9CA3AF',
    },
  },
  shape: {
    borderRadius: 10,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          width: '100%',
          overflowX: 'hidden',
        },
        body: {
          backgroundColor: '#F3F4F6',
          width: '100%',
          overflowX: 'hidden',
        },
        '#root': {
          width: '100%',
          minHeight: '100vh',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 10,
          padding: '12px 24px',
          fontSize: '0.9375rem',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: 10,
          backgroundColor: '#FFFFFF',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#E5E7EB',
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#D1D5DB',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#008060',
            borderWidth: 1,
          },
        },
        input: {
          padding: '14px 14px',
          fontSize: '0.9375rem',
          '&::placeholder': {
            color: '#9CA3AF',
            opacity: 1,
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#374151',
          marginBottom: 6,
          position: 'relative',
          transform: 'none',
          '&.Mui-focused': {
            color: '#374151',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          padding: '14px 14px',
        },
      },
    },
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          height: 6,
          backgroundColor: '#E5E7EB',
        },
        bar: {
          borderRadius: 4,
        },
      },
    },
  },
});

export default theme;
