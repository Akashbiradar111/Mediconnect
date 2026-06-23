import { Box } from '@mui/material';
import { REGISTRATION_STEPS } from '../../constants/steps';
import SidebarStepItem from './SidebarStepItem';

export default function SidebarStepper({ activeStep }) {
  return (
    <Box sx={{ flex: 1, py: 2 }}>
      {REGISTRATION_STEPS.map((step, index) => (
        <SidebarStepItem
          key={step.id}
          step={step}
          index={index}
          isActive={index === activeStep}
          isCompleted={index < activeStep}
          isLast={index === REGISTRATION_STEPS.length - 1}
        />
      ))}
    </Box>
  );
}
