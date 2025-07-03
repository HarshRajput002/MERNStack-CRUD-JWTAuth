// RegisterModal.jsx

import React, { useState } from "react";
import axios from 'axios';
 interface LoginBtn{
     onClose:()=>void
  }

const RegisterModal = ({ onClose }:LoginBtn) => {
  const [formData,setFormData]=useState({
    username:"",
    password:"",
    email:""
  })
 
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
const onChange=(e: React.ChangeEvent<HTMLInputElement>)=>{
 setFormData({
  ...formData,
  [e.target.id]:e.target.value,
 });
}

const onHandle=async (e:React.FormEvent)=>{
  e.preventDefault();
  try{
  const res = await axios.post("http://localhost:5000/api/register", formData);
  onClose()
  console.log(res.data)
  }
  catch(error){
    console.log(error);
  }
  
  
}


return (
  <div style={backdropStyle}>
    <div style={modalStyle}>
      <div className="p-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="m-0">Register</h5>
          <button className="btn-close" onClick={onClose}></button>
        </div>
        <form onSubmit={onHandle} >
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input type="text" id="username" className="form-control" value={formData.username}  onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email</label>
            <input type="email" id="email" className="form-control" value={formData.email} onChange={onChange} />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" id="password" className="form-control" value={formData.password} onChange={onChange} />
          </div>
          <button type="submit" className="btn btn-primary w-100">Register</button>
        </form>
      </div>
    </div>
  </div>
);

};




export default RegisterModal;
