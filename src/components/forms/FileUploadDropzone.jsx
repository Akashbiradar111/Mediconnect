import { useRef, useState } from 'react';
import { Box, Link, Typography } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RequiredLabel from '../common/RequiredLabel';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const ACCEPTED_EXTENSIONS = '.jpg,.jpeg,.png,.pdf';
const MAX_FILE_SIZE = 5 * 1024 * 1024;

export default function FileUploadDropzone({ label, onFileSelect, error }) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState('');

  const validateAndSelect = (file) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setLocalError('Only JPG, PNG or PDF files are allowed.');
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setLocalError('File size must be 5MB or less.');
      return;
    }

    setLocalError('');
    onFileSelect(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files?.[0];
    validateAndSelect(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (event) => {
    event.preventDefault();
    setIsDragging(false);
  };

  const handleBrowse = () => {
    inputRef.current?.click();
  };

  const handleInputChange = (event) => {
    const file = event.target.files?.[0];
    validateAndSelect(file);
    event.target.value = '';
  };

  const displayError = error || localError;

  return (
    <Box>
      {label && <RequiredLabel>{label}</RequiredLabel>}

      <Box
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        sx={{
          border: '1px dashed',
          borderColor: isDragging ? '#008060' : '#D1D5DB',
          borderRadius: '10px',
          bgcolor: isDragging ? '#F0FAF7' : '#FAFAFA',
          py: 6,
          px: 3,
          minHeight: 180,
          textAlign: 'center',
          cursor: 'pointer',
          transition: 'border-color 0.2s, background-color 0.2s',
        }}
        onClick={handleBrowse}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />

        <CloudUploadOutlinedIcon
          sx={{
            fontSize: 40,
            color: '#9CA3AF',
            mb: 1.5,
          }}
        />

        <Typography
          sx={{
            fontSize: '0.875rem',
            color: '#6B7280',
            lineHeight: '20px',
            mb: 0.5,
          }}
        >
          Drag and drop your health records here, or{' '}
          <Link
            component="span"
            underline="always"
            onClick={(event) => {
              event.stopPropagation();
              handleBrowse();
            }}
            sx={{
              color: '#00796B',
              fontWeight: 500,
              cursor: 'pointer',
              textDecorationColor: '#00796B',
            }}
          >
            browse
          </Link>
        </Typography>

        <Typography
          sx={{
            fontSize: '0.75rem',
            color: '#9CA3AF',
            lineHeight: '16px',
          }}
        >
          JPG, PNG or PDF (Max. 5MB)
        </Typography>
      </Box>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 1,
          mt: 1.5,
          px: 1.5,
          py: 1.25,
          bgcolor: '#F9FAFB',
          border: '1px solid',
          borderColor: '#E5E7EB',
          borderRadius: '8px',
        }}
      >
        <InfoOutlinedIcon sx={{ fontSize: 16, color: '#9CA3AF', flexShrink: 0 }} />
        <Typography
          sx={{
            fontSize: '0.8125rem',
            color: '#6B7280',
            lineHeight: '18px',
          }}
        >
          Make sure the card is clear and all details are visible
        </Typography>
      </Box>

      {displayError && (
        <Typography
          sx={{
            fontSize: '0.75rem',
            color: '#EF4444',
            mt: 1,
          }}
        >
          {displayError}
        </Typography>
      )}
    </Box>
  );
}
