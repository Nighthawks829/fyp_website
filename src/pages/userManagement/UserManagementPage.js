import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoIosMore } from "react-icons/io";

import axios from "axios";
import Cookies from "js-cookie";

export default function UserManagementPage() {
  const navigate = useNavigate();
  const [userList, setUserList] = useState([]);

  useEffect(() => {
    async function getUserList() {
      const token = Cookies.get("token"); // Get the JWT token from the cookies

      const response = await axios.get(
        "http://192.168.0.110:3001/api/v1/user/",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Set the Authorization header with the Bearer token
          },
          withCredentials: true,
        }
      );

      setUserList(response.data.users); // Set the user list state with the response data
    }

    getUserList(); // Call the getUserList function
  }, []);

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
            {userList.map((user) => (
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
                      >
                        Delete
                      </button>
                    </li>
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
