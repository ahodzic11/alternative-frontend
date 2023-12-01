import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { addProject } from "../redux/apiCalls";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import "./../css/AddWorkshopPage.css";
import { formatDate, formatPath } from "../js/namechange";

function AddProjectPage() {
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (document.getElementById("uploadedFiles").files.length === 0) {
      alert("Morate unijeti bar jednu sliku!");
      return;
    }
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }
    var uploadForm = document.getElementById("uploadForm");
    var uploadFormData = new FormData(uploadForm);

    try {
      const response = await axios.post(`http://localhost:5000/upload/projekti/` + inputs.naziv, uploadFormData);
    } catch (err) {}

    var firstDate = inputs.pocetakImplementacije.split("-");
    var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
    var secondDate = inputs.krajImplementacije.split("-");
    var secondCorrectDate = new Date(secondDate[0], secondDate[1] - 1, secondDate[2]);

    addProject({
      naziv: inputs.naziv,
      formatiranNaziv: formatPath(inputs.naziv),
      mjesto: inputs.mjesto,
      pocetakImplementacije: formatDate(firstCorrectDate),
      krajImplementacije: formatDate(secondCorrectDate),
      nazivDonatora: inputs.nazivDonatora,
      projektniGrant: inputs.projektniGrant,
      ciljnaGrupa: inputs.ciljnaGrupa,
      cilj: inputs.cilj,
      opisProjekta: inputs.opisProjekta,
      naslovnaSlika: formatPath(inputs.naziv) + "0.jpg",
    });
    alert("Projekat uspješno dodan!");
  };

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Dodavanje projekta</div>
        <div className="addWorkshopForm">
          <Form className="customFormContainer" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv projekta</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv projekta" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Mjesto implementacije</Form.Label>
                <Form.Control name="mjesto" required type="text" placeholder="Mjesto implementacije" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Početak implementacije</Form.Label>
                  <Form.Control name="pocetakImplementacije" required type="date" placeholder="datum" onChange={handleChange} />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Kraj implementacije</Form.Label>
                  <Form.Control name="krajImplementacije" required type="date" placeholder="datum" onChange={handleChange} />
                </Form.Group>
              </div>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Donator</Form.Label>
                <Form.Control name="nazivDonatora" required type="text" placeholder="Naziv donatora" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Grant</Form.Label>
                <Form.Control name="projektniGrant" required type="text" placeholder="U KM" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Ciljna grupa</Form.Label>
                <Form.Control name="ciljnaGrupa" type="text" placeholder="Ciljna grupa" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Cilj</Form.Label>
                <Form.Control name="cilj" required type="text" placeholder="Cilj projekta" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className="itemTitleElement">Opis projekta</Form.Label>
                <Form.Control required name="opisProjekta" as="textarea" rows={8} onChange={handleChange} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Slike</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input id="uploadedFiles" className="uploadImagesInput" type="file" name="image" multiple />
              </form>
            </Row>
            <div className="addStuffButton">
              <Button type="submit">Dodaj projekat</Button>
            </div>
          </Form>
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default AddProjectPage;
