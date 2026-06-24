import { useRef, useState } from 'react';
import { Box, Link, Typography } from '@mui/material';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import RequiredLabel from '../common/RequiredLabel';

const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
const ACCEPTED_EXTENSIONS = '.jpg,.jpeg,.png,.pdf';
const DEFAULT_MAX_FILE_SIZE = 5 * 1024 * 1024;

const formatMaxFileSize = (bytes) => {
  if (bytes >= 1024 * 1024) {
    const mb = bytes / (1024 * 1024);
    return Number.isInteger(mb) ? `${mb}MB` : `${mb.toFixed(0)}MB`;
  }
  return `${Math.round(bytes / 1024)}KB`;
};

export default function FileUploadDropzone({
  label,
  onFileSelect,
  error,
  maxFileSize = DEFAULT_MAX_FILE_SIZE,
  showInfoBanner = true,
  multiple = false,
  dragText = 'Drag and drop your health records here, or',
  minHeight = 180,
  browseOnNewLine = false,
}) {
  const inputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [localError, setLocalError] = useState('');

  const validateAndSelect = (file) => {
    if (!file) return;

    if (!ACCEPTED_TYPES.includes(file.type)) {
      setLocalError('Only JPG, PNG or PDF files are allowed.');
      return;
    }

    if (file.size > maxFileSize) {
      setLocalError(`File size must be ${formatMaxFileSize(maxFileSize)} or less.`);
      return;
    }

    setLocalError('');
    onFileSelect(file);
  };

  const handleFiles = (fileList) => {
    const files = Array.from(fileList ?? []);
    files.forEach(validateAndSelect);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    setIsDragging(false);
    handleFiles(event.dataTransfer.files);
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
    handleFiles(event.target.files);
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
          py: { xs: 4, sm: 5, md: 6 },
          px: { xs: 2, sm: 3 },
          minHeight: { xs: Math.min(minHeight, 160), sm: minHeight },
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
          multiple={multiple}
          onChange={handleInputChange}
          style={{ display: 'none' }}
        />

        <CloudUploadOutlinedIcon
          sx={{
            fontSize: { xs: 32, sm: 40 },
            color: '#9CA3AF',
            mb: 1.5,
          }}
        />

        <Typography
          sx={{
            fontSize: '0.875rem',
            color: browseOnNewLine ? '#374151' : '#6B7280',
            lineHeight: '20px',
            mb: browseOnNewLine ? 0.25 : 0.5,
          }}
        >
          {dragText}
          {!browseOnNewLine && (
            <>
              {' '}
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
            </>
          )}
        </Typography>

        {browseOnNewLine && (
          <Link
            component="span"
            underline="always"
            onClick={(event) => {
              event.stopPropagation();
              handleBrowse();
            }}
            sx={{
              display: 'block',
              color: '#00796B',
              fontWeight: 500,
              fontSize: '0.875rem',
              lineHeight: '20px',
              cursor: 'pointer',
              textDecorationColor: '#00796B',
              mb: 0.5,
            }}
          >
            browse
          </Link>
        )}

        <Typography
          sx={{
            fontSize: '0.75rem',
            color: '#9CA3AF',
            lineHeight: '16px',
          }}
        >
          JPG, PNG or PDF (Max. {formatMaxFileSize(maxFileSize)})
        </Typography>
      </Box>

      {showInfoBanner && (
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
      )}

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
