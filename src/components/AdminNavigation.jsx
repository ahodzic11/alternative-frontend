import React from "react";
import { useNavigate } from "react-router-dom";
import "./../css/Navigation.css";

function AdminNavigation() {
  const navigate = useNavigate();

  const goBack = (e) => {
    e.preventDefault();
    navigate("/adminpanel");
  };

  return (
    <div className="adminNavigation" onClick={goBack}>
      <div className="goBackToPanel">
        <div className="goBackToPanelTitle">ADMIN PANEL</div>
      </div>
    </div>
  );
}

export default AdminNavigation;
