"use client";
import React, { useEffect, useState } from "react";
import api from "@/utils/api";
// components/Modal.jsx

export default function EditTask({ isOpen, onClose, taskId }) {
  if (!isOpen) return null;

  console.log(isOpen, taskId);

  const [values, setValues] = useState({});
  const [loader, setLoader] = useState(false);
  const [users, setUsers] = useState([]);

  const handleInput = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await api.get(`/tasks/${taskId}`);
        const taskData = response.data;
        setValues(taskData);
      } catch (error) {
        console.log(error);
      }
    };

    const getUsers = async () => {
      try {
        const response = await api.get("/auth/users");
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();

    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId]);

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await api.patch(`/tasks/${taskId}`, values);
      alert(response.data.message);
      setLoader(false);
      onClose();
      // Optionally, you can add a success message or refresh the task list
    } catch (error) {
      console.log(error);
      setLoader(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black bg-opacity-50"
        onClick={onClose}
      />

      {/* Modal Box */}
      <div className="relative bg-white w-full max-w-lg rounded-lg shadow-lg p-6 z-50">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit Task</h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-black text-xl"
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
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
                      value={values.title}
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
                      value={values.description}
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
                      <option value={values.priority}>{values.priority}</option>
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
                      name="due_date"
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
                        <option key={u.id} value={u.id}>
                          {u.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>{loader ? <span>Creating Workspace...</span> : " "}</div>

                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={onClose}
                    >
                      Close
                    </button>
                    &nbsp;
                    <button type="submit" className="btn btn-primary">
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
