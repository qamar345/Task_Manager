"use client";
import api from "@/utils/api";
import Link from "next/link";
import { useState } from "react";

// import { useRouter } from "next/navigation";

const page = () => {
  const [values, setValues] = useState({});
  const [loader, setLoader] = useState(false);

  const handleInput = (e: { target: { name: any; value: any } }) => {
    setValues({ ...values, [e.target.name]: e.target.value });

    console.log(values);
  };

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoader(true);

    try {
      const response = await api.post("/auth/register", values);
      alert(response.data.message);
    } catch (error) {
      console.log(error);
      alert("Something went wrong!!!");
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
        <div className="position-relative overflow-hidden text-bg-light min-vh-100 d-flex align-items-center justify-content-center">
          <div className="d-flex align-items-center justify-content-center w-100">
            <div className="row justify-content-center w-100">
              <div className="col-md-8 col-lg-6 col-xxl-3">
                <div className="card mb-0">
                  <div className="card-body">
                    <a
                      href="index-2.html"
                      className="text-nowrap logo-img text-center d-block py-3 w-100"
                    >
                      <h1>Task Manager</h1>
                    </a>

                    <form onSubmit={handleRegister}>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputtext1"
                          className="form-label"
                        >
                          Name
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="exampleInputtext1"
                          aria-describedby="textHelp"
                          name="name"
                          onChange={handleInput}
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          name="email"
                          onChange={handleInput}
                        />
                      </div>
                      <div className="mb-4">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="exampleInputPassword1"
                          name="password"
                          onChange={handleInput}
                        />
                      </div>
                      <input
                        type="submit"
                        className="btn btn-primary w-100 py-8 fs-4 mb-4 rounded-2"
                        value="Register"
                      />
                      <div className="d-flex align-items-center justify-content-center">
                        <p className="fs-4 mb-0 fw-bold">
                          Already have an Account?
                        </p>
                        <Link className="text-primary fw-bold ms-2" href="/">
                          Sign In
                        </Link>
                      </div>
                    </form>
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
