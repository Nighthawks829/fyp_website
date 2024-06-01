// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { LoginPage } from "./pages/login/login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/sidebar/sidebar";
import NotFound from "./pages/notFound/NotFound";
import { useState } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  // eslint-disable-next-line
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={<LoginPage setLoggedIn={setLoggedIn} />}
        />
        <Route
          path="/*"
          element={loggedIn ? <SideBar setLoggedIn={setLoggedIn} /> : <Navigate to="/login" />}
        />
        <Route path="/not-found" element={<NotFound />} />
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose="5000"
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    </BrowserRouter>
  );
}

export default App;
