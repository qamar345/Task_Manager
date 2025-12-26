"use client"; // Add at top of file
import React, { useEffect, useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import api from "@/utils/api";

const AddMember = ({ isOpen, onClose, workspaceId }) => {
  if (!isOpen) return null;

  const [users, setUsers] = useState([]);
  const [loader, setLoader] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get("/auth/users");
        setUsers(response.data);
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    };

    getUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await api.post(`/workspaces/${workspaceId}/members`, {
        user_id: userId,
      });
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
    <>
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
                        Select Member to Add
                      </label>
                      <select
                        name="user_id"
                        id=""
                        onChange={(e) => setUserId(e.target.value)}
                        className="form-control"
                      >
                        {users.map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.name}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      {loader ? (
                        <span>Adding Member in Workspace...</span>
                      ) : (
                        " "
                      )}
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        onClick={onClose}
                      >
                        Close
                      </button>
                      &nbsp;
                      <button type="submit" className="btn btn-success">
                        Add Member
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddMember;
