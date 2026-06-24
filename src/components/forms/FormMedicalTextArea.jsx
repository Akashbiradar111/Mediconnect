import { Box, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RequiredLabel from '../common/RequiredLabel';

const BORDER_COLOR = '#E5E7EB';
const PLACEHOLDER_COLOR = '#9CA3AF';

export default function FormMedicalTextArea({
  label,
  name,
  value,
  onChange,
  onBlur,
  placeholder,
  maxLength,
  showCharCount = false,
  tags = [],
  onAddTag,
  onRemoveTag,
}) {
  const handleKeyDown = (event) => {
    if (!onAddTag || event.key !== 'Enter' || event.shiftKey) return;

    const input = event.target;
    const cursorPos = input.selectionStart;
    const textBeforeCursor = value.slice(0, cursorPos);
    const wordMatch = textBeforeCursor.match(/(\S+)$/);

    if (!wordMatch) return;

    event.preventDefault();
    const word = wordMatch[1];
    const textBeforeWord = textBeforeCursor.slice(0, -word.length);
    const textAfterCursor = value.slice(cursorPos);

    onAddTag(word);
    const syntheticEvent = {
      target: { name, value: `${textBeforeWord}${textAfterCursor}` },
    };
    onChange(syntheticEvent);
  };

  return (
    <Box>
      {label && <RequiredLabel>{label}</RequiredLabel>}
      <Box
        sx={{
          border: `1px solid ${BORDER_COLOR}`,
          borderRadius: '10px',
          bgcolor: '#FFFFFF',
          overflow: 'hidden',
          '&:focus-within': {
            borderColor: '#008060',
          },
        }}
      >
        <Box
          component="textarea"
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          maxLength={maxLength}
          rows={3}
          sx={{
            display: 'block',
            width: '100%',
            border: 'none',
            outline: 'none',
            resize: 'none',
            p: '14px',
            fontFamily: 'inherit',
            fontSize: '0.9375rem',
            lineHeight: 1.6,
            color: '#111827',
            bgcolor: 'transparent',
            minHeight: 88,
            boxSizing: 'border-box',
            '&::placeholder': {
              color: PLACEHOLDER_COLOR,
              opacity: 1,
            },
          }}
        />

        {tags.length > 0 && (
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 1,
              px: '14px',
              pb: '14px',
            }}
          >
            {tags.map((tag, index) => (
              <Box
                key={`${tag}-${index}`}
                sx={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 0.5,
                  px: 1.25,
                  py: 0.5,
                  border: `1px solid ${BORDER_COLOR}`,
                  borderRadius: '6px',
                  bgcolor: '#FFFFFF',
                }}
              >
                <Typography
                  sx={{
                    fontSize: '0.8125rem',
                    color: '#374151',
                    lineHeight: 1.4,
                  }}
                >
                  {tag}
                </Typography>
                <Box
                  component="button"
                  type="button"
                  onClick={() => onRemoveTag(index)}
                  aria-label={`Remove ${tag}`}
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: 'none',
                    bgcolor: 'transparent',
                    p: 0,
                    cursor: 'pointer',
                    color: '#9CA3AF',
                    lineHeight: 0,
                    '&:hover': { color: '#6B7280' },
                  }}
                >
                  <CloseIcon sx={{ fontSize: 14 }} />
                </Box>
              </Box>
            ))}
          </Box>
        )}

        {showCharCount && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', px: '14px', pb: '10px' }}>
            <Typography
              sx={{
                fontSize: '0.75rem',
                color: '#9CA3AF',
                lineHeight: 1.4,
              }}
            >
              {value.length}/500 Characters left
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
