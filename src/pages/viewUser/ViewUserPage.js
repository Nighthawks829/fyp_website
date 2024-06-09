import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import "./ViewUserPage.css";

import { useDispatch, useSelector } from "react-redux";
import {
  clearUserValues,
  deleteUser,
  getUser,
} from "../../stores/user/userSlice";
import defaultImage from "../../assets/profile.jpg";

export default function ViewUserPage() {
  const { name, email, role, image } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();

  async function handleDeleteUser() {
    try {
      await dispatch(deleteUser(id)).unwrap();
      navigate(-1); // Navigate back to the previous page
    } catch (error) {}
  }

  useEffect(() => {
    dispatch(getUser(id));
  }, [id, dispatch]);

  const UserImage = ({ image }) => {
    const [imgSrc, setImgSrc] = useState("");

    useEffect(() => {
      try {
        setImgSrc(require(`../../../public/uploads/${image}`));
      } catch (error) {
        setImgSrc(defaultImage);
      }
    }, [image]);

    return <img src={imgSrc} alt="" className="user-img" />;
  };


  return (
    <>
      {/* Modal */}
      <div
        className="modal fade"
        id="deleteUser"
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
                Are you sure want to delete user {name}?
              </h2>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => handleDeleteUser()}
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
        <div className="text-start">
          <button
            className="back-btn btn-primary fw-bold shadow px-4 py-1"
            onClick={() => {
              dispatch(clearUserValues());
              navigate(-1);
            }}
          >
            Back
          </button>
        </div>
        <div className="text-center ">
          <UserImage image={image} />
          {/* <img
            src={
              image === ""
                ? require("../../assets/profile.jpg")
                : require(`../../../public/uploads/${image}`)
            }
            alt=""
            className="user-img"
          /> */}
          <div className="mt-5">
            <h5 className="mb-3 fw-bold">
              Name: <span className="board-data">{name}</span>
            </h5>
            <h5 className="mb-3 fw-bold">
              Role: <span className="board-data">{role}</span>
            </h5>
            <h5 className="mb-3 fw-bold">
              Email: <span className="board-data">{email}</span>
            </h5>
          </div>
        </div>
        <div className="mt-5 col-12 text-center ">
          <div className="d-flex flex-wrap align-items-center justify-content-center">
            <button
              className="px-3 py-1 edit-button shadow m-1"
              onClick={() => navigate(`/editUser/${id}`)}
            >
              Edit
            </button>
            <button
              className="px-3 py-1 delete-button shadow m-1"
              data-bs-toggle="modal"
              data-bs-target="#deleteUser"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
