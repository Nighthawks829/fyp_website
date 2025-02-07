import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import {
  clearNotificationValues,
  editNotification,
  getNotification,
  handleNotificationChange
} from "../../stores/notification/notificationSlice";

export default function EditNotificationPage() {
  // Get the notification state from Redux store
  const {
    sensorId,
    name,
    sensorName,
    message,
    threshold,
    condition,
    platform,
    address
  } = useSelector((store) => store.notification);

  // Get the notification ID from route params 
  const { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Handle resetting the form fields by re-fetching the notification details
  function handleResetButton() {
    dispatch(getNotification(id));
  }

  // Handle user input changes and update the notification state accordingly
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleNotificationChange({ name, value }));
  };

  // useEffect hook to fetch the notification details when the component mounts or the notification ID changes
  useEffect(() => {
    // Dispatch action to fetch notification details by ID
    dispatch(getNotification(id));
  }, [dispatch, id]);

  // Handle form submission to update the notification
  async function handleEditNotification(e) {
    e.preventDefault();

    try {
      // Dispatch the action to edit the notification with the updated details
      await dispatch(
        editNotification({
          notificationId: id,
          notification: {
            sensorId,
            name,
            message,
            threshold,
            condition,
            platform,
            address
          }
        })
      ).unwrap();
      // Navigate back to the previous page after successful update
      navigate(-1);
    } catch (error) { }
  }

  return (
    <div className="p-xl-5 p-3">
      {/* Back Button: Navigates to the previous page and clears the notification values */}
      <div className="text-start mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => {
            dispatch(clearNotificationValues());  // Clear notification values from Redux state
            navigate(-1);   // Navigate back to the previous page
          }}
        >
          Back
        </button>
      </div>

      {/* Display sensor name dynamically */}
      <h3 className="text-center mt-2 fw-bold">When {sensorName}</h3>

      {/* Notification Edit Form */}
      <form onSubmit={handleEditNotification}>
        {/* Condition Dropdown: Allow user to select condition for notification */}
        <div className="text-center col-lg-6 col-md-8 col-12 mx-auto mt-4">
          <select
            className="form-select"
            aria-label=".form-select sensor-type"
            id="condition"
            name="condition"
            value={condition}
            required
            onChange={handleUserInput}    // Update condition in Redux state on change
          >
            <option value="bigger">bigger than</option>
            <option value="lower">lower than</option>
            <option value="equal">equal to</option>
          </select>
        </div>
        {/* Threshold input: Allow user to set the sensor value threshold */}
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
            onChange={handleUserInput}    // Update threshold value in Redux state
          />
        </div>
        {/* Message Input: User specifies the message to send when condition is met */}
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
        {/* Platform Selection Dropdown: Select the platform for message delivery */}
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
        {/* Address Input: Platform-specific address input (Bot ID or Email) */}
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
        {/* Action Buttons: Submit and reset form */}
        <div className=" my-5 col-12 text-center">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <button className="px-3 py-1 edit-button shadow m-1" type="submit">
              Edit
            </button>
            <button
              className="px-3 py-1 delete-button shadow m-1"
              type="reset"
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
