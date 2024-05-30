import React from "react";
import { useNavigate } from "react-router";

export default function UserProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="p-xl-5 p-3">
      <div className="text-start">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
      </div>
      <h3 className="text-center fw-bold mb-4">User Profile</h3>
      <div className="text-center">
        <img
          src={require("../../assets/profile.jpg")}
          alt=""
          className="user-img"
        />
        <div className="mt-5">
          <h5 className="mb-3 fw-bold">
            Name: <span className="board-data">Nighthawks</span>
          </h5>
          <h5 className="mb-3 fw-bold">
            Role: <span className="board-data">Admin</span>
          </h5>
          <h5 className="mb-3 fw-bold">
            Email: <span className="board-data">nighthawks0230@gmail.com</span>
          </h5>
        </div>
        <div className="mt-5 col-12 text-center ">
            <button
              className="px-3 py-1 edit-button shadow m-1"
              onClick={() => navigate("/editProfile")}
            >
              Edit
            </button>
        </div>
      </div>
    </div>
  );
}
