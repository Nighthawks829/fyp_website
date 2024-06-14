import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import defaultImage from "../../assets/profile.jpg";
import { getUser } from "../../stores/user/userSlice";

export default function UserProfilePage() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { name, email, role, image } = useSelector((store) => store.user);
  const dispatch = useDispatch();

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

  useEffect(() => {
    dispatch(getUser(user.userId));
  }, []);

  return (
    <div className="p-xl-5 p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h1 className="m-0">User Profile</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
      <div className="text-center">
        {/* <img
          src={require("../../assets/profile.jpg")}
          alt=""
          className="user-img"
        /> */}
        <UserImage image={image} />
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
        <div className="mt-5 col-12 text-center ">
          <button
            className="px-3 py-1 edit-button shadow m-1"
            onClick={() => navigate("/editUserProfile")}
          >
            Edit
          </button>
        </div>
      </div>
    </div>
  );
}
