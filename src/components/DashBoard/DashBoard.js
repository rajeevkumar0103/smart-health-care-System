import { Fragment, useEffect, useState } from "react";
import DashBar from "../DashBar/DashBar";
import HealthForm from "../HealthForm/HealthForm";

import "./DashBoard.css";

export default function DashBoard() {
  const [userName, setUserName] = useState("");
  useEffect(() => {
    const uname = sessionStorage.getItem("username");
    setUserName(uname);
  }, []);

  return (
    <Fragment>
      <DashBar userName={userName} />
      <HealthForm />
    </Fragment>
  );
}
