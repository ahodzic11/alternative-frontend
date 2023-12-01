import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { addOffer } from "../redux/apiCalls";
import { formatDate, formatPath } from "../js/namechange";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import "./../css/AddWorkshopPage.css";

function AddOfferPage() {
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
    if (inputs.tipPonude == null) {
      alert("Morate unijeti tip ponude!");
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
      const response = await axios.post(`http://localhost:5000/upload/ponude/` + inputs.naziv, uploadFormData);
    } catch (err) {}
    let pocetakPonude = null,
      krajPonude = null;
    if (inputs.pocetakPonude) {
      var firstDate = inputs.pocetakPonude.split("-");
      pocetakPonude = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
      pocetakPonude = formatDate(pocetakPonude);
    }
    if (inputs.krajPonude) {
      var secondDate = inputs.krajPonude.split("-");
      krajPonude = new Date(secondDate[0], secondDate[1] - 1, secondDate[2]);
      krajPonude = formatDate(krajPonude);
    }
    addOffer({
      naziv: inputs.naziv,
      formatiranNaziv: formatPath(inputs.naziv),
      opis: inputs.opis,
      sadrzajPonude: inputs.sadrzajPonude,
      trener: inputs.trener,
      pocetakPonude: pocetakPonude,
      krajPonude: krajPonude,
      cijena: inputs.cijena,
      uzrast: inputs.uzrast,
      napomene: inputs.napomene,
      tipPonude: inputs.tipPonude,
      tipPrijave: inputs.tipPrijave,
      naslovnaSlika: formatPath(inputs.naziv) + "0.jpg",
    });
    alert("Ponuda uspješno dodana!");
  };

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Dodavanje ponude</div>
        <div className="addWorkshopForm">
          <Form className="customFormContainer" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv ponude</Form.Label>
                <Form.Control name="naziv" required type="text" placeholder="Naziv ponude" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Uzrast</Form.Label>
                <Form.Control name="uzrast" required type="text" placeholder="Uzrast" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Cijena</Form.Label>
                <Form.Control name="cijena" required type="text" placeholder="U KM" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Početak ponude</Form.Label>
                  <Form.Control name="pocetakPonude" type="date" placeholder="datum" onChange={handleChange} />
                </Form.Group>
              </div>
              <div className="col">
                <Form.Group controlId="dob">
                  <Form.Label className="itemTitleElement">Kraj ponude</Form.Label>
                  <Form.Control name="krajPonude" type="date" placeholder="datum" onChange={handleChange} />
                </Form.Group>
              </div>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} md={4} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Trener</Form.Label>
                <Form.Control name="trener" required type="text" placeholder="Trener" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Tip ponude</Form.Label>
                <Form.Select required name="tipPonude" aria-label="Default select example" onClick={handleChange}>
                  <option>Tip ponude</option>
                  <option value="Jednodnevna">Jednodnevna</option>
                  <option value="Višednevna">Višednevna</option>
                </Form.Select>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Tip prijave</Form.Label>
                <Form.Select required name="tipPrijave" aria-label="Default select example" onClick={handleChange}>
                  <option>Tip prijave</option>
                  <option value="Rezervacija">Rezervacija</option>
                  <option value="Prijava">Prijava</option>
                </Form.Select>
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Opis ponude</Form.Label>
              <Form.Control required name="opis" as="textarea" rows={2} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Sadržaj ponude</Form.Label>
              <Form.Control required name="sadrzajPonude" as="textarea" rows={4} onChange={handleChange} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label className="itemTitleElement">Upute/napomene</Form.Label>
              <Form.Control required name="napomene" as="textarea" rows={4} onChange={handleChange} />
            </Form.Group>
            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Slike</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input id="uploadedFiles" className="uploadImagesInput" type="file" name="image" multiple />
              </form>
            </Row>
            <div className="addStuffButton">
              <Button type="submit">Dodaj ponudu</Button>
            </div>
          </Form>
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default AddOfferPage;
