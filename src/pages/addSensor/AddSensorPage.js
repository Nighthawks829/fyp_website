import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TbUpload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  addSensor,
  clearSensorValues,
  handleSensorChange
} from "../../stores/sensor/sensorSlice";
import { getAllBoards } from "../../stores/allBoards/allBoardsSlice";

export default function AddSensorPage() {
  // Get sensor data and boards from the Redux store
  const { name, type, topic, pin, boardId, image } = useSelector(
    (store) => store.sensor
  );
  // Get current user info
  const { user } = useSelector((store) => store.auth);
  // Get available boards
  const { boards } = useSelector((store) => store.allBoards);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to handle file (image) input
  const [file, setFile] = useState("");

  // Fetch boards and clear sensor data when the component mounts
  useEffect(() => {
    // Clear previous sensor values
    dispatch(clearSensorValues());
    // Get all available boards for selection
    dispatch(getAllBoards());
  }, [dispatch]);

  // Handler for updating the sensor input fields in the state
  const handleUserInput = (e) => {
    const name = e.target.name;   // Get the name of the input field
    const value = e.target.value; // Get the value entered by the user
    // Dispatch action to update sensor state
    dispatch(handleSensorChange({ name, value }));
  };

  // Handler for file input (image) change
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      // Store image filename in state
      dispatch(handleSensorChange({ name: "image", value: file.name }));
    }
  };

  // Reset the form and clear sensor values in the state
  function handleResetButton() {
    dispatch(clearSensorValues());
  }

  // Handler for adding a new sensor
  async function handleAddSensor(e) {
    e.preventDefault();   // Prevent default form submission

    try {
      // Create form data object to send along with the request
      const userId = user.userId;
      const sensorData = { userId, name, type, topic, pin, boardId, image };
      const formData = new FormData();

      for (const key in sensorData) {
        // Append each field to form data
        formData.append(key, sensorData[key]);
      }

      if (file) {
        // Append image file if selected
        formData.append("image", file);
      }

      // Dispatch the addSensor action with the form data
      await dispatch(addSensor(formData)).unwrap();

      // Navigate back to the previous page upon success
      navigate(-1);
    } catch (error) { }
  }

  return (
    <div className="p-xl-5 p-3">
      {/* Back button with navigation */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => {
            dispatch(clearSensorValues());    // Clear any previous form data
            navigate(-1);   // Navigate back to the previous page
          }}
        >
          Back
        </button>
        <h1 className="m-0">Add Sensor</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
      {/* Sensor image upload */}
      <div className="text-center">
        <img
          src={require("../../assets/led.jpeg")}
          alt=""
          className="board-img"
        />
      </div>
      {/* Form for adding a new sensor */}
      <form onSubmit={handleAddSensor}>
        <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-12 mb-3 text-center mx-auto mt-4 ">
          <label htmlFor="image" className="form-label upload-label mb-3">
            Upload Image <TbUpload size={20} />
          </label>
          <input
            className="form-control"
            type="file"
            id="image"
            name="image"
            accept=".jpg, .jpeg, .png"
            onChange={handleFileChange}
          />
        </div>

        {/* Sensor details inputs */}
        <div className="col-xxl-4 col-xl-5 col-lg-8 col-12 mx-auto mt-5">
          {/* Name input */}
          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="name" className="col-form-label">
                Name:
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={name}
                required
                onChange={handleUserInput}
              />
            </div>
          </div>

          {/* Type dropdown */}
          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="type" className="col-form-label">
                Type:
              </label>
            </div>
            <div className="col">
              <select
                className="form-select"
                aria-label="form-select sensor-type"
                id="type"
                name="type"
                value={type}
                onChange={handleUserInput}
              >
                {/* Sensor type options */}
                <option value="Digital Input">Digital Input</option>
                <option value="Digital Output">Digital Output</option>
                <option value="Analog Input">Analog Input</option>
                <option value="Analog Output">Analog Output</option>
              </select>
            </div>
          </div>

          {/* Topic input */}
          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="topic" className="col-form-label">
                Topic
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="topic"
                name="topic"
                value={topic}
                required
                onChange={handleUserInput}
              />
            </div>
          </div>

          {/* Pin input */}
          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="pin" className="col-form-label">
                Pin:
              </label>
            </div>
            <div className="col">
              <input
                type="text"
                className="form-control"
                id="pin"
                name="pin"
                value={pin}
                required
                onChange={handleUserInput}
              />
            </div>
          </div>

          {/* Board selection */}
          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="boardId" className="col-form-label">
                Board:
              </label>
            </div>
            <div className="col">
              <select
                className="form-select"
                aria-label=".form-select sensor-board"
                id="boardId"
                name="boardId"
                value={boardId}
                required
                onChange={handleUserInput}
              >
                <option value="">Select Board Name</option>
                {boards
                  ? boards.map((board) => (
                    <option key={board.id} value={board.id}>
                      {board.name} ({board.id})
                    </option>
                  ))
                  : null}
              </select>
            </div>
          </div>

          {/* Submit and Reset buttons */}
          <div className=" mt-5 col-12 text-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <button
                className="px-3 py-1 edit-button shadow m-1"
                type="submit"
              >
                Add
              </button>
              <button
                className="px-3 py-1 delete-button shadow m-1"
                type="reset"
                onClick={() => handleResetButton()}   // Clear form fields
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
