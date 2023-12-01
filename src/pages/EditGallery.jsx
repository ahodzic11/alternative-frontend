import React, { useCallback, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import ImageViewer from "react-simple-image-viewer";
import deleteIcon from "./../assets/deleteIconWhite.png";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "./../css/EditGallery.css";

function EditGallery() {
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [chosenImage, setChosenImage] = useState({});
  const path = "http://localhost:5000/newuploads/galerija/";

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  function deleteFunction(e, item) {
    e.preventDefault();
    setChosenImage(item);
    handleShow(item);
  }

  const handleImageDeletion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.delete(`http://localhost:5000/deleteimage/galerija/` + chosenImage);
    } catch (err) {}
    getSlike();
    setShow(false);
  };

  const getSlike = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/galerija/`);
      setImages(response.data);
    } catch (err) {}
  };

  const handleImageAdding = async () => {
    var uploadForm = document.getElementById("uploadForm");
    var uploadFormData = new FormData(uploadForm);
    try {
      const response = await axios.patch(`http://localhost:5000/upload/galerija/`, uploadFormData);
    } catch (err) {
      console.log(err);
    }
    getSlike();
  };

  useEffect(() => {
    getSlike();
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Galerija</div>
        <div className="addWorkshopForm">
          <Form className="customFormContainer" noValidate validated={validated}>
            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Dodaj još slika</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input id="uploadedFiles" required className="uploadImagesInput" type="file" name="image" multiple onChange={handleImageAdding} />
              </form>
            </Row>
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
      {isViewerOpen && <ImageViewer src={images.map((image) => "http://localhost:5000/newuploads/galerija/" + image)} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />}
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default EditGallery;
