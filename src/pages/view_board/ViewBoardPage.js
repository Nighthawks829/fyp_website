import React from "react";
import { useNavigate, useParams } from "react-router";
import "./ViewBoardPage.css";
import ESP32 from "../../assets/esp32.jpeg";

import { IoIosMore } from "react-icons/io";

export default function ViewBoard() {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <div className="p-5">
      <div className="text-start">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => navigate("/board")}
        >
          Back
        </button>
      </div>
      <div className="text-center">
        <img src={ESP32} alt="" className="board-img" />
        <div className="col-lg-6 col-12 mx-auto mt-5">
          <div className="row">
            <div className="col-md-6 col-12 mb-3">
              <h5 className="fw-bold">
                Name: <span className="board-data ms-1">Board1</span>
              </h5>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <h5 className="fw-bold">
                Location: <span className="board-data ms-1">Home</span>
              </h5>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <h5 className="fw-bold">
                Type: <span className="board-data ms-1">ESP32</span>
              </h5>
            </div>
            <div className="col-md-6 col-12 mb-3">
              <h5 className="fw-bold">
                IP Address: <span className="board-data ms-1">10.0.0.100</span>
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="mb-4">Associated Sensors</h4>
        <table className="table">
          <thead>
            <th scope="col" className="text-center col-3">
              Name
            </th>
            <th scope="col" className="text-center col-3">
              Type
            </th>
            <th scope="col" className="text-center col-3">
              Pin
            </th>
            <th scope="col" className="text-center col-3"></th>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <td className="text-center py-2">ESP32</td>
              <td className="text-center py-2">Home</td>
              <td className="text-center py-2">10.0.0.100</td>
              <td className="text-center py-2 action">
                <div className="dropdown">
                  <IoIosMore
                    size={25}
                    className="dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <ul className="dropdown-menu py-3">
                    <li className="ps-1 pe-2 mb-2">
                      <a className="dropdown-item text-dark py-2 m-0" href="/">
                        Edit
                      </a>
                    </li>
                    <li className="ps-1 pe-2">
                      <a
                        className="dropdown-item text-danger py-2 m-0 mb-1"
                        href="/"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>

            <tr>
              <td className="text-center py-2">ESP32</td>
              <td className="text-center py-2">Home</td>
              <td className="text-center py-2">10.0.0.100</td>
              <td className="text-center py-2 action">
                <div className="dropdown">
                  <IoIosMore
                    size={25}
                    className="dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <ul className="dropdown-menu py-3">
                    <li className="ps-1 pe-2 mb-2">
                      <a className="dropdown-item text-dark py-2 m-0" href="/">
                        Edit
                      </a>
                    </li>
                    <li className="ps-1 pe-2">
                      <a
                        className="dropdown-item text-danger py-2 m-0 mb-1"
                        href="/"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>

            <tr>
              <td className="text-center py-2">ESP32</td>
              <td className="text-center py-2">Home</td>
              <td className="text-center py-2">10.0.0.100</td>
              <td className="text-center py-2 action">
                <div className="dropdown">
                  <IoIosMore
                    size={25}
                    className="dropdown-toggle"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  />
                  <ul className="dropdown-menu py-3">
                    <li className="ps-1 pe-2 mb-2">
                      <a className="dropdown-item text-dark py-2 m-0" href="/">
                        Edit
                      </a>
                    </li>
                    <li className="ps-1 pe-2">
                      <a
                        className="dropdown-item text-danger py-2 m-0 mb-1"
                        href="/"
                      >
                        Delete
                      </a>
                    </li>
                  </ul>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="mt-5 col-12 text-center ">
        <div className="d-flex flex-wrap align-items-center justify-content-center">
          <button
            className="px-3 py-1 edit-button shadow m-1"
            onClick={() => navigate(`/editBoard/${id}`)}
          >
            Edit
          </button>
          <button className="px-3 py-1 delete-button shadow m-1">Delete</button>
        </div>
      </div>
    </div>
  );
}
