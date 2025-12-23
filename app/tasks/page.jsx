"use client";

import { Navbar } from "@/components/Navbar";
import Siderbar from "@/components/Siderbar";
import EditTasK from "@/components/TaskModal";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const page = () => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [assignedUserFilter, setAssignedUserFilter] = useState("");
  const [projectFilter, setProjectFilter] = useState("");
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
    const getProjects = async () => {
      try {
        const response = await api.get("/projects/get-projects");
        setProjects(response.data);
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

    getProjects();
    getUsers();
  }, []);

  useEffect(() => {
    const getTasks = async () => {
      try {
        const response = await api.get(
          `/tasks/?projectId=${projectFilter}&status=${statusFilter}&assignedTo=${assignedUserFilter}`
        );
        setTasks(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    getTasks();
  }, [statusFilter, assignedUserFilter, projectFilter]);

  const DeleteTask = async (id) => {
    try {
      const response = await api.delete(`/tasks/${id}`);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert("Failed to delete task.");
    }
  };
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
                          <h4 className="card-title">Tasks</h4>
                          <p className="card-subtitle">
                            Ample Admin Vs Pixel Admin
                          </p>
                        </div>

                        <div className="ms-auto">
                          <div>
                            <select
                              name="status"
                              id=""
                              className="form-control"
                              onChange={(e) => setStatusFilter(e.target.value)}
                            >
                              <option>Filter by Status</option>
                              <option value="pending">Pending</option>
                              <option value="in_progress">In Progress</option>
                              <option value="completed">Completed</option>
                            </select>
                          </div>
                        </div>

                        <div className="ms-auto">
                          <div>
                            <select
                              name="projectId"
                              id=""
                              className="form-control"
                              onChange={(e) => setProjectFilter(e.target.value)}
                            >
                              <option>Filter by Project</option>
                              {projects.map((project) => (
                                <option key={project.id} value={project.id}>
                                  {project.name}
                                </option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="ms-auto">
                          <div>
                            <select
                              name="assignedTo"
                              id=""
                              className="form-control"
                              onChange={(e) =>
                                setAssignedUserFilter(e.target.value)
                              }
                            >
                              <option>Filter by Assigned User</option>
                              {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                  {user.name}
                                </option>
                              ))}
                            </select>
                          </div>
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
                                      data-bs-toggle="modal"
                                      data-bs-target="#editTask"
                                      onClick={() => setTaskId(ta.id)}
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
                                  <EditTasK taskId={taskId} />
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
