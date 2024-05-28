import React from "react";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function SensorPage() {
  const navigate = useNavigate();
  return (
    <div className="p-xl-5 p-3">
      <div className="text-end mb-4">
        <button
          className="add-btn btn-primary fw-bold shadow px-3 py-1"
          onClick={() => navigate("/addSensor")}
        >
          + Sensor
        </button>
      </div>
      <table className="table">
        <thead>
          <th className="text-center" scope="col">
            Name
          </th>
          <th className="text-center" scope="col">
            Type
          </th>
          <th className="text-center" scope="col">
            Pin
          </th>
          <th className="text-center" scope="col">
            Board
          </th>
          <th className="text-center" scope="col">
            Topc
          </th>
          <th className="text-center" scope="col"></th>
        </thead>
        <tbody className="table-group-divider">
          <tr>
            <td className="text-center">
              <Link to='/viewSensor/1'>Sensor 1</Link>
            </td>
            <td className="text-center">Anaglog Input</td>
            <td className="text-center">2</td>
            <td className="text-center">Board1</td>
            <td className="text-center">esp32/board1/output</td>
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
                    <Link className="dropdown-item text-dark py-2 m-0" to='/editSensor/1'>
                      Edit
                    </Link>
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
