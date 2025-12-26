"use client";
import { Navbar } from "@/components/Navbar";
import Siderbar from "@/components/Siderbar";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useEffectEvent, useState } from "react";
import EditTasK from "@/components/EditTask";
import { useWorkspace } from "@/context/WorkspaceContext";

const page = () => {
  const { workspaceId } = useWorkspace();
  const [open, setOpen] = useState(false);
  const [role, setRole] = useState(null);

  const [tasks, setTasks] = useState([]);
  const [taskId, setTaskId] = useState(null);
  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  });

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await api.get(`/tasks/admin-tasks/${workspaceId}`);
        setTasks(response.data.tasks);
        setRole(response.data.role);
      } catch (error) {
        console.log(error);
      }
    };

    getTasks();
  }, []);

  const DeleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert("Failed to delete task.");
    }
  };

  // const submitHandler = (id) => {
  //   setTaskId(id);
  //   setOpen(false);
  // };

  return (
    <>
      {/* <!--  Body Wrapper --> */}
      <div
        className="page-wrapper"
        id="main-wrapper"
        data-layout="vertical"
        data-navbarbg="skin6"
        data-sidebartype="full"
        data-sidebar-position="fixed"
        data-header-position="fixed"
      >
        {/* <!--  App Topstrip --> */}
        <div className="app-topstrip bg-dark py-6 px-3 w-100 d-lg-flex align-items-center justify-content-between">
          <div className="d-flex align-items-center justify-content-center gap-5 mb-2 mb-lg-0">
            <a className="d-flex justify-content-center" href="#">
              <h3 style={{ color: "white" }}>Task Manager</h3>
            </a>
          </div>

          <div className="d-lg-flex align-items-center gap-2">
            <h3 className="text-white mb-2 mb-lg-0 fs-5 text-center"> </h3>
            <div className="d-flex align-items-center justify-content-center gap-2"></div>
          </div>
        </div>

        <Siderbar />
        <Navbar />

        <div className="body-wrapper">
          <div className="body-wrapper-inner">
            <div className="container-fluid">
              {/* <!--  Row 1 --> */}
              <div className="row">
                <div className="col-12">
                  <div className="card">
                    <div className="card-body">
                      <div className="d-md-flex align-items-center">
                        <div>
                          <h4 className="card-title">Workspace Tasks</h4>
                        
                        </div>
                      </div>
                      <div className="table-responsive mt-4">
                        <table className="table mb-0 text-nowrap varient-table align-middle fs-3">
                          <thead>
                            <tr>
                              <th scope="col" className="px-0 text-muted">
                                Task Name
                              </th>
                              <th scope="col" className="px-0 text-muted">
                                Details
                              </th>

                              <th scope="col" className="px-0 text-muted">
                                Status
                              </th>

                              <th scope="col" className="px-0 text-muted">
                                Priority
                              </th>

                              <th scope="col" className="px-0 text-muted">
                                Due Date
                              </th>

                              <th scope="col" className="px-0 text-muted">
                                Created At
                              </th>

                              <th
                                scope="col"
                                className="px-0 text-muted text-center"
                              >
                                Action
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {tasks.map((ta) => (
                              <tr key={ta.id}>
                                <td className="px-0">
                                  <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                      <h6 className="mb-0 fw-bolder">
                                        {ta.title}
                                      </h6>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-0">{ta.description}</td>
                                <td className="px-0">
                                  <span className="badge text-bg-primary">
                                    {ta.status}
                                  </span>
                                </td>
                                <td className="px-0">
                                  <span className="badge text-bg-primary">
                                    {ta.priority}
                                  </span>
                                </td>
                                <td className="px-0">
                                  {new Date(ta.due_date).toLocaleDateString()}
                                </td>
                                <td className="px-0">
                                  {new Date(ta.created_at).toLocaleDateString()}
                                </td>

                                <td className="px-0">
                                  <div className="ms-auto mt-3 mt-md-0 text-center">
                                    <button
                                      type="button"
                                      className="btn btn-warning"
                                      onClick={() => {
                                        setOpen(true);
                                        setTaskId(ta.id);
                                      }}
                                    >
                                      Edit Task
                                    </button>
                                    &nbsp;
                                    <button
                                      type="button"
                                      className="btn btn-danger"
                                      data-bs-toggle="modal"
                                      onClick={() => DeleteTask(ta.id)}
                                    >
                                      Delete Task
                                    </button>
                                  </div>
                                  <EditTasK
                                    taskId={taskId}
                                    isOpen={open}
                                    onClose={() => setOpen(false)}
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
