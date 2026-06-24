import { Button } from '@mui/material';

export default function StepActionButton({ children, disabled, onClick, type = 'submit' }) {
  return (
    <Button
      type={type}
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      sx={{
        minWidth: { xs: '100%', sm: 200, md: 240 },
        py: { xs: 1.25, sm: 1.5 },
        fontSize: { xs: '0.875rem', sm: '0.9375rem' },
        bgcolor: disabled ? '#E5E7EB' : 'primary.main',
        color: disabled ? '#6B7280' : 'white',
        '&:hover': {
          bgcolor: disabled ? '#E5E7EB' : 'primary.dark',
        },
        '&.Mui-disabled': {
          bgcolor: '#E5E7EB',
          color: '#6B7280',
        },
      }}
    >
      {children}
    </Button>
  );
}
