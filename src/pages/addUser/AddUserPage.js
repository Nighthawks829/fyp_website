import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TbUpload } from "react-icons/tb";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addUser,
  handleUserChange,
  clearUserValues
} from "../../stores/user/userSlice";

export default function AddUserPage() {
  // Get user data from the Redux store
  const { name, email, role, password, confirmPassword, image } = useSelector(
    (store) => store.user
  );
  // State to store selected image file
  const [file, setFile] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Clears user input fields on component mount
  useEffect(() => {
    dispatch(clearUserValues());
  }, []);

  // Handle changes in user input fields
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleUserChange({ name, value }));
  };

  // Handle changes for file input (image upload)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      dispatch(handleUserChange({ name: "image", value: file.name }));
    }
  };

  // Validate inputs before submitting the form
  function validateInputs() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Check if email format is correct  
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    // Check if role is either "user" or "admin"
    if (role !== "user" && role !== "admin") {
      toast.error("Role must be either 'user' or 'admin'");
      return false;
    }

    // Check if password and confirm password match
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  }

  // Handle form submission to add a user
  async function handleAddUser(e) {
    e.preventDefault();

    // If validation fails, stop the process
    if (!validateInputs()) {
      return;
    } else {
      try {
        // Prepare user data
        const userData = { name, email, role, password, image };
        const formData = new FormData();

        // Append data to FormData object
        for (const key in userData) {
          formData.append(key, userData[key]);
        }

        // Append file if available
        if (file) {
          formData.append("image", file);
        }

        // Dispatch add user action with form data
        await dispatch(addUser(formData)).unwrap();

        // Navigate back to the previous page after successful submission
        navigate(-1);
      } catch (error) { }
    }
  }

  return (
    <div className="p-xl-5 p-3">
      {/* Page Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => {
            dispatch(clearUserValues());    // Clear form values
            navigate(-1);   // Navigate back
          }}
        >
          Back
        </button>
        <h1 className="m-0">Add User</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
      {/* User Image Section */}
      <div className="text-center">
        <img
          src={require("../../assets/profile.jpg")}
          alt=""
          className="user-img"
        />
      </div>
      {/* Add User Form */}
      <form onSubmit={handleAddUser}>
        <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-12 mb-3 text-center mx-auto mt-4 ">
          <label htmlFor="image" className="form-label upload-label mb-3">
            Upload Image <TbUpload size={20} />
          </label>
          <input
            className="form-control"
            type="file"
            id="image"
            name="image"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
        </div>

        {/* User Details Form */}
        <div className="col-xxl-9 col-xl-19 col-lg-10 col-12 mx-auto mt-5">
          {/* Name Field */}
          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="name" className="col-form-label">
                Name:
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                onChange={handleUserInput}
                required
              />
            </div>
          </div>

          {/* Role Field */}
          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="role" className="col-form-label">
                Role:
              </label>
            </div>
            <div className="col">
              <select
                className="form-select"
                aria-label=".form-select user-role"
                value={role}
                onChange={handleUserInput}
                id="role"
                name="role"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Email Field */}
          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="email" className="col-form-label">
                Email:
              </label>
            </div>
            <div className="col">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={handleUserInput}
                required
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="password" className="col-form-label">
                Password
              </label>
            </div>
            <div className="col">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={handleUserInput}
                required
              />
            </div>
          </div>

          {/* Confirm Password Field */}
          <div className="row mb-4 align-items-center">
            <div className="col-3">
              <label htmlFor="confirmPassword" className="col-form-label">
                Confirm Password
              </label>
            </div>
            <div className="col">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleUserInput}
                required
              />
            </div>
          </div>

          {/* Submit & Clear Buttons */}
          <div className=" mt-5 col-12 text-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <button
                className="px-3 py-1 edit-button shadow m-1"
                type="submit"
              >
                Add
              </button>
              <button
                className="px-3 py-1 delete-button shadow m-1"
                type="reset"
                onClick={() => dispatch(clearUserValues())}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
