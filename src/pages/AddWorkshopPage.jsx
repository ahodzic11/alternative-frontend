import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { addWorkshop } from "../redux/apiCalls";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import { formatDate, formatPath } from "../js/namechange";
import "./../css/AddWorkshopPage.css";

function AddWorkshopPage() {
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = async (event) => {
    const form = event.currentTarget;
    if (inputs.oblastRadionice == null) {
      alert("Morate unijeti kategoriju radionice!");
      return;
    }
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
      const response = await axios.post(`http://localhost:5000/upload/radionice/` + inputs.naslov, uploadFormData);
    } catch (err) {
      console.log(err);
    }
    var firstDate = inputs.datum.split("-");
    var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);

    addWorkshop({
      naslov: inputs.naslov,
      mjesto: inputs.mjesto,
      formatiranNaslov: formatPath(inputs.naslov),
      datum: formatDate(firstCorrectDate),
      trener: inputs.trener,
      ucesnici: inputs.ucesnici,
      nazivDonatora: inputs.nazivDonatora,
      nazivProjekta: inputs.nazivProjekta,
      cilj: inputs.cilj,
      opisRadionice: inputs.opisRadionice,
      oblastRadionice: inputs.oblastRadionice,
      naslovnaSlika: formatPath(inputs.naslov) + "0.jpg",
    });
    alert("Radionica uspješno dodana!");
  };

  return (
    <>
      <AdminNavigation />

      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Dodavanje radionice</div>
        <div className="addWorkshopForm">
          <Form className="customFormContainer" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naslov</Form.Label>
                <Form.Control name="naslov" required type="text" placeholder="Naslov radionice" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Mjesto</Form.Label>
                <Form.Control name="mjesto" required type="text" placeholder="Mjesto radionice" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <div className="col-md-4">
                <Form.Group controlId="validationCustom03">
                  <Form.Label className="itemTitleElement">Datum</Form.Label>
                  <Form.Control name="datum" required type="date" placeholder="datum" onChange={handleChange} />
                </Form.Group>
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Donator</Form.Label>
                <Form.Control name="nazivDonatora" type="text" placeholder="Naziv donatora" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Projekat</Form.Label>
                <Form.Control name="nazivProjekta" type="text" placeholder="Naziv projekta" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Trener</Form.Label>
                <Form.Control name="trener" required type="text" placeholder="Ime trenera" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Učesnici</Form.Label>
                <Form.Control name="ucesnici" type="text" placeholder="Broj ili ime učesnika" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} md="4" controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Cilj</Form.Label>
                <Form.Control name="cilj" type="text" placeholder="Cilj radionice" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Oblast radionice</Form.Label>
                <Form.Select required name="oblastRadionice" aria-label="Default select example" onClick={handleChange}>
                  <option>Oblast radionice</option>
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
            <Row className="mb-3">
              <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
                <Form.Label className="itemTitleElement">Opis radionice</Form.Label>
                <Form.Control required name="opisRadionice" as="textarea" rows={4} onChange={handleChange} />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Slike</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input id="uploadedFiles" required className="uploadImagesInput" type="file" name="image" multiple />
              </form>
            </Row>
            <div className="addStuffButton">
              <Button type="submit">Dodaj radionicu</Button>
            </div>
          </Form>
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default AddWorkshopPage;
