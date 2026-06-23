import { Box, Typography } from '@mui/material';
import logoIcon from '../../assets/mediconnect-icon.png';
import logoFull from '../../assets/mediconnect-logo-full.png';

const BRAND_COLOR = '#006854';

export default function Logo({ compact = false }) {
  if (!compact) {
    return (
      <Box
        component="img"
        src={logoFull}
        alt="MediConnect Healthcare Ecosystem"
        sx={{
          height: 48,
          width: 'auto',
          objectFit: 'contain',
          display: 'block',
        }}
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
      <Box
        component="img"
        src={logoIcon}
        alt="MediConnect"
        sx={{
          width: 36,
          height: 36,
          objectFit: 'contain',
          flexShrink: 0,
        }}
      />
      <Typography
        sx={{
          fontWeight: 700,
          color: BRAND_COLOR,
          fontSize: '1rem',
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
        }}
      >
        MediConnect
      </Typography>
    </Box>
  );
}
