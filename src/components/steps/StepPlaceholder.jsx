import { Box, Typography } from '@mui/material';
import ConstructionOutlinedIcon from '@mui/icons-material/ConstructionOutlined';

export default function StepPlaceholder({ title }) {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 8,
        px: 2,
        textAlign: 'center',
        bgcolor: 'grey.50',
        borderRadius: 2,
        border: '1px dashed',
        borderColor: 'divider',
      }}
    >
      <ConstructionOutlinedIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2 }} />
      <Typography variant="h6" sx={{ mb: 1, color: 'text.primary' }}>
        {title}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 400 }}>
        This step will be implemented in a future iteration. Complete Personal Information to
        continue building your profile.
      </Typography>
    </Box>
  );
}
