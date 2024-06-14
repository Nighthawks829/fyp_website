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
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { name, email, role, password, confirmPassword, image } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();
  const [file, setFile] = useState("");

  useEffect(() => {
    dispatch(getUser(user.userId));
  }, [dispatch, user.userId]);

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleUserChange({ name, value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      dispatch(handleUserChange({ name: "image", value: file.name }));
    }
  };

  function validateInputs() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (role !== "user" && role !== "admin") {
      toast.error("Role must be either 'user' or 'admin'");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  }

  async function handleEditUser(e) {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    } else {
      try {
        const userData = { name, email, role, password, image };
        const formData = new FormData();
        for (const key in userData) {
          formData.append(key, userData[key]);
        }
        if (file) {
          formData.append("image", file);
        }
        await dispatch(
          editUser({ userId: user.userId, formData: formData })
        ).unwrap();
        navigate(-1);
      } catch (error) {}
    }
  }

  return (
    <div className="p-xl-5 p-3">
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
      <form onSubmit={handleEditUser}>
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
