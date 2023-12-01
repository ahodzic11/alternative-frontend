import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { addActivity } from "../redux/apiCalls";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import "./../css/AddWorkshopPage.css";
import { formatDate, formatPath } from "../js/namechange";

function AddActivityPage() {
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (document.getElementById("uploadedFiles").files.length === 0) {
      alert("Morate unijeti bar jednu sliku!");
      return;
    }
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
      return;
    }

    var uploadForm = document.getElementById("uploadForm");
    var uploadFormData = new FormData(uploadForm);

    try {
      const response = await axios.post(`http://localhost:5000/upload/aktivnosti/` + inputs.naziv, uploadFormData);
    } catch (err) {}

    var firstDate = inputs.datum.split("-");
    var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
    if (inputs.nazivProjekta == null) inputs.nazivProjekta = "";
    addActivity({
      naziv: inputs.naziv,
      formatiranNaziv: formatPath(inputs.naziv),
      mjesto: inputs.mjesto,
      datum: formatDate(firstCorrectDate),
      nazivDonatora: inputs.nazivDonatora,
      nazivProjekta: inputs.nazivProjekta,
      opisAktivnosti: inputs.opisAktivnosti,
      naslovnaSlika: formatPath(inputs.naziv) + "0.jpg",
    });
    alert("Aktivnost uspješno dodana!");
  };

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Dodavanje aktivnosti</div>
        <div className="addWorkshopForm">
          <Form className="customFormContainer" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv aktivnosti</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv aktivnosti" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Mjesto</Form.Label>
                <Form.Control name="mjesto" required type="text" placeholder="Mjesto radionice" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Datum</Form.Label>
                  <Form.Control name="datum" required type="date" placeholder="datum" onChange={handleChange} />
                </Form.Group>
              </div>
            </Row>

            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Donator</Form.Label>
                <Form.Control name="nazivDonatora" required type="text" placeholder="Naziv donatora" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Projekat</Form.Label>
                <Form.Control name="nazivProjekta" type="text" placeholder="Naziv projekta" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className="itemTitleElement">Opis aktivnosti</Form.Label>
                <Form.Control required name="opisAktivnosti" as="textarea" rows={4} onChange={handleChange} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Slike</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input id="uploadedFiles" className="uploadImagesInput" type="file" name="image" multiple />
              </form>
            </Row>
            <div className="addStuffButton">
              <Button type="submit">Dodaj aktivnost</Button>
            </div>
          </Form>
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default AddActivityPage;
