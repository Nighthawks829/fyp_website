import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  clearNotificationValues,
  editNotification,
  getNotification,
  handleNotificationChange,
} from "../../stores/notification/notificationSlice";

export default function EditNotificationPage() {
  const { sensorId, name, message, threshold, condition, platform, address } =
    useSelector((store) => store.notification);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const { id } = useParams();
  const navigate = useNavigate();

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleNotificationChange({ name, value }));
  };

  useEffect(() => {
    dispatch(getNotification(id));
  }, [dispatch, id]);

  async function handleEditNotification(e) {
    e.preventDefault();

    try {
      const userId = user.userId;
      await dispatch(
        editNotification({
          notificationId: id,
          notification: {
            userId,
            sensorId,
            name,
            message,
            threshold,
            condition,
            platform,
            address,
          },
        })
      ).unwrap();
      navigate(-1);
    } catch (error) {}
  }

  return (
    <div className="p-xl-5 p-3">
      <div className="text-start mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => {
            dispatch(clearNotificationValues());
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>

      <h3 className="text-center mt-2 fw-bold">When temperature sensor 1</h3>
      <form onSubmit={handleEditNotification}>
        <div className="text-center col-lg-6 col-md-8 col-12 mx-auto mt-4">
          <select
            className="form-select"
            aria-label=".form-select sensor-type"
            id="condition"
            name="condition"
            value={condition}
            required
            onChange={handleUserInput}
          >
            <option value="bigger">bigger than</option>
            <option value="lower">lower than</option>
            <option value="equal">equal to</option>
          </select>
        </div>
        <div className="col-lg-6 col-md-8 col-12 mx-auto mt-4">
          <div className="text-center">
            <label htmlFor="threshold" className="col-form-label fw-bold">
              Sensor Value
            </label>
          </div>
          <input
            type="number"
            className="form-control"
            id="threshold"
            name="threshold"
            value={threshold}
            required
            onChange={handleUserInput}
          />
        </div>
        <h3 className="text-center mt-4">Then</h3>
        <div className="col-lg-8 col-md-10 col-12 mx-auto mt-4">
          <div className="row">
            <div className="col-md-3 col-12 d-flex justify-content-center align-items-center">
              <label htmlFor="message" className="form-label fw-bold">
                Send message:
              </label>
            </div>
            <div className="col-md-9 col-12">
              <textarea
                className="form-control"
                rows="5"
                id="message"
                name="message"
                value={message}
                required
                onChange={handleUserInput}
              />
            </div>
          </div>
        </div>
        <h3 className="text-center mt-4">To</h3>
        <div className="text-center col-lg-6 col-md-8 col-12 mx-auto mt-4">
          <select
            className="form-select"
            aria-label=".form-select sensor-type"
            id="platform"
            name="platform"
            value={platform}
            required
            onChange={handleUserInput}
          >
            <option value="telegram">Telegram</option>
            <option value="email">Email</option>
          </select>
        </div>
        <div className="col-lg-8 col-md-10 col-12 mx-auto mt-4">
          <div className="row">
            <div className="col-md-3 col-12 d-flex justify-content-center align-items-center">
              <label htmlFor="address" className="form-label fw-bold m-0">
                Bot ID:
              </label>
            </div>
            <div className="col-md-9 col-12">
              <input
                type="text"
                className="form-control"
                id="address"
                name="address"
                value={address}
                required
                onChange={handleUserInput}
              />
            </div>
          </div>
        </div>

        <div className=" my-5 col-12 text-center">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <button className="px-3 py-1 edit-button shadow m-1" type="submit">
              Edit
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
