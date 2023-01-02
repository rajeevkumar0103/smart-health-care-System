import { forwardRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { collection, getDocs, query, where } from "firebase/firestore";

import "./SignIn.css";

const theme = createTheme();

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [errOpen, setErrOpen] = useState(false);
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errorMsg, setErrorMsg] = useState(
    "An Error Occured. Try again later."
  );

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrOpen(false);
  };

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    setOpenBackdrop(true);
    event.preventDefault();

    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      sessionStorage.setItem("refreshToken", res._tokenResponse.refreshToken);
      const q = query(collection(db, "users"), where("email", "==", email));
      const querySnapshot = await getDocs(q);
      sessionStorage.setItem("username", querySnapshot.docs[0].data().fname);
      setOpenBackdrop(false);
      window.location.reload();
    } catch (error) {
      setOpenBackdrop(false);
      if (error.code === "auth/wrong-password") {
        setErrorMsg("Wrong password!");
      } else if (error.code === "auth/user-not-found") {
        setErrorMsg("User not found !");
      } else if (error.code === "auth/user-disabled") {
        setErrorMsg("You account is disabled.");
      } else {
        setErrorMsg("Something went wrong. Try again later.");
      }
      setErrOpen(true);
      console.error(error);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar
            alt="Remy Sharp"
            src="/Images/avatar-logo.png"
            sx={{ width: 56, height: 56 }}
          />
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            validate="true"
            sx={{ mt: 1 }}
          >
            <br /> <br />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              type="email"
              label="Email Address"
              name="email"
              value={email}
              autoComplete="email"
              autoFocus
              onChange={handleEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={password}
              onChange={handlePassword}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs></Grid>
              <Grid item>
                <Link className="link-btn-login" to="/register">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      <Snackbar
        key={"error"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errOpen}
        autoHideDuration={6000}
        onClose={handleErrorClose}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMsg}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </ThemeProvider>
  );
}
