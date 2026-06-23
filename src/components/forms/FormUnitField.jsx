import { Box, InputAdornment, MenuItem, Select, TextField } from '@mui/material';
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import RequiredLabel from '../common/RequiredLabel';

function UnitSelector({ options, value, onChange }) {
  return (
    <Select
      value={value}
      onChange={onChange}
      variant="standard"
      disableUnderline
      IconComponent={() => null}
      MenuProps={{
        PaperProps: {
          sx: {
            borderRadius: '10px',
            mt: 0.5,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          },
        },
      }}
      sx={{
        minWidth: 'auto',
        '& .MuiSelect-select': {
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          py: 0,
          pr: '8px !important',
        },
      }}
      renderValue={(selected) => (
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Box
            sx={{
              width: 24,
              height: 24,
              borderRadius: '50%',
              bgcolor: '#F3F4F6',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            <KeyboardArrowDownOutlinedIcon sx={{ fontSize: 16, color: '#6B7280' }} />
          </Box>
          <Box component="span" sx={{ fontSize: '0.875rem', color: '#111827', fontWeight: 400 }}>
            {selected}
          </Box>
        </Box>
      )}
    >
      {options.map((option) => (
        <MenuItem key={option.value} value={option.value} sx={{ fontSize: '0.875rem' }}>
          {option.label}
        </MenuItem>
      ))}
    </Select>
  );
}

export default function FormUnitField({
  label,
  required = false,
  startIcon,
  unit,
  unitOptions,
  unitValue,
  onUnitChange,
  error,
  helperText,
  ...props
}) {
  const endAdornment = unitOptions?.length ? (
    <InputAdornment position="end">
      <UnitSelector options={unitOptions} value={unitValue} onChange={onUnitChange} />
    </InputAdornment>
  ) : unit ? (
    <InputAdornment position="end">
      <Box component="span" sx={{ fontSize: '0.875rem', color: '#6B7280', pr: 0.5 }}>
        {unit}
      </Box>
    </InputAdornment>
  ) : undefined;

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
