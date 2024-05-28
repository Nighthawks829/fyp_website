import React from "react";
import { useNavigate } from "react-router";
import "./ViewSensorPage.css";

export default function ViewSensorPage() {
  //   const { id } = useParams();
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

      <div className="text-center">
        <img
          src={require("../../assets/led.jpeg")}
          alt=""
          className="board-img"
        />
        <div className="mt-4 col-12 text-center">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <button className="px-3 py-1 edit-button shadow m-1">ON</button>
            <button className="px-3 py-1 delete-button shadow m-1">OFF</button>
          </div>
          <h3 className="mt-4">
            State: <span className="digital-value">ON</span>
          </h3>
        </div>
        <div className="col-lg-8 col-12 mx-auto mt-5">
          <div className="row">
            <div className="col-lg-6 col-12 mb-3">
              <h5 className="fw-bold">
                Name: <span className="board-data ms-1">Board1</span>
              </h5>
            </div>
            <div className="col-lg-6 col-12 mb-3">
              <h5 className="fw-bold">
                Pin: <span className="board-data ms-1">7</span>
              </h5>
            </div>
            <div className="col-lg-6 col-12 mb-3">
              <h5 className="fw-bold">
                Type: <span className="board-data ms-1">Digital Output</span>
              </h5>
            </div>
            <div className="col-lg-6 col-12 mb-3">
              <h5 className="fw-bold">
                Board: <span className="board-data ms-1">Board1</span>
              </h5>
            </div>
            <div className="col-lg-6 col-12 mb-3">
              <h5 className="fw-bold">
                Topic:{" "}
                <span className="board-data ms-1">
                  esp32/board1/output/led1
                </span>
              </h5>
            </div>
            <div className="col-lg-6 col-12 mb-3">
              <h5 className="fw-bold">
                State: <span className="board-data ms-1">ON</span>
              </h5>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-5 col-12 text-center ">
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          <button
            className="px-3 py-1 edit-button shadow m-1"
            onClick={() => navigate(`/editSensor/1`)}
          >
            Edit
          </button>
          <button className="px-3 py-1 delete-button shadow m-1">Delete</button>
        </div>
      </div>
    </div>
  );
}
