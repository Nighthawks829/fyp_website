import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { TbUpload } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSensorValues,
  editSensor,
  getSensor,
  handleSensorChange,
} from "../../stores/sensor/sensorSlice";
import { getAllBoards } from "../../stores/allBoards/allBoardsSlice";

export default function EditSensorPage() {
  const { id } = useParams();
  const { name, type, topic, pin, boardId, image } = useSelector(
    (store) => store.sensor
  );
  const { boards } = useSelector((store) => store.allBoards);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [file, setFile] = useState("");

  useEffect(() => {
    dispatch(getSensor(id));
    dispatch(getAllBoards());
  }, [dispatch, id]);

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleSensorChange({ name, value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFile(file);
      dispatch(handleSensorChange({ name: "image", value: file.name }));
    }
  };

  async function handleEditSensor(e) {
    e.preventDefault();

    try {
      const sensorData = { name, type, topic, pin, boardId, image };
      const formData = new FormData();
      for (const key in sensorData) {
        formData.append(key, sensorData[key]);
      }
      if (file) {
        formData.append("image", file);
      }
      await dispatch(editSensor({ sensorId: id, formData })).unwrap();
      navigate(-1);
    } catch (error) {}
  }

  return (
    <div className="p-xl-5 p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => {
            dispatch(clearSensorValues());
            navigate(-1);
          }}
        >
          Back
        </button>
        <h1 className="m-0">Edit Sensor</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
      <div className="text-center">
        <img
          src={
            file
              ? URL.createObjectURL(file)
              : image === ""
              ? require("../../assets/led.jpeg")
              : require(`../../../public/uploads/${image}`)
          }
          alt=""
          className="board-img"
        />
      </div>
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
      <form
        className="col-xxl-4 col-xl-5 col-lg-8 col-12 mx-auto mt-5"
        onSubmit={handleEditSensor}
      >
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

        <div className="row mb-4">
          <div className="col-3">
            <label htmlFor="type" className="col-form-label">
              Type:
            </label>
          </div>
          <div className="col">
            <select
              className="form-select"
              aria-label=".form-select sensor-type"
              id="type"
              name="type"
              required
              value={type}
              onChange={handleUserInput}
            >
              <option value="Digital Input">Digital Input</option>
              <option value="Digital Output">Digital Output</option>
              <option value="Analog Input">Analog Input</option>
              <option value="Analog Output">Analog Output</option>
            </select>
          </div>
        </div>

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

        <div className=" mt-5 col-12 text-center">
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
