export const getThemeOptions = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#0F1115', // Deep background (main canvas)
      light: '#15181D',
      dark: '#0A0C0F',
      contrastText: '#E5E7EB',
    },
    secondary: {
      main: '#15181D', // Secondary panels
      light: '#1B1F26',
      dark: '#0F1115',
      contrastText: '#E5E7EB',
    },
    tertiary: {
      main: '#1B1F26', // Cards / containers
      light: '#232833',
      dark: '#15181D',
      contrastText: '#E5E7EB',
    },
    accent: {
      mint: '#A7F3D0', // Mint green (primary growth line / highlight)
      cyan: '#7DD3FC', // Soft cyan (secondary chart line)
      purple: '#C4B5FD', // Light purple (tertiary chart line)
      red: '#FCA5A5', // Soft red (negative or contrast tone)
      yellow: '#FDE68A', // Muted yellow (donut chart segment)
      green: '#86EFAC', // Light green (donut/chart variation)
    },
    background: {
      default: '#0F1115', // Deep background
      paper: '#1B1F26', // Cards / containers
      elevated: '#232833', // Slightly elevated surfaces
    },
    text: {
      primary: '#E5E7EB', // Primary text (high contrast)
      secondary: '#9CA3AF', // Secondary text
      tertiary: '#6B7280', // Subtle labels / axis text
    },
    divider: '#2A2F3A', // Dividers / subtle borders
    border: '#374151', // Hover / active states
    muted: '#4B5563', // Icons / muted UI elements
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
      color: '#E5E7EB',
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      color: '#E5E7EB',
    },
    body2: {
      fontWeight: 500,
      color: '#9CA3AF',
    },
    caption: {
      fontWeight: 400,
      color: '#6B7280',
    },
    body1: {
      color: mode === 'light' ? '#334155' : '#e2e8f0',
      fontSize: '0.875rem',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.025em',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          padding: '8px 16px',
          boxShadow: 'none',
          transition: 'all 0.2s ease',
          textTransform: 'none',
          fontWeight: 500,
          fontSize: '0.875rem',
          border: '1px solid transparent',
          '&:hover': {
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            transform: 'none',
          },
        },
        containedPrimary: {
          backgroundColor: '#A7F3D0',
          color: '#0F1115',
          '&:hover': {
            backgroundColor: '#9EE6C4',
            boxShadow: '0 1px 3px rgba(167, 243, 208, 0.3)',
          },
          '&:active': {
            backgroundColor: '#86EFAC',
          },
        },
        outlinedPrimary: {
          borderColor: '#A7F3D0',
          color: '#A7F3D0',
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: 'rgba(167, 243, 208, 0.1)',
            borderColor: '#9EE6C4',
          },
        },
        textPrimary: {
          color: '#A7F3D0',
          '&:hover': {
            backgroundColor: 'rgba(167, 243, 208, 0.05)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          border: '1px solid #2A2F3A',
          background: '#1B1F26',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.4)',
            borderColor: '#374151',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          borderRadius: '6px',
          border: '1px solid #2A2F3A',
          background: '#1B1F26',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '0.875rem',
          color: '#9CA3AF',
          backgroundColor: '#232833',
          borderBottom: '1px solid #2A2F3A',
          padding: '12px 16px',
        },
        body: {
          padding: '12px 16px',
          borderBottom: '1px solid #2A2F3A',
          color: '#E5E7EB',
          fontSize: '0.875rem',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#232833',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          backgroundColor: '#1B1F26',
          transition: 'all 0.2s ease',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#374151',
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#A7F3D0',
            borderWidth: '1px',
          },
        },
        notchedOutline: {
          borderColor: '#4B5563',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: '1px solid #2A2F3A',
          backgroundColor: '#15181D',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: '#15181D',
          borderBottom: '1px solid #2A2F3A',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)',
        },
      },
    },
  },
});
