import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./ViewUserPage.css";

import { useDispatch, useSelector } from "react-redux";
import {
  clearUserValues,
  deleteUser,
  getUser,
} from "../../stores/user/userSlice";
import defaultImage from "../../assets/profile.jpg";

export default function ViewUserPage() {
  // Get user state from Redux store
  const { name, email, role, image } = useSelector((store) => store.user);
  // Extracting user ID from the URL parameters
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Function to handle user deletion when triggered by modal
  async function handleDeleteUser() {
    try {
      await dispatch(deleteUser(id)).unwrap();
      navigate(-1); // Navigate back to the previous page
    } catch (error) { }
  }

  // Fetch user details on component mount
  useEffect(() => {
    // Dispatch action to fetch user by ID
    dispatch(getUser(id));
  }, [id, dispatch]);

  // UserImage component to handle dynamic image loading with fallback to default
  const UserImage = ({ image }) => {
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
      try {
        setImgSrc(require(`../../../public/uploads/${image}`));
      } catch (error) {
        setImgSrc(defaultImage);
      }
    }, [image]);

    return <img src={imgSrc} alt="" className="user-img" />;
  };


  return (
    <>
      {/* Modal for confirmation before deleting the user */}
      <div
        className="modal fade"
        id="deleteUser"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="deleteNotificationLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-5">
                Are you sure want to delete user {name}?
              </h2>
              {/* Modal buttons for handling delete confirmation */}
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => handleDeleteUser()}
                >
                  Yes
                </button>
                <button
                  className="modal-next-button shadow"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Main container for the View User page */}
      <div className="p-xl-5 p-3">
        <div className="text-start">
          {/* Back button to navigate to the previous page */}
          <button
            className="back-btn btn-primary fw-bold shadow px-4 py-1"
            onClick={() => {
              dispatch(clearUserValues());    // Clear any user-related state
              navigate(-1);   // Navigate to the previous page
            }}
          >
            Back
          </button>
        </div>
        <div className="text-center ">
          {/* Rendering User Image */}
          <UserImage image={image} />
          {/* <img
            src={
              image === ""
                ? require("../../assets/profile.jpg")
                : require(`../../../public/uploads/${image}`)
            }
            alt=""
            className="user-img"
          /> */}
          <div className="mt-5">
            {/* Display user details: name, role, and email */}
            <h5 className="mb-3 fw-bold">
              Name: <span className="board-data">{name}</span>
            </h5>
            <h5 className="mb-3 fw-bold">
              Role: <span className="board-data">{role}</span>
            </h5>
            <h5 className="mb-3 fw-bold">
              Email: <span className="board-data">{email}</span>
            </h5>
          </div>
        </div>
        {/* Buttons for navigating to the edit page or triggering user deletion */}
        <div className="mt-5 col-12 text-center ">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <button
              className="px-3 py-1 edit-button shadow m-1"
              onClick={() => navigate(`/editUser/${id}`)}   // Navigate to the edit page
            >
              Edit
            </button>
            <button
              className="px-3 py-1 delete-button shadow m-1"
              data-bs-toggle="modal"
              data-bs-target="#deleteUser"   // Open delete confirmation modal
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
