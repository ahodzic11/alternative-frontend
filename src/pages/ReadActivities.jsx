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
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { formatPath } from "../js/namechange";
import "./../css/ReadProjects.css";

function ReadActivities() {
  const [activities, setActivities] = useState([]);
  const [show, setShow] = useState(false);
  const [chosenActivity, setChosenActivity] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (item) => setShow(true);
  const navigate = useNavigate();

  const getActivities = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/activities`);
      setActivities(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getActivities();
  }, []);

  const editActivity = (e, item) => {
    e.preventDefault();
    navigate("/editactivity/" + formatPath(item.naziv));
  };

  const chooseImage = (e, item) => {
    e.preventDefault();
    navigate("/chooseimage/activity/" + formatPath(item.naziv));
  };

  async function handleDelete() {
    setShow(false);
    try {
      const res = await axios.delete(`http://localhost:5000/api/activities/` + chosenActivity.id);
    } catch (err) {}
    try {
      const res = await axios.delete(`http://localhost:5000/delete/activities/` + chosenActivity.naslov);
    } catch (err) {}
    getActivities();
  }

  function deleteFunction(e, item) {
    e.preventDefault();
    setChosenActivity(item);
    handleShow(item);
  }

  return (
    <>
      <AdminNavigation />
      <div className="readProjectContainer">
        <div className="currentLocationHeadline">Unesene aktivnosti</div>
        <div className="filterAndSortingContainer"></div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Brisanje radionice</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sigurno želite obrisati radionicu?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Ne
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Da
            </Button>
          </Modal.Footer>
        </Modal>
        {activities.map((item) => (
          <div className="basicInfo">
            <div className="firstProjectInformation">
              <div className="projectTitle">{item.naziv}</div>
              <div className="infoItem">{item.mjesto}</div>
              <div className="infoItem">{item.datum}</div>
              <div className="infoItem">{item.krajImplementacije}</div>
              <div className="infoItem">{item.nazivDonatora}</div>
              <div className="infoItem">{item.nazivProjekta}</div>
              <div className="infoItem">{item.opisAktivnosti}</div>
            </div>
            <div className="projectOptions">
              <div className="editProject projectEditOption" onClick={(e) => editActivity(e, item)}>
                <img src={editIcon} />
              </div>
              <div className="changePictureOption projectEditOption" onClick={(e) => chooseImage(e, item)}>
                <img src={changePictureIcon} />
              </div>
              <div className="deleteProject projectEditOption" onClick={(e) => deleteFunction(e, item)}>
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

export default ReadActivities;
