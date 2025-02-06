import React, { useEffect, useState } from "react";
import "./login.css";
import loginProfile from "../../assets/login-profile.jpeg";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { loggedInUser, loginUser } from "../../stores/auth/authSlice";

export const LoginPage = () => {
  // Get the current authenticated user from the Redux store
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  // React Router navigation hook
  const navigate = useNavigate();

  // State variables for email and password inputs
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // State variables for input focus styling
  const [emailFocus, setEmailFocus] = useState(false);
  const [passwordFocus, setPasswordFocus] = useState(false);

  // Effect hook to check if the user is already logged in
  useEffect(() => {
    if (user) {
      // Update the store to mark the user as logged in
      dispatch(loggedInUser({ loggedIn: true }));

      // Redirect to the home page after login
      navigate("/");
    }
    // eslint-disable-next-line
  }, [user]);

  // Function to handle login form submission
  async function handleSubmit(e) {
    e.preventDefault();

    // Dispatch login action with user credentials
    dispatch(loginUser({ email: email, password: password }));
  }

  return (
    <div className="vh-100 background-image d-flex justify-content-center align-items-center">
      <div className="col-md-8 col-11 login-box py-5 px-4 rounded shadow-lg">

        {/* Profile Image */}
        <div className="text-center mb-4">
          <img
            src={loginProfile}
            alt="img-thumbnail"
            className="login-image shadow border border-3 border-dark rounded-circle"
          />
        </div>

        {/* Login Heading */}
        <h1 className="text-center fw-bold display-5">Login</h1>

        {/* Login Form */}
        <form onSubmit={handleSubmit}>

          {/* Email Input Field */}
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
              onChange={(e) => setEmail(e.target.value)}
              onFocus={() => setEmailFocus(true)}
              onBlur={() => setEmailFocus(false)}
            />
          </div>

          {/* Password Input Field */}
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
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setPasswordFocus(true)}
              onBlur={() => setPasswordFocus(false)}
            />
          </div>

          {/* Login Button */}
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
