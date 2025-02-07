import React, { useEffect } from "react";
import { useNavigate } from "react-router";
import "./AddNotificationPage.css";
import { useDispatch, useSelector } from "react-redux";
import {
  addNotification,
  clearNotificationValues,
  handleNotificationChange
} from "../../stores/notification/notificationSlice";
import { clearSensorValues, getSensor } from "../../stores/sensor/sensorSlice";

export default function AddNotificationPage() {
  // Get the necessary values from Redux store for notifications and sensor
  const { sensorId, name, message, threshold, condition, platform, address } =
    useSelector((store) => store.notification);
  // Get sensor name from sensor store
  const { name: sensorName } = useSelector((store) => store.sensor);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch sensor details based on the sensorId when the component is mounted
  useEffect(() => {
    dispatch(getSensor(sensorId));
    // eslint-disable-next-line
  }, []);

  // Handle user input changes and update the notification state
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleNotificationChange({ name, value }));
  };

  // Reset notification form values
  function handleResetButton() {
    dispatch(clearNotificationValues());
  }

  // Handle form submission to add a new notification
  async function handleAddNotification(e) {
    // Prevent default form submission behavior
    e.preventDefault();

    try {
      // Dispatch addNotification action to store the new notification in the backend
      await dispatch(
        addNotification({
          sensorId,
          name,
          message,
          threshold,
          condition,
          platform,
          address
        })
      ).unwrap(); // Unwrap to handle promise directly

      // Navigate back to the previous page after successful notification creation
      navigate(-1);
    } catch (error) { }
  }

  return (
    <div className="p-xl-5 p-3">
      <div className="text-start mb-4">
        {/* Back button: Clears notification and sensor data in Redux store and navigates back */}
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => {
            dispatch(clearNotificationValues());    // Clear notification form data
            dispatch(clearSensorValues());          // Clear sensor data
            navigate(-1);
          }}
        >
          Back
        </button>
      </div>

      {/* Title with sensor name */}
      <h3 className="text-center mt-2 fw-bold">When {sensorName}</h3>

      {/* Form to add a notification */}
      <form onSubmit={handleAddNotification}>
        {/* Condition dropdown for the notification */}
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

        {/* Sensor threshold input */}
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

        {/* Message input */}
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

        {/* Platform selection for sending the notification */}
        <h3 className="text-center mt-4">To</h3>
        <div className="text-center col-lg-6 col-md-8 col-12 mx-auto mt-4">
          <select
            className="form-select"
            aria-label=".form-select sensor-type"
            id="platform"
            name="platform"
            value={platform}
            required
            onChange={handleUserInput}    // Update platform value on change
          >
            <option value="telegram">Telegram</option>
            <option value="email">Email</option>
            <option value="whatsapp">WhatsApp</option>
            <option value="sms">SMS</option>
          </select>
        </div>

        {/* Address input based on the selected platform */}
        <div className="col-lg-8 col-md-10 col-12 mx-auto mt-4">
          <div className="row">
            <div className="col-md-3 col-12 d-flex justify-content-center align-items-center">
              <label htmlFor="address" className="form-label fw-bold m-0">
                {/* Dynamic label based on platform */}
                {platform === "telegram"
                  ? "Bot ID: "
                  : platform === "email"
                    ? "Email: "
                    : platform === "sms" || platform === "whatsapp"
                      ? "Phone Number: "
                      : ""}
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
                onChange={handleUserInput}    // Update address value on change
              />
            </div>
          </div>
        </div>

        {/* Form action buttons: Add and Clear */}
        <div className=" my-5 col-12 text-center">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            {/* Submit button to add the notification */}
            <button className="px-3 py-1 edit-button shadow m-1" type="submit">
              Add
            </button>
            {/* Reset button to clear the form */}
            <button
              className="px-3 py-1 delete-button shadow m-1"
              type="reset"
              // Clears the form fields
              onClick={() => handleResetButton()}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
