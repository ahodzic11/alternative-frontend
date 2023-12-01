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
import ImageViewer from "react-simple-image-viewer";
import Modal from "react-bootstrap/Modal";
import deleteIcon from "./../assets/deleteIconWhite.png";
import "./../css/EditProjects.css";

function EditArticles() {
  let { name } = useParams();
  const [article, setArticle] = useState([]);
  const [validated, setValidated] = useState(false);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [chosenImage, setChosenImage] = useState({});
  const [tipMedija, setTipMedija] = useState({});
  const path = "http://localhost:5000/newUploads/clanci/" + name + "/";

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
      const response = await axios.get(`http://localhost:5000/clanci/` + name);
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
    updateArticle(formDataObj);
  };

  const updateArticle = async (formDataObj) => {
    var firstDate = formDataObj.datum.split("-");
    var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
    try {
      const updatedArticle = {
        id: article.id,
        naziv: formDataObj.naziv,
        formatiranNaziv: formatPath(formDataObj.naziv),
        nazivMedija: formDataObj.nazivMedija,
        tipMedija: formDataObj.tipMedija,
        tekst: formDataObj.tekst,
        link: formDataObj.link,
        datum: formatDate(firstCorrectDate),
      };
      const res = await axios.patch(`http://localhost:5000/api/articles/`, updatedArticle);
    } catch (err) {}
    if (formDataObj.naziv != article.naziv) {
      try {
        const res = await axios.patch(`http://localhost:5000/updatelocation/`, { type: "clanci", oldNaziv: article.naziv, naziv: formDataObj.naziv });
      } catch (err) {}
      try {
        const updatedItem = {
          id: article.id,
          naslovnaSlika: formatPath(formDataObj.naziv) + article.naslovnaSlika.replace(article.formatiranNaziv, "").replace(".jpg", "") + ".jpg",
        };
        const res = await axios.patch(`http://localhost:5000/api/articles/updateImage`, updatedItem);
      } catch (err) {}
    }
  };

  useEffect(() => {
    const getArticle = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/articles/` + name);
        setArticle(res.data.data);
        setTipMedija(res.data.data.tipMedija);
      } catch (err) {}
    };

    getSlike();
    getArticle();
  }, []);

  async function updateImage(updatedItem) {
    try {
      const res = await axios.patch(`http://localhost:5000/api/articles/updateImage`, updatedItem);
      console.log(res);
    } catch (err) {}
  }

  const handleImageDeletion = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.get(`http://localhost:5000/api/articles/selectedImage/` + article.id);
      if (chosenImage == res.data.data.naslovnaSlika) {
        for (let i = 0; i < images.length; i++) {
          if (images[i] != chosenImage) {
            updateImage({
              id: article.id,
              naslovnaSlika: images[i],
            });
            break;
          }
        }
      }
    } catch (err) {}
    try {
      const res = await axios.delete(`http://localhost:5000/delete/clanci/` + formatPath(article.naziv) + "/" + chosenImage);
    } catch (err) {}
    getSlike();
    setShow(false);
  };

  const handleImageAdding = async () => {
    var uploadForm = document.getElementById("uploadForm");
    var uploadFormData = new FormData(uploadForm);
    try {
      const response = await axios.patch(`http://localhost:5000/upload/clanci/` + article.naziv, uploadFormData);
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
        <div className="currentLocationHeadline">Izmjena članka</div>
        <div className="addWorkshopForm">
          <Form className="customFormContainer" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv članka" defaultValue={article.naziv} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Naziv medija</Form.Label>
                <Form.Control name="nazivMedija" required type="text" placeholder="Naziv medija" defaultValue={article.nazivMedija} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Link</Form.Label>
                <Form.Control name="link" required type="text" placeholder="Link" defaultValue={article.link} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div className="col-md-4">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Datum</Form.Label>
                  {article.datum ? <Form.Control name="datum" type="date" placeholder="datum" defaultValue={englishFormatDate(article.datum)} /> : <Form.Control name="datum" type="date" placeholder="datum" />}
                </Form.Group>
              </div>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Tip medija</Form.Label>
                <Form.Select name="tipMedija" aria-label="Default select example" value={tipMedija} onChange={(e) => setTipMedija(e.target.value)}>
                  <option>Tip medija</option>
                  <option value="Web portal">Web portal</option>
                  <option value="Društvene mreže">Društvene mreže</option>
                  <option value="TV">TV</option>
                  <option value="Štampa">Štampa</option>
                </Form.Select>
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Tekst</Form.Label>
              <Form.Control name="tekst" as="textarea" rows={14} defaultValue={article.tekst} />
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
      {isViewerOpen && <ImageViewer src={images.map((image) => "http://localhost:5000/newuploads/clanci/" + name + "/" + image)} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />}
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default EditArticles;
