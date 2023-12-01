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
import ImageViewer from "react-simple-image-viewer";
import Modal from "react-bootstrap/Modal";
import deleteIcon from "./../assets/deleteIconWhite.png";
import { englishFormatDate, formatDate, formatPath } from "../js/namechange";
import "./../css/EditProjects.css";

function EditActivities() {
  let { name } = useParams();
  const [activity, setActivity] = useState([]);
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [chosenImage, setChosenImage] = useState({});
  const path = "http://localhost:5000/newUploads/aktivnosti/" + name + "/";

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
      const response = await axios.get(`http://localhost:5000/aktivnosti/` + name);
      setImages(response.data);
    } catch (err) {}
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target),
      formDataObj = Object.fromEntries(formData.entries());
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    updateActivity(formDataObj);
  };

  const updateActivity = async (formDataObj) => {
    var firstDate = formDataObj.datum.split("-");
    var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
    try {
      const updatedActivity = {
        id: activity.id,
        naziv: formDataObj.naziv,
        formatiranNaziv: formatPath(formDataObj.naziv),
        mjesto: formDataObj.mjesto,
        datum: formatDate(firstCorrectDate),
        nazivDonatora: formDataObj.nazivDonatora,
        nazivProjekta: formDataObj.nazivProjekta,
        opisAktivnosti: formDataObj.opisAktivnosti,
      };
      const res = await axios.patch(`http://localhost:5000/api/activities/`, updatedActivity);
    } catch (err) {}
    if (formDataObj.naziv != activity.naziv) {
      try {
        const res = await axios.patch(`http://localhost:5000/updatelocation/`, { type: "aktivnosti", oldNaziv: activity.naziv, naziv: formDataObj.naziv });
      } catch (err) {}
      try {
        const updatedItem = {
          id: activity.id,
          naslovnaSlika: formatPath(formDataObj.naziv) + activity.naslovnaSlika.replace(activity.formatiranNaziv, "").replace(".jpg", "") + ".jpg",
        };
        const res = await axios.patch(`http://localhost:5000/api/activities/updateImage`, updatedItem);
      } catch (err) {}
    }
  };

  useEffect(() => {
    const getActivity = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/activities/` + name);
        console.log(res.data.data);
        setActivity(res.data.data);
      } catch (err) {}
    };

    getSlike();
    getActivity();
  }, []);

  async function updateImage(updatedItem) {
    try {
      const res = await axios.patch(`http://localhost:5000/api/activities/updateImage`, updatedItem);
      console.log(res);
    } catch (err) {}
  }

  const handleImageDeletion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/activities/selectedImage/` + activity.id);
      if (chosenImage == res.data.data.naslovnaSlika) {
        for (let i = 0; i < images.length; i++) {
          if (images[i] != chosenImage) {
            updateImage({
              id: activity.id,
              naslovnaSlika: images[i],
            });
            break;
          }
        }
      }
    } catch (err) {}
    try {
      const res = await axios.delete(`http://localhost:5000/delete/aktivnosti/` + formatPath(activity.naziv) + "/" + chosenImage);
    } catch (err) {}
    getSlike();
    setShow(false);
  };

  const handleImageAdding = async () => {
    var uploadForm = document.getElementById("uploadForm");
    var uploadFormData = new FormData(uploadForm);
    try {
      const response = await axios.patch(`http://localhost:5000/upload/aktivnosti/` + activity.naziv, uploadFormData);
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
        <div className="currentLocationHeadline">Izmjena aktivnosti</div>
        <div className="addWorkshopForm">
          <Form className="customFormContainer" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv aktivnosti</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv aktivnosti" defaultValue={activity.naziv} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Mjesto</Form.Label>
                <Form.Control name="mjesto" required type="text" placeholder="Mjesto radionice" defaultValue={activity.mjesto} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Datum</Form.Label>
                  {activity.datum ? <Form.Control required name="datum" type="date" placeholder="datum" defaultValue={englishFormatDate(activity.datum)} /> : <Form.Control required name="datum" type="date" placeholder="datum" />}
                </Form.Group>
              </div>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Donator</Form.Label>
                <Form.Control name="nazivDonatora" required type="text" placeholder="Naziv donatora" defaultValue={activity.nazivDonatora} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Projekat</Form.Label>
                <Form.Control name="nazivProjekta" type="text" placeholder="Naziv projekta" defaultValue={activity.nazivProjekta} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Opis aktivnosti</Form.Label>
              <Form.Control required name="opisAktivnosti" as="textarea" rows={6} defaultValue={activity.opisAktivnosti} />
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
      {isViewerOpen && <ImageViewer src={images.map((image) => "http://localhost:5000/newuploads/aktivnosti/" + name + "/" + image)} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />}
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default EditActivities;
