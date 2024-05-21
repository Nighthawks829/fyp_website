import React, { useState } from "react";
import "./login.css";
import loginProfile from "../../assets/login-profile.jpeg";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

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
        <form>
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
            <button className="btn btn-primary shadow col-md-4 col-6 fs-5">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
