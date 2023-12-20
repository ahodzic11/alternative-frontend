import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { useState } from "react";
import { addDonator } from "../redux/apiCalls";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import { formatPath } from "../js/namechange";
import "./../css/AddWorkshopPage.css";

function AddDonatorPage() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const [inputs, setInputs] = useState({});
  const [validated, setValidated] = useState(false);
  const [donatorRangePeriods, setDonatorRangePeriods] = useState(0);

  const handleChange = (e) => {
    setInputs((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  function getPodrsku() {
    var pocetci = document.getElementsByClassName("pocetakPodrske");
    var krajevi = document.getElementsByClassName("krajPodrske");
    var podrska = "";
    for (let i = 0; i < pocetci.length; i++) {
      podrska += pocetci[i].value + "-" + krajevi[i].value;
      if (i < pocetci.length - 1) podrska += ",";
    }
    return podrska;
  }

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
      const response = await axios.post(runningModePath + `/upload/donatori/` + inputs.naziv, uploadFormData);
    } catch (err) {}

    addDonator({
      naziv: inputs.naziv,
      formatiranNaziv: formatPath(inputs.naziv),
      link: inputs.link,
      podrska: getPodrsku(),
      naslovnaSlika: formatPath(inputs.naziv) + "0.jpg",
    });
    alert("Donator uspješno dodan!");
  };

  return (
    <>
      <AdminNavigation />
      <div className="addWorkshopContainer">
        <div className="currentLocationHeadline">Dodavanje donatora</div>
        <div className="addWorkshopForm">
          <Form className="donatorCustomFormContainer" noValidate validated={validated} onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Naziv</Form.Label>
                <Form.Control id="newnewnewInput" name="naziv" required type="text" placeholder="Naziv donatora" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="validationCustom02">
                <Form.Label className="itemTitleElement">Link</Form.Label>
                <Form.Control name="link" type="text" placeholder="Link na stranicu donatora" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Početak podrške</Form.Label>
                <Form.Control className="pocetakPodrske" name="pocetakPodrske" required type="text" placeholder="npr. 2016" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} controlId="validationCustom01">
                <Form.Label className="itemTitleElement">Kraj podrške</Form.Label>
                <Form.Control className="krajPodrske" name="krajPodrske" required type="text" placeholder="npr. 2019" onChange={handleChange} />
                <Form.Control.Feedback>Okej!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="addPeriodContainer" as={Col}>
                <Form.Label className="itemTitleElement">Dodaj period</Form.Label>
                <Button variant="primary" onClick={() => setDonatorRangePeriods(donatorRangePeriods + 1)}>
                  +
                </Button>{" "}
              </Form.Group>
            </Row>
            {donatorRangePeriods != 0 ? (
              <>
                {Array(donatorRangePeriods)
                  .fill(null)
                  .map((period) => (
                    <Row className="mb-3">
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label className="itemTitleElement">Početak podrške</Form.Label>
                        <Form.Control className="pocetakPodrske" name="pocetakPodrske" required type="text" placeholder="npr. 2016" onChange={handleChange} />

                        <Form.Control.Feedback>Okej!</Form.Control.Feedback>
                      </Form.Group>
                      <Form.Group as={Col} controlId="validationCustom01">
                        <Form.Label className="itemTitleElement">Kraj podrške</Form.Label>
                        <Form.Control className="krajPodrske" name="krajPodrske" required type="text" placeholder="npr. 2019" onChange={handleChange} />
                        <Form.Control.Feedback>Okej!</Form.Control.Feedback>
                      </Form.Group>
                    </Row>
                  ))}
              </>
            ) : (
              <></>
            )}

            <Row className="mb-3">
              <Form.Label className="itemTitleElement">Logo donatora</Form.Label>
              <form id="uploadForm" className="imageUploadForm" enctype="multipart/form-data">
                <input id="uploadedFiles" className="uploadImagesInput" type="file" name="image" />
              </form>
            </Row>
            <div className="addStuffButton">
              <Button type="submit">Dodaj donatora</Button>
            </div>
          </Form>
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default AddDonatorPage;
