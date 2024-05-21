// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// Bootstrap Bundle JS
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { LoginPage } from "./pages/login/login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SideBar from "./components/sidebar/sidebar";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SideBar />} />
        <Route path="/login" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
