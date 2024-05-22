// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { LoginPage } from "./pages/login/login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/sidebar/sidebar";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import Dashboard from "./pages/dashboard/Dashboard";
import { useState } from "react";
import NotFound from "./pages/notFound/NotFound";

function App() {
  // eslint-disable-next-line
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          path="/"
          element={loggedIn ? <SideBar /> : <Navigate to="/login" />}
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
