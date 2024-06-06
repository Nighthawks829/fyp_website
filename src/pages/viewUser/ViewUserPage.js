import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
// import { FaRegCircleUser } from "react-icons/fa6";
import "./ViewUserPage.css";

// import axios from "axios";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUser } from "../../stores/user/userSlice";

export default function ViewUserPage() {
  const { name, email, role, image } = useSelector((store) => store.user);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { id } = useParams();
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [role, setRole] = useState("");
  // const [image, setImage] = useState("");

  async function handleDeleteUser() {
    try {
      await dispatch(deleteUser(id)).unwrap();
      navigate(-1); // Navigate back to the previous page
    } catch (error) {}
    // const token = Cookies.get("token");

    // try {
    //   const response = await axios.delete(
    //     `http://192.168.0.110:3001/api/v1/user/${id}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //       withCredentials: true,
    //     }
    //   );

    //   if (response.status === 200) {
    //     toast.success("User deleted successfully");
    //     navigate(-1);
    //   }
    // } catch (error) {
    //   console.error(error);
    //   toast.error("Failed to delete user");
    // }
  }

  useEffect(() => {
    // async function getUser() {
    //   const token = Cookies.get("token"); // Get the JWT token from the cookies

    //   const response = await axios.get(
    //     `http://192.168.0.110:3001/api/v1/user/${id}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
    //       },
    //       withCredentials: true,
    //     }
    //   );

    //   if (response.status === 200) {
    //     setName(response.data.user.name);
    //     setEmail(response.data.user.email);
    //     setImage(response.data.user.image);
    //     setRole(response.data.user.role);
    //   }
    // }

    // getUser();
    dispatch(getUser(id));
  }, [id, dispatch]);

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
                Are you sure want to delete user Nighthawks?
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
            onClick={() => navigate(-1)}
          >
            Back
          </button>
        </div>
        <div className="text-center ">
          <img
            src={
              image === ""
                ? require("../../assets/profile.jpg")
                : require(`../../assets/${image}`)
            }
            alt=""
            className="user-img"
          />
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
