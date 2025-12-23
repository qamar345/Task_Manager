"use client";

import { Navbar } from "@/components/Navbar";
import Siderbar from "@/components/Siderbar";
import api from "@/utils/api";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const page = () => {
  const [logs, setLogs] = useState([]);
  const token = typeof window !== "undefined" ? sessionStorage.getItem("token") : null;
  const router = useRouter();

  useEffect(() => {
    if (!token) {
      router.push("/");
    }
  })

  useEffect(() => {
    const GetLogs = async () => {
      try {
        const response = await api.get("/tasks/logs");
        setLogs(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    GetLogs();
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
                          <h4 className="card-title"> Task Logs</h4>
                          <p className="card-subtitle">
                            Ample Admin Vs Pixel Admin
                          </p>
                        </div>
                        <div className="ms-auto mt-3 mt-md-0">
                          <select
                            className="form-select theme-select border-0"
                            aria-label="Default select example"
                          >
                            <option value="1">Pending</option>
                            <option value="2">In Progress</option>
                            <option value="3">Completed</option>
                          </select>
                        </div>
                      </div>
                      <div className="table-responsive mt-4">
                        <table className="table mb-0 text-nowrap varient-table align-middle fs-3">
                          <thead>
                            <tr>
                              <th scope="col" className="px-0 text-muted">
                                User
                              </th>
                              <th scope="col" className="px-0 text-muted">
                                Task Title
                              </th>
                              <th scope="col" className="px-0 text-muted">
                                Action
                              </th>
                              <th
                                scope="col"
                                className="px-0 text-muted text-end"
                              >
                                Created At
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {logs.map((log) => (
                              <tr key={log.id}>
                                <td className="px-0">
                                  <div className="d-flex align-items-center">
                                    <img
                                      src="assets/images/profile/user-3.jpg"
                                      className="rounded-circle"
                                      width="40"
                                      alt="flexy"
                                    />
                                    <div className="ms-3">
                                      <h6 className="mb-0 fw-bolder">
                                        {/* {log.Task.User.name} */}
                                      </h6>
                                    </div>
                                  </div>
                                </td>
                                <td className="px-0">{log.Task.title}</td>
                                <td className="px-0">{log.action}</td>
                                <td className="px-0 text-dark fw-medium text-end">
                                  {new Date(
                                    log.created_at
                                  ).toLocaleDateString()}
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
