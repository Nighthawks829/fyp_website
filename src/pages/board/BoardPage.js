import React, { useEffect, useState } from "react";

import "./BoardPage.css";

import { IoIosMore } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoards } from "../../stores/allBoards/allBoardsSlice";
import { deleteBoard } from "../../stores/board/boardSlice";

export default function BoardPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user authentication details from the Redux store
  const { user } = useSelector((store) => store.auth);

  // Get list of all boards from the Redux store
  const { boards } = useSelector((store) => store.allBoards);

  // State to store the ID and name of the board to be deleted
  const [deleteBoardId, setDeleteBoardId] = useState("");
  const [deleteBoardName, setDeleteBoardName] = useState("");

  /**
 * Handles board deletion by dispatching the delete action,
 * then refreshing the board list.
 */
  async function handleDeleteBoard() {
    dispatch(deleteBoard(deleteBoardId));   // Dispatch delete action
    dispatch(getAllBoards());               // Refresh board list after deletion
  }

  /**
 * Fetch all boards from the backend when the component mounts.
 */
  useEffect(() => {
    dispatch(getAllBoards());
  }, [dispatch]);

  return (
    <>
      {/* Delete Confirmation Modal */}
      <div
        className="modal fade"
        id="deleteBoard"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="deleteBoardLabel1"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body p-5 shadow">
              <h2 className="text-center mb-5">
                Are you sure want to delete {deleteBoardName}?
              </h2>
              <div className="d-flex align-items-center justify-content-evenly mt-5">
                <button
                  className="modal-cancel-button shadow"
                  data-bs-dismiss="modal"
                  onClick={() => handleDeleteBoard()}
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

      {/* Main Content Section */}
      <div className="p-5 w-100">
        {/* Add Board Button (only visible to admin users) */}
        <div className="text-end mb-4">
          {user.role === "admin" ? (
            <button
              className="add-btn btn-primary fw-bold shadow px-3 py-1"
              onClick={() => navigate("/addBoard")}
            >
              + Board
            </button>
          ) : (
            ""
          )}
        </div>

        {/* Table displaying the list of boards */}
        <table className="table">
          <thead>
            <tr>
              <th scope="col" className="text-center col-3">
                Name
              </th>
              <th scope="col" className="text-center col-2">
                Type
              </th>
              <th scope="col" className="text-center col-3">
                Location
              </th>
              <th scope="col" className="text-center col-3">
                IP Address
              </th>
              {/* Admin users get an additional column for actions */}
              {user.role === "admin" ? (
                <th scope="col" className="text-center col-1"></th>
              ) : null}
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {/* Check if boards exist before mapping through them */}
            {boards
              ? boards.map((board) => (
                <tr key={board.id}>
                  {/* Board Name with a clickable link to view details */}
                  <td className="text-center py-2 text-decoration-underline text-primary">
                    <Link to={`/viewBoard/${board.id}`}>{board.name}</Link>
                  </td>
                  <td className="text-center py-2">{board.type}</td>
                  <td className="text-center py-2">{board.location}</td>
                  <td className="text-center py-2">{board.ip_address}</td>
                  {/* Admin users get an action dropdown for editing or deleting */}
                  {user.role === "admin" ? (
                    <td className="text-center py-2 action">
                      <div className="dropdown">
                        {/* More Options Icon triggering the dropdown */}
                        <IoIosMore
                          size={25}
                          className="dropdown-toggle"
                          role="button"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        />
                        <ul className="dropdown-menu py-3">
                          {/* Edit Button (navigates to edit page) */}
                          <li className="ps-1 pe-2 mb-2">
                            <Link
                              className="dropdown-item text-dark py-2 m-0"
                              to={`/editBoard/${board.id}`}
                            >
                              Edit
                            </Link>
                          </li>
                          {/* Delete Button (opens confirmation modal) */}
                          <li className="ps-1 pe-2">
                            <button
                              className="dropdown-item text-danger py-2 m-0 mb-1"
                              data-bs-toggle="modal"
                              data-bs-target="#deleteBoard"
                              onClick={() => {
                                setDeleteBoardId(board.id);
                                setDeleteBoardName(board.name);
                              }}
                            >
                              Delete
                            </button>
                          </li>
                        </ul>
                      </div>
                    </td>
                  ) : null}
                </tr>
              ))
              : null}
          </tbody>
        </table>
      </div>
    </>
  );
}
