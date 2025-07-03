import React, { FormEvent, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const MainPage = () => {
  const navigate = useNavigate();

  const [crud, setCrud] = useState({ task: "", details: "" });
  const [tasks, setTasks] = useState<{ _id: string; task: string; details: string }[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCrud({ ...crud, [e.target.id]: e.target.value });
  };

  const onHandle = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      if (isEditing && editId) {
        await axios.put(`http://localhost:5000/api/crud/${editId}`, crud, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(prev =>
          prev.map((t) => (t._id === editId ? { ...t, ...crud } : t))
        );
        setIsEditing(false);
        setEditId(null);
      } else {
        const res = await axios.post("http://localhost:5000/api/crud", crud, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks([...tasks, res.data]);
      }

      setCrud({ task: "", details: "" });
    } catch (error) {
      console.log("Crud", error);
    }
  };

  const onDelete = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      await axios.delete(`http://localhost:5000/api/crud/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  const onEdit = (task: { _id: string; task: string; details: string }) => {
    setCrud({ task: task.task, details: task.details });
    setIsEditing(true);
    setEditId(task._id);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get("http://localhost:5000/crud", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setTasks(res.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

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
              <a className="nav-link" href="#">Dashboard</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Add Task</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">My Tasks</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Profile</a>
            </li>
            <li className="nav-item">
              <button
                className="btn btn-link nav-link text-start"
                onClick={handleLogout}
              >Logout</button>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Layout */}
      <div className="container-fluid">
        <div className="row">
          {/* Sidebar */}
          <div className="col-md-3 d-none d-md-block bg-light min-vh-100 p-3">
            <h4 className="fw-bold">TaskScheduler</h4>
            <hr />
            <ul className="nav flex-column">
              <li className="nav-item"><a className="nav-link active" href="#">Dashboard</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Add Task</a></li>
              <li className="nav-item"><a className="nav-link" href="#">My Tasks</a></li>
              <li className="nav-item"><a className="nav-link" href="#">Profile</a></li>
              <li className="nav-item">
                <button className="btn btn-link nav-link text-start" onClick={handleLogout}>Logout</button>
              </li>
            </ul>
          </div>

          {/* Main Content */}
          <div className="col-md-9 d-flex flex-column gap-4 p-3">
            <div className="card p-3 shadow-sm">
              <h5 className="fw-bold">{isEditing ? "Edit Task" : "Add New Task"}</h5>
              <form onSubmit={onHandle}>
                <input
                  type="text"
                  id="task"
                  placeholder="Enter task"
                  className="form-control mb-2"
                  onChange={onChange}
                  value={crud.task}
                  required
                />
                <textarea
                  id="details"
                  placeholder="Task details"
                  className="form-control mb-2"
                  onChange={onChange}
                  value={crud.details}
                  required
                />
                <button className="btn btn-primary">
                  {isEditing ? "Update Task" : "Add Task"}
                </button>
              </form>
            </div>

            {tasks.length > 0 && (
              <table className="table mt-3">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Details</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tasks.map((item) => (
                    <tr key={item._id}>
                      <td>{item.task}</td>
                      <td>{item.details}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => onEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => onDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default MainPage;

