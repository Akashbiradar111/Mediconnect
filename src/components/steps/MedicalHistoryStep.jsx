import { useFormikContext } from 'formik';
import { Box } from '@mui/material';
import FormMedicalTextArea from '../forms/FormMedicalTextArea';

export default function MedicalHistoryStep() {
  const { values, handleChange, handleBlur, setFieldValue } = useFormikContext();

  const addTag = (field, tag) => {
    const trimmed = tag.trim();
    if (!trimmed) return;
    setFieldValue(field, [...values[field], trimmed]);
  };

  const removeTag = (field, index) => {
    setFieldValue(
      field,
      values[field].filter((_, i) => i !== index),
    );
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 2.5, md: 3 },
        maxWidth: '100%',
      }}
    >
      <FormMedicalTextArea
        label="Allergies"
        name="allergies"
        value={values.allergies}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="List any allergies you have (if any)"
        tags={values.allergyTags}
        onAddTag={(tag) => addTag('allergyTags', tag)}
        onRemoveTag={(index) => removeTag('allergyTags', index)}
      />

      <FormMedicalTextArea
        label="Current Medications"
        name="currentMedications"
        value={values.currentMedications}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="List your current medications with dosage"
        maxLength={500}
        showCharCount
      />

      <FormMedicalTextArea
        label="Existing Conditions"
        name="existingConditions"
        value={values.existingConditions}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter any Conditions (e.g., diabetes, hypertension, asthma, etc.)"
        tags={values.conditionTags}
        onAddTag={(tag) => addTag('conditionTags', tag)}
        onRemoveTag={(index) => removeTag('conditionTags', index)}
      />

      <FormMedicalTextArea
        label="Previous Surgeries"
        name="previousSurgeries"
        value={values.previousSurgeries}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Enter details of any past surgeries (if any)"
        maxLength={500}
        showCharCount
      />
    </Box>
  );
}
