import { useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { Formik } from 'formik';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import RegistrationLayout from '../layouts/RegistrationLayout';
import ContactSupport from '../components/common/ContactSupport';
import StepActionButton from '../components/common/StepActionButton';
import PersonalInformationStep from '../components/steps/PersonalInformationStep';
import AdditionalInformationStep from '../components/steps/AdditionalInformationStep';
import MedicalHistoryStep from '../components/steps/MedicalHistoryStep';
import StepPlaceholder from '../components/steps/StepPlaceholder';
import { REGISTRATION_STEPS } from '../constants/steps';
import { INITIAL_FORM_VALUES } from '../constants/formOptions';
import { STEP_SCHEMAS } from '../validation/schemas';

const renderStepContent = (stepId, submitAttempted) => {
  switch (stepId) {
    case 'personal':
      return <PersonalInformationStep showValidationBanner={submitAttempted} />;
    case 'additional':
      return <AdditionalInformationStep />;
    case 'medical':
      return <MedicalHistoryStep />;
    default:
      return <StepPlaceholder title={REGISTRATION_STEPS.find((s) => s.id === stepId)?.title} />;
  }
};

export default function RegistrationPage() {
  const [activeStep, setActiveStep] = useState(0);
  const [submitAttempted, setSubmitAttempted] = useState(false);

  const currentStep = REGISTRATION_STEPS[activeStep];
  const currentSchema = STEP_SCHEMAS[currentStep.id];

  const handleStepSubmit = async (values, { setTouched, validateForm }) => {
    if (!currentSchema) {
      if (activeStep < REGISTRATION_STEPS.length - 1) {
        setActiveStep((prev) => prev + 1);
      }
      return;
    }

    setSubmitAttempted(true);
    const errors = await validateForm();

    const touchedFields = Object.keys(values).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(touchedFields);

    if (Object.keys(errors).length === 0) {
      setSubmitAttempted(false);
      if (activeStep < REGISTRATION_STEPS.length - 1) {
        setActiveStep((prev) => prev + 1);
      }
    }
  };

  const handleGoBack = () => {
    setSubmitAttempted(false);
    setActiveStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSkip = () => {
    setSubmitAttempted(false);
    if (activeStep < REGISTRATION_STEPS.length - 1) {
      setActiveStep((prev) => prev + 1);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Formik
        initialValues={INITIAL_FORM_VALUES}
        validationSchema={currentSchema}
        onSubmit={handleStepSubmit}
        validateOnChange
        validateOnBlur
        enableReinitialize={false}
      >
        {({ isValid, handleSubmit }) => {
          const isPersonalStep = currentStep.id === 'personal';
          const isSkippableStep =
            currentStep.id === 'additional' || currentStep.id === 'medical';
          const isButtonDisabled = isPersonalStep && !isValid;

          return (
            <RegistrationLayout activeStep={activeStep}>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  minHeight: '100%',
                  px: { xs: 2, sm: 3, md: 4, lg: 6 },
                  py: { xs: 3, md: 4 },
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    justifyContent: 'space-between',
                    alignItems: { xs: 'flex-start', md: 'center' },
                    gap: { xs: 2, md: 3 },
                    mb: { xs: 3, md: 4 },
                    minHeight: { md: 66 },
                  }}
                >
                  <Box>
                    <Typography
                      sx={{
                        fontSize: '1.5rem',
                        fontWeight: 700,
                        color: '#111827',
                        lineHeight: '24px',
                        mb: '4px',
                      }}
                    >
                      {currentStep.title}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: '0.875rem',
                        fontWeight: 400,
                        color: '#666666',
                        lineHeight: '19px',
                        maxWidth: currentStep.id === 'medical' ? 520 : 328,
                        ...(currentStep.id === 'medical' && { whiteSpace: 'pre-line' }),
                      }}
                    >
                      {currentStep.subtitle}
                    </Typography>
                  </Box>
                  <ContactSupport />
                </Box>

                <Box sx={{ flex: 1 }}>
                  {renderStepContent(currentStep.id, submitAttempted)}
                </Box>

                {isSkippableStep ? (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: { xs: 'column', sm: 'row' },
                      justifyContent: 'space-between',
                      alignItems: { xs: 'stretch', sm: 'center' },
                      gap: 2,
                      pt: { xs: 3, md: 4 },
                      mt: 'auto',
                    }}
                  >
                    <Button
                      type="button"
                      onClick={handleSkip}
                      sx={{
                        alignSelf: { xs: 'stretch', sm: 'flex-start' },
                        px: 3,
                        py: 1.25,
                        bgcolor: '#E6F4F0',
                        color: '#007955',
                        fontWeight: 600,
                        fontSize: '0.9375rem',
                        borderRadius: '10px',
                        textTransform: 'none',
                        boxShadow: 'none',
                        '&:hover': {
                          bgcolor: '#D8EDE6',
                          boxShadow: 'none',
                        },
                      }}
                    >
                      Skip for now
                    </Button>

                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        justifyContent: { xs: 'space-between', sm: 'flex-end' },
                      }}
                    >
                      <Button
                        type="button"
                        onClick={handleGoBack}
                        sx={{
                          color: '#111827',
                          fontWeight: 500,
                          fontSize: '0.9375rem',
                          textTransform: 'none',
                          minWidth: 'auto',
                          px: 1,
                          '&:hover': { bgcolor: 'transparent', textDecoration: 'underline' },
                        }}
                      >
                        Go Back
                      </Button>
                      <StepActionButton>{currentStep.nextButtonLabel}</StepActionButton>
                    </Box>
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'flex-end',
                      pt: { xs: 3, md: 4 },
                      mt: 'auto',
                    }}
                  >
                    <StepActionButton disabled={isButtonDisabled}>
                      {currentStep.nextButtonLabel}
                    </StepActionButton>
                  </Box>
                )}
              </Box>
            </RegistrationLayout>
          );
        }}
      </Formik>
    </LocalizationProvider>
  );
}
