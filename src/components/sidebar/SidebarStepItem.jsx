import { Box, Typography } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';

const COMPLETED_TEAL = '#007955';
const ACTIVE_DARK = '#006D5B';
const ACTIVE_BG = '#E8F5F0';
const TEXT_DARK = '#1F2937';
const INACTIVE_ICON = '#6B7280';
const LINE_GRAY = '#D1D5DB';

export default function SidebarStepItem({ step, isActive, isCompleted, isLast }) {
  const Icon = step.icon;
  const hasIconBackground = isActive || (isCompleted && !isActive);

  return (
    <Box sx={{ pb: isLast ? 0 : 1 }}>
      <Box
        sx={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          minWidth: 0,
        }}
      >
        {isActive && (
          <Box
            sx={{
              position: 'absolute',
              top: -4,
              bottom: -4,
              left: 0,
              right: -8,
              bgcolor: ACTIVE_BG,
              borderRadius: '8px',
              boxShadow: 'none',
              zIndex: 0,
            }}
          />
        )}

        <Box
          sx={{
            width: 36,
            height: 36,
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: isCompleted && !isActive
              ? COMPLETED_TEAL
              : isActive
                ? ACTIVE_DARK
                : 'transparent',
            flexShrink: 0,
            mr: 1.5,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {isCompleted && !isActive ? (
            <CheckIcon sx={{ fontSize: 18, color: '#FFFFFF' }} />
          ) : (
            <Icon
              sx={{
                fontSize: hasIconBackground ? 18 : 20,
                color: isActive ? '#FFFFFF' : INACTIVE_ICON,
              }}
            />
          )}
        </Box>

        <Typography
          sx={{
            fontWeight: isActive ? 600 : 400,
            color: isActive ? ACTIVE_DARK : TEXT_DARK,
            fontSize: '0.875rem',
            lineHeight: 1.4,
            position: 'relative',
            zIndex: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            minWidth: 0,
          }}
        >
          {step.label}
        </Typography>
      </Box>

      {!isLast && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            width: 36,
          }}
        >
          <Box
            sx={{
              width: 1.5,
              height: 14,
              bgcolor: isCompleted ? COMPLETED_TEAL : LINE_GRAY,
              my: 0.25,
            }}
          />
        </Box>
      )}
    </Box>
  );
}
