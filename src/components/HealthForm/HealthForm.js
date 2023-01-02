import { Fragment, forwardRef, useState } from "react";
import Container from "@mui/material/Container";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Typography from "@mui/material/Typography";
import Backdrop from "@mui/material/Backdrop";

import getInstruction from "./instructions";
import "./HealthForm.css";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function HealthForm() {
  const [errorMessage, setErrorMessage] = useState("Error");
  const [openBackdrop, setOpenBackdrop] = useState(false);
  const [errOpen, setErrOpen] = useState(false);

  const [hrate, setHrate] = useState("");
  const [bsugar, setBsugar] = useState("");
  const [sbp, setSbp] = useState("");
  const [dbp, setDbp] = useState("");

  const handleHrate = (event) => {
    setHrate(event.target.value);
  };

  const handleBsugar = (event) => {
    setBsugar(event.target.value);
  };

  const handleSbp = (event) => {
    setSbp(event.target.value);
  };

  const handleDbp = (event) => {
    setDbp(event.target.value);
  };

  function handleSubmit(e) {
    setOpenBackdrop(true);
    e.preventDefault();

    const healthData = {
      hrate: Number(hrate),
      bsugar: Number(bsugar),
      sbp: Number(sbp),
      dbp: Number(dbp),
    };

    const { str, msg } = getInstruction(healthData);
    setErrorMessage(msg);
    setHrate("");
    setBsugar("");
    setSbp("");
    setDbp("");
    setErrOpen(true);

    setInterval(() => {
      setOpenBackdrop(false);

      if (str === "011" || str === "101" || str === "110" || str === "111") {
        window.open("tel:102", "_self");
      }
    }, 4000);
  }

  const handleErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setErrOpen(false);
  };

  return (
    <Fragment>
      <Container
        sx={{ marginTop: "10vh" }}
        className="dash-container"
        maxWidth="lg"
      >
        <Typography variant="h5" gutterBottom component="div">
          Enter Health Details:
        </Typography>
        <div className="container">
          <form validate="true" onSubmit={handleSubmit}>
            <div className="rrow">
              <div className="col-25">
                <label htmlFor="hrate">Heart Rate</label>
              </div>
              <div className="col-75">
                <input
                  className="inpt"
                  type="number"
                  id="hrate"
                  name="hrate"
                  value={hrate}
                  onChange={handleHrate}
                  placeholder="Heart Rate (BPM)"
                  required
                />
              </div>
            </div>
            <br />
            <div className="rrow">
              <div className="col-25">
                <label htmlFor="bsugar">Blood Sugar</label>
              </div>
              <div className="col-75">
                <input
                  className="inpt"
                  type="number"
                  id="bsugar"
                  name="bsugar"
                  value={bsugar}
                  onChange={handleBsugar}
                  placeholder="Blood Sugar (mg/dl)"
                  required
                />
              </div>
            </div>
            <br />
            <div className="rrow">
              <div className="col-25">
                <label htmlFor="bp">Blood Pressure</label>
              </div>
              <div className="col-75">
                <input
                  className="inpt"
                  type="number"
                  id="bp"
                  name="bp"
                  value={sbp}
                  onChange={handleSbp}
                  placeholder="Systolic"
                  required
                />
                <br />
                <br />
                <input
                  className="inpt"
                  type="number"
                  id="bp"
                  name="bp"
                  value={dbp}
                  onChange={handleDbp}
                  placeholder="Diastolic"
                  required
                />
              </div>
            </div>
            <br />
            <div className="rrow">
              <input className="input-submit" type="submit" value="Submit" />
            </div>
          </form>
        </div>
      </Container>
      <Snackbar
        key={"error"}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={errOpen}
        autoHideDuration={5000}
        onClose={handleErrorClose}
        sx={{ height: "100%" }}
      >
        <Alert
          onClose={handleErrorClose}
          severity="error"
          sx={{ width: "100%" }}
        >
          {errorMessage}
        </Alert>
      </Snackbar>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={openBackdrop}
      />
    </Fragment>
  );
}

export default HealthForm;
