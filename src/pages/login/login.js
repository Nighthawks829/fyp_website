import React, {  useState } from "react";
import "./login.css";
import loginProfile from "../../assets/login-profile.jpeg";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

export const LoginPage = ({ setLoggedIn }) => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);



  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await axios
        .post(
          "http://192.168.0.110:3001/api/v1/auth/login",
          {
            email: email,
            password: password,
          },
          {
            withCredentials: true,
          }
        )
        .then((response) => {
          if (response.status === 200) {
            // const userData = response.data.user;
            // const token = response.data.token;

            // Store user data and token in session storage
            // sessionStorage.setItem("user", JSON.stringify(userData));
            // sessionStorage.setItem("token", token);
            setLoggedIn(true);
            toast.success("Login successful!");
            navigate("/");
          }
        });
    } catch (error) {
      const errorMessage = error.response?.data?.msg || "An error occurred";
      toast.error(errorMessage);
      setEmail("");
      setPassword("");
    }
  }

  return (
    <div className="vh-100 background-image d-flex justify-content-center align-items-center">
      <div className="col-md-8 col-11 login-box py-5 px-4 rounded shadow-lg">
        <div className="text-center mb-4">
          <img
            src={loginProfile}
            alt="img-thumbnail"
            className="login-image shadow border border-3 border-dark rounded-circle"
          />
        </div>
        <h1 className="text-center fw-bold display-5">Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label mb-2 fw-bold">
              Email Address
            </label>
            <input
              type="text"
              name="email"
              id="email"
              className={`form-control ${emailFocus ? "shadow" : ""}`}
              placeholder="Email"
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="mb-2 fw-bold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              className={`form-control ${passwordFocus ? "shadow" : ""}`}
              required
              value={password}
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
          </div>
          <div className="text-center mt-4">
            <button
              className="btn btn-primary shadow col-md-4 col-6 fs-5"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
