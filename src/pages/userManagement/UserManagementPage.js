import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMore } from "react-icons/io";

// import axios from "axios";
// import Cookies from "js-cookie";
// import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../stores/allUsers/allUsersSlice";
import { deleteUser } from "../../stores/user/userSlice";

export default function UserManagementPage() {
  const { users } = useSelector((store) => store.allUsers);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  // const [userList, setUserList] = useState([]);
  const [deleteUserId, setDeleteUserId] = useState("");
  const [deleteUserName, setDeleteUserName] = useState("");

  async function handleDeleteUser() {
    dispatch(deleteUser(deleteUserId));
    dispatch(getAllUsers());
  }

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

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
                Are you sure want to delete user {deleteUserName}?
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
        <div className="text-end mb-4">
          <button
            className="add-btn btn-primary fw-bold shadow px-3 py-1"
            onClick={() => navigate("/addUser")}
          >
            + User
          </button>
        </div>
        <table className="table">
          <thead>
            <tr>
              <th className="text-center" scope="col">
                Name
              </th>
              <th className="text-center" scope="col">
                Email
              </th>
              <th className="text-center" scope="col">
                Role
              </th>
              <th className="text-center" scope="col"></th>
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {users
              ? users.map((user) => (
                  <tr key={user.id}>
                    <td className="text-center">
                      <Link to={`/viewUser/${user.id}`}>{user.name}</Link>
                    </td>
                    <td className="text-center">{user.email}</td>
                    <td className="text-center">{user.role}</td>
                    <td className="text-center py-2 action">
                      <IoIosMore
                        size={25}
                        className="dropdown-toggle"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      />
                      <ul className="dropdown-menu py-3">
                        <li className="ps-1 pe-2 mb-2">
                          <Link
                            className="dropdown-item text-dark py-2 m-0"
                            to={`/editUser/${user.id}`}
                          >
                            Edit
                          </Link>
                        </li>
                        <li className="ps-1 pe-2">
                          <button
                            className="dropdown-item text-danger py-2 m-0 mb-1"
                            data-bs-toggle="modal"
                            data-bs-target="#deleteUser"
                            onClick={() => {
                              setDeleteUserId(user.id);
                              setDeleteUserName(user.name);
                            }}
                          >
                            Delete
                          </button>
                        </li>
                      </ul>
                    </td>
                  </tr>
                ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
