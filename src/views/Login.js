import React, { useState, useEffect } from "react";
import { loginUser } from "../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import {
  TextField,
  Button,
  Box,
  CircularProgress,
  Typography,
  Avatar,
  Paper,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import toast, { Toaster } from "react-hot-toast";
import { styled } from "@mui/material/styles";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

// Full viewport glassmorphic background
const GlassBackground = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  background: 'linear-gradient(135deg, #0F1115 0%, #15181D 50%, #1B1F26 100%)',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 20% 50%, rgba(167, 243, 208, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 50%, rgba(125, 211, 252, 0.1) 0%, transparent 50%), radial-gradient(circle at 50% 20%, rgba(196, 181, 253, 0.05) 0%, transparent 50%)',
    animation: 'ambientShift 18s ease-in-out infinite',
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    inset: 0,
    background: 'linear-gradient(110deg, rgba(167, 243, 208, 0.05) 0%, rgba(125, 211, 252, 0.03) 45%, rgba(196, 181, 253, 0.04) 100%)',
    animation: 'ambientPulse 10s ease-in-out infinite',
  },
  '@keyframes ambientShift': {
    '0%, 100%': { transform: 'translate3d(0, 0, 0)', opacity: 0.95 },
    '50%': { transform: 'translate3d(-10px, 8px, 0)', opacity: 1 },
  },
  '@keyframes ambientPulse': {
    '0%, 100%': { opacity: 0.45 },
    '50%': { opacity: 0.7 },
  },
});

// Glassmorphic login card
const GlassCard = styled(Paper)(({ theme }) => ({
  background: 'rgba(27, 31, 38, 0.8)',
  backdropFilter: 'blur(20px)',
  border: '1px solid rgba(42, 47, 58, 0.6)',
  borderRadius: '16px',
  padding: '3rem',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 2px 8px rgba(0, 0, 0, 0.3)',
  maxWidth: '450px',
  width: '100%',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '2px',
    background: 'linear-gradient(90deg, #A7F3D0 0%, #7DD3FC 50%, #C4B5FD 100%)',
    opacity: 0.8,
  },
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at 50% 0%, rgba(167, 243, 208, 0.1) 0%, transparent 70%)',
    pointerEvents: 'none',
  },
  animation: 'cardReveal 420ms ease-out',
  '@keyframes cardReveal': {
    from: {
      opacity: 0,
      transform: 'translateY(8px)',
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)',
    },
  },
}));

// Styled avatar with glassmorphism
const StyledAvatar = styled(Avatar)(({ theme }) => ({
  background: 'linear-gradient(135deg, #A7F3D0 0%, #7DD3FC 100%)',
  width: 64,
  height: 64,
  margin: '0 auto 2rem',
  boxShadow: '0 8px 24px rgba(167, 243, 208, 0.3)',
  border: '2px solid rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(10px)',
}));

const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.LoginUserReducer);
  const { error, success, loading } = userLogin;

  const submitHandler = async (e) => {
    e.preventDefault();
    if (!password || !email) {
      return toast.error("All are required", {
        position: "top-center",
        duration: 3000,
      });
    }
    dispatch(loginUser(email, password));
  };

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong", {
        position: "top-center",
      });
      // dispatch(clearErrors());
    }
    if (success) {
      toast.success("Product Added", {
        position: "top-center",
      });
      dispatch({ type: "ADD_PRODUCT_RESET" });
    }
  }, [dispatch, error, success]);

// useEffect(() => {
//   if (!userInfo) {
//     // not logged in → stay on login page
//     return;
//   }

//   if (userInfo?.userRole?.userRoleName === "Admin") {
//     history.push("./admin/dashboard");
//   } else {
//     toast.error("Not authorized");
//   }
// }, [history, userInfo]);

  return (
    <>
      <CssBaseline />
      <GlassBackground />
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <GlassCard>
          <StyledAvatar>
            <LockOutlinedIcon sx={{ fontSize: 32, color: '#0F1115' }} />
          </StyledAvatar>
          
          <Typography
            component="h1"
            variant="h3"
            sx={{
              textAlign: 'center',
              fontWeight: 700,
              mb: 1,
              color: '#E5E7EB',
              letterSpacing: '-0.025em',
            }}
          >
            Admin Portal
          </Typography>

          <Typography
            variant="body1"
            sx={{
              textAlign: 'center',
              mb: 4,
              color: '#9CA3AF',
            }}
          >
            Secure access to your dashboard
          </Typography>

          <Box
            component="form"
            onSubmit={submitHandler}
            noValidate
            sx={{ width: '100%' }}
          >
            {loading && (
              <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
                <CircularProgress sx={{ color: '#A7F3D0' }} />
              </Box>
            )}

            <TextField
              fullWidth
              margin="normal"
              required
              label="Email Address"
              name="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoFocus
              sx={{ 
                mb: 2,
                '& .MuiInputLabel-root': {
                  color: '#9CA3AF',
                  '&.Mui-focused': {
                    color: '#E5E7EB',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#E5E7EB',
                },
              }}
            />

            <TextField
              fullWidth
              margin="normal"
              required
              label="Password"
              type="password"
              name="pass"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              sx={{ 
                mb: 3,
                '& .MuiInputLabel-root': {
                  color: '#9CA3AF',
                  '&.Mui-focused': {
                    color: '#E5E7EB',
                  },
                },
                '& .MuiInputBase-input': {
                  color: '#E5E7EB',
                },
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              sx={{ 
                mt: 3, 
                mb: 2,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #A7F3D0 0%, #7DD3FC 100%)',
                color: '#0F1115',
                border: 'none',
                '&:hover': {
                  background: 'linear-gradient(135deg, #7DD3FC 0%, #A7F3D0 100%)',
                  transform: 'translateY(-1px)',
                  boxShadow: '0 8px 18px rgba(167, 243, 208, 0.25)',
                },
              }}
            >
              Sign In
            </Button>
          </Box>
        </GlassCard>
      </Box>
      <Toaster 
        position="top-center"
        toastOptions={{
          style: {
            background: 'rgba(27, 31, 38, 0.9)',
            color: '#E5E7EB',
            border: '1px solid #2A2F3A',
            backdropFilter: 'blur(10px)',
          },
        }}
      />
    </>
  );
};

export default Login;
