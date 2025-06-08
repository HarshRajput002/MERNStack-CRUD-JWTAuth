import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

const MainPage = () => {
  return (
    <>
      {/* Top Navbar for Mobile */}
      <nav className="navbar navbar-dark bg-dark d-md-none">
        <div className="container-fluid">
          <button
            className="btn btn-outline-light"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
          >
            ☰
          </button>
          <span className="navbar-brand mb-0 h1">TaskScheduler</span>
        </div>
      </nav>

      {/* Offcanvas Sidebar for Mobile */}
      <div
        className="offcanvas offcanvas-start d-md-none bg-light"
        tabIndex={-1}
        id="mobileSidebar"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Menu</h5>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body">
          <ul className="nav flex-column">
            <li className="nav-item">
              <a className="nav-link" href="#">
                Dashboard
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Add Task
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                My Tasks
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Profile
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Logout
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container-fluid">
        <div className="row">
          {/* Static Sidebar for Desktop */}
          <div className="col-md-3 d-none d-md-block bg-light min-vh-100 p-3">
            <h4 className="fw-bold">TaskScheduler</h4>
            <hr />
            <ul className="nav flex-column">
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  Dashboard
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Add Task
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  My Tasks
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Profile
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Logout
                </a>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-9 d-flex flex-column gap-4 p-3">
            <div className="card p-3 shadow-sm">
              <h5 className="fw-bold">Add New Task</h5>
              <input placeholder="Enter task" className="form-control mb-2" />
              <textarea
                placeholder="Task details"
                className="form-control mb-2"
              />
              <button className="btn btn-primary">Add Task</button>
            </div>

            <div className="card p-3 shadow-sm">
              <h5 className="fw-bold">My Tasks</h5>
              <p>No tasks today — time to create one!</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;

