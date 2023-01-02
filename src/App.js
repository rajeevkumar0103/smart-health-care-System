import { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import HomePage from "./components/HomePage/HomePage";
import SignIn from "./components/SignIn/SignIn";
import SignUp from "./components/SignUp/SignUp";
import DashBoard from "./components/DashBoard/DashBoard";

function App() {
  const [logged, setLogged] = useState(false);
  useEffect(() => {
    const token = sessionStorage.getItem("refreshToken");
    if (token) {
      setLogged(true);
    } else if (!token) {
      setLogged(false);
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<HomePage />} />
        <Route
          path="/login"
          exact
          element={logged ? <Navigate to="/dashboard" /> : <SignIn />}
        />
        <Route
          path="/register"
          exact
          element={logged ? <Navigate to="/dashboard" /> : <SignUp />}
        />
        <Route
          path="/dashboard"
          exact
          element={logged ? <DashBoard /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
