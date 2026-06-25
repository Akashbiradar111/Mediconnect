import { Box, FormHelperText, InputAdornment, MenuItem, Select } from '@mui/material';
import RequiredLabel from '../common/RequiredLabel';

export default function FormSelect({
  label,
  required = false,
  startIcon,
  options = [],
  placeholder,
  error,
  helperText,
  value,
  onChange,
  onBlur,
  name,
  disabled = false,
}) {
  return (
    <Box>
      {label && <RequiredLabel required={required}>{label}</RequiredLabel>}
      <Select
        fullWidth
        displayEmpty
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
        error={Boolean(error)}
        renderValue={(selected) => {
          if (!selected) {
            return (
              <Box component="span" sx={{ color: 'grey.400' }}>
                {placeholder}
              </Box>
            );
          }
          return options.find((opt) => opt.value === selected)?.label ?? selected;
        }}
        startAdornment={
          startIcon ? (
            <InputAdornment position="start" sx={{ color: 'grey.400', mr: 1 }}>
              {startIcon}
            </InputAdornment>
          ) : undefined
        }
      >
        {options.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {helperText && (
        <FormHelperText error={Boolean(error)}>{helperText}</FormHelperText>
      )}
    </Box>
  );
}
