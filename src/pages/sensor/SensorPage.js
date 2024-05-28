import React from "react";
import { IoIosMore } from "react-icons/io";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

export default function SensorPage() {
  const navigate = useNavigate();
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="deleteSensor"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="deleteSensorLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-5">
                Are you sure want to delete Sensor 1?
              </h2>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                >
                  Yes
                </button>
                <button
                  className="modal-next-button shadow"
                  data-bs-dismiss="modal"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

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
            <tr>
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
            </tr>
          </thead>
          <tbody className="table-group-divider">
            <tr>
              <td className="text-center">
                <Link to="/viewSensor/1">Sensor 1</Link>
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
                      <Link
                        className="dropdown-item text-dark py-2 m-0"
                        to="/editSensor/1"
                      >
                        Edit
                      </Link>
                    </li>
                    <li className="ps-1 pe-2">
                      <button
                        className="dropdown-item text-danger py-2 m-0 mb-1"
                        data-bs-toggle="modal"
                        data-bs-target="#deleteSensor"
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
    </>
  );
}
