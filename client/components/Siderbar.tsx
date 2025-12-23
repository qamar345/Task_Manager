import Link from "next/link";
import React from "react";

const Siderbar = () => {
  return (
    <>
      {/* <!-- Sidebar Start --> */}
      <aside className="left-sidebar">
        {/* <!-- Sidebar scroll--> */}
        <div>
          {/* <div className="brand-logo d-flex align-items-center justify-content-between">
            <a href="index-2.html" className="text-nowrap logo-img">
              <img src="assets/images/logos/logo.svg" alt="" />
            </a>
            <div
              className="close-btn d-xl-none d-block sidebartoggler cursor-pointer"
              id="sidebarCollapse"
            >
              <i className="ti ti-x fs-6"></i>
            </div>
          </div> */}
          {/* <!-- Sidebar navigation--> */}
          <nav className="sidebar-nav scroll-sidebar" data-simplebar="">
            <ul id="sidebarnav">
              <li className="nav-small-cap">
                {/* <iconify-icon icon="solar:menu-dots-linear" className="nav-small-cap-icon fs-4"></iconify-icon> */}
                <span className="hide-menu">Home</span>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link"
                  href="/dashboard"
                  aria-expanded="false"
                >
                  <i className="ti ti-atom"></i>
                  <span className="hide-menu">Dashboard</span>
                </Link>
              </li>
              {/* <!-- ---------------------------------- -->
            <!-- Dashboard -->
            <!-- ---------------------------------- --> */}
              <li className="sidebar-item">
                <Link
                  className="sidebar-link justify-content-between"
                  href="/workspaces"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex">
                      <i className="ti ti-aperture"></i>
                    </span>
                    <span className="hide-menu">Workspaces</span>
                  </div>
                </Link>
              </li>
              {/* <li className="sidebar-item">
                <Link
                  className="sidebar-link justify-content-between"
                  href="/projects"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex">
                      <i className="ti ti-layout-grid"></i>
                    </span>
                    <span className="hide-menu">Projects</span>
                  </div>
                </Link>
              </li> */}
              <li className="sidebar-item">
                <Link
                  className="sidebar-link justify-content-between"
                  href="/tasks"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex">
                      <i className="ti ti-clipboard"></i>
                    </span>
                    <span className="hide-menu">Tasks</span>
                  </div>
                </Link>
              </li>
              <li className="sidebar-item">
                <Link
                  className="sidebar-link justify-content-between"
                  href="/logs"
                  aria-expanded="false"
                >
                  <div className="d-flex align-items-center gap-3">
                    <span className="d-flex">
                      <i className="ti ti-activity"></i>
                    </span>
                    <span className="hide-menu">Logs</span>
                  </div>
                </Link>
              </li>
            </ul>
          </nav>
          {/* <!-- End Sidebar navigation --> */}
        </div>
        {/* <!-- End Sidebar scroll--> */}
      </aside>
      {/* <!--  Sidebar End --> */}
    </>
  );
};

export default Siderbar;
