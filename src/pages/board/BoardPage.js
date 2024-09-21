import React, { useEffect, useState } from "react";

import "./BoardPage.css";

import { IoIosMore } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getAllBoards } from "../../stores/allBoards/allBoardsSlice";
import { deleteBoard } from "../../stores/board/boardSlice";

export default function BoardPage() {
  const navigate = useNavigate();
  const { user } = useSelector((store) => store.auth);
  const { boards } = useSelector((store) => store.allBoards);
  const dispatch = useDispatch();

  const [deleteBoardId, setDeleteBoardId] = useState("");
  const [deleteBoardName, setDeleteBoardName] = useState("");

  async function handleDeleteBoard() {
    dispatch(deleteBoard(deleteBoardId));
    dispatch(getAllBoards());
  }

  useEffect(() => {
    console.log(user);
    dispatch(getAllBoards());
  }, [dispatch]);

  return (
    <>
      {/* Modal */}
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

      <div className="p-5 w-100">
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
              {user.role === "admin" ? (
                <th scope="col" className="text-center col-1"></th>
              ) : null}
              {/* <th scope="col" className="text-center col-1"></th> */}
            </tr>
          </thead>
          <tbody className="table-group-divider">
            {boards
              ? boards.map((board) => (
                  <tr key={board.id}>
                    <td className="text-center py-2 text-decoration-underline text-primary">
                      <Link to={`/viewBoard/${board.id}`}>{board.name}</Link>
                    </td>
                    <td className="text-center py-2">{board.type}</td>
                    <td className="text-center py-2">{board.location}</td>
                    <td className="text-center py-2">{board.ip_address}</td>
                    {user.role === "admin" ? (
                      <td className="text-center py-2 action">
                        <div className="dropdown">
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
                                to={`/editBoard/${board.id}`}
                              >
                                Edit
                              </Link>
                            </li>
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
