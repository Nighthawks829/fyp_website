import React from "react";
import { TbUpload } from "react-icons/tb";
import { useNavigate } from "react-router";

export default function EditUserProfilePage() {
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
        <h1 className="m-0">Edit User Profile</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
      <div className="text-center">
        <img
          src={require("../../assets/profile.jpg")}
          alt=""
          className="user-img"
        />
      </div>
      <form>
        <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-12 mb-3 text-center mx-auto mt-4 ">
          <label htmlFor="formFile" className="form-label upload-label mb-3">
            Upload Image <TbUpload size={20} />
          </label>
          <input
            className="form-control"
            type="file"
            id="formFile"
            accept=".jpg, .jpeg, .png"
          />
        </div>
        <div className="col-xxl-9 col-xl-19 col-lg-10 col-12 mx-auto mt-5">
          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="" className="col-form-label">
                Name:
              </label>
            </div>
            <div className="col">
              <input type="text" className="form-control" />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="" className="col-form-label">
                Email:
              </label>
            </div>
            <div className="col">
              <input type="email" className="form-control" />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="" className="col-form-label">
                Password
              </label>
            </div>
            <div className="col">
              <input type="password" className="form-control" />
            </div>
          </div>

          <div className="row mb-4 align-items-center">
            <div className="col-3">
              <label htmlFor="" className="col-form-label">
                Confirm Password
              </label>
            </div>
            <div className="col">
              <input type="password" className="form-control" />
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
