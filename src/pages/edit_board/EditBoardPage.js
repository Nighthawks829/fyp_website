import React from "react";
import { useNavigate } from "react-router";
import "./EditBoardPage.css";
import { TbUpload } from "react-icons/tb";

export default function EditBoardPage() {
  // const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="p-xl-5 p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          // onClick={() => navigate(`/viewBoard/${id}`)}
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h1 className="m-0">Edit Board</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
      <div className="text-center">
        <img
          src={require("../../assets/esp32.jpeg")}
          alt=""
          className="board-img"
        />
      </div>
      <div class="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-12 mb-3 text-center mx-auto mt-4 ">
        <label for="formFile" class="form-label upload-label mb-3">
          Upload Image <TbUpload size={20} />
        </label>
        <input
          class="form-control"
          type="file"
          id="formFile"
          accept=".jpg, .jpeg, .png"
        />
      </div>
      <form className="col-xxl-4 col-xl-5 col-lg-8 col-12 mx-auto mt-5">
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
              Type:
            </label>
          </div>
          <div className="col">
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-3">
            <label htmlFor="" className="col-form-label">
              Location:
            </label>
          </div>
          <div className="col">
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-3">
            <label htmlFor="" className="col-form-label">
              IP Address:
            </label>
          </div>
          <div className="col">
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className=" mt-5 col-12 text-center">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <button className="px-3 py-1 edit-button shadow m-1" type="submit">
              Edit
            </button>
            <button className="px-3 py-1 delete-button shadow m-1" type="reset">
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
