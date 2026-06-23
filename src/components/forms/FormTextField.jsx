import { Box, InputAdornment, TextField } from '@mui/material';
import RequiredLabel from '../common/RequiredLabel';

export default function FormTextField({
  label,
  required = false,
  startIcon,
  endAdornment,
  error,
  helperText,
  ...props
}) {
  return (
    <Box>
      {label && <RequiredLabel required={required}>{label}</RequiredLabel>}
      <TextField
        fullWidth
        variant="outlined"
        error={Boolean(error)}
        helperText={helperText}
        slotProps={{
          input: {
            startAdornment: startIcon ? (
              <InputAdornment position="start" sx={{ color: 'grey.400', mr: 0 }}>
                {startIcon}
              </InputAdornment>
            ) : undefined,
            endAdornment,
          },
        }}
        {...props}
      />
    </Box>
  );
}
