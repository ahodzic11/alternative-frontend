import React, { useCallback, useEffect } from "react";
import { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import deleteIcon from "./../assets/deleteIconWhite.png";
import { englishFormatDate, formatDate, formatPath } from "../js/namechange";
import ImageViewer from "react-simple-image-viewer";
import Modal from "react-bootstrap/Modal";
import "./../css/ReadWorkshops.css";

function EditWorkshops() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  let { name } = useParams();
  const [workshop, setWorkshop] = useState([]);
  const [oblast, setOblast] = useState({});
  const [images, setImages] = useState([]);
  const [validated, setValidated] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [chosenImage, setChosenImage] = useState({});
  const path = runningModePath + "/newuploads/radionice/" + name + "/";
  const navigate = useNavigate();

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
      const response = await axios.get(runningModePath + `/radionice/` + name);
      setImages(response.data);
    } catch (err) {}
  };

  const handleSubmit = async (event) => {
    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    updateWorkshop(formDataObj);
  };

  const updateWorkshop = async (formDataObj) => {
    var firstDate = formDataObj.datum.split("-");
    var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
    try {
      const updatedWorkshop = {
        id: workshop.id,
        naslov: formDataObj.naslov,
        formatiranNaslov: formatPath(formDataObj.naslov),
        mjesto: formDataObj.mjesto,
        datum: formatDate(firstCorrectDate),
        trener: formDataObj.trener,
        ucesnici: formDataObj.ucesnici,
        nazivDonatora: formDataObj.nazivDonatora,
        nazivProjekta: formDataObj.nazivProjekta,
        cilj: formDataObj.cilj,
        opisRadionice: formDataObj.opisRadionice,
        oblastRadionice: formDataObj.oblastRadionice,
      };
      const res = await axios.patch(runningModePath + `/api/workshops/`, updatedWorkshop);
    } catch (err) {}
    if (formDataObj.naslov != workshop.naslov) {
      console.log("uslo ovdje");
      try {
        const res = await axios.patch(runningModePath + `/updatelocation/`, { type: "radionice", oldNaziv: workshop.naslov, naziv: formDataObj.naslov });
      } catch (err) {}
      try {
        const updatedItem = {
          id: workshop.id,
          naslovnaSlika: formatPath(formDataObj.naslov) + workshop.naslovnaSlika.replace(workshop.formatiranNaslov, "").replace(".jpg", "") + ".jpg",
        };
        const res = await axios.patch(runningModePath + `/api/workshops/updateImage`, updatedItem);
      } catch (err) {}
    }
  };

  useEffect(() => {
    const getWorkshop = async () => {
      try {
        const res = await axios.get(runningModePath + `/api/workshops/` + name);
        const dummyWorkshop = res.data.data;
        setOblast(dummyWorkshop.oblastRadionice);
        setWorkshop(dummyWorkshop);
      } catch (err) {}
    };

    getSlike();
    getWorkshop();
  }, []);

  async function updateImage(updatedItem) {
    try {
      const res = await axios.patch(runningModePath + `/api/workshops/updateImage`, updatedItem);
      console.log(res);
    } catch (err) {}
  }

  const handleImageDeletion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(runningModePath + `/api/workshops/selectedImage/` + workshop.id);
      if (chosenImage == res.data.data.naslovnaSlika) {
        for (let i = 0; i < images.length; i++) {
          if (images[i] != chosenImage) {
            updateImage({
              id: workshop.id,
              naslovnaSlika: images[i],
            });
            break;
          }
        }
      }
    } catch (err) {}
    try {
      const res = await axios.delete(runningModePath + `/delete/radionice/` + formatPath(workshop.naslov) + "/" + chosenImage);
    } catch (err) {}
    getSlike();
    setShow(false);
  };

  const handleImageAdding = async () => {
    var uploadForm = document.getElementById("uploadForm");
    var uploadFormData = new FormData(uploadForm);
    try {
      const response = await axios.patch(runningModePath + `/upload/radionice/` + workshop.naslov, uploadFormData);
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
        <div className="currentLocationHeadline">Izmjena radionice</div>
        <div className="addWorkshopForm">
          <Form className="customFormContainer" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naslov</Form.Label>
                <Form.Control name="naslov" required type="text" placeholder="Naslov radionice" defaultValue={workshop.naslov} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Mjesto</Form.Label>
                <Form.Control name="mjesto" required type="text" placeholder="Mjesto radionice" defaultValue={workshop.mjesto} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <div className="col-md-4">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Datum</Form.Label>
                  {workshop.datum ? <Form.Control name="datum" type="date" placeholder="datum" defaultValue={englishFormatDate(workshop.datum)} /> : <Form.Control name="datum" type="date" placeholder="datum" />}
                </Form.Group>
              </div>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Donator</Form.Label>
                <Form.Control name="nazivDonatora" type="text" placeholder="Naziv donatora" defaultValue={workshop.nazivDonatora} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Projekat</Form.Label>
                <Form.Control name="nazivProjekta" type="text" placeholder="Naziv projekta" defaultValue={workshop.nazivProjekta} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Trener</Form.Label>
                <Form.Control name="trener" required type="text" placeholder="Ime trenera" defaultValue={workshop.trener} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Učesnici</Form.Label>
                <Form.Control name="ucesnici" type="text" placeholder="Broj ili ime učesnika" defaultValue={workshop.ucesnici} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Cilj</Form.Label>
                <Form.Control name="cilj" type="text" placeholder="Cilj radionice" defaultValue={workshop.cilj} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Oblast radionice</Form.Label>
                <Form.Select name="oblastRadionice" aria-label="Default select example" value={oblast} onChange={(e) => setOblast(e.target.value)}>
                  <option value="Oblast radionice">Oblast radionice</option>
                  <option value="Civilno društvo">Civilno društvo</option>
                  <option value="Izgradnja samopoštovanja i samopouzdanja">Izgradnja samopoštovanja i samopouzdanja</option>
                  <option value="Ekologija i zdravlje">Ekologija i zdravlje</option>
                  <option value="Dječje kreativne radionice">Dječje kreativne radionice</option>
                  <option value="Izgradnja mira">Izgradnja mira</option>
                  <option value="Kultura i obrazovanje">Kultura i obrazovanje</option>
                  <option value="Ljudska prava">Ljudska prava</option>
                  <option value="Prevencija rodno zasnovanog nasilja">Prevencija rodno zasnovanog nasilja</option>
                  <option value="Prevencija bolesti ovisnosti">Prevencija bolesti ovisnosti</option>
                  <option value="Jačanje kompetencija mladih">Jačanje kompetencija mladih</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Opis radionice</Form.Label>
              <Form.Control name="opisRadionice" as="textarea" rows={4} defaultValue={workshop.opisRadionice} />
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
      {isViewerOpen && <ImageViewer src={images.map((image) => runningModePath + "/newuploads/radionice/" + name + "/" + image)} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />}
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default EditWorkshops;
