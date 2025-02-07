import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import defaultImage from "../../assets/profile.jpg";
import { getUser } from "../../stores/user/userSlice";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // Get the authenticated user details from the Redux store
  const { user } = useSelector((store) => store.auth);
  // Get user profile data from Redux store
  const { name, email, role, image } = useSelector((store) => store.user);

  // UserImage component to load the user's image dynamically with fallback
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

  // useEffect to fetch user data when component mounts or when user ID changes
  useEffect(() => {
    // Dispatch action to fetch user profile data using userId from the authenticated user
    dispatch(getUser(user.userId));
  }, [dispatch, user.userId]);

  return (
    <div className="p-xl-5 p-3">
      {/* Header section with back button and page title */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => navigate(-1)}    // Navigate back to the previous page
        >
          Back
        </button>
        <h1 className="m-0">User Profile</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
      <div className="text-center">
        {/* Rendering the user profile image */}
        <UserImage image={image} />
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
        {/* Button for navigating to the profile edit page */}
        <div className="mt-5 col-12 text-center ">
          <button
            className="px-3 py-1 edit-button shadow m-1"
            onClick={() => navigate("/editUserProfile")}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
