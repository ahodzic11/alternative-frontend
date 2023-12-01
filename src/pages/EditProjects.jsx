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
import "./../css/EditProjects.css";
import { englishFormatDate, formatDate, formatPath } from "../js/namechange";

function EditProjects() {
  const [project, setProject] = useState([]);
  let { name } = useParams();
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [chosenImage, setChosenImage] = useState({});
  const path = "http://localhost:5000/newUploads/projekti/" + name + "/";

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
      const response = await axios.get(`http://localhost:5000/projekti/` + name);
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
    updateProject(formDataObj);
  };

  const updateProject = async (formDataObj) => {
    var firstDate = formDataObj.pocetakImplementacije.split("-");
    var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
    var secondDate = formDataObj.krajImplementacije.split("-");
    var secondCorrectDate = new Date(secondDate[0], secondDate[1] - 1, secondDate[2]);
    try {
      const updatedProject = {
        id: project.id,
        naziv: formDataObj.naziv,
        formatiranNaziv: formatPath(formDataObj.naziv),
        mjesto: formDataObj.mjesto,
        pocetakImplementacije: formatDate(firstCorrectDate),
        krajImplementacije: formatDate(secondCorrectDate),
        nazivDonatora: formDataObj.nazivDonatora,
        projektniGrant: formDataObj.projektniGrant,
        ciljnaGrupa: formDataObj.ciljnaGrupa,
        cilj: formDataObj.cilj,
        opisProjekta: formDataObj.opisProjekta,
      };
      const res = await axios.patch(`http://localhost:5000/api/projects/`, updatedProject);
    } catch (err) {}
    if (formDataObj.naziv != project.naziv) {
      try {
        const res = await axios.patch(`http://localhost:5000/updatelocation/`, { type: "projekti", oldNaziv: project.naziv, naziv: formDataObj.naziv });
      } catch (err) {}
      try {
        const updatedItem = {
          id: project.id,
          naslovnaSlika: formatPath(formDataObj.naziv) + project.naslovnaSlika.replace(project.formatiranNaziv, "").replace(".jpg", "") + ".jpg",
        };
        const res = await axios.patch(`http://localhost:5000/api/projects/updateImage`, updatedItem);
      } catch (err) {}
    }
  };

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/projects/` + name);
        setProject(res.data.data);
      } catch (err) {}
    };

    getSlike();
    getProject();
  }, []);

  async function updateImage(updatedItem) {
    try {
      const res = await axios.patch(`http://localhost:5000/api/projects/updateImage`, updatedItem);
      console.log(res);
    } catch (err) {}
  }

  const handleImageDeletion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/projects/selectedImage/` + project.id);
      if (chosenImage == res.data.data.naslovnaSlika) {
        for (let i = 0; i < images.length; i++) {
          if (images[i] != chosenImage) {
            updateImage({
              id: project.id,
              naslovnaSlika: images[i],
            });
            break;
          }
        }
      }
    } catch (err) {}
    try {
      const res = await axios.delete(`http://localhost:5000/delete/projekti/` + formatPath(project.naziv) + "/" + chosenImage);
    } catch (err) {}
    getSlike();
    setShow(false);
  };

  const handleImageAdding = async () => {
    var uploadForm = document.getElementById("uploadForm");
    var uploadFormData = new FormData(uploadForm);
    try {
      const response = await axios.patch(`http://localhost:5000/upload/projekti/` + project.naziv, uploadFormData);
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
        <div className="currentLocationHeadline">Izmjena projekta</div>
        <div className="addWorkshopForm">
          <Form className="customFormContainer" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv projekta</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv projekta" defaultValue={project.naziv} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Mjesto implementacije</Form.Label>
                <Form.Control name="mjesto" required type="text" placeholder="Mjesto implementacije" defaultValue={project.mjesto} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Početak implementacije</Form.Label>
                  {project.pocetakImplementacije ? <Form.Control name="pocetakImplementacije" required type="date" placeholder="datum" defaultValue={englishFormatDate(project.pocetakImplementacije)} /> : <Form.Control name="pocetakImplementacije" required type="date" placeholder="datum" />}
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Kraj implementacije</Form.Label>
                  {project.krajImplementacije ? <Form.Control name="krajImplementacije" required type="date" placeholder="datum" defaultValue={englishFormatDate(project.krajImplementacije)} /> : <Form.Control name="krajImplementacije" required type="date" placeholder="datum" />}
                </Form.Group>
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Donator</Form.Label>
                <Form.Control name="nazivDonatora" required type="text" placeholder="Naziv donatora" defaultValue={project.nazivDonatora} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Grant</Form.Label>
                <Form.Control name="projektniGrant" required type="text" placeholder="Grant" defaultValue={project.projektniGrant} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Ciljna grupa</Form.Label>
                <Form.Control name="ciljnaGrupa" type="text" placeholder="Ciljna grupa" defaultValue={project.ciljnaGrupa} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Cilj</Form.Label>
                <Form.Control name="cilj" required type="text" placeholder="Cilj projekta" defaultValue={project.cilj} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3"></Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Opis projekta</Form.Label>
              <Form.Control required name="opisProjekta" as="textarea" rows={12} defaultValue={project.opisProjekta} />
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
      {isViewerOpen && <ImageViewer src={images.map((image) => "http://localhost:5000/newuploads/projekti/" + name + "/" + image)} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />}
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default EditProjects;
