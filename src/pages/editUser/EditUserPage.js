import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { TbUpload } from "react-icons/tb";
import { toast } from "react-toastify";

// import axios from "axios";
// import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import {
  editUser,
  getUser,
  handleUserChange,
} from "../../stores/user/userSlice";

export default function EditUserPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const { name, email, role, password, confirmPassword, image } = useSelector(
    (store) => store.user
  );
  const dispatch = useDispatch();

  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  // const [role, setRole] = useState("user");
  // const [image, setImage] = useState("");

  const handleUserInput = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    dispatch(handleUserChange({ name, value }));
  };

  function validateInputs() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format");
      return false;
    }

    if (role !== "user" && role !== "admin") {
      toast.error("Role must be either 'user' or 'admin'");
      return false;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return false;
    }

    return true;
  }

  async function handleEditUser(e) {
    e.preventDefault();

    if (!validateInputs()) {
      return;
    } else {
      try {
        const userData = { name, email, role, password, image };
        await dispatch(editUser({ userId: id, user: userData })).unwrap();
        navigate(-1); // Navigate back to the previous page
      } catch (error) {}
    }
    // const token = Cookies.get("token"); // Get the JWT token from the cookies

    // try {
    //   const response = await axios.patch(
    //     `http://192.168.0.110:3001/api/v1/user/${id}`,
    //     {
    //       name: name,
    //       email: email,
    //       password: password,
    //       role: role,
    //       image: image,
    //     },
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
    //       },
    //       withCredentials: true,
    //     }
    //   );

    //   if (response.status === 200) {
    //     toast.success("Edit user successful!");
    //     navigate(-1);
    //   }
    // } catch (error) {
    //   console.log(error);
    //   const errorMessage = error.response?.data?.msg || "An error occurred";
    //   toast.error(errorMessage);
    //   // setName("");
    //   // setRole("");
    //   // setEmail("");
    //   // setPassword("");
    //   // setConfirmPassword("");
    // }
  }

  useEffect(() => {
    // async function getUser() {
    //   try {
    //     const token = Cookies.get("token"); // Get the JWT token from the cookies

    //     const response = await axios.get(
    //       `http://192.168.0.110:3001/api/v1/user/${id}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
    //         },
    //         withCredentials: true,
    //       }
    //     );

    //     if (response.status === 200) {
    //       // setName(response.data.user.name);
    //       // setEmail(response.data.user.email);
    //       // setImage(response.data.user.image);
    //       // setRole(response.data.user.role);
    //       console.log(response);
    //     }
    //   } catch (error) {
    //     const errorMessage = error.response?.data?.msg || "An error occurred";
    //     toast.error(errorMessage);
    //   }
    // }

    // getUser();
    dispatch(getUser(id));
  }, [id, dispatch]);

  return (
    <div className="p-xl-5 p-3">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <button
          className="back-btn btn-primary fw-bold shadow px-4 py-1"
          onClick={() => navigate(-1)}
        >
          Back
        </button>
        <h1 className="m-0">Edit User</h1>
        <div style={{ width: "106.2px" }}></div>
      </div>
      <div className="text-center">
        <img
          src={
            image === ""
              ? require("../../assets/profile.jpg")
              : require(`../../../public/uploads/${image}`)
          }
          alt=""
          className="user-img"
        />
      </div>
      <form onSubmit={handleEditUser}>
        <div className="col-xxl-3 col-xl-4 col-lg-5 col-md-6 col-12 mb-3 text-center mx-auto mt-4 ">
          <label htmlFor="userImage" className="form-label upload-label mb-3">
            Upload Image <TbUpload size={20} />
          </label>
          <input
            className="form-control"
            type="file"
            id="image"
            name="image"
            accept=".jpg, .jpeg, .png"
            onChange={(e) => {
              const file = e.target.files[0];
              if (file) {
                dispatch(handleUserChange({ name: "image", value: file.name }));
              }
            }}
          />
        </div>
        <div className="col-xxl-9 col-xl-19 col-lg-10 col-12 mx-auto mt-5">
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
                onChange={handleUserInput}
                required
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="role" className="col-form-label">
                Role:
              </label>
            </div>
            <div className="col">
              <select
                className="form-select"
                aria-label=".form-select user-role"
                name="role"
                id="role"
                value={role}
                onChange={handleUserInput}
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="email" className="col-form-label">
                Email:
              </label>
            </div>
            <div className="col">
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={email}
                onChange={handleUserInput}
                required
              />
            </div>
          </div>

          <div className="row mb-4">
            <div className="col-3">
              <label htmlFor="password" className="col-form-label">
                Password
              </label>
            </div>
            <div className="col">
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                value={password}
                onChange={handleUserInput}
                required
              />
            </div>
          </div>

          <div className="row mb-4 align-items-center">
            <div className="col-3">
              <label htmlFor="confirmPassword" className="col-form-label">
                Confirm Password
              </label>
            </div>
            <div className="col">
              <input
                type="password"
                className="form-control"
                id="confirmPassword"
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleUserInput}
                required
              />
            </div>
          </div>

          <div className=" mt-5 col-12 text-center">
            <div className="d-flex flex-wrap align-items-center justify-content-center">
              <button
                className="px-3 py-1 edit-button shadow m-1"
                type="submit"
              >
                Edit
              </button>
              <button
                className="px-3 py-1 delete-button shadow m-1"
                type="reset"
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
