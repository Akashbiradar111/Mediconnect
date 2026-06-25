import { useMemo } from 'react';
import { Box, Typography } from '@mui/material';
import { useFormikContext } from 'formik';
import {
  FullNameIcon,
  DateOfBirthIcon,
  PhoneNumberIcon,
  EmailAddressIcon,
  GenderIcon,
  BloodGroupIcon,
  LocationIcon,
} from '../icons/PersonalInformationFieldIcons';
import FormTextField from '../forms/FormTextField';
import FormSelect from '../forms/FormSelect';
import FormDatePicker from '../forms/FormDatePicker';
import ValidationBanner from '../common/ValidationBanner';
import {
  GENDER_OPTIONS,
  BLOOD_GROUP_OPTIONS,
  STATE_OPTIONS,
  getCitiesForState,
} from '../../constants/formOptions';
import { REQUIRED_FIELD_KEYS } from '../../validation/schemas';

export default function PersonalInformationStep({ showValidationBanner }) {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue, setFieldTouched } =
    useFormikContext();

  const cityOptions = useMemo(
    () => getCitiesForState(values.state),
    [values.state],
  );

  const handleStateChange = (event) => {
    handleChange(event);
    setFieldValue('city', '');
  };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        gap: { xs: 2.5, sm: 3, md: 4 },
      }}
    >
      <FormTextField
        name="fullName"
        label="Full Name"
        required
        placeholder="Enter your full name"
        value={values.fullName}
        onChange={handleChange}
        onBlur={handleBlur}
        startIcon={<FullNameIcon sx={{ fontSize: 22 }} />}
        error={touched.fullName && Boolean(errors.fullName)}
        helperText={touched.fullName && errors.fullName}
      />

      <FormDatePicker
        label="Date of Birth"
        required
        value={values.dateOfBirth}
        onChange={(date) => setFieldValue('dateOfBirth', date)}
        onBlur={() => setFieldTouched('dateOfBirth', true)}
        startIcon={<DateOfBirthIcon sx={{ fontSize: 22 }} />}
        error={touched.dateOfBirth && Boolean(errors.dateOfBirth)}
        helperText={touched.dateOfBirth && errors.dateOfBirth}
      />

      <FormTextField
        name="phoneNumber"
        label="Phone Number"
        placeholder="+91 9876 543 210"
        value={values.phoneNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        startIcon={<PhoneNumberIcon sx={{ fontSize: 22 }} />}
        error={touched.phoneNumber && Boolean(errors.phoneNumber)}
        helperText={touched.phoneNumber && errors.phoneNumber}
      />

      <FormTextField
        name="email"
        label="Email Address"
        placeholder="Enter your email (optional)"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        startIcon={<EmailAddressIcon sx={{ fontSize: 22 }} />}
        error={touched.email && Boolean(errors.email)}
        helperText={touched.email && errors.email}
      />

      <FormSelect
        name="gender"
        label="Gender"
        required
        placeholder="Select your gender"
        options={GENDER_OPTIONS}
        value={values.gender}
        onChange={handleChange}
        onBlur={handleBlur}
        startIcon={<GenderIcon sx={{ fontSize: 22 }} />}
        error={touched.gender && Boolean(errors.gender)}
        helperText={touched.gender && errors.gender}
      />

      <FormSelect
        name="bloodGroup"
        label="Blood Group"
        required
        placeholder="Select your blood group"
        options={BLOOD_GROUP_OPTIONS}
        value={values.bloodGroup}
        onChange={handleChange}
        onBlur={handleBlur}
        startIcon={<BloodGroupIcon sx={{ fontSize: 22 }} />}
        error={touched.bloodGroup && Boolean(errors.bloodGroup)}
        helperText={touched.bloodGroup && errors.bloodGroup}
      />

      <Box>
        <FormSelect
          name="state"
          label="State"
          required
          placeholder="Select state"
          options={STATE_OPTIONS}
          value={values.state}
          onChange={handleStateChange}
          onBlur={handleBlur}
          startIcon={<LocationIcon sx={{ fontSize: 22 }} />}
          error={touched.state && Boolean(errors.state)}
          helperText={touched.state && errors.state}
        />

        <Box
          sx={{
            mt: 1,
            bgcolor: '#F9FAFB',
            border: '1px solid #E5E7EB',
            borderRadius: '10px',
            px: '12px',
            py: '8px',
          }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              lineHeight: '24px',
              fontWeight: 400,
              color: '#111827',
            }}
          >
            <Box component="span" sx={{ color: '#EF4444' }}>
              *{' '}
            </Box>
            These fields are required!
          </Typography>
        </Box>
      </Box>

      <FormSelect
        name="city"
        label="Current City"
        required
        placeholder="Select your current city"
        options={cityOptions}
        value={values.city}
        onChange={handleChange}
        onBlur={handleBlur}
        disabled={!values.state}
        startIcon={<LocationIcon sx={{ fontSize: 22 }} />}
        error={touched.city && Boolean(errors.city)}
        helperText={touched.city && errors.city}
      />

      <ValidationBanner
        show={
          showValidationBanner &&
          REQUIRED_FIELD_KEYS.some((key) => touched[key] && errors[key])
        }
      />
    </Box>
  );
}
