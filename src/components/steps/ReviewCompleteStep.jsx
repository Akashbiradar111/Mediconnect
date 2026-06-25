import { useCallback, useEffect, useRef, useState } from 'react';
import { useFormikContext } from 'formik';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import AutorenewOutlinedIcon from '@mui/icons-material/AutorenewOutlined';
import WarningAmberOutlinedIcon from '@mui/icons-material/WarningAmberOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import RequiredLabel from '../common/RequiredLabel';

const PATIENT_ID_LENGTH = 6;
const ERROR_COLOR = '#EF4444';
const TAKEN_SUFFIXES = new Set(['TAKEN1', 'ABC123']);

const PASSWORD_REQUIREMENTS = [
  { key: 'length', label: 'At least 8 Characters', test: (p) => p.length >= 8 },
  { key: 'lowercase', label: 'At least one small letter', test: (p) => /[a-z]/.test(p) },
  { key: 'uppercase', label: 'At least one capital letter', test: (p) => /[A-Z]/.test(p) },
  {
    key: 'numberOrSymbol',
    label: 'At least one number or symbol',
    test: (p) => /[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(p),
  },
];

const generateSuffix = () => {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  return Array.from({ length: PATIENT_ID_LENGTH }, () =>
    chars[Math.floor(Math.random() * chars.length)]
  ).join('');
};

const generateSuggestions = (count = 7) =>
  Array.from({ length: count }, () => `PAT-${generateSuffix()}`);

const getPasswordStrength = (password) => {
  const metCount = PASSWORD_REQUIREMENTS.filter((req) => req.test(password)).length;

  if (!password) {
    return { label: 'Weak', color: '#F97316', width: '12%' };
  }
  if (metCount <= 2) {
    return { label: 'Weak', color: '#F97316', width: `${Math.max(15, metCount * 12)}%` };
  }
  if (metCount === 3) {
    return { label: 'Good', color: '#EAB308', width: '65%' };
  }
  return { label: 'Very Good', color: '#008060', width: '100%' };
};

const checkIdAvailability = (suffix) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(!TAKEN_SUFFIXES.has(suffix.toUpperCase())), 300);
  });

function PatientIdInput({ label, suffix, onSuffixChange, availability, touched, error }) {
  const isError = availability === 'taken' || Boolean(touched && error);
  const isAvailable = availability === 'available' && !isError;

  const prefixBg = isError ? '#EF4444' : isAvailable ? '#008060' : '#F3F4F6';
  const prefixColor = isError || isAvailable ? '#FFFFFF' : '#111827';
  const containerBorder = isError
    ? '1px solid #EF4444'
    : isAvailable
      ? '1px solid #008060'
      : '1px solid #E5E7EB';

  const handleSuffixInputChange = (event) => {
    const next = event.target.value
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, PATIENT_ID_LENGTH);
    onSuffixChange(next);
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData('text')
      .toUpperCase()
      .replace(/[^A-Z0-9]/g, '')
      .slice(0, PATIENT_ID_LENGTH);
    if (pasted) onSuffixChange(pasted);
  };

  return (
    <Box>
      <RequiredLabel>{label}</RequiredLabel>
      <Box
        sx={{
          display: 'inline-flex',
          width: 'fit-content',
          maxWidth: '100%',
          border: containerBorder,
          borderRadius: '10px',
          overflow: 'hidden',
          bgcolor: '#FFFFFF',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 48,
            height: 44,
            flexShrink: 0,
            bgcolor: prefixBg,
            color: prefixColor,
            fontWeight: 700,
            fontSize: '0.8125rem',
            letterSpacing: '0.02em',
          }}
        >
          PAT
        </Box>
        <Box
          component="input"
          value={suffix}
          onChange={handleSuffixInputChange}
          onPaste={handlePaste}
          maxLength={PATIENT_ID_LENGTH}
          aria-label="Patient ID suffix"
          sx={{
            width: 196,
            maxWidth: 'calc(100vw - 120px)',
            height: 44,
            border: 'none',
            borderLeft: '1px solid #E5E7EB',
            outline: 'none',
            bgcolor: '#FFFFFF',
            color: '#111827',
            fontSize: '0.875rem',
            fontWeight: 500,
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            pl: 1.75,
            pr: 1.5,
            boxSizing: 'border-box',
          }}
        />
      </Box>
    </Box>
  );
}

function PasswordField({ label, name, value, onChange, onBlur, error, helperText, showPassword, onToggle }) {
  return (
    <Box>
      <RequiredLabel>{label}</RequiredLabel>
      <TextField
        fullWidth
        name={name}
        type={showPassword ? 'text' : 'password'}
        placeholder={name === 'password' ? 'Enter your new password' : 'Enter your password again'}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={Boolean(error)}
        helperText={helperText}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start" sx={{ color: '#9CA3AF', mr: 0 }}>
                <LockOutlinedIcon sx={{ fontSize: 20 }} />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={onToggle}
                  edge="end"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                  sx={{ color: '#9CA3AF' }}
                >
                  {showPassword ? (
                    <VisibilityOutlinedIcon sx={{ fontSize: 20 }} />
                  ) : (
                    <VisibilityOffOutlinedIcon sx={{ fontSize: 20 }} />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: '10px',
          },
        }}
      />
    </Box>
  );
}

export default function ReviewCompleteStep() {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldTouched, setFieldError } =
    useFormikContext();

  const [suggestions, setSuggestions] = useState(() => generateSuggestions());
  const [availability, setAvailability] = useState('unknown');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const checkTimeoutRef = useRef(null);
  const hasInteractedWithIdRef = useRef(false);

  const suffix = values.patientIdSuffix || '';
  const password = values.password || '';
  const confirmPassword = values.confirmPassword || '';
  const strength = getPasswordStrength(password);
  const hasPasswordInput = password.length > 0;

  const checkAvailability = useCallback(async (idSuffix) => {
    if (idSuffix.length !== PATIENT_ID_LENGTH) {
      setAvailability('unknown');
      return;
    }
    const isAvailable = await checkIdAvailability(idSuffix);
    setAvailability(isAvailable ? 'available' : 'taken');
    if (!isAvailable) {
      setFieldError('patientIdSuffix', 'This ID is already taken');
      setFieldTouched('patientIdSuffix', true, false);
    } else {
      setFieldError('patientIdSuffix', undefined);
    }
  }, [setFieldError, setFieldTouched]);

  useEffect(() => {
    if (!hasInteractedWithIdRef.current) return undefined;

    if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    checkTimeoutRef.current = setTimeout(() => {
      checkAvailability(suffix);
    }, 400);
    return () => {
      if (checkTimeoutRef.current) clearTimeout(checkTimeoutRef.current);
    };
  }, [suffix, checkAvailability]);

  useEffect(() => {
    if (password && suffix.length === PATIENT_ID_LENGTH && availability === 'unknown') {
      checkAvailability(suffix);
    }
  }, [password, suffix, availability, checkAvailability]);

  const handleSuffixChange = (nextSuffix) => {
    hasInteractedWithIdRef.current = true;
    setFieldValue('patientIdSuffix', nextSuffix);
    setFieldTouched('patientIdSuffix', true, false);
  };

  const handleSuggestionClick = (suggestion) => {
    hasInteractedWithIdRef.current = true;
    const idSuffix = suggestion.replace(/^PAT-?/i, '').slice(0, PATIENT_ID_LENGTH);
    handleSuffixChange(idSuffix);
  };

  const handleRefreshSuggestions = () => {
    setSuggestions(generateSuggestions());
  };

  const patientIdError =
    availability === 'taken'
      ? 'This ID is already taken'
      : touched.patientIdSuffix && errors.patientIdSuffix
        ? errors.patientIdSuffix
        : null;

  const confirmError =
    touched.confirmPassword && errors.confirmPassword ? errors.confirmPassword : null;

  const showFilledIdCopy =
    availability === 'available' && suffix.length === PATIENT_ID_LENGTH && !patientIdError;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2.5, sm: 3, md: 4 },
        maxWidth: '100%',
      }}
    >
      <Box>
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#111827',
            lineHeight: '24px',
            mb: 0.5,
          }}
        >
          Create Your Unique Patient ID
        </Typography>
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 400,
            color: '#666666',
            lineHeight: '20px',
            mb: 2,
            whiteSpace: 'pre-line',
          }}
        >
          {showFilledIdCopy
            ? 'Your MediConnect ID is a unique username that lets you\nsecurely sign in and access appointments, reports,\nprescriptions, and healthcare services.'
            : 'This ID will be used to access your health records and\nservices securely'}
        </Typography>

        <PatientIdInput
          label={showFilledIdCopy ? 'MediConnect ID' : 'Patient Unique ID'}
          suffix={suffix}
          onSuffixChange={handleSuffixChange}
          availability={availability}
          touched={touched.patientIdSuffix}
          error={patientIdError}
        />

        <Box sx={{ mt: 1.25, minHeight: 22 }}>
          {patientIdError ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <WarningAmberOutlinedIcon sx={{ fontSize: 16, color: '#EF4444', fill: '#EF4444' }} />
              <Typography sx={{ fontSize: '0.8125rem', color: '#EF4444', lineHeight: '18px', opacity: 1 }}>
                {patientIdError}
              </Typography>
            </Box>
          ) : availability === 'available' && suffix.length === PATIENT_ID_LENGTH ? (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <CheckCircleIcon sx={{ fontSize: 16, color: '#008060' }} />
              <Typography sx={{ fontSize: '0.8125rem', color: '#008060', lineHeight: '18px' }}>
                PAT-{suffix.toUpperCase()} is available
              </Typography>
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.75 }}>
              <WarningAmberOutlinedIcon sx={{ fontSize: 16, color: '#9CA3AF' }} />
              <Typography sx={{ fontSize: '0.8125rem', color: '#9CA3AF', lineHeight: '18px' }}>
                This is auto generated ID, you can select your own ID
              </Typography>
            </Box>
          )}
        </Box>

        <Box sx={{ mt: 2.5 }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              mb: 1.25,
            }}
          >
            <Typography
              sx={{
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#374151',
                lineHeight: '20px',
              }}
            >
              Suggestions
            </Typography>
            <Box
              component="button"
              type="button"
              onClick={handleRefreshSuggestions}
              sx={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 0.75,
                border: 'none',
                bgcolor: 'transparent',
                color: '#008060',
                fontSize: '0.8125rem',
                fontWeight: 600,
                cursor: 'pointer',
                p: 0,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              <AutorenewOutlinedIcon sx={{ fontSize: 16 }} />
              Refresh
            </Box>
          </Box>
          <Box
            sx={{
              display: 'flex',
              flexWrap: { xs: 'nowrap', sm: 'wrap' },
              gap: 1,
              overflowX: { xs: 'auto', sm: 'visible' },
              pb: { xs: 0.5, sm: 0 },
              '&::-webkit-scrollbar': { height: 4 },
              '&::-webkit-scrollbar-thumb': { bgcolor: '#D1D5DB', borderRadius: 2 },
            }}
          >
            {suggestions.map((suggestion) => (
              <Box
                key={suggestion}
                component="button"
                type="button"
                onClick={() => handleSuggestionClick(suggestion)}
                sx={{
                  px: 1.5,
                  py: 0.875,
                  border: '1px solid',
                  borderColor: '#E5E7EB',
                  borderRadius: '8px',
                  bgcolor: '#FFFFFF',
                  color: '#374151',
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  lineHeight: '18px',
                  flexShrink: 0,
                  whiteSpace: 'nowrap',
                  '&:hover': {
                    borderColor: '#008060',
                    bgcolor: '#F0FAF7',
                  },
                }}
              >
                {suggestion}
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: '1rem',
            fontWeight: 600,
            color: '#111827',
            lineHeight: '24px',
            mb: 0.5,
          }}
        >
          Create a strong password
        </Typography>
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 400,
            color: '#666666',
            lineHeight: '20px',
            mb: 2,
            whiteSpace: 'pre-line',
          }}
        >
          Create a strong password with a mix of letters, numbers and{'\n'}symbols
        </Typography>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
            gap: { xs: 2.5, md: 4 },
            alignItems: 'start',
          }}
        >
          <Box>
            <PasswordField
              label="Create New Password"
              name="password"
              value={password}
              onChange={handleChange}
              onBlur={handleBlur}
              showPassword={showPassword}
              onToggle={() => setShowPassword((prev) => !prev)}
            />

            <Box sx={{ mt: 1.5 }}>
              <Box
                sx={{
                  height: 6,
                  borderRadius: '4px',
                  bgcolor: '#E5E7EB',
                  overflow: 'hidden',
                  mb: 0.75,
                }}
              >
                <Box
                  sx={{
                    height: '100%',
                    width: strength.width,
                    bgcolor: strength.color,
                    borderRadius: '4px',
                    transition: 'width 0.2s ease, background-color 0.2s ease',
                  }}
                />
              </Box>
              <Typography
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: strength.color,
                  lineHeight: '18px',
                }}
              >
                {strength.label}
              </Typography>
            </Box>

            <Box sx={{ mt: 2 }}>
              <Typography
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: 600,
                  color: '#374151',
                  lineHeight: '18px',
                  mb: 1.25,
                }}
              >
                Should Contain:
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {PASSWORD_REQUIREMENTS.map((req) => {
                  const met = req.test(password);
                  const showError = hasPasswordInput && !met;

                  let icon;
                  let textColor;

                  if (showError) {
                    icon = <CancelOutlinedIcon sx={{ fontSize: 18, color: '#EF4444' }} />;
                    textColor = '#EF4444';
                  } else if (met && hasPasswordInput) {
                    icon = <CheckCircleIcon sx={{ fontSize: 18, color: '#008060' }} />;
                    textColor = '#374151';
                  } else {
                    icon = <CheckCircleOutlinedIcon sx={{ fontSize: 18, color: '#9CA3AF' }} />;
                    textColor = '#9CA3AF';
                  }

                  return (
                    <Box key={req.key} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {icon}
                      <Typography
                        sx={{
                          fontSize: '0.8125rem',
                          fontWeight: 500,
                          color: textColor,
                          lineHeight: '18px',
                        }}
                      >
                        {req.label}
                      </Typography>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          </Box>

          <PasswordField
            label="Confirm Password"
            name="confirmPassword"
            value={confirmPassword}
            onChange={handleChange}
            onBlur={handleBlur}
            error={confirmError}
            helperText={confirmError}
            showPassword={showConfirmPassword}
            onToggle={() => setShowConfirmPassword((prev) => !prev)}
          />
        </Box>
      </Box>
    </Box>
  );
}
