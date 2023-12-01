import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { englishFormatDate, formatDate, formatPath } from "../js/namechange";
import deleteIcon from "./../assets/deleteIconWhite.png";
import ImageViewer from "react-simple-image-viewer";
import Modal from "react-bootstrap/Modal";
import "./../css/ReadWorkshops.css";

function EditOffers() {
  let { name } = useParams();
  const [offer, setOffer] = useState([]);
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [tipPonude, setTipPonude] = useState({});
  const [tipPrijave, setTipPrijave] = useState({});
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [chosenImage, setChosenImage] = useState({});
  const path = "http://localhost:5000/newUploads/ponude/" + name + "/";

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  const getSlike = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/ponude/` + name);
      setImages(response.data);
    } catch (err) {}
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    const form = event.currentTarget;
    console.log(formDataObj.tipPonude);
    if (formDataObj.tipPonude == "Tip ponude") {
      alert("Morate unijeti tip ponude!");
      return;
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    updateOffer(formDataObj);
  };

  const updateOffer = async (formDataObj) => {
    try {
      let pocetakPonude = null,
        krajPonude = null;
      if (formDataObj.pocetakPonude) {
        var firstDate = formDataObj.pocetakPonude.split("-");
        pocetakPonude = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
        pocetakPonude = formatDate(pocetakPonude);
      }
      if (formDataObj.krajPonude) {
        var secondDate = formDataObj.krajPonude.split("-");
        krajPonude = new Date(secondDate[0], secondDate[1] - 1, secondDate[2]);
        krajPonude = formatDate(krajPonude);
      }
      const updatedOffer = {
        id: offer.id,
        naziv: formDataObj.naziv,
        formatiranNaziv: formatPath(formDataObj.naziv),
        opis: formDataObj.opis,
        sadrzajPonude: formDataObj.sadrzajPonude,
        trener: formDataObj.trener,
        pocetakPonude: pocetakPonude,
        krajPonude: krajPonude,
        cijena: formDataObj.cijena,
        uzrast: formDataObj.uzrast,
        napomene: formDataObj.napomene,
        tipPonude: tipPonude,
        tipPrijave: tipPrijave,
      };
      const res = await axios.patch(`http://localhost:5000/api/offers/`, updatedOffer);
    } catch (err) {}
    if (formDataObj.naziv != offer.naziv) {
      try {
        const res = await axios.patch(`http://localhost:5000/updatelocation/`, { type: "ponude", oldNaziv: offer.naziv, naziv: formDataObj.naziv });
      } catch (err) {}
      try {
        const updatedItem = {
          id: offer.id,
          naslovnaSlika: formatPath(formDataObj.naziv) + offer.naslovnaSlika.replace(offer.formatiranNaziv, "").replace(".jpg", "") + ".jpg",
        };
        const res = await axios.patch(`http://localhost:5000/api/offers/updateImage`, updatedItem);
      } catch (err) {}
    }
  };

  useEffect(() => {
    const getOffer = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/offers/` + name);
        const dummyWorkshop = res.data.data;
        setTipPonude(dummyWorkshop.tipPonude);
        setTipPrijave(dummyWorkshop.tipPrijave);
        setOffer(dummyWorkshop);
      } catch (err) {}
    };

    getSlike();
    getOffer();
  }, []);

  async function updateImage(updatedItem) {
    try {
      const res = await axios.patch(`http://localhost:5000/api/offers/updateImage`, updatedItem);
      console.log(res);
    } catch (err) {}
  }

  const handleImageDeletion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/offers/selectedImage/` + offer.id);
      if (chosenImage == res.data.data.naslovnaSlika) {
        for (let i = 0; i < images.length; i++) {
          if (images[i] != chosenImage) {
            updateImage({
              id: offer.id,
              naslovnaSlika: images[i],
            });
            break;
          }
        }
      }
    } catch (err) {}
    try {
      const res = await axios.delete(`http://localhost:5000/delete/ponude/` + formatPath(offer.naziv) + "/" + chosenImage);
    } catch (err) {}
    getSlike();
    setShow(false);
  };

  const handleImageAdding = async () => {
    var uploadForm = document.getElementById("uploadForm");
    var uploadFormData = new FormData(uploadForm);
    try {
      const response = await axios.patch(`http://localhost:5000/upload/ponude/` + offer.naziv, uploadFormData);
    } catch (err) {
      console.log(err);
    }
    getSlike();
  };

  function deleteFunction(e, item) {
    e.preventDefault();
    setChosenImage(item);
    handleShow(item);
  }

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Izmjena ponude</div>
        <div className="addWorkshopForm">
          <Form className="customFormContainer" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv ponude</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv ponude" defaultValue={offer.naziv} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Uzrast</Form.Label>
                <Form.Control name="uzrast" required type="text" placeholder="Uzrast" defaultValue={offer.uzrast} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Cijena</Form.Label>
                <Form.Control name="cijena" required type="text" placeholder="U KM" defaultValue={offer.cijena} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Početak ponude</Form.Label>
                  {offer.pocetakPonude ? <Form.Control name="pocetakPonude" type="date" placeholder="datum" defaultValue={englishFormatDate(offer.pocetakPonude)} /> : <Form.Control name="pocetakPonude" type="date" placeholder="datum" />}
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Kraj ponude</Form.Label>
                  {offer.pocetakPonude ? <Form.Control name="krajPonude" type="date" placeholder="datum" defaultValue={englishFormatDate(offer.krajPonude)} /> : <Form.Control name="krajPonude" type="date" placeholder="datum" />}
                </Form.Group>
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md={4} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Trener</Form.Label>
                <Form.Control name="trener" required type="text" placeholder="Trener" defaultValue={offer.trener} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Tip ponude</Form.Label>
                <Form.Select required name="tipPonude" aria-label="Default select example" value={tipPonude} onChange={(e) => setTipPonude(e.target.value)}>
                  <option>Tip ponude</option>
                  <option value="Jednodnevna">Jednodnevna</option>
                  <option value="Višednevna">Višednevna</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Tip prijave</Form.Label>
                <Form.Select required name="tipPrijave" aria-label="Default select example" value={tipPrijave} onChange={(e) => setTipPrijave(e.target.value)}>
                  <option>Tip prijave</option>
                  <option value="Rezervacija">Rezervacija</option>
                  <option value="Prijava">Prijava</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Opis ponude</Form.Label>
              <Form.Control required name="opis" as="textarea" rows={2} defaultValue={offer.opis} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Sadržaj ponude</Form.Label>
              <Form.Control required name="sadrzajPonude" as="textarea" rows={4} defaultValue={offer.sadrzajPonude} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Upute/napomene</Form.Label>
              <Form.Control required name="napomene" as="textarea" rows={4} defaultValue={offer.napomene} />
            </Form.Group>
            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Dodaj još slika</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input id="uploadedFiles" required className="uploadImagesInput" type="file" name="image" multiple onChange={handleImageAdding} />
              </form>
            </Row>
            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Slike</Form.Label>
              <div className="workshopSecondImages">
                {images.map((image, index) => (
                  <div className="customImageDeletionContainer">
                    <img key={index} id={image} className="workshopInformationImageElement" src={path + image} alt="slikaSRadionice" onClick={() => openImageViewer(index)} />
                    <div className="deleteImageContainer" onClick={(e) => deleteFunction(e, image)}>
                      <img className="deleteImageIcon" src={deleteIcon} />
                    </div>
                  </div>
                ))}
              </div>
            </Row>
            <div className="addStuffButton">
              <Button type="submit">Sačuvaj izmjene</Button>
            </div>
          </Form>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Brisanje slike</Modal.Title>
        </Modal.Header>
        <Modal.Body>Sigurno želite obrisati sliku?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Ne
          </Button>
          <Button variant="primary" onClick={(e) => handleImageDeletion(e)}>
            Da
          </Button>
        </Modal.Footer>
      </Modal>
      {isViewerOpen && <ImageViewer src={images.map((image) => "http://localhost:5000/newuploads/ponude/" + name + "/" + image)} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />}
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default EditOffers;
