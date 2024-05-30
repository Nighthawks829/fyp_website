import React from "react";
import { useNavigate } from "react-router";

export default function UserProfilePage() {
  const navigate = useNavigate();

  return (
    <div className="p-xl-5 p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h1 className="m-0">User Profile</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
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
            onClick={() => navigate("/editUserProfile")}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
