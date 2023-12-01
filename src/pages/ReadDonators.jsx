import React, { useEffect } from "react";
import { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import editIcon from "./../assets/editIcon.png";
import changePictureIcon from "./../assets/changePicture.png";
import deleteIcon from "./../assets/deleteIcon.png";
import { useNavigate } from "react-router-dom";
import "./../css/ReadWorkshops.css";
import { formatPath } from "../js/namechange";

function ReadDonators() {
  const [donators, setDonators] = useState([]);
  const navigate = useNavigate();

  const getDonators = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/donators`);
      setDonators(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getDonators();
  }, []);

  const editDonator = (e, item) => {
    e.preventDefault();
    navigate("/editdonator/" + formatPath(item.naziv));
  };

  const chooseImage = (e, item) => {
    e.preventDefault();
    navigate("/chooseimage/donator/" + formatPath(item.naziv));
  };

  async function deleteDonatorItem(e, item) {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:5000/api/donators/` + item.id);
    } catch (err) {}
    getDonators();
  }

  return (
    <>
      <AdminNavigation />
      <div className="readWorkshopContainer">
        <div className="currentLocationHeadline">Uneseni donatori</div>
        <div className="filterAndSortingContainer"></div>
        {donators.map((item) => (
          <div className="basicInfo">
            <div className="firstWorkshopInformation">
              <div className="workshopTitle">{item.naziv}</div>
              <div className="infoItem">{item.link}</div>
              <div className="infoItem">{item.podrska}</div>
            </div>
            <div className="workshopOptions">
              <div className="editWorkshop workshopEditOption" onClick={(e) => editDonator(e, item)}>
                <img src={editIcon} />
              </div>
              <div className="changePictureOption workshopEditOption" onClick={(e) => chooseImage(e, item)}>
                <img src={changePictureIcon} />
              </div>
              <div className="deleteWorkshop workshopEditOption" onClick={(e) => deleteDonatorItem(e, item)}>
                <img src={deleteIcon} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default ReadDonators;
