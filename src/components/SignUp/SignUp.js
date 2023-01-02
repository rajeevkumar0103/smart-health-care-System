import { forwardRef, useState } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase-config";
import { collection, addDoc } from "firebase/firestore";

import "./SignUp.css";

const theme = createTheme();

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SignUp() {
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");

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

  const handleFname = (event) => {
    setFname(event.target.value);
  };
  const handleLname = (event) => {
    setLname(event.target.value);
  };
  const handleDob = (event) => {
    setDob(event.target.value);
  };
  const handleGender = (event) => {
    setGender(event.target.value);
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

    const postData = {
      fname: fname,
      lname: lname,
      email: email,
      dob: dob,
      gender: gender,
    };

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      if (res._tokenResponse.refreshToken) {
        sessionStorage.setItem("refreshToken", res._tokenResponse.refreshToken);
        sessionStorage.setItem("logemail", email);
        await addDoc(collection(db, "users"), postData);
        sessionStorage.setItem("username", fname);
      }
      setOpenBackdrop(false);
      window.location.reload();
    } catch (error) {
      setOpenBackdrop(false);

      if (error.code === "auth/email-already-in-use") {
        setErrorMsg("Email already in use!");
      } else if (error.code === "auth/weak-password") {
        setErrorMsg("Password should be at least 6 characters");
      } else {
        setErrorMsg("Something went wrong. Try again later.");
      }
      setErrOpen(true);

      console.error(error.message);
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
            Sign up
          </Typography>
          <Box
            component="form"
            validate="true"
            onSubmit={handleSubmit}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  value={fname}
                  autoFocus
                  onChange={handleFname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  value={lname}
                  autoComplete="family-name"
                  onChange={handleLname}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="select-dob-label">DOB</InputLabel>
                <TextField
                  type="date"
                  labelid="select-dob-label"
                  required
                  fullWidth
                  id="dob"
                  name="dob"
                  value={dob}
                  onChange={handleDob}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <InputLabel id="select-gender-label">Gender</InputLabel>
                <Select
                  labelId="select-gender-label"
                  fullWidth
                  required
                  id="select-gender"
                  label="Gender"
                  value={gender}
                  name="gender"
                  onChange={handleGender}
                >
                  <MenuItem value={"F"}>F</MenuItem>
                  <MenuItem value={"M"}>M</MenuItem>
                  <MenuItem value={"N"}>Other</MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  value={email}
                  autoComplete="email"
                  type="email"
                  onChange={handleEmail}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  value={password}
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  onChange={handlePassword}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link className="link-btn-login" to="/login">
                  {"Already have an account? Sign In"}
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
