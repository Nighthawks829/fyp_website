import React from "react";

import { LiaRobotSolid } from "react-icons/lia";

import "./NotFound.css";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="vh-100 d-flex align-items-center justify-content-center background-image">
      <div className="w-75 h-75 bg-white p-5 rounded shadow text-center d-flex flex-column align-items-center justify-content-center">
        <LiaRobotSolid size={250} />
        <h1 className="display-1 fw-bold m-0">404</h1>
        <h2 className="display-4 fw-bold mb-4">OOPS! PAGE NOT FOUND</h2>
        <h6 className="display-6 mb-5">
          Sorry, the page you're looking for doesn't exist.
        </h6>
        <Link to="/">
          <button className="display-6 btn btn-primary fw-bold shadow back-btn">
            RETURN HOME
          </button>
        </Link>
      </div>
    </div>
  );
}
