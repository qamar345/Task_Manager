"use client";
import api from "@/utils/api";
import React, { useState } from "react";

interface ProjectModalProps {
  workspaceId: Number;
}

const ProjectModal = ({ workspaceId }: ProjectModalProps) => {
  console.log(workspaceId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [loader, setLoader] = useState(false);

  const CreateProject = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await api.post("/projects/", {
        name,
        description,
        workspaceId,
      });
      alert(response.data.message);
      setLoader(false);
      setName("");
      setDescription("");
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
        id="projectModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Create Project
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form onSubmit={CreateProject}>
                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">
                    Project Name
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    name="name"
                    placeholder="Enter Project Name"
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="exampleInputtext1" className="form-label">
                    Project Details
                  </label>
                  <textarea
                    className="form-control"
                    id="exampleInputtext1"
                    aria-describedby="textHelp"
                    name="name"
                    placeholder="Enter Project Description"
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>

                <div>{loader ? <span>Creating Project...</span> : " "}</div>

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

export default ProjectModal;
