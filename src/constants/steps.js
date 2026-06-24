import {
  PersonalInformationIcon,
  AdditionalInformationIcon,
  MedicalHistoryIcon,
  InsuranceInformationIcon,
  HealthRecordsIcon,
  ReviewCompleteIcon,
} from '../components/icons/SidebarStepIcons';

export const REGISTRATION_STEPS = [
  {
    id: 'personal',
    label: 'Personal Details',
    title: 'Personal Information',
    subtitle:
      'Add your basic information to complete your profile and personalize your healthcare journey.',
    icon: PersonalInformationIcon,
    progress: 10,
    nextButtonLabel: 'Add Additional Information',
  },
  {
    id: 'additional',
    label: 'Additional Information',
    title: 'Additional Information',
    subtitle:
      'Enhance your profile with optional details for a more personalized healthcare journey.',
    icon: AdditionalInformationIcon,
    progress: 30,
    nextButtonLabel: 'Add Medical History',
  },
  {
    id: 'medical',
    label: 'Medical History',
    title: 'Medical History',
    subtitle:
      'Add information about your past treatments,\nmedications, and health conditions.',
    icon: MedicalHistoryIcon,
    progress: 40,
    nextButtonLabel: 'Add Insurance Information',
  },
  {
    id: 'insurance',
    label: 'Insurance Information',
    title: 'Insurance Details',
    subtitle:
      'Add your insurance information for seamless\ncoverage and claims processing.',
    icon: InsuranceInformationIcon,
    progress: 60,
    nextButtonLabel: 'Upload Health Records',
  },
  {
    id: 'records',
    label: 'Health Records',
    title: 'Upload Health Records',
    subtitle:
      'Keep all your medical documents in one secure and\nconvenient place.',
    icon: HealthRecordsIcon,
    progress: 75,
    nextButtonLabel: 'Create Unique ID',
  },
  {
    id: 'review',
    label: 'Review & Complete',
    title: 'Review & Complete',
    subtitle: 'Review your information before submitting your registration.',
    icon: ReviewCompleteIcon,
    progress: 100,
    nextButtonLabel: 'Complete Registration',
  },
];

export const ESTIMATED_TIME = '2-3 Minutes';
