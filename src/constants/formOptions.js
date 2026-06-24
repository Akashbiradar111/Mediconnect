export const GENDER_OPTIONS = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];

export const BLOOD_GROUP_OPTIONS = [
  { value: 'A+', label: 'A+' },
  { value: 'A-', label: 'A-' },
  { value: 'B+', label: 'B+' },
  { value: 'B-', label: 'B-' },
  { value: 'AB+', label: 'AB+' },
  { value: 'AB-', label: 'AB-' },
  { value: 'O+', label: 'O+' },
  { value: 'O-', label: 'O-' },
];

export const STATE_CITY_MAP = {
  Maharashtra: ['Mumbai', 'Pune', 'Nagpur', 'Nashik', 'Thane'],
  Karnataka: ['Bengaluru', 'Mysuru', 'Mangaluru', 'Hubballi'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Tiruchirappalli'],
  Delhi: ['New Delhi', 'Dwarka', 'Rohini', 'Saket'],
  Gujarat: ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Siliguri'],
  Rajasthan: ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota'],
  Telangana: ['Hyderabad', 'Warangal', 'Nizamabad'],
  'Uttar Pradesh': ['Lucknow', 'Noida', 'Kanpur', 'Varanasi'],
  Kerala: ['Kochi', 'Thiruvananthapuram', 'Kozhikode'],
};

export const STATE_OPTIONS = Object.keys(STATE_CITY_MAP).map((state) => ({
  value: state,
  label: state,
}));

export const getCitiesForState = (state) =>
  (STATE_CITY_MAP[state] ?? []).map((city) => ({ value: city, label: city }));

export const INITIAL_FORM_VALUES = {
  fullName: '',
  dateOfBirth: null,
  phoneNumber: '',
  email: '',
  gender: '',
  bloodGroup: '',
  state: '',
  city: '',
  height: '',
  heightUnit: 'cm',
  weight: '',
  weightUnit: 'kg',
  bloodPressure: '',
  bloodSugar: '',
  physicalActivity: '',
  dietaryPreference: '',
  smokingStatus: '',
  alcoholConsumption: '',
  emergencyContactRelationship: '',
  emergencyContactNumber: '',
  allergies: '',
  allergyTags: [],
  currentMedications: '',
  existingConditions: '',
  conditionTags: [],
  previousSurgeries: '',
};

export const HEIGHT_UNIT_OPTIONS = [
  { value: 'cm', label: 'cm' },
  { value: 'ft', label: 'ft' },
];

export const WEIGHT_UNIT_OPTIONS = [
  { value: 'kg', label: 'kg' },
  { value: 'lb', label: 'lb' },
];

export const PHYSICAL_ACTIVITY_OPTIONS = [
  { value: 'sedentary', label: 'Sedentary' },
  { value: 'lightly-active', label: 'Lightly Active' },
  { value: 'moderately-active', label: 'Moderately Active' },
  { value: 'very-active', label: 'Very Active' },
  { value: 'highly-active', label: 'Highly Active' },
];

export const DIETARY_PREFERENCE_OPTIONS = [
  { value: 'no-preference', label: 'No Preference' },
  { value: 'vegetarian', label: 'Vegetarian' },
  { value: 'vegan', label: 'Vegan' },
  { value: 'eggetarian', label: 'Eggetarian' },
  { value: 'pescatarian', label: 'Pescatarian' },
  { value: 'non-vegetarian', label: 'Non-Vegetarian' },
  { value: 'other', label: 'Other' },
];

export const SMOKING_STATUS_OPTIONS = [
  { value: 'never-smoked', label: 'Never Smoked' },
  { value: 'former-smoker', label: 'Former Smoker' },
  { value: 'occasional-smoker', label: 'Occasional Smoker' },
  { value: 'regular-smoker', label: 'Regular Smoker' },
  { value: 'prefer-not-to-say', label: 'Prefer Not to Say' },
];

export const ALCOHOL_CONSUMPTION_OPTIONS = [
  { value: 'never', label: 'Never' },
  { value: 'occasionally', label: 'Occasionally' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'weekly', label: 'Weekly' },
  { value: 'frequently', label: 'Frequently' },
  { value: 'prefer-not-to-say', label: 'Prefer Not to Say' },
];

export const EMERGENCY_RELATIONSHIP_OPTIONS = [
  { value: 'parent', label: 'Parent' },
  { value: 'spouse', label: 'Spouse' },
  { value: 'sibling', label: 'Sibling' },
  { value: 'child', label: 'Child' },
  { value: 'relative', label: 'Relative' },
  { value: 'friend', label: 'Friend' },
  { value: 'caregiver', label: 'Caregiver' },
  { value: 'guardian', label: 'Guardian' },
  { value: 'other', label: 'Other' },
];
