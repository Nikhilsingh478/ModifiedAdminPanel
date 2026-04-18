export const getThemeOptions = (mode) => ({
  palette: {
    mode,
    primary: {
      main: '#3b82f6',
      light: '#60a5fa',
      dark: '#2563eb',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#171717',
      light: '#404040',
      dark: '#0a0a0a',
      contrastText: '#ffffff',
    },
    background: {
      default: mode === 'light' ? '#f8fafc' : '#0a0a0a',
      paper: mode === 'light' ? '#ffffff' : '#171717',
    },
    text: {
      primary: mode === 'light' ? '#1e293b' : '#f5f5f5',
      secondary: mode === 'light' ? '#64748b' : '#a3a3a3',
    },
    divider: mode === 'light' ? '#e2e8f0' : '#262626',
  },
  typography: {
    fontFamily: '"Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
      color: mode === 'light' ? '#0f172a' : '#f5f5f5',
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      color: mode === 'light' ? '#0f172a' : '#f5f5f5',
      letterSpacing: '-0.025em',
    },
    subtitle1: {
      fontWeight: 600,
      color: mode === 'light' ? '#334155' : '#e5e5e5',
    },
    body1: {
      color: mode === 'light' ? '#334155' : '#e5e5e5',
      fontSize: '0.875rem',
    },
    body2: {
      color: mode === 'light' ? '#64748b' : '#a3a3a3',
    },
    button: {
      textTransform: 'none',
      fontWeight: 600,
      letterSpacing: '0.025em',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          padding: '8px 16px',
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: mode === 'light' 
            ? '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)'
            : '0 4px 6px -1px rgb(0 0 0 / 0.8), 0 2px 4px -2px rgb(0 0 0 / 0.8)',
          borderRadius: '12px',
          border: `1px solid ${mode === 'light' ? '#e2e8f0' : '#262626'}`,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: mode === 'light' ? '0 1px 2px 0 rgb(0 0 0 / 0.05)' : 'none',
          border: `1px solid ${mode === 'light' ? '#e2e8f0' : '#262626'}`,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: '0.05em',
          fontSize: '0.75rem',
          color: mode === 'light' ? '#64748b' : '#a3a3a3',
          backgroundColor: mode === 'light' ? '#f8fafc' : '#0a0a0a',
          borderBottom: `1px solid ${mode === 'light' ? '#e2e8f0' : '#262626'}`,
          padding: '14px 24px',
        },
        body: {
          padding: '16px 24px',
          borderBottom: `1px solid ${mode === 'light' ? '#f1f5f9' : '#262626'}`,
          color: mode === 'light' ? '#334155' : '#e5e5e5',
          fontSize: '0.875rem',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: mode === 'light' ? '#f8fafc !important' : '#171717 !important',
          },
          '&:nth-of-type(even)': {
            backgroundColor: mode === 'light' ? '#f8fafc' : '#0a0a0a',
          },
          '&:nth-of-type(odd)': {
            backgroundColor: mode === 'light' ? '#ffffff' : '#171717',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          backgroundColor: mode === 'light' ? '#ffffff' : '#171717',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: `1px solid ${mode === 'light' ? '#e2e8f0' : '#262626'}`,
          backgroundColor: mode === 'light' ? '#ffffff' : '#171717',
        },
      },
    },
  },
});
