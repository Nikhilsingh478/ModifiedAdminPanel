import React, { useState, useEffect } from "react";
import { loginUser } from "../redux/actions/userAction";
import { useSelector, useDispatch } from "react-redux";
import {
  Container,
  TextField,
  Button,
  Box,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import toast, { Toaster } from "react-hot-toast";
import { createTheme, ThemeProvider } from "@mui/material/styles";
const theme = createTheme();

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
      <section className="register-form">
        <div className="register-title">
          <h3
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "1rem",
            }}
          >
            Login
          </h3>
        </div>
        <div className="register-fields">
          <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="md">
              <CssBaseline />
              <Box>
                <Box
                  component="form"
                  onSubmit={submitHandler}
                  noValidate
                  sx={{ mt: 1 }}
                >
                  {loading ? (
                    <>
                      <Backdrop
                        sx={{
                          color: "#fff",
                          zIndex: (theme) => theme.zIndex.drawer + 1,
                        }}
                        open={loading}
                      >
                        <CircularProgress color="inherit" />
                      </Backdrop>
                    </>
                  ) : null}

                  <TextField
                    fullWidth
                    margin="normal"
                    required
                    label="Enter Email"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoFocus
                  />

                  <TextField
                    fullWidth
                    margin="normal"
                    required
                    label="Enter Password"
                    type="password"
                    name="pass"
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoFocus
                  />

                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 2, mb: 1 }}
                    style={{
                      backgroundColor: "#ffcf33",
                      boxShadow: "none",
                    }}
                  >
                    Login
                  </Button>
                </Box>
              </Box>
            </Container>
          </ThemeProvider>
          <Toaster />
        </div>
      </section>
    </>
  );
};

export default Login;
