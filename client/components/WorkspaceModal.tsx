"use client";

import api from "@/utils/api";
import { spawn } from "child_process";
import React, { useState } from "react";

const WorkspaceModal = () => {
  const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);

  const CreateWorkSpace = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await api.post("/workspaces/", { name });
      alert(response.data.message);
      setLoader(false);
      setName("");
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
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create Workspace
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={CreateWorkSpace}>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">
                    Workspace Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    name="name"
                    placeholder="Enter Workspace Name"
                    onChange={(e) => setName(e.target.value)}
                  />
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

export default WorkspaceModal;
