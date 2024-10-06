import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMore } from "react-icons/io";
import { getAllNotifications } from "../../stores/allNotifications/allNotificationsSlice";
import { useDispatch, useSelector } from "react-redux";
import {
  clearNotificationValues,
  deleteNotification,
  handleNotificationChange
} from "../../stores/notification/notificationSlice";
import { toast } from "react-toastify";
import { Modal, Form } from "react-bootstrap";
import { getSensor } from "../../stores/sensor/sensorSlice";

export default function AlertNotification() {
  const navigate = useNavigate();
  const { sensorId, name } = useSelector((store) => store.notification);
  const { notifications } = useSelector((store) => store.allNotifications);

  const [deleteNotificationId, setDeleteNotificationId] = useState("");
  const [deleteNotificationName, setDeleteNotificationName] = useState("");

  const [showFirstModal, setShowFirstModal] = useState(false);
  const [showSecondModal, setShowSecondModal] = useState(false);

  const dispatch = useDispatch();

  async function handleDeleteNotification(params) {
    dispatch(deleteNotification(deleteNotificationId));
    dispatch(getAllNotifications());
  }

  useEffect(() => {
    dispatch(getAllNotifications());
  }, [dispatch]);

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleNotificationChange({ name, value }));
  };

  const handleAddNotification = (e) => {
    setShowSecondModal(false);
    if (sensorId === "" || name === "") {
      toast.error("Please provide all values");
      dispatch(clearNotificationValues());
      return;
    } else {
      navigate("/addNotification");
    }
  };

  async function handleNext() {
    try {
      const response = await dispatch(getSensor(sensorId)).unwrap();
      if (response.sensorId !== null) {
        setShowFirstModal(false);
        setShowSecondModal(true);
      }
    } catch (error) {
      dispatch(clearNotificationValues());
      setShowFirstModal(false);
      setShowSecondModal(false);
    }
  }

  return (
    <>
      <Modal
        show={showFirstModal}
        onHide={() => {
          setShowFirstModal(false);
          dispatch(clearNotificationValues());
        }}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="p-5 shadow">
          <h2 className="text-center mb-2">Select Sensor</h2>
          <h4 className="text-center mb-4">Sensor ID</h4>
          <Form.Control
            type="text"
            className="border border-dark text-center"
            placeholder="Sensor ID"
            id="sensorId"
            name="sensorId"
            required
            onChange={handleUserInput}
            value={sensorId}
          />
          <div className="d-flex align-items-center justify-content-evenly mt-5">
            <button
              className="modal-cancel-button shadow"
              onClick={() => {
                setShowFirstModal(false);
                dispatch(clearNotificationValues());
              }}
            >
              Cancel
            </button>
            <button className="modal-next-button shadow" onClick={handleNext}>
              Next
            </button>
          </div>
        </Modal.Body>
      </Modal>

      {/* Second Modal */}
      <Modal
        show={showSecondModal}
        onHide={() => {
          setShowSecondModal(false);
          dispatch(clearNotificationValues());
        }}
        backdrop="static"
        keyboard={false}
        centered
      >
        <Modal.Body className="p-5 shadow">
          <h2 className="text-center mb-2">Rename Alert</h2>
          <h4 className="text-center mb-4">Enter new name for this alert</h4>
          <Form.Control
            type="text"
            className="border border-dark text-center"
            placeholder="Alert Name"
            id="name"
            name="name"
            value={name}
            required
            onChange={handleUserInput}
          />
          <div className="d-flex align-items-center justify-content-evenly mt-5">
            <button
              className="modal-cancel-button shadow"
              onClick={() => {
                setShowSecondModal(false);
                dispatch(clearNotificationValues());
              }}
            >
              Cancel
            </button>
            <button
              className="modal-next-button shadow"
              onClick={() => handleAddNotification()}
            >
              Next
            </button>
          </div>
        </Modal.Body>
      </Modal>

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
                Are you sure want to delete {deleteNotificationName}?
              </h2>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => handleDeleteNotification()}
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
            onClick={() => {
              setShowFirstModal(true);
            }}
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
            {notifications
              ? notifications.map((notification) => (
                  <tr key={notification.id}>
                    <td className="text-center">
                      <Link>{notification.name}</Link>
                    </td>
                    <td className="text-center">{notification.sensorName}</td>
                    <td className="text-center">{notification.threshold}</td>
                    <td className="text-center">{notification.platform}</td>
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
                              to={`/editNotification/${notification.id}`}
                            >
                              Edit
                            </Link>
                          </li>
                          <li className="ps-1 pe-2">
                            <button
                              className="dropdown-item text-danger py-2 m-0 mb-1"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteNotification"
                              onClick={() => {
                                setDeleteNotificationId(notification.id);
                                setDeleteNotificationName(notification.name);
                              }}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
