import React from "react";
import { useNavigate } from "react-router-dom";
import "./../css/AdminGoBack.css";

function AdminGoBack() {
  const navigate = useNavigate();

  const goToAdminPanel = (e) => {
    e.preventDefault();
    navigate("/adminpanel");
  };

  return (
    <div className="adminGoBackButton" onClick={goToAdminPanel}>
      <div className="adminGoBackText">VRATI SE</div>
    </div>
  );
}

export default AdminGoBack;
