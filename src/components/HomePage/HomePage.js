import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import LoginIcon from "@mui/icons-material/Login";
import { Link } from "react-router-dom";

import "./HomePage.css";

function HomePage() {
  return (
    <div className="outer-shell">
      <div className="inner-shell inner-1">
        <span className="p1">Smart </span> <span className="p2">Health </span>{" "}
        <span className="p3">Care</span>
        <br />
        <Typography className="typ" variant="h6" component="div" gutterBottom>
          Secure Smart Home System.
        </Typography>
        <br /> <br />
        <Link className="link-btn" to="/register">
          <Button
            variant="outlined"
            color="warning"
            startIcon={<PersonAddIcon />}
          >
            Sign Up
          </Button>
        </Link>
        <span className="separator"></span>
        <Link className="link-btn" to="/login">
          <Button variant="contained" color="success" endIcon={<LoginIcon />}>
            Sign In
          </Button>
        </Link>
      </div>
      <div className="inner-shell inner-2">
        <img
          alt="mental-health.png"
          src="/Images/mental-health.png"
          draggable="false"
        />
      </div>
    </div>
  );
}

export default HomePage;
