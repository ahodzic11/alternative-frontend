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
import { formatPath } from "../js/namechange";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import "./../css/ReadWorkshops.css";

function ReadOffers() {
  const [offers, setOffers] = useState([]);
  const [show, setShow] = useState(false);
  const [chosenOffer, setChosenOffer] = useState({});
  const handleClose = () => setShow(false);
  const handleShow = (item) => setShow(true);
  const navigate = useNavigate();

  const getOffers = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/offers`);
      setOffers(res.data.data);
    } catch (err) {}
  };
  useEffect(() => {
    getOffers();
  }, []);

  const editOffer = (e, item) => {
    e.preventDefault();
    navigate("/editoffer/" + formatPath(item.naziv));
  };

  const chooseImage = (e, item) => {
    e.preventDefault();
    navigate("/chooseimage/ponuda/" + formatPath(item.naziv));
  };

  async function handleDelete() {
    setShow(false);
    try {
      const res = await axios.delete(`http://localhost:5000/api/offers/` + chosenOffer.id);
    } catch (err) {}
    try {
      const res = await axios.delete(`http://localhost:5000/delete/ponude/` + chosenOffer.naziv);
    } catch (err) {}
    getOffers();
  }

  function deleteFunction(e, item) {
    e.preventDefault();
    setChosenOffer(item);
    handleShow(item);
  }

  return (
    <>
      <AdminNavigation />
      <div className="readWorkshopContainer">
        <div className="currentLocationHeadline">Unesene ponude</div>
        <div className="filterAndSortingContainer"></div>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Brisanje ponude</Modal.Title>
          </Modal.Header>
          <Modal.Body>Sigurno želite obrisati ponudu?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Ne
            </Button>
            <Button variant="primary" onClick={handleDelete}>
              Da
            </Button>
          </Modal.Footer>
        </Modal>
        {offers.map((item) => (
          <div className="basicInfo">
            <div className="firstWorkshopInformation">
              <div className="workshopTitle">{item.naziv}</div>
              <div className="infoItem">{item.opis}</div>
              <div className="infoItem">{item.sadrzajPonude}</div>
              <div className="infoItem">{item.trener}</div>
              <div className="infoItem">{item.pocetakPonude}</div>
              <div className="infoItem">{item.krajPonude}</div>
              <div className="infoItem">{item.cijena}</div>
              <div className="infoItem">{item.uzrast}</div>
            </div>
            <div className="workshopOptions">
              <div className="editWorkshop workshopEditOption" onClick={(e) => editOffer(e, item)}>
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

export default ReadOffers;
