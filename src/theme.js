export const getThemeOptions = (mode) => {
  const isLight = mode === "light";
  return {
  palette: {
    mode,
    primary: {
      main: isLight ? "#0F172A" : "#0F1115",
      light: isLight ? "#1E293B" : "#15181D",
      dark: isLight ? "#020617" : "#0A0C0F",
      contrastText: isLight ? "#F8FAFC" : "#E5E7EB",
    },
    secondary: {
      main: isLight ? "#F8FAFC" : "#15181D",
      light: isLight ? "#FFFFFF" : "#1B1F26",
      dark: isLight ? "#E2E8F0" : "#0F1115",
      contrastText: isLight ? "#0F172A" : "#E5E7EB",
    },
    tertiary: {
      main: isLight ? "#FFFFFF" : "#1B1F26",
      light: isLight ? "#FFFFFF" : "#232833",
      dark: isLight ? "#E2E8F0" : "#15181D",
      contrastText: isLight ? "#0F172A" : "#E5E7EB",
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
      default: isLight ? "#F3F6FB" : "#0F1115",
      paper: isLight ? "#FFFFFF" : "#1B1F26",
      elevated: isLight ? "#F8FAFC" : "#232833",
    },
    text: {
      primary: isLight ? "#0F172A" : "#E5E7EB",
      secondary: isLight ? "#475569" : "#9CA3AF",
      tertiary: isLight ? "#64748B" : "#6B7280",
    },
    divider: isLight ? "#D6DEE9" : "#2A2F3A",
    border: isLight ? "#CBD5E1" : "#374151",
    muted: isLight ? "#64748B" : "#4B5563",
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Inter", "Segoe UI", "Roboto", "Helvetica", "Arial", sans-serif',
    h5: {
      fontWeight: 700,
      color: isLight ? "#0F172A" : "#E5E7EB",
      letterSpacing: '-0.025em',
    },
    h6: {
      fontWeight: 600,
      color: isLight ? "#0F172A" : "#E5E7EB",
    },
    body2: {
      fontWeight: 500,
      color: isLight ? "#475569" : "#9CA3AF",
    },
    caption: {
      fontWeight: 400,
      color: isLight ? "#64748B" : "#6B7280",
    },
    body1: {
      color: isLight ? "#334155" : "#E2E8F0",
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
          backgroundColor: isLight ? "#10B981" : "#A7F3D0",
          color: isLight ? "#FFFFFF" : "#0F1115",
          '&:hover': {
            backgroundColor: isLight ? "#059669" : "#9EE6C4",
            boxShadow: isLight ? "0 1px 3px rgba(16, 185, 129, 0.28)" : "0 1px 3px rgba(167, 243, 208, 0.3)",
          },
          '&:active': {
            backgroundColor: isLight ? "#047857" : "#86EFAC",
          },
        },
        outlinedPrimary: {
          borderColor: isLight ? "#10B981" : "#A7F3D0",
          color: isLight ? "#059669" : "#A7F3D0",
          backgroundColor: 'transparent',
          '&:hover': {
            backgroundColor: isLight ? "rgba(16, 185, 129, 0.08)" : "rgba(167, 243, 208, 0.1)",
            borderColor: isLight ? "#059669" : "#9EE6C4",
          },
        },
        textPrimary: {
          color: isLight ? "#059669" : "#A7F3D0",
          '&:hover': {
            backgroundColor: isLight ? "rgba(16, 185, 129, 0.06)" : "rgba(167, 243, 208, 0.05)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          border: `1px solid ${isLight ? "#D6DEE9" : "#2A2F3A"}`,
          background: isLight ? "#FFFFFF" : "#1B1F26",
          boxShadow: isLight ? "0 2px 10px rgba(15, 23, 42, 0.06)" : "0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)",
          transition: 'all 0.2s ease',
          '&:hover': {
            boxShadow: isLight ? "0 8px 20px rgba(15, 23, 42, 0.08)" : "0 4px 6px rgba(0, 0, 0, 0.4)",
            borderColor: isLight ? "#C3D0E0" : "#374151",
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
          border: `1px solid ${isLight ? "#D6DEE9" : "#2A2F3A"}`,
          background: isLight ? "#FFFFFF" : "#1B1F26",
          boxShadow: isLight ? "0 2px 10px rgba(15, 23, 42, 0.06)" : "0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
          textTransform: 'none',
          fontSize: '0.875rem',
          color: isLight ? "#475569" : "#9CA3AF",
          backgroundColor: isLight ? "#F8FAFC" : "#232833",
          borderBottom: `1px solid ${isLight ? "#D6DEE9" : "#2A2F3A"}`,
          padding: '12px 16px',
        },
        body: {
          padding: '12px 16px',
          borderBottom: `1px solid ${isLight ? "#E2E8F0" : "#2A2F3A"}`,
          color: isLight ? "#0F172A" : "#E5E7EB",
          fontSize: '0.875rem',
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: isLight ? "#F1F5F9" : "#232833",
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: '6px',
          backgroundColor: isLight ? "#FFFFFF" : "#1B1F26",
          transition: 'all 0.2s ease',
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: isLight ? "#94A3B8" : "#374151",
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: isLight ? "#10B981" : "#A7F3D0",
            borderWidth: '1px',
          },
        },
        notchedOutline: {
          borderColor: isLight ? "#CBD5E1" : "#4B5563",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: `1px solid ${isLight ? "#D6DEE9" : "#2A2F3A"}`,
          backgroundColor: isLight ? "#FFFFFF" : "#15181D",
          boxShadow: isLight ? "0 2px 10px rgba(15, 23, 42, 0.06)" : "0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)",
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: isLight ? "#FFFFFF" : "#15181D",
          borderBottom: `1px solid ${isLight ? "#D6DEE9" : "#2A2F3A"}`,
          boxShadow: isLight ? "0 2px 10px rgba(15, 23, 42, 0.06)" : "0 1px 3px rgba(0, 0, 0, 0.3), 0 1px 2px rgba(0, 0, 0, 0.2)",
        },
      },
    },
  },
  };
};
