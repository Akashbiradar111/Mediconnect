import { useCallback, useEffect, useRef, useState } from 'react';
import { useFormikContext } from 'formik';
import { Box } from '@mui/material';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import BadgeOutlinedIcon from '@mui/icons-material/BadgeOutlined';
import FormSelect from '../forms/FormSelect';
import FormTextField from '../forms/FormTextField';
import FileUploadDropzone from '../forms/FileUploadDropzone';
import UploadedFileCard from '../forms/UploadedFileCard';
import { INSURANCE_PROVIDER_OPTIONS } from '../../constants/formOptions';

const getDefaultTitle = (file) => {
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return baseName || 'Insurance';
};

export default function InsuranceInformationStep() {
  const { values, handleChange, handleBlur } = useFormikContext();
  const [uploadedFile, setUploadedFile] = useState(null);
  const [fileTitle, setFileTitle] = useState('Insurance');
  const [uploadStatus, setUploadStatus] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const progressIntervalRef = useRef(null);

  const clearProgressInterval = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  }, []);

  const startUpload = useCallback(() => {
      clearProgressInterval();
      setUploadStatus('uploading');
      setUploadProgress(0);

      let currentProgress = 0;
      progressIntervalRef.current = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 12) + 8;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearProgressInterval();
          setUploadProgress(100);
          setTimeout(() => {
            setUploadStatus('uploaded');
          }, 300);
        } else {
          setUploadProgress(currentProgress);
        }
      }, 400);
  }, [clearProgressInterval]);

  useEffect(() => () => clearProgressInterval(), [clearProgressInterval]);

  const handleFileSelect = (file) => {
    setUploadedFile(file);
    setFileTitle(getDefaultTitle(file));
    setUploadStatus('queued');

    setTimeout(() => {
      startUpload();
    }, 800);
  };

  const handleCancel = () => {
    clearProgressInterval();
    setUploadedFile(null);
    setUploadStatus(null);
    setUploadProgress(0);
  };

  const handleDelete = () => {
    clearProgressInterval();
    setUploadedFile(null);
    setUploadStatus(null);
    setUploadProgress(0);
  };

  const handleRetry = () => {
    if (uploadedFile) {
      startUpload();
    }
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
      <FormSelect
        name="insuranceProvider"
        label="Insurance Provider"
        placeholder="Select insurance provider (Optional)"
        options={INSURANCE_PROVIDER_OPTIONS}
        value={values.insuranceProvider}
        onChange={handleChange}
        onBlur={handleBlur}
        startIcon={<BusinessOutlinedIcon sx={{ fontSize: 20 }} />}
      />

      <FormTextField
        name="policyNumber"
        label="Customer ID / Policy Number"
        placeholder="Enter Customer ID or Policy Number (Optional)"
        value={values.policyNumber}
        onChange={handleChange}
        onBlur={handleBlur}
        startIcon={<BadgeOutlinedIcon sx={{ fontSize: 20 }} />}
      />

      <Box>
        <FileUploadDropzone
          label="Upload Insurance Card (Optional)"
          onFileSelect={handleFileSelect}
        />

        {uploadedFile && uploadStatus && (
          <Box sx={{ mt: 2 }}>
            <UploadedFileCard
              file={uploadedFile}
              title={fileTitle}
              status={uploadStatus}
              progress={uploadProgress}
              onTitleChange={setFileTitle}
              onCancel={handleCancel}
              onDelete={handleDelete}
              onRetry={handleRetry}
            />
          </Box>
        )}
      </Box>
    </Box>
  );
}
