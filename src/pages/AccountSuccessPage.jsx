import { Box, Button, IconButton, Typography } from '@mui/material';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';
import Logo from '../components/common/Logo';
import SuccessSealIcon from '../components/common/SuccessSealIcon';

const CARD_MAX_WIDTH = 496;
const CONTENT_MAX_WIDTH = 400;

const formatDisplayId = (suffix) => suffix.toUpperCase().split('').join('  ');
const formatCopyId = (suffix) => `PAT-${suffix.toUpperCase()}`;

function UniqueIdSection({ patientIdSuffix, email, onCopy }) {
  const displayEmail = email?.trim() || 'abcd123@gmail.com';

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: CONTENT_MAX_WIDTH,
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 1.5, sm: 2 },
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
              fontSize: { xs: '13px', sm: '15px' },
              fontWeight: 600,
              color: '#0E6655',
              letterSpacing: { xs: '0.12em', sm: '0.22em' },
              lineHeight: '24px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
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

      <Box sx={{ textAlign: 'center' }}>
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
        px: { xs: 2, sm: 3 },
        py: { xs: 3, sm: 4 },
        boxSizing: 'border-box',
      }}
    >
      <Box sx={{ width: '100%', maxWidth: CARD_MAX_WIDTH }}>
        <Box sx={{ mb: { xs: 2, sm: 3 } }}>
          <Logo />
        </Box>

        <Box
          sx={{
            width: '100%',
            boxSizing: 'border-box',
            bgcolor: '#FFFFFF',
            borderRadius: { xs: '16px', sm: '24px' },
            border: '1px solid #E8E8E8',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.05)',
            px: { xs: 2, sm: 3, md: `${(CARD_MAX_WIDTH - CONTENT_MAX_WIDTH) / 2}px` },
            py: { xs: 3, sm: 4, md: 6 },
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 3, sm: 4, md: 5 },
          }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: CONTENT_MAX_WIDTH,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'center', mb: { xs: '12px', sm: '16px' } }}>
              <Box
                component="span"
                sx={{
                  display: 'inline-flex',
                  '& svg': {
                    width: { xs: 60, sm: 72 },
                    height: { xs: 60, sm: 72 },
                  },
                }}
              >
                <SuccessSealIcon />
              </Box>
            </Box>

            <Typography
              sx={{
                fontSize: { xs: '20px', sm: '24px' },
                fontWeight: 700,
                color: '#000000',
                textAlign: 'center',
                lineHeight: { xs: '28px', sm: '32px' },
                mb: '12px',
              }}
            >
              Account Created
              <br />
              Successfully!
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: '13px', sm: '14px' },
                fontWeight: 400,
                color: '#666666',
                textAlign: 'center',
                lineHeight: '22px',
              }}
            >
              Your patient account has been created successfully. You can now access your
              healthcare dashboard and manage your records securely.
            </Typography>
          </Box>

          <UniqueIdSection
            patientIdSuffix={patientIdSuffix}
            email={email}
            onCopy={handleCopy}
          />

          <Box
            sx={{
              width: '100%',
              maxWidth: CONTENT_MAX_WIDTH,
              boxSizing: 'border-box',
              bgcolor: '#F9F9F9',
              border: '1px solid #EEEEEE',
              borderRadius: '8px',
              px: { xs: 1.5, sm: 2 },
              py: { xs: 1.5, sm: 2 },
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
              width: '100%',
              maxWidth: CONTENT_MAX_WIDTH,
              display: 'flex',
              flexDirection: { xs: 'column', sm: 'row' },
              gap: { xs: 1.5, sm: '12px' },
            }}
          >
            <Button
              fullWidth
              sx={{
                flex: 1,
                height: { xs: 48, sm: 56 },
                minHeight: { xs: 48, sm: 56 },
                bgcolor: '#F0F4F4',
                color: '#0A5D4A',
                fontWeight: 600,
                fontSize: { xs: '15px', sm: '16px' },
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
                height: { xs: 48, sm: 56 },
                minHeight: { xs: 48, sm: 56 },
                bgcolor: '#0A5D4A',
                color: '#FFFFFF',
                fontWeight: 600,
                fontSize: { xs: '15px', sm: '16px' },
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
