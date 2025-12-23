import React, { useEffect, useState } from "react";
import api from "@/utils/api";

const EditTask = () => {
  const [name, setName] = useState("");
  const [loader, setLoader] = useState(false);

  useEffect(() => {
    const fetchTaskDetails = async () => {
      try {
        const response = await api.get(`/tasks/${taskId}`);
        const taskData = response.data;
        setName(taskData.name);
      } catch (error) {
        console.log(error);
        alert("Failed to fetch task details.");
      }
    };

    if (taskId) {
      fetchTaskDetails();
    }
  }, [taskId]);
  return (
    <>
      {/* <!-- Modal --> */}
      <div
        class="modal fade"
        id="editTask"
        tabindex="-1"
        aria-labelledby="editTask"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTask;
