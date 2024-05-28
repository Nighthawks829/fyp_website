import React from "react";
import { useNavigate } from "react-router";
import { TbUpload } from "react-icons/tb";

export default function AddSensorPage() {
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
        <h1 className="m-0">Add Sensor</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
      <div className="text-center">
        <img
          src={require("../../assets/led.jpeg")}
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
            <select
              className="form-select"
              aria-label=".form-select sensor-type"
            >
              <option value="digital-input">Digital Input</option>
              <option value="digital_output">Digital Output</option>
              <option value="analog_input">Analog Input</option>
              <option value="analog_output">Analog Output</option>
            </select>
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-3">
            <label htmlFor="" className="col-form-label">
              Topic
            </label>
          </div>
          <div className="col">
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-3">
            <label htmlFor="" className="col-form-label">
              Pin:
            </label>
          </div>
          <div className="col">
            <input type="text" className="form-control" />
          </div>
        </div>

        <div className="row mb-4">
          <div className="col-3">
            <label htmlFor="" className="col-form-label">
              Board:
            </label>
          </div>
          <div className="col">
            <select class="form-select" aria-label=".form-select sensor-board">
              <option value="1">Board1</option>
              <option value="2">Board2</option>
              <option value="3">Board3</option>
            </select>
          </div>
        </div>

        <div className=" mt-5 col-12 text-center">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <button className="px-3 py-1 edit-button shadow m-1" type="submit">
              Add
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
