import { useFormikContext } from 'formik';
import { Box } from '@mui/material';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import FormUnitField from '../forms/FormUnitField';
import FormSelect from '../forms/FormSelect';
import FormTextField from '../forms/FormTextField';
import {
  HEIGHT_UNIT_OPTIONS,
  WEIGHT_UNIT_OPTIONS,
  PHYSICAL_ACTIVITY_OPTIONS,
  DIETARY_PREFERENCE_OPTIONS,
  SMOKING_STATUS_OPTIONS,
  ALCOHOL_CONSUMPTION_OPTIONS,
  EMERGENCY_RELATIONSHIP_OPTIONS,
} from '../../constants/formOptions';

export default function AdditionalInformationStep() {
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } = useFormikContext();

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
        gap: { xs: 2.5, sm: 3 },
      }}
    >
      <FormUnitField
        name="height"
        label="Height"
        type="number"
        value={values.height}
        onChange={handleChange}
        onBlur={handleBlur}
        unitOptions={HEIGHT_UNIT_OPTIONS}
        unitValue={values.heightUnit}
        onUnitChange={(e) => setFieldValue('heightUnit', e.target.value)}
        error={touched.height && Boolean(errors.height)}
        helperText={touched.height && errors.height}
        sx={{
          '& input[type=number]': {
            MozAppearance: 'textfield',
          },
          '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
            {
              WebkitAppearance: 'none',
              margin: 0,
            },
        }}
      />

      <FormUnitField
        name="weight"
        label="Weight"
        type="number"
        value={values.weight}
        onChange={handleChange}
        onBlur={handleBlur}
        unitOptions={WEIGHT_UNIT_OPTIONS}
        unitValue={values.weightUnit}
        onUnitChange={(e) => setFieldValue('weightUnit', e.target.value)}
        error={touched.weight && Boolean(errors.weight)}
        helperText={touched.weight && errors.weight}
        sx={{
          '& input[type=number]': {
            MozAppearance: 'textfield',
          },
          '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
            {
              WebkitAppearance: 'none',
              margin: 0,
            },
        }}
      />

      <FormUnitField
        name="bloodPressure"
        label="Blood Pressure (If Known)"
        placeholder="120/80"
        value={values.bloodPressure}
        onChange={handleChange}
        onBlur={handleBlur}
        unit="mmHg"
        error={touched.bloodPressure && Boolean(errors.bloodPressure)}
        helperText={touched.bloodPressure && errors.bloodPressure}
      />

      <FormUnitField
        name="bloodSugar"
        label="Blood Sugar (If Known)"
        type="number"
        value={values.bloodSugar}
        onChange={handleChange}
        onBlur={handleBlur}
        unit="mg/dL"
        error={touched.bloodSugar && Boolean(errors.bloodSugar)}
        helperText={touched.bloodSugar && errors.bloodSugar}
        sx={{
          '& input[type=number]': {
            MozAppearance: 'textfield',
          },
          '& input[type=number]::-webkit-outer-spin-button, & input[type=number]::-webkit-inner-spin-button':
            {
              WebkitAppearance: 'none',
              margin: 0,
            },
        }}
      />

      <FormSelect
        name="physicalActivity"
        label="Physical Activity Level"
        placeholder="Select activity level"
        options={PHYSICAL_ACTIVITY_OPTIONS}
        value={values.physicalActivity}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.physicalActivity && Boolean(errors.physicalActivity)}
        helperText={touched.physicalActivity && errors.physicalActivity}
      />

      <FormSelect
        name="dietaryPreference"
        label="Dietary Preference"
        placeholder="Select dietary preference"
        options={DIETARY_PREFERENCE_OPTIONS}
        value={values.dietaryPreference}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.dietaryPreference && Boolean(errors.dietaryPreference)}
        helperText={touched.dietaryPreference && errors.dietaryPreference}
      />

      <FormSelect
        name="smokingStatus"
        label="Smoking Status"
        placeholder="Select smoking status"
        options={SMOKING_STATUS_OPTIONS}
        value={values.smokingStatus}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.smokingStatus && Boolean(errors.smokingStatus)}
        helperText={touched.smokingStatus && errors.smokingStatus}
      />

      <FormSelect
        name="alcoholConsumption"
        label="Alcohol Consumption"
        placeholder="Select alcohol consumption"
        options={ALCOHOL_CONSUMPTION_OPTIONS}
        value={values.alcoholConsumption}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.alcoholConsumption && Boolean(errors.alcoholConsumption)}
        helperText={touched.alcoholConsumption && errors.alcoholConsumption}
      />

      <FormSelect
        name="emergencyContactRelationship"
        label="Emergency Contact Relationship"
        required
        placeholder="Select relationship"
        options={EMERGENCY_RELATIONSHIP_OPTIONS}
        value={values.emergencyContactRelationship}
        onChange={handleChange}
        onBlur={handleBlur}
        error={touched.emergencyContactRelationship && Boolean(errors.emergencyContactRelationship)}
        helperText={touched.emergencyContactRelationship && errors.emergencyContactRelationship}
      />

      <FormTextField
        name="emergencyContactNumber"
        label="Emergency Contact Number"
        required
        placeholder="+91 98765 43210"
        value={values.emergencyContactNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        startIcon={<PhoneOutlinedIcon sx={{ fontSize: 20 }} />}
        error={touched.emergencyContactNumber && Boolean(errors.emergencyContactNumber)}
        helperText={touched.emergencyContactNumber && errors.emergencyContactNumber}
      />
    </Box>
  );
}
