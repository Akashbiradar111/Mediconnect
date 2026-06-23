import { Box, Typography } from '@mui/material';

export default function RequiredLabel({ children, required = false }) {
  return (
    <Typography
      component="label"
      variant="body2"
      sx={{
        fontWeight: 500,
        color: '#374151',
        mb: 0.75,
        display: 'block',
      }}
    >
      {children}
      {required && (
        <Box component="span" sx={{ color: 'error.main', ml: 0.25 }}>
          *
        </Box>
      )}
    </Typography>
  );
}
