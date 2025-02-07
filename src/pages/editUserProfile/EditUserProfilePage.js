import React, { useEffect, useState } from "react";
import { TbUpload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import {
  clearUserValues,
  editUser,
  getUser,
  handleUserChange,
} from "../../stores/user/userSlice";
import { toast } from "react-toastify";

export default function EditUserProfilePage() {
  // Getting the current logged-in user's details from the Redux store
  const { user } = useSelector((store) => store.auth);
  const { name, email, role, password, confirmPassword, image } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to manage the selected file (user profile image)
  const [file, setFile] = useState("");

  // Fetching user details when the component mounts or userId changes
  useEffect(() => {
    dispatch(getUser(user.userId));
  }, [dispatch, user.userId]);

  // Handle user input changes and update the Redux store
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleUserChange({ name, value }));
  };

  // Handle file selection and update the Redux store with the file name
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      dispatch(handleUserChange({ name: "image", value: file.name }));
    }
  };

  // Validate the inputs (email format, role, password confirmation)
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

  // Handle user profile update
  async function handleEditUser(e) {
    e.preventDefault();

    // Validate the form inputs before submitting
    if (!validateInputs()) {
      return;
    } else {
      try {
        // Prepare the user data and append to FormData for submission
        const userData = { name, email, role, password, image };
        const formData = new FormData();
        for (const key in userData) {
          formData.append(key, userData[key]);
        }

        // If a file is selected, append it to FormData
        if (file) {
          formData.append("image", file);
        }

        // Dispatch the editUser action to update user profile
        await dispatch(
          editUser({ userId: user.userId, formData: formData })
        ).unwrap();

        // Navigate to the previous page after successful update
        navigate(-1);
      } catch (error) { }
    }
  }

  return (
    <div className="p-xl-5 p-3">
      {/* Header and Back Button */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => {
            dispatch(clearUserValues());
            navigate(-1);
          }}
        >
          Back
        </button>
        <h1 className="m-0">Edit User Profile</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
      {/* User Profile Image Display */}
      <div className="text-center">
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

      {/* Form for editing user profile */}
      <form onSubmit={handleEditUser}>
        {/* File Upload for Profile Image */}
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
        {/* Input Fields for User Details */}
        <div className="col-xxl-9 col-xl-19 col-lg-10 col-12 mx-auto mt-5">
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
                required
                onChange={handleUserInput}
              />
            </div>
          </div>

          {/* Email Input */}
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
                required
                onChange={handleUserInput}
              />
            </div>
          </div>

          {/* Password Input */}
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
                required
                onChange={handleUserInput}
              />
            </div>
          </div>

          {/* Confirm Password Input */}
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
                required
                onChange={handleUserInput}
              />
            </div>
          </div>

          {/* Submit and Reset Buttons */}
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
