import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { TbUpload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  addBoard,           // Action to add a new board
  clearBoardValues,   // Action to clear input values
  handleBoardChange   // Action to update form input state
} from "../../stores/board/boardSlice";
import { toast } from "react-toastify";

export default function AddBoardPage() {
  // Extracting board form state from Redux store
  const { name, type, location, ip_address, image } = useSelector(
    (store) => store.board
  );

  // Extracting user authentication state from Redux store
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Local state to store selected file for image upload
  const [file, setFile] = useState("");

  // Clears the form values when the component mounts
  useEffect(() => {
    dispatch(clearBoardValues());
  }, []);


  // Function to reset form inputs
  function handleResetButton() {
    dispatch(clearBoardValues());
  }

  // Handles user input changes and updates the Redux store
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleBoardChange({ name, value }));
  };

  // Handles file input change and updates the selected file state
  const handleFileChange = (e) => {
    const file = e.target.files[0];   // Get the selected file
    if (file) {
      setFile(file);    // Update local state
      dispatch(handleBoardChange({ name: "image", value: file.name }));   // Update Redux state
    }
  };

  // Handles form submission to add a new board
  async function handleAddBoard(e) {
    e.preventDefault();   // Prevent default form submission behavior

    try {
      const userId = user.userId;
      const boardData = { userId, name, type, location, ip_address, image };

      // Create a new FormData object for file uploads
      const formData = new FormData();

      for (const key in boardData) {
        // Append board data to FormData
        formData.append(key, boardData[key]);
      }

      if (file) {
        // Append selected file if exists
        formData.append("image", file);
      }

      // Dispatch action to add the board
      await dispatch(addBoard(formData)).unwrap();

      // Navigate back after successful submission
      navigate(-1);
    } catch (error) {
      toast.error(error);   // Show error notification if submission fails
    }
  }

  return (
    <div className="p-xl-5 p-3">
      {/* Header Section */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Back Button */}
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => {
            dispatch(clearBoardValues());
            navigate(-1);
          }}
        >
          Back
        </button>
        <h1 className="m-0">Add Board</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>

      {/* Image Upload Section */}
      <div className="text-center">
        <img
          src={require("../../assets/esp32.jpeg")}
          alt=""
          className="board-img"
        />
      </div>

      {/* File Upload Input */}
      <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-12 mb-3 text-center mx-auto mt-4 ">
        <label htmlFor="formFile" className="form-label upload-label mb-3">
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

      {/* Add Board Form */}
      <form
        className="col-xxl-4 col-xl-5 col-lg-8 col-12 mx-auto mt-5"
        onSubmit={handleAddBoard}
      >
        {/* Name Input Field */}
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

        {/* Type Input Field */}
        <div className="row mb-4">
          <div className="col-3">
            <label htmlFor="type" className="col-form-label">
              Type:
            </label>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="type"
              name="type"
              value={type}
              required
              onChange={handleUserInput}
            />
          </div>
        </div>

        {/* Location Input Field */}
        <div className="row mb-4">
          <div className="col-3">
            <label htmlFor="location" className="col-form-label">
              Location:
            </label>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="location"
              name="location"
              value={location}
              required
              onChange={handleUserInput}
            />
          </div>
        </div>

        {/* IP Address Input Field */}
        <div className="row mb-4">
          <div className="col-3">
            <label htmlFor="ip_address" className="col-form-label">
              IP Address:
            </label>
          </div>
          <div className="col">
            <input
              type="text"
              className="form-control"
              id="ip_address"
              name="ip_address"
              value={ip_address}
              required
              onChange={handleUserInput}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className=" mt-5 col-12 text-center">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <button className="px-3 py-1 edit-button shadow m-1" type="submit">
              Add
            </button>

            {/* Clear Form Button */}
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
