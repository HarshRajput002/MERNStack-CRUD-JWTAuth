// RegisterModal.jsx

import React from "react";
 interface LoginBtn{
     onClose:()=>void
  }

const RegisterModal = ({ onClose }:LoginBtn) => {
 
  const backdropStyle:React.CSSProperties= {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: "rgba(0,0,0,0.5)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1050,
};

const modalStyle:React.CSSProperties = {
  backgroundColor: "#fff",
  borderRadius: "5px",
  maxWidth: "500px",
  width: "100%",
};



return (
  <div style={backdropStyle}>
    <div style={modalStyle}>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Register</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <form>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" id="username" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" className="form-control" />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" className="form-control" />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  </div>
);

};




export default RegisterModal;
