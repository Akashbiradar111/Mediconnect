import { Box, Link, Typography } from '@mui/material';
import HeadsetMicOutlinedIcon from '@mui/icons-material/HeadsetMicOutlined';

export default function ContactSupport({ sx }) {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: { xs: 1, sm: '10px' },
        flexShrink: 0,
        ...sx,
      }}
    >
      <HeadsetMicOutlinedIcon
        sx={{
          fontSize: 22,
          color: '#666666',
          flexShrink: 0,
        }}
      />

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 0,
        }}
      >
        <Typography
          sx={{
            color: '#666666',
            fontSize: '0.875rem',
            fontWeight: 400,
            lineHeight: 1.25,
          }}
        >
          Need Help?
        </Typography>

        <Link
          href="#"
          underline="always"
          sx={{
            color: '#00796B',
            fontWeight: 500,
            fontSize: '0.875rem',
            lineHeight: 1.25,
            textDecorationColor: '#00796B',
            mt: '2px',
            '&:hover': {
              color: '#00695C',
            },
          }}
        >
          Contact Support
        </Link>
      </Box>
    </Box>
  );
}
