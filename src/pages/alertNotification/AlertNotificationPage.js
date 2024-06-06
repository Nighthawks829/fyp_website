import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMore } from "react-icons/io";

export default function AlertNotification() {
  const navigate = useNavigate();
  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="addAlert"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="addAlertLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-2">Select Sensor</h2>
              <h4 className="text-center mb-4">Sensor ID</h4>
              <input
                type="text"
                className="form-control border border-dark text-center"
                placeholder="Sensor ID"
              />
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  className="modal-next-button shadow"
                  data-bs-target="#addAlert2"
                  data-bs-toggle="modal"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal 3 */}
      <div
        className="modal fade"
        id="addAlert2"
        aria-hidden="true"
        aria-labelledby="addAlertLabel3"
        tabIndex="-1"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-2">Rename Alert</h2>
              <h4 className="text-center mb-4">
                Enter new name for this alert
              </h4>
              <input
                type="text"
                className="form-control border border-dark text-center"
                placeholder="Component Name"
              />
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </button>
                <button
                  className="modal-next-button shadow"
                  data-bs-target="#addAlert2"
                  data-bs-toggle="modal"
                  onClick={()=>navigate('/addNotification')}
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <div
        className="modal fade"
        id="deleteNotification"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="deleteNotificationLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-5">
                Are you sure want to delete Alert Water Level?
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
            data-bs-toggle="modal"
            data-bs-target="#addAlert"
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
                <Link >Alert Water Level</Link>
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
    </>
  );
}
