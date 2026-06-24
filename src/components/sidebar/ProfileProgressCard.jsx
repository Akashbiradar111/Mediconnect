import { Box, Typography, LinearProgress } from '@mui/material';
import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import { ESTIMATED_TIME } from '../../constants/steps';

export default function ProfileProgressCard({ progress }) {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        border: '1px solid',
        borderColor: 'divider',
        p: { xs: 2, sm: 2.5 },
        boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
      }}
    >
      <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 0.5 }}>
        Profile Progress
      </Typography>
      <Typography
        variant="h6"
        sx={{ color: 'primary.main', fontWeight: 700, fontSize: '1.25rem', mb: 1.5 }}
      >
        {progress}% Complete
      </Typography>
      <LinearProgress
        variant="determinate"
        value={progress}
        sx={{
          mb: 1.5,
          '& .MuiLinearProgress-bar': {
            bgcolor: 'primary.main',
          },
        }}
      />
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
        <AccessTimeOutlinedIcon sx={{ fontSize: 14, color: 'grey.400' }} />
        <Typography variant="caption" sx={{ color: 'grey.400' }}>
          Estimated Time: {ESTIMATED_TIME}
        </Typography>
      </Box>
    </Box>
  );
}
