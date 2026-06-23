import { Box, Typography } from '@mui/material';

export default function ValidationBanner({ show, message = 'These fields are required!' }) {
  if (!show) return null;

  return (
    <Box
      sx={{
        bgcolor: 'error.light',
        borderRadius: 2,
        px: 2,
        py: 1.5,
        display: 'flex',
        alignItems: 'center',
        gap: 1,
        gridColumn: '1 / -1',
      }}
    >
      <Typography component="span" sx={{ color: 'error.main', fontWeight: 700 }}>
        *
      </Typography>
      <Typography variant="body2" sx={{ color: 'error.main', fontWeight: 500 }}>
        {message}
      </Typography>
    </Box>
  );
}
