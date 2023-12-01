import React from "react";
import { useNavigate } from "react-router-dom";
import "./../css/AdminLogout.css";

function AdminLogout() {
  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    navigate("/");
  };

  return (
    <div className="adminLogoutButton" onClick={logout}>
      <div className="adminLogoutText">LOGOUT</div>
    </div>
  );
}

export default AdminLogout;
