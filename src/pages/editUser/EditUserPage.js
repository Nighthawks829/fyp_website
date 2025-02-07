import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TbUpload } from "react-icons/tb";
import { toast } from "react-toastify";

// import axios from "axios";
// import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUserValues,
  editUser,
  getUser,
  handleUserChange,
} from "../../stores/user/userSlice";

export default function EditUserPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get the user ID from the URL parameters
  const { id } = useParams();
  // State to hold the uploaded file
  const [file, setFile] = useState("");

  // Get user data from the Redux store
  const { name, email, role, password, confirmPassword, image } = useSelector(
    (store) => store.user
  );

  // Handle changes in the form input fields
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleUserChange({ name, value }));
  };

  // Handle file changes (image upload)
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      // Store image name in Redux
      dispatch(handleUserChange({ name: "image", value: file.name }));
    }
  };

  // Validate the inputs before submitting
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

  // Handle the form submission for editing a user
  async function handleEditUser(e) {
    e.preventDefault();   // Prevent default form submission

    if (!validateInputs()) {
      return;   // Stop if validation fails
    } else {
      try {
        const userData = { name, email, role, password, image };
        const formData = new FormData();

        // Append user data to FormData
        for (const key in userData) {
          formData.append(key, userData[key]);
        }

        if (file) {
          // Append image file if present
          formData.append("image", file);
        }

        // Dispatch the editUser action with form data and user ID
        await dispatch(editUser({ userId: id, formData: formData })).unwrap();

        // Navigate back after successful edit
        navigate(-1);
      } catch (error) { }
    }
  }

  // Fetch the user data when the component mounts
  useEffect(() => {
    // Fetch user data using the provided ID
    dispatch(getUser(id));
  }, [id, dispatch]);

  return (
    <div className="p-xl-5 p-3">
      {/* Header and Back Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => {
            dispatch(clearUserValues());    // Clear user values from Redux
            navigate(-1);   // Navigate back
          }}
        >
          Back
        </button>
        <h1 className="m-0">Edit User</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
      <div className="text-center">
        {/* Display the user image */}
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : image === ""
                ? require("../../assets/profile.jpg")
                : require(`../../../public/uploads/${image}`)
          }
          alt=""
          className="user-img"
        />
      </div>
      {/* Form to edit user information */}
      <form onSubmit={handleEditUser}>
        {/* Upload Image */}
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
        {/* Form fields for user details */}
        <div className="col-xxl-9 col-xl-19 col-lg-10 col-12 mx-auto mt-5">
          {/* Name */}
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

          {/* Role */}
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
                name="role"
                id="role"
                value={role}
                onChange={handleUserInput}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          {/* Email */}
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

          {/* Password */}
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

          {/* Confirm Password */}
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

          {/* Buttons for submitting or clearing the form */}
          <div className=" mt-5 col-12 text-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <button
                className="px-3 py-1 edit-button shadow m-1"
                type="submit"
              >
                Edit
              </button>
              <button
                className="px-3 py-1 delete-button shadow m-1"
                type="reset"
                // Clear the form and reload the user data
                onClick={() => { dispatch(getUser(id)) }}
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
