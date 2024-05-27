import React from "react";

import "./BoardPage.css";

import { IoIosMore } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

export default function BoardPage() {
  const navigate = useNavigate();

  return (
    <div className="p-5 w-100">
      <div className="text-end mb-4">
        <button
          className="add-btn btn-primary fw-bold shadow px-3 py-1"
          onClick={() => navigate("/addBoard")}
        >
          + Board
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th scope="col" className="text-center col-3">
              Name
            </th>
            <th scope="col" className="text-center col-2">
              Type
            </th>
            <th scope="col" className="text-center col-3">
              Location
            </th>
            <th scope="col" className="text-center col-3">
              IP Address
            </th>
            <th scope="col" className="text-center col-1"></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr className="">
            <td className="text-center py-2 text-decoration-underline text-primary">
              <Link to="/viewBoard/1">Board</Link>
            </td>
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
          <tr className="">
            <td className="text-center py-2 text-decoration-underline text-primary">
              Board 2
            </td>
            <td className="text-center py-2">ESP32</td>
            <td className="text-center py-2">Bed Room</td>
            <td className="text-center py-2">10.0.0.200</td>
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
  );
}
