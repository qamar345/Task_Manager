"use client";
import { Navbar } from "@/components/Navbar";
import ProjectModal from "@/components/ProjectModal";
import Siderbar from "@/components/Siderbar";
import WorkspaceModal from "@/components/WorkspaceModal";
import api from "@/utils/api";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useWorkspace } from "@/context/WorkspaceContext";
import { useRouter } from "next/navigation";
const page = () => {
  const [workspaces, setWorkSpaces] = useState([]);
  const [loader, setLoader] = useState(false);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const { setWorkspaceId } = useWorkspace();
  const router = useRouter();

  const token =
    typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  });

  const handleViewProjects = (id) => {
    setWorkspaceId(id); // context me workspaceId save
    router.push("/projects"); // Project page open
  };

  useEffect(() => {
    const getWorkSpace = async () => {
      setLoader(true);
      try {
        const response = await api.get("/workspaces");
        setWorkSpaces(response.data);
        setLoader(false);
      } catch (error) {
        console.log(error);

        setLoader(false);
      }
    };

    getWorkSpace();
  }, []);

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
                          <h4 className="card-title">Workspaces</h4>
                          <p className="card-subtitle">
                            Ample Admin Vs Pixel Admin
                          </p>
                        </div>
                        <div className="ms-auto mt-3 mt-md-0">
                          <button
                            type="button"
                            className="btn btn-primary"
                            data-bs-toggle="modal"
                            data-bs-target="#exampleModal"
                          >
                            Create Workspace
                          </button>
                        </div>
                        <WorkspaceModal />
                      </div>
                      {loader && <p>Loading Workspaces...</p>}
                      <div className="table-responsive mt-4">
                        <table className="table mb-0 text-nowrap varient-table align-middle fs-3">
                          <thead>
                            <tr>
                              <th scope="col" className="px-0 text-muted">
                                Workspace Name
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
                            {workspaces.map((rs) => (
                              <tr key={rs.id}>
                                <td className="px-0">
                                  <div className="d-flex align-items-center">
                                    <div className="ms-3">
                                      <h6 className="mb-0 fw-bolder">
                                        {rs.name}
                                      </h6>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-0">
                                  {new Date(rs.created_at).toLocaleDateString()}
                                </td>
                                <td className="px-0">
                                  <div className="ms-auto mt-3 mt-md-0 text-center">
                                    <button
                                      type="button"
                                      className="btn btn-warning"
                                      data-bs-toggle="modal"
                                      data-bs-target="#projectModal"
                                      onClick={() =>
                                        setSelectedWorkspace(rs.id)
                                      }
                                    >
                                      Create Project
                                    </button>
                                    &nbsp;
                                    <button
                                      onClick={() => handleViewProjects(rs.id)}
                                      className="btn btn-info"
                                    >
                                      View Projects
                                    </button>
                                  </div>
                                  <ProjectModal
                                    workspaceId={selectedWorkspace}
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
