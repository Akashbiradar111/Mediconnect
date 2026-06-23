import { Box, InputAdornment } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import RequiredLabel from '../common/RequiredLabel';

export default function FormDatePicker({
  label,
  required = false,
  startIcon,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  placeholder = 'Select date of birth',
}) {
  const dateValue = value ? dayjs(value) : null;

  return (
    <Box>
      {label && <RequiredLabel required={required}>{label}</RequiredLabel>}
      <DatePicker
        value={dateValue}
        onChange={onChange}
        onClose={onBlur}
        maxDate={dayjs()}
        slotProps={{
          textField: {
            fullWidth: true,
            placeholder,
            error: Boolean(error),
            helperText,
            onBlur,
            slotProps: {
              input: {
                startAdornment: startIcon ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', mr: 1, color: 'grey.400' }}>
                    {startIcon}
                  </Box>
                ) : undefined,
              },
            },
          },
          openPickerIcon: {
            sx: { color: 'grey.400', fontSize: 20 },
          },
        }}
      />
    </Box>
  );
}
