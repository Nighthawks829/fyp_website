import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./EditBoardPage.css";
import { TbUpload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBoardValues,
  editBoard,
  getBoard,
  handleBoardChange
} from "../../stores/board/boardSlice";

/**
 * EditBoardPage Component
 * This component allows users to edit an existing board's details, including name, type, location, IP address, and image.
 */
export default function EditBoardPage() {
  // Extract board details from Redux store
  const { name, type, location, ip_address, image } = useSelector(
    (store) => store.board
  );

  // Extract user details from Redux store
  const { user } = useSelector((store) => store.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get the board ID from the URL parameters
  const { id } = useParams();
  // State to store the selected file for image upload
  const [file, setFile] = useState("");

  /**
 * Reset form values by re-fetching the board details from the backend
 */
  function handleResetButton() {
    dispatch(getBoard(id));
  }

  /**
 * Handle input changes for text fields (name, type, location, IP address)
 * Updates the Redux store when the user types in a field
 */
  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleBoardChange({ name, value }));
  };

  /**
  * Handle file selection for image upload
  * Stores the selected file in the component state and updates the Redux store with the filename
  */
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      dispatch(handleBoardChange({ name: "image", value: file.name }));
    }
  };

  /**
 * Fetch the board details when the component mounts or when the board ID changes
 */
  useEffect(() => {
    dispatch(getBoard(id));
  }, [dispatch, id]);

  /**
 * Handle form submission to edit a board
 * Collects form data, sends it to the backend, and navigates back on success
 */
  async function handleEditBoard(e) {
    e.preventDefault();

    try {
      const userId = user.userId;
      const boardData = { userId, name, type, location, ip_address, image };

      // Create a FormData object to handle file uploads
      const formData = new FormData();
      for (const key in boardData) {
        formData.append(key, boardData[key]);
      }

      // Append image file if a new file is selected
      if (file) {
        formData.append("image", file);
      }

      // Dispatch the editBoard action with board ID and form data
      await dispatch(editBoard({ boardId: id, formData: formData })).unwrap();

      // Navigate back to the previous page on successful edit
      navigate(-1);
    } catch (error) { }
  }

  return (
    <div className="p-xl-5 p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        {/* Back button to navigate to the previous page */}
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => {
            navigate(-1);
            dispatch(clearBoardValues());
          }}
        >
          Back
        </button>
        <h1 className="m-0">Edit Board</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
      {/* Board Image Preview */}
      <div className="text-center">
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : image === ""
                ? require("../../assets/esp32.jpeg")
                : require(`../../../public/uploads/${image}`)
          }
          alt=""
          className="board-img"
        />
      </div>
      {/* Image Upload Input */}
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
      {/* Edit Board Form */}
      <form
        className="col-xxl-4 col-xl-5 col-lg-8 col-12 mx-auto mt-5"
        onSubmit={handleEditBoard}
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
              onChange={handleUserInput}
            />
          </div>
        </div>

        {/* Form Buttons */}
        <div className=" mt-5 col-12 text-center">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            {/* Submit Button to Edit Board */}
            <button className="px-3 py-1 edit-button shadow m-1" type="submit">
              Edit
            </button>
            {/* Reset Button to Reload Board Data */}
            <button
              className="px-3 py-1 delete-button shadow m-1"
              type="reset"
              onClick={() => {
                handleResetButton();
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
