// Import Bootstrap CSS for styling
import "bootstrap/dist/css/bootstrap.min.css";
// Import Bootstrap Bundle JS for functionality
import "bootstrap/dist/js/bootstrap.bundle.min.js";

// Import necessary components and functions from other files
import { LoginPage } from "./pages/login/loginPage";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SideBar from "./components/sidebar/sidebar";
import NotFound from "./pages/notFound/NotFound";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";

function App() {
  // Access the loggedIn state from the Redux store
  // eslint-disable-next-line
  const { loggedIn } = useSelector((store) => store.auth);

  return (
    <BrowserRouter>
      {/* Define application routes */}
      <Routes>
        {/* Route for the login page */}
        <Route path="/login" element={<LoginPage />} />

        {/* Route for the main application */}
        <Route
          path="/*"
          element={
            loggedIn ? (
              <SideBar

              />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        {/* Route for the Not Found page */}
        <Route path="/not-found" element={<NotFound />} />
      </Routes>

      {/* Display toast notifications */}
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
