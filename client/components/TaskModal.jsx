"use client";
import api from "@/utils/api";
import React, { useEffect, useState } from "react";

const TaskModal = ({ pId, wId }) => {
  const [values, setValues] = useState({});
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    console.log(values);
  };

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get(`/workspaces/get-members/${wId}`);
        setUsers(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    if (wId !== null) {
      getUsers();
    }
  }, [wId]);

  const CreateTask = async (e) => {
    e.preventDefault();
    setLoader(true);
    values.projectId = pId;
    values.workspaceId = wId;

    try {
      const response = await api.post("/tasks/", { values });
      alert(response.data.message);
      setLoader(false);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!!!");
      setLoader(false);
    }
  };

  return (
    <>
      {/* <!-- Modal --> */}
      <div
        className="modal fade"
        id="taskModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create Task
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={CreateTask}>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">
                    Task Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    name="title"
                    placeholder="Enter Task Name"
                    onChange={handleInput}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">
                    Task Details
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    name="description"
                    placeholder="Enter Task Description"
                    onChange={handleInput}
                  ></textarea>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">
                    Priority
                  </label>
                  <select
                    name="priority"
                    id=""
                    onChange={handleInput}
                    className="form-control"
                  >
                    <option value="Low">Low</option>
                    <option value="Medium">Medium</option>
                    <option value="High">High</option>
                  </select>
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">
                    Due Date
                  </label>
                  <input
                    type="date"
                    className="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    name="dueDate"
                    onChange={handleInput}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">
                    Assigned To
                  </label>
                  <select
                    name="assignedTo"
                    id=""
                    onChange={handleInput}
                    className="form-control"
                  >
                    {users.map((u) => (
                      <option key={u.User.id} value={u.User.id}>
                        {u.User.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>{loader ? <span>Creating Workspace...</span> : " "}</div>

                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Create
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TaskModal;
