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

function ReadNews() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const [news, setNews] = useState([]);
  const [show, setShow] = useState(false);
  const [chosenNews, setChosenNews] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (item) => setShow(true);
  const navigate = useNavigate();

  const getNews = async () => {
    try {
      const res = await axios.get(runningModePath + `/api/news`);
      setNews(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getNews();
  }, []);

  const editNews = (e, item) => {
    e.preventDefault();
    navigate("/editnews/" + formatPath(item.naziv));
  };

  const chooseImage = (e, item) => {
    e.preventDefault();
    navigate("/chooseimage/news/" + formatPath(item.naziv));
  };

  async function handleDelete() {
    setShow(false);
    try {
      const res = await axios.delete(runningModePath + `/api/news/` + chosenNews.id);
    } catch (err) {}
    try {
      const res = await axios.delete(runningModePath + `/delete/vijesti/` + chosenNews.naziv);
    } catch (err) {}
    getNews();
  }

  function deleteFunction(e, item) {
    e.preventDefault();
    setChosenNews(item);
    handleShow(item);
  }

  return (
    <>
      <AdminNavigation />
      <div className="readProjectContainer">
        <div className="currentLocationHeadline">Unesene vijesti</div>
        <div className="filterAndSortingContainer"></div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Brisanje vijesti</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sigurno želite obrisati vijest?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Ne
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Da
            </Button>
          </Modal.Footer>
        </Modal>
        {news.map((item) => (
          <div className="basicInfo">
            <div className="firstProjectInformation">
              <div className="projectTitle">{item.naziv}</div>
              <div className="infoItem">{item.tema}</div>
              <div className="infoItem">{item.datum}</div>
              <div className="infoItem">{item.krajImplementacije}</div>
              <div className="infoItem">{item.tekstVijesti}</div>
            </div>
            <div className="projectOptions">
              <div className="editProject projectEditOption" onClick={(e) => editNews(e, item)}>
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

export default ReadNews;
