import { useState } from 'react';
import {
  Box,
  Drawer,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import Sidebar from '../components/sidebar/Sidebar';
import Logo from '../components/common/Logo';

const SIDEBAR_WIDTH = { md: 280, lg: 300 };

export default function RegistrationLayout({ activeStep, children }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const sidebarContent = <Sidebar activeStep={activeStep} />;

  return (
    <Box sx={{ display: 'flex', height: '100vh', bgcolor: 'background.default', overflow: 'hidden', width: '100%' }}>
      {isMobile ? (
        <>
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              zIndex: theme.zIndex.appBar,
              bgcolor: 'background.paper',
              borderBottom: '1px solid',
              borderColor: 'divider',
              px: 1.5,
              py: 1,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Logo compact />
            <IconButton onClick={() => setMobileOpen(true)} aria-label="Open navigation menu">
              <MenuIcon />
            </IconButton>
          </Box>
          <Drawer
            anchor="left"
            open={mobileOpen}
            onClose={() => setMobileOpen(false)}
            PaperProps={{
              sx: { width: { xs: 'min(300px, 85vw)', sm: 300 } },
            }}
          >
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 1 }}>
              <IconButton onClick={() => setMobileOpen(false)} aria-label="Close navigation menu">
                <CloseIcon />
              </IconButton>
            </Box>
            {sidebarContent}
          </Drawer>
        </>
      ) : (
        <Box
          component="aside"
          sx={{
            width: SIDEBAR_WIDTH,
            flexShrink: 0,
            height: '100vh',
            overflowY: 'auto',
          }}
        >
          {sidebarContent}
        </Box>
      )}

      <Box
        component="main"
        sx={{
          flex: 1,
          minWidth: 0,
          minHeight: 0,
          width: '100%',
          bgcolor: 'background.paper',
          mt: { xs: '56px', md: 0 },
          height: { xs: 'calc(100vh - 56px)', md: '100vh' },
          overflowY: 'auto',
          overflowX: 'hidden',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
