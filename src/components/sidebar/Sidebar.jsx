import { Box } from '@mui/material';
import Logo from '../common/Logo';
import SidebarStepper from './SidebarStepper';
import ProfileProgressCard from './ProfileProgressCard';
import { REGISTRATION_STEPS } from '../../constants/steps';

export default function Sidebar({ activeStep }) {
  const progress = REGISTRATION_STEPS[activeStep]?.progress ?? 0;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: 'background.paper',
        borderRight: '1px solid',
        borderColor: 'divider',
        px: { xs: 2, md: 3, lg: 4 },
        py: { xs: 2, md: 3 },
      }}
    >
      <Box sx={{ mb: 3 }}>
        <Logo />
      </Box>

      <SidebarStepper activeStep={activeStep} />

      <Box sx={{ mt: 'auto', pt: 3 }}>
        <ProfileProgressCard progress={progress} />
      </Box>
    </Box>
  );
}
