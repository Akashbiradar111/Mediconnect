import { useEffect, useRef, useState } from 'react';
import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  TextField,
  Typography,
} from '@mui/material';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import CloseIcon from '@mui/icons-material/Close';
import PauseIcon from '@mui/icons-material/Pause';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import ReplayIcon from '@mui/icons-material/Replay';
import * as pdfjs from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

pdfjs.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const CARD_WIDTH = 256;
const THUMBNAIL_HEIGHT = 156;

const formatFileSize = (bytes) => {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
};

const getFileFormat = (file) => {
  if (file.type === 'application/pdf') return 'PDF';
  if (file.type === 'image/png') return 'PNG';
  if (file.type === 'image/jpeg') return 'JPG';
  return file.name.split('.').pop()?.toUpperCase() ?? 'FILE';
};

export default function UploadedFileCard({
  file,
  title,
  status,
  progress = 0,
  onTitleChange,
  onCancel,
  onDelete,
  onRetry,
}) {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editValue, setEditValue] = useState(title);
  const [previewUrl, setPreviewUrl] = useState(null);
  const titleInputRef = useRef(null);

  useEffect(() => {
    let objectUrl = null;
    let cancelled = false;

    const loadPreview = async () => {
      if (file.type.startsWith('image/')) {
        objectUrl = URL.createObjectURL(file);
        if (!cancelled) setPreviewUrl(objectUrl);
        return;
      }

      if (file.type === 'application/pdf') {
        try {
          const arrayBuffer = await file.arrayBuffer();
          const pdf = await pdfjs.getDocument({ data: arrayBuffer }).promise;
          const page = await pdf.getPage(1);
          const baseViewport = page.getViewport({ scale: 1 });
          const scale = (CARD_WIDTH - 24) / baseViewport.width;
          const viewport = page.getViewport({ scale });
          const canvas = document.createElement('canvas');
          canvas.width = viewport.width;
          canvas.height = viewport.height;
          const context = canvas.getContext('2d');
          await page.render({ canvasContext: context, viewport }).promise;
          if (!cancelled) setPreviewUrl(canvas.toDataURL('image/jpeg', 0.92));
        } catch {
          if (!cancelled) setPreviewUrl(null);
        }
        return;
      }

      if (!cancelled) setPreviewUrl(null);
    };

    loadPreview();

    return () => {
      cancelled = true;
      if (objectUrl) URL.revokeObjectURL(objectUrl);
    };
  }, [file]);

  useEffect(() => {
    if (isEditingTitle) {
      titleInputRef.current?.focus();
      titleInputRef.current?.select();
    }
  }, [isEditingTitle]);

  const handleTitleSave = () => {
    const trimmed = editValue.trim();
    if (trimmed) {
      onTitleChange(trimmed);
    } else {
      setEditValue(title);
    }
    setIsEditingTitle(false);
  };

  const metadata =
    status === 'queued'
      ? 'FORMAT • SIZE'
      : `${getFileFormat(file)} • ${formatFileSize(file.size)}`;

  return (
    <Box
      sx={{
        width: CARD_WIDTH,
        border: '1px solid',
        borderColor: '#E5E7EB',
        borderRadius: '12px',
        overflow: 'hidden',
        bgcolor: '#FFFFFF',
      }}
    >
      <Box
        sx={{
          px: 1.5,
          pt: 1.5,
          pb: 0,
          borderBottom: '1px solid',
          borderColor: '#E5E7EB',
        }}
      >
        <Box
          sx={{
            height: THUMBNAIL_HEIGHT,
            borderRadius: '8px',
            bgcolor: '#F3F4F6',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
            mb: 1.5,
          }}
        >
          {previewUrl ? (
            <Box
              component="img"
              src={previewUrl}
              alt={title}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '8px',
              }}
            />
          ) : (
            <Box
              sx={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                background: 'linear-gradient(135deg, #E5E7EB 0%, #F3F4F6 50%, #E5E7EB 100%)',
              }}
            />
          )}
        </Box>
      </Box>

      <Box sx={{ px: 1.5, pt: 1.25, pb: 1.5 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            mb: 0.25,
            minHeight: 24,
          }}
        >
          {isEditingTitle ? (
            <TextField
              inputRef={titleInputRef}
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              onBlur={handleTitleSave}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleTitleSave();
                if (e.key === 'Escape') {
                  setEditValue(title);
                  setIsEditingTitle(false);
                }
              }}
              size="small"
              variant="standard"
              sx={{
                flex: 1,
                '& .MuiInput-input': {
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#111827',
                  py: 0,
                },
              }}
            />
          ) : (
            <>
              <Typography
                sx={{
                  fontSize: '0.875rem',
                  fontWeight: 600,
                  color: '#111827',
                  lineHeight: '20px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {title}
              </Typography>
              <IconButton
                size="small"
                onClick={() => {
                  setEditValue(title);
                  setIsEditingTitle(true);
                }}
                sx={{
                  p: 0.25,
                  color: '#9CA3AF',
                  '&:hover': { color: '#6B7280', bgcolor: 'transparent' },
                }}
              >
                <EditOutlinedIcon sx={{ fontSize: 14 }} />
              </IconButton>
            </>
          )}
        </Box>

        <Typography
          sx={{
            fontSize: '0.6875rem',
            fontWeight: 500,
            color: '#9CA3AF',
            letterSpacing: '0.02em',
            textTransform: 'uppercase',
            lineHeight: '16px',
            mb: 1.25,
          }}
        >
          {metadata}
        </Typography>

        {status === 'uploading' ? (
          <Box>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                mb: 0.75,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <PauseIcon sx={{ fontSize: 14, color: '#374151' }} />
                <Typography
                  sx={{
                    fontSize: '0.75rem',
                    fontWeight: 500,
                    color: '#374151',
                  }}
                >
                  {progress}%
                </Typography>
              </Box>
              <IconButton
                size="small"
                onClick={onDelete}
                sx={{
                  p: 0.25,
                  color: '#EF4444',
                  '&:hover': { bgcolor: 'transparent' },
                }}
              >
                <DeleteOutlineOutlinedIcon sx={{ fontSize: 18 }} />
              </IconButton>
            </Box>
            <LinearProgress
              variant="determinate"
              value={progress}
              sx={{
                height: 4,
                borderRadius: 2,
                bgcolor: '#E5E7EB',
                '& .MuiLinearProgress-bar': {
                  bgcolor: '#008060',
                  borderRadius: 2,
                },
              }}
            />
          </Box>
        ) : (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography
              sx={{
                fontSize: '0.75rem',
                fontWeight: 500,
                color: '#374151',
              }}
            >
              {status === 'queued' && 'Queued'}
              {status === 'uploaded' && 'Upload Successful!'}
              {status === 'failed' && 'Upload Failed!'}
            </Typography>

            {status === 'queued' && (
              <Button
                size="small"
                onClick={onCancel}
                startIcon={<CloseIcon sx={{ fontSize: '14px !important' }} />}
                sx={{
                  minWidth: 'auto',
                  px: 1,
                  py: 0.5,
                  bgcolor: '#F0F0F0',
                  color: '#6B7280',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  borderRadius: '6px',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#E5E5E5',
                    boxShadow: 'none',
                  },
                  '& .MuiButton-startIcon': {
                    mr: 0.25,
                    ml: 0,
                  },
                }}
              >
                Cancel
              </Button>
            )}

            {status === 'uploaded' && (
              <Button
                size="small"
                onClick={onDelete}
                startIcon={<DeleteOutlineOutlinedIcon sx={{ fontSize: '14px !important' }} />}
                sx={{
                  minWidth: 'auto',
                  px: 1,
                  py: 0.5,
                  bgcolor: '#FDE8E8',
                  color: '#D9534F',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  borderRadius: '6px',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#FCD5D5',
                    boxShadow: 'none',
                  },
                  '& .MuiButton-startIcon': {
                    mr: 0.25,
                    ml: 0,
                  },
                }}
              >
                Delete
              </Button>
            )}

            {status === 'failed' && (
              <Button
                size="small"
                onClick={onRetry}
                startIcon={<ReplayIcon sx={{ fontSize: '14px !important' }} />}
                sx={{
                  minWidth: 'auto',
                  px: 1,
                  py: 0.5,
                  bgcolor: '#E6F4EA',
                  color: '#28A745',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                  borderRadius: '6px',
                  textTransform: 'none',
                  boxShadow: 'none',
                  '&:hover': {
                    bgcolor: '#D4EDDA',
                    boxShadow: 'none',
                  },
                  '& .MuiButton-startIcon': {
                    mr: 0.25,
                    ml: 0,
                  },
                }}
              >
                Retry
              </Button>
            )}
          </Box>
        )}
      </Box>
    </Box>
  );
}
