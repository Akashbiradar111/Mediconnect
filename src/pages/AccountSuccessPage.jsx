import { Box, Button, IconButton, Typography } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Logo from '../components/common/Logo';
import SuccessSealIcon from '../components/common/SuccessSealIcon';

const CARD_WIDTH = 496;
const CARD_HEIGHT = 696;
const CONTENT_WIDTH = 400;
const HEADER_HEIGHT = 214;
const UNIQUE_ID_WIDTH = 314;
const UNIQUE_ID_HEIGHT = 130;
const NOTE_HEIGHT = 80;
const BUTTONS_HEIGHT = 56;
const SECTION_GAP = 40;

const formatDisplayId = (suffix) => suffix.toUpperCase().split('').join('  ');
const formatCopyId = (suffix) => `PAT-${suffix.toUpperCase()}`;

function UniqueIdSection({ patientIdSuffix, email, onCopy }) {
  const displayEmail = email?.trim() || 'abcd123@gmail.com';

  return (
    <Box
      sx={{
        width: UNIQUE_ID_WIDTH,
        height: UNIQUE_ID_HEIGHT,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography
        sx={{
          fontSize: '14px',
          fontWeight: 600,
          color: '#000000',
          lineHeight: '20px',
          mb: '8px',
        }}
      >
        Unique ID
      </Typography>

      <Box
        sx={{
          display: 'flex',
          alignItems: 'stretch',
          height: 48,
          border: '1px solid #E5E7EB',
          borderRadius: '8px',
          overflow: 'hidden',
          bgcolor: '#FFFFFF',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 52,
            px: 1.5,
            bgcolor: '#F3F4F6',
            borderRight: '1px solid #E5E7EB',
            fontSize: '14px',
            fontWeight: 700,
            color: '#000000',
          }}
        >
          PAT
        </Box>

        <Box
          sx={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            px: 1.5,
          }}
        >
          <Typography
            sx={{
              fontSize: '15px',
              fontWeight: 600,
              color: '#0E6655',
              letterSpacing: '0.22em',
              lineHeight: '24px',
            }}
          >
            {formatDisplayId(patientIdSuffix)}
          </Typography>

          <IconButton
            onClick={onCopy}
            aria-label="Copy unique ID"
            sx={{
              color: '#9CA3AF',
              p: 0.5,
              ml: 0.5,
              flexShrink: 0,
              '&:hover': { bgcolor: 'transparent', color: '#6B7280' },
            }}
          >
            <ContentCopyOutlinedIcon sx={{ fontSize: 20 }} />
          </IconButton>
        </Box>
      </Box>

      <Box sx={{ mt: 'auto', textAlign: 'center' }}>
        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 400,
            color: '#666666',
            lineHeight: '20px',
          }}
        >
          Your unique ID has also been sent to
        </Typography>
        <Typography
          sx={{
            fontSize: '13px',
            fontWeight: 700,
            color: '#000000',
            lineHeight: '20px',
          }}
        >
          {displayEmail}
        </Typography>
      </Box>
    </Box>
  );
}

export default function AccountSuccessPage({ patientIdSuffix, email }) {
  const copyValue = formatCopyId(patientIdSuffix);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(copyValue);
    } catch {
      // Clipboard unavailable
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#F5F5F5',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        px: 2,
        py: 4,
      }}
    >
      <Box sx={{ width: CARD_WIDTH }}>
        <Box sx={{ mb: 3 }}>
          <Logo />
        </Box>

        <Box
          sx={{
            width: CARD_WIDTH,
            height: CARD_HEIGHT,
            boxSizing: 'border-box',
            bgcolor: '#FFFFFF',
            borderRadius: '24px',
            border: '1px solid #E8E8E8',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            px: `${(CARD_WIDTH - CONTENT_WIDTH) / 2}px`,
            py: '48px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: `${SECTION_GAP}px`,
          }}
        >
          <Box
            sx={{
              width: CONTENT_WIDTH,
              height: HEADER_HEIGHT,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: '16px' }}>
              <SuccessSealIcon />
            </Box>

            <Typography
              sx={{
                fontSize: '24px',
                fontWeight: 700,
                color: '#000000',
                textAlign: 'center',
                lineHeight: '32px',
                mb: '12px',
              }}
            >
              Account Created
              <br />
              Successfully!
            </Typography>

            <Typography
              sx={{
                fontSize: '14px',
                fontWeight: 400,
                color: '#666666',
                textAlign: 'center',
                lineHeight: '22px',
              }}
            >
              Your patient account has been created
              <br />
              successfully. You can now access your healthcare
              <br />
              dashboard and manage your records securely.
            </Typography>
          </Box>

          <UniqueIdSection
            patientIdSuffix={patientIdSuffix}
            email={email}
            onCopy={handleCopy}
          />

          <Box
            sx={{
              width: CONTENT_WIDTH,
              height: NOTE_HEIGHT,
              boxSizing: 'border-box',
              bgcolor: '#F9F9F9',
              border: '1px solid #EEEEEE',
              borderRadius: '8px',
              px: '16px',
              py: '16px',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Typography
              sx={{
                fontSize: '13px',
                fontWeight: 400,
                color: '#666666',
                lineHeight: '20px',
              }}
            >
              <Box component="span" sx={{ fontWeight: 700, color: '#666666' }}>
                Note{' '}
              </Box>
              Use this ID or your registered phone number to securely access your healthcare
              workspace.
            </Typography>
          </Box>

          <Box
            sx={{
              width: CONTENT_WIDTH,
              height: BUTTONS_HEIGHT,
              display: 'flex',
              gap: '12px',
            }}
          >
            <Button
              fullWidth
              sx={{
                flex: 1,
                height: BUTTONS_HEIGHT,
                minHeight: BUTTONS_HEIGHT,
                bgcolor: '#F0F4F4',
                color: '#0A5D4A',
                fontWeight: 600,
                fontSize: '16px',
                borderRadius: '12px',
                textTransform: 'none',
                boxShadow: 'none',
                '&:hover': {
                  bgcolor: '#E6ECEC',
                  boxShadow: 'none',
                },
              }}
            >
              View Profile
            </Button>
            <Button
              fullWidth
              variant="contained"
              sx={{
                flex: 1,
                height: BUTTONS_HEIGHT,
                minHeight: BUTTONS_HEIGHT,
                bgcolor: '#0A5D4A',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: '16px',
                borderRadius: '12px',
                textTransform: 'none',
                boxShadow: '0 2px 8px rgba(10, 93, 74, 0.25)',
                '&:hover': {
                  bgcolor: '#084A3B',
                  boxShadow: '0 2px 8px rgba(10, 93, 74, 0.25)',
                },
              }}
            >
              Go to Dashboard
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
