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
import deleteIcon from "./../assets/deleteIconWhite.png";
import ImageViewer from "react-simple-image-viewer";
import Modal from "react-bootstrap/Modal";
import "./../css/ReadWorkshops.css";
import { formatPath } from "../js/namechange";

function EditDonators() {
  let { name } = useParams();
  const [donator, setDonator] = useState([]);
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [chosenImage, setChosenImage] = useState({});
  const path = "http://localhost:5000/newUploads/donatori/" + name + "/";

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
      const response = await axios.get(`http://localhost:5000/donatori/` + name);
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
    updateDonator(formDataObj);
  };

  const updateDonator = async (formDataObj) => {
    try {
      const updatedDonator = {
        id: donator.id,
        naziv: formDataObj.naziv,
        link: formDataObj.link,
        pocetakPodrske: formDataObj.pocetakPodrske,
        krajPodrske: formDataObj.krajPodrske,
      };
      const res = await axios.patch(`http://localhost:5000/api/donators/`, updatedDonator);
    } catch (err) {}
  };

  useEffect(() => {
    const getDonator = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/donators/` + name);
        const dummyWorkshop = res.data.data;
        setDonator(dummyWorkshop);
      } catch (err) {}
    };

    getSlike();
    getDonator();
  }, []);

  async function updateImage(updatedItem) {
    try {
      const res = await axios.patch(`http://localhost:5000/api/donators/updateImage`, updatedItem);
      console.log(res);
    } catch (err) {}
  }

  const handleImageDeletion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/donators/selectedImage/` + donator.id);
      if (chosenImage == res.data.data.naslovnaSlika) {
        for (let i = 0; i < images.length; i++) {
          if (images[i] != chosenImage) {
            updateImage({
              id: donator.id,
              naslovnaSlika: images[i],
            });
            break;
          }
        }
      }
    } catch (err) {}
    try {
      const res = await axios.delete(`http://localhost:5000/delete/donatori/` + formatPath(donator.naziv) + "/" + chosenImage);
    } catch (err) {}
    getSlike();
    setShow(false);
  };

  const handleImageAdding = async () => {
    var uploadForm = document.getElementById("uploadForm");
    var uploadFormData = new FormData(uploadForm);
    try {
      const response = await axios.patch(`http://localhost:5000/upload/donatori/` + donator.naziv, uploadFormData);
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
        <div className="currentLocationHeadline">Izmjena donatora</div>
        <div className="addWorkshopForm">
          <Form className="customFormContainer" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv donatora" defaultValue={donator.naziv} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Link</Form.Label>
                <Form.Control name="link" required type="text" placeholder="Link na stranicu donatora" defaultValue={donator.link} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Početak podrške</Form.Label>
                <Form.Control name="pocetakPodrske" required type="text" placeholder="npr. 2016" defaultValue={donator.pocetakPodrske} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Kraj podrške</Form.Label>
                <Form.Control name="krajPodrske" required type="text" placeholder="npr. 2019" defaultValue={donator.krajPodrske} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
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
      {isViewerOpen && <ImageViewer src={images.map((image) => "http://localhost:5000/newuploads/donatori/" + name + "/" + image)} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />}
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default EditDonators;
