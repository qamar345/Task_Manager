"use client";

import { Navbar } from "@/components/Navbar";
import Siderbar from "@/components/Siderbar";
import TaskModal from "@/components/TaskModal";
import React, { useEffect, useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import api from "@/utils/api";
import { useRouter } from "next/navigation";

const page = () => {
  const { workspaceId } = useWorkspace();
  const [role, setRole] = useState(null);
  const [projects, setPorjects] = useState([]);
  const [projectId, setProjectId] = useState(null);
  const [workspaceIdState, setWorkspaceIdState] = useState(null);
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
        const response = await api.get(`/projects/?workspaceId=${workspaceId}`);
        setPorjects(response.data.projects);
        setRole(response.data.role);
      } catch (error) {
        console.log(error);
      }
    };

    getProjects();
  }, [workspaceId]);

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
                          <h4 className="card-title">Projects</h4>
                          <p className="card-subtitle">
                            Ample Admin Vs Pixel Admin
                          </p>
                        </div>
                      </div>
                      <div className="table-responsive mt-4">
                        <table className="table mb-0 text-nowrap varient-table align-middle fs-3">
                          <thead>
                            <tr>
                              <th scope="col" className="px-0 text-muted">
                                Project Name
                              </th>
                              <th scope="col" className="px-0 text-muted">
                                Details
                              </th>
                              <th scope="col" className="px-0 text-muted">
                                Created At
                              </th>
                              {role === "admin" && (
                                <th
                                  scope="col"
                                  className="px-0 text-muted text-center"
                                >
                                  Action
                                </th>
                              )}
                            </tr>
                          </thead>
                          <tbody>
                            {projects.map((pr) => (
                              <tr key={pr.id}>
                                <td className="px-0">
                                  <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                      <h6 className="mb-0 fw-bolder">
                                        {pr.name}
                                      </h6>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-0">{pr.description}</td>
                                <td className="px-0">
                                  {new Date(pr.created_at).toLocaleDateString()}
                                </td>

                                {role === "admin" && (
                                  <td className="px-0">
                                    <div className="ms-auto mt-3 mt-md-0 text-center">
                                      <button
                                        type="button"
                                        className="btn btn-warning"
                                        data-bs-toggle="modal"
                                        data-bs-target="#taskModal"
                                        onClick={() => {
                                          setProjectId(pr.id),
                                            setWorkspaceIdState(
                                              pr.workspace_id
                                            );
                                        }}
                                      >
                                        Create Task
                                      </button>
                                    </div>
                                    <TaskModal
                                      pId={projectId}
                                      wId={workspaceIdState}
                                    />
                                  </td>
                                )}
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
