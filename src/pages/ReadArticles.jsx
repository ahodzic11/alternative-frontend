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
import "./../css/ReadWorkshops.css";

function ReadArticles() {
  const [articles, setArticles] = useState([]);
  const [show, setShow] = useState(false);
  const [chosenArticle, setChosenArticle] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (item) => setShow(true);
  const navigate = useNavigate();

  const getArticles = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/articles`);
      setArticles(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getArticles();
  }, []);

  const editArticle = (e, item) => {
    e.preventDefault();
    navigate("/editarticle/" + formatPath(item.naziv));
  };

  const chooseImage = (e, item) => {
    e.preventDefault();
    navigate("/chooseimage/clanak/" + formatPath(item.naziv));
  };

  async function handleDelete() {
    setShow(false);
    try {
      const res = await axios.delete(`http://localhost:5000/api/articles/` + chosenArticle.id);
    } catch (err) {}
    try {
      const res = await axios.delete(`http://localhost:5000/delete/clanci/` + chosenArticle.naziv);
    } catch (err) {}
    getArticles();
  }

  function deleteFunction(e, item) {
    e.preventDefault();
    setChosenArticle(item);
    handleShow(item);
  }

  return (
    <>
      <AdminNavigation />
      <div className="readWorkshopContainer">
        <div className="currentLocationHeadline">Uneseni članci</div>
        <div className="filterAndSortingContainer"></div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Brisanje članka</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sigurno želite obrisati članak?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Ne
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Da
            </Button>
          </Modal.Footer>
        </Modal>
        {articles.map((item) => (
          <div className="basicInfo">
            <div className="firstWorkshopInformation">
              <div className="workshopTitle">{item.naziv}</div>
              <div className="infoItem">{item.nazivMedija}</div>
              <div className="infoItem">{item.tipMedija}</div>
              <div className="infoItem">{item.tekst}</div>
              <div className="infoItem">{item.datum}</div>
            </div>
            <div className="workshopOptions">
              <div className="editWorkshop workshopEditOption" onClick={(e) => editArticle(e, item)}>
                <img src={editIcon} />
              </div>
              <div className="changePictureOption workshopEditOption" onClick={(e) => chooseImage(e, item)}>
                <img src={changePictureIcon} />
              </div>
              <div className="deleteWorkshop workshopEditOption" onClick={(e) => deleteFunction(e, item)}>
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

export default ReadArticles;
