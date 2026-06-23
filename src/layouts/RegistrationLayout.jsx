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
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: 'background.default' }}>
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
              px: 2,
              py: 1.5,
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
              sx: { width: 300 },
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
            position: 'sticky',
            top: 0,
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
          bgcolor: 'background.paper',
          mt: { xs: '64px', md: 0 },
          minHeight: { xs: 'calc(100vh - 64px)', md: '100vh' },
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
