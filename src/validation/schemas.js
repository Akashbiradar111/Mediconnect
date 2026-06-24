import * as Yup from 'yup';
import dayjs from 'dayjs';

const phoneRegex = /^(\+91[\s-]?)?[6-9]\d{9}$/;

export const personalInformationSchema = Yup.object({
  fullName: Yup.string()
    .trim()
    .required('Please enter your full name!')
    .min(2, 'Please enter your full name!'),
  dateOfBirth: Yup.mixed()
    .nullable()
    .required('Please select your date of birth!')
    .test('valid-date', 'Please select your date of birth!', (value) => Boolean(value) && dayjs(value).isValid())
    .test('not-future', 'Date of birth cannot be in the future', (value) => {
      if (!value) return true;
      return dayjs(value).isBefore(dayjs().add(1, 'day'), 'day');
    }),
  phoneNumber: Yup.string()
    .trim()
    .test('phone', 'Enter a valid phone number', (value) => {
      if (!value) return true;
      return phoneRegex.test(value.replace(/\s/g, ''));
    }),
  email: Yup.string()
    .trim()
    .email('Enter a valid email address!'),
  gender: Yup.string().required('Please select your gender!'),
  bloodGroup: Yup.string().required('Please select your blood group!'),
  state: Yup.string().required('Please select your state!'),
  city: Yup.string().required('Please select your current city!'),
});

const emptyToUndefined = (value, originalValue) =>
  originalValue === '' || originalValue === null ? undefined : value;

export const additionalInformationSchema = Yup.object({
  height: Yup.number()
    .transform(emptyToUndefined)
    .nullable()
    .typeError('Height should be between 50 cm and 250 cm.')
    .test('height-range', 'Height should be between 50 cm and 250 cm.', function (value) {
      if (value === undefined || value === null) return true;
      const unit = this.parent.heightUnit || 'cm';
      const heightInCm = unit === 'ft' ? value * 30.48 : value;
      return heightInCm >= 50 && heightInCm <= 250;
    }),
  weight: Yup.number()
    .transform(emptyToUndefined)
    .nullable()
    .typeError('Weight should be between 2 kg and 500 kg.')
    .test('weight-range', 'Weight should be between 2 kg and 500 kg.', function (value) {
      if (value === undefined || value === null) return true;
      const unit = this.parent.weightUnit || 'kg';
      const weightInKg = unit === 'lb' ? value * 0.453592 : value;
      return weightInKg >= 2 && weightInKg <= 500;
    }),
  bloodPressure: Yup.string()
    .trim()
    .test('bp-format', 'Enter blood pressure in the format: 120/80 mmHg.', (value) => {
      if (!value) return true;
      return /^\d{2,3}\/\d{2,3}$/.test(value);
    }),
  bloodSugar: Yup.number()
    .transform(emptyToUndefined)
    .nullable()
    .typeError('Blood sugar cannot be negative.')
    .min(0, 'Blood sugar cannot be negative.'),
  physicalActivity: Yup.string().required('Please select your activity level.'),
  dietaryPreference: Yup.string().required('Please select a valid dietary preference.'),
  smokingStatus: Yup.string().required('Please select a valid smoking status.'),
  alcoholConsumption: Yup.string().required('Please select a valid alcohol consumption preference.'),
  emergencyContactRelationship: Yup.string().required(
    'Please select your relationship with the emergency contact.',
  ),
  emergencyContactNumber: Yup.string()
    .trim()
    .required('Error')
    .test('phone', 'Error', (value) => {
      if (!value) return false;
      return phoneRegex.test(value.replace(/\s/g, ''));
    }),
});

export const reviewCompleteSchema = Yup.object({
  patientIdSuffix: Yup.string()
    .trim()
    .required('Patient ID is required')
    .length(6, 'Patient ID must be 6 characters')
    .matches(/^[A-Za-z0-9]+$/, 'Patient ID must be alphanumeric'),
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[0-9!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/, 'Password must contain a number or symbol'),
  confirmPassword: Yup.string()
    .required('Please confirm your password')
    .oneOf([Yup.ref('password')], 'Confirm password should be same as entered password!'),
});

export const STEP_SCHEMAS = {
  personal: personalInformationSchema,
  additional: additionalInformationSchema,
  review: reviewCompleteSchema,
};

export const REQUIRED_FIELD_KEYS = [
  'fullName',
  'dateOfBirth',
  'gender',
  'bloodGroup',
  'state',
  'city',
];
