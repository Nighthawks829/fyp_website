import React from "react";
import { useNavigate, useParams } from "react-router";
// import { FaRegCircleUser } from "react-icons/fa6";
import "./ViewUserPage.css";
export default function ViewUserPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <>
      {/* Modal */}
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
                Are you sure want to delete user Nighthawks?
              </h2>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
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
      <div className="p-xl-5 p-3">
        <div className="text-start">
          <button
            className="back-btn btn-primary fw-bold shadow px-4 py-1"
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
        <div className="text-center ">
          {/* <FaRegCircleUser size={250} className="mt-3" /> */}
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
              Email:{" "}
              <span className="board-data">nighthawks0230@gmail.com</span>
            </h5>
          </div>
        </div>
        <div className="mt-5 col-12 text-center ">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <button
              className="px-3 py-1 edit-button shadow m-1"
              onClick={() => navigate("/editUser/1")}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 delete-button shadow m-1"
              data-bs-toggle="modal"
              data-bs-target="#deleteUser"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
