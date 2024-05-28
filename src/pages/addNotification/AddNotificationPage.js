import React from "react";
import { useNavigate } from "react-router";
import "./AddNotificationPage.css";

export default function AddNotificationPage() {
  const navigate = useNavigate();

  return (
    <div className="p-xl-5 p-3">
      <div className="text-start mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => navigate("/notification")}
        >
          Back
        </button>
      </div>
      <h3 className="text-center mt-2 fw-bold">When temperature sensor 1</h3>
      <form>
        <div className="text-center col-lg-6 col-md-8 col-12 mx-auto mt-4">
          <select className="form-select" aria-label=".form-select sensor-type">
            <option value="bigger-than">bigger than</option>
            <option value="lower-than">lower than</option>
            <option value="equal">equal to</option>
          </select>
        </div>
        <div className="col-lg-6 col-md-8 col-12 mx-auto mt-4">
          <div className="text-center">
            <label htmlFor="" className="col-form-label fw-bold">
              Sensor Value
            </label>
          </div>
          <input type="number" className="form-control" />
        </div>
        <h3 className="text-center mt-4">Then</h3>
        <div className="col-lg-8 col-md-10 col-12 mx-auto mt-4">
          <div className="row">
            <div className="col-md-3 col-12 d-flex justify-content-center align-items-center">
              <label htmlFor="" className="form-label fw-bold">
                Send message:
              </label>
            </div>
            <div className="col-md-9 col-12">
              <textarea className="form-control" rows="5" />
            </div>
          </div>
        </div>
        <h3 className="text-center mt-4">To</h3>
        <div className="text-center col-lg-6 col-md-8 col-12 mx-auto mt-4">
          <select className="form-select" aria-label=".form-select sensor-type">
            <option value="telegram">Telegram</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div className="col-lg-8 col-md-10 col-12 mx-auto mt-4">
          <div className="row">
            <div className="col-md-3 col-12 d-flex justify-content-center align-items-center">
              <label htmlFor="" className="form-label fw-bold m-0">
                Bot ID:
              </label>
            </div>
            <div className="col-md-9 col-12">
              <input type="text" className="form-control" />
            </div>
          </div>
        </div>

        <div className=" my-5 col-12 text-center">
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
