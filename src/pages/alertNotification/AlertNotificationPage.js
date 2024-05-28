import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMore } from "react-icons/io";

export default function AlertNotification() {
  const navigate = useNavigate();
  return (
    <div className="p-xl-5 p-3">
      <div className="text-end mb-4">
        <button
          className="add-btn btn-primary fw-bold shadow px-3 py-1"
          onClick={() => navigate("/addNotification")}
        >
          + Alert
        </button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="text-center" scope="col">
              Name
            </th>
            <th className="text-center" scope="col">
              Sensor
            </th>
            <th className="text-center" scope="col">
              Threshold
            </th>
            <th className="text-center" scope="col">
              Platform
            </th>
            <th className="text-center" scope="col"></th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          <tr>
            <td className="text-center">
              <Link to="/viewNotification/1">Alert Water Level</Link>
            </td>
            <td className="text-center">Water Sensor 1</td>
            <td className="text-center">500</td>
            <td className="text-center">Email</td>
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
                    <Link
                      className="dropdown-item text-dark py-2 m-0"
                      to="/editNotification/1"
                    >
                      Edit
                    </Link>
                  </li>
                  <li className="ps-1 pe-2">
                    <button
                      className="dropdown-item text-danger py-2 m-0 mb-1"
                      data-bs-toggle="modal"
                      data-bs-target="#deleteNotification"
                    >
                      Delete
                    </button>
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
