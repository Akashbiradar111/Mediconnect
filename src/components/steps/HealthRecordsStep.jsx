import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import MedicationOutlinedIcon from '@mui/icons-material/MedicationOutlined';
import ScienceOutlinedIcon from '@mui/icons-material/ScienceOutlined';
import CropFreeOutlinedIcon from '@mui/icons-material/CropFreeOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import FileUploadDropzone from '../forms/FileUploadDropzone';
import UploadedFileCard from '../forms/UploadedFileCard';

const MAX_FILE_SIZE = 20 * 1024 * 1024;

const SUPPORTED_DOCUMENTS = [
  { icon: MedicationOutlinedIcon, label: 'Prescription' },
  { icon: ScienceOutlinedIcon, label: 'Lab reports' },
  { icon: CropFreeOutlinedIcon, label: 'Scan' },
  { icon: DescriptionOutlinedIcon, label: 'Discharge summary' },
];

const getDefaultTitle = (file) => {
  const baseName = file.name.replace(/\.[^/.]+$/, '');
  return baseName || 'Health Record';
};

let nextFileId = 1;

export default function HealthRecordsStep() {
  const [files, setFiles] = useState([]);
  const progressIntervalsRef = useRef({});

  const clearProgressInterval = useCallback((fileId) => {
    if (progressIntervalsRef.current[fileId]) {
      clearInterval(progressIntervalsRef.current[fileId]);
      delete progressIntervalsRef.current[fileId];
    }
  }, []);

  const clearAllProgressIntervals = useCallback(() => {
    Object.keys(progressIntervalsRef.current).forEach((fileId) => {
      clearProgressInterval(fileId);
    });
  }, [clearProgressInterval]);

  useEffect(() => () => clearAllProgressIntervals(), [clearAllProgressIntervals]);

  const startUpload = useCallback(
    (fileId) => {
      clearProgressInterval(fileId);

      setFiles((prev) =>
        prev.map((entry) =>
          entry.id === fileId ? { ...entry, status: 'uploading', progress: 0 } : entry
        )
      );

      let currentProgress = 0;
      progressIntervalsRef.current[fileId] = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 12) + 8;
        if (currentProgress >= 100) {
          currentProgress = 100;
          clearProgressInterval(fileId);
          setFiles((prev) =>
            prev.map((entry) =>
              entry.id === fileId
                ? { ...entry, progress: 100, status: 'uploaded' }
                : entry
            )
          );
        } else {
          setFiles((prev) =>
            prev.map((entry) =>
              entry.id === fileId ? { ...entry, progress: currentProgress } : entry
            )
          );
        }
      }, 400);
    },
    [clearProgressInterval]
  );

  const handleFileSelect = (file) => {
    const fileId = `upload-${nextFileId++}`;

    setFiles((prev) => [
      ...prev,
      {
        id: fileId,
        file,
        title: getDefaultTitle(file),
        status: 'queued',
        progress: 0,
      },
    ]);

    setTimeout(() => {
      startUpload(fileId);
    }, 800);
  };

  const handleTitleChange = (fileId, title) => {
    setFiles((prev) =>
      prev.map((entry) => (entry.id === fileId ? { ...entry, title } : entry))
    );
  };

  const handleCancel = (fileId) => {
    clearProgressInterval(fileId);
    setFiles((prev) => prev.filter((entry) => entry.id !== fileId));
  };

  const handleDelete = (fileId) => {
    clearProgressInterval(fileId);
    setFiles((prev) => prev.filter((entry) => entry.id !== fileId));
  };

  const handleRetry = (fileId) => {
    startUpload(fileId);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        maxWidth: '100%',
      }}
    >
      <Typography
        sx={{
          fontSize: '0.875rem',
          fontWeight: 500,
          color: '#666666',
          lineHeight: '20px',
          mb: 0.75,
        }}
      >
        Upload your health records
      </Typography>

      <FileUploadDropzone
        maxFileSize={MAX_FILE_SIZE}
        showInfoBanner={false}
        multiple
        minHeight={200}
        browseOnNewLine
        dragText="drag and drop your health records here, or"
        onFileSelect={handleFileSelect}
      />

      <Box sx={{ mt: 2.5 }}>
        <Typography
          sx={{
            fontSize: '0.875rem',
            fontWeight: 600,
            color: '#374151',
            lineHeight: '20px',
            mb: 1.5,
          }}
        >
          Supported Documents
        </Typography>

        <Box
          sx={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'flex-start',
            gap: { xs: 2, sm: 3 },
          }}
        >
          {SUPPORTED_DOCUMENTS.map(({ icon: Icon, label }) => (
            <Box
              key={label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                minWidth: 0,
              }}
            >
              <Icon sx={{ fontSize: 20, color: '#9CA3AF', flexShrink: 0 }} />
              <Typography
                sx={{
                  fontSize: '0.8125rem',
                  fontWeight: 500,
                  color: '#6B7280',
                  lineHeight: '18px',
                }}
              >
                {label}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {files.length > 0 && (
        <Box
          sx={{
            mt: 2.5,
            display: 'flex',
            gap: 2,
            overflowX: 'auto',
            pb: 1,
            mx: -0.5,
            px: 0.5,
            '&::-webkit-scrollbar': {
              height: 6,
            },
            '&::-webkit-scrollbar-track': {
              bgcolor: '#F3F4F6',
              borderRadius: 3,
            },
            '&::-webkit-scrollbar-thumb': {
              bgcolor: '#D1D5DB',
              borderRadius: 3,
            },
          }}
        >
          {files.map((entry) => (
            <Box key={entry.id} sx={{ flexShrink: 0 }}>
              <UploadedFileCard
                file={entry.file}
                title={entry.title}
                status={entry.status}
                progress={entry.progress}
                thumbnailSrc={entry.thumbnailSrc}
                metadataUppercase={false}
                successColor="#111827"
                successLabel="Upload Successful"
                onTitleChange={(title) => handleTitleChange(entry.id, title)}
                onCancel={() => handleCancel(entry.id)}
                onDelete={() => handleDelete(entry.id)}
                onRetry={() => handleRetry(entry.id)}
              />
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
}
