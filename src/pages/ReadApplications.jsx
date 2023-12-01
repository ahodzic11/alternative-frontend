import React, { useEffect } from "react";
import { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./../css/ReadApplications.css";

function ReadApplications() {
  const [applications, setApplications] = useState([]);
  const [applicationNames, setApplicationNames] = useState([]);
  const [chosenApplicationName, setChosenApplicationName] = useState("allApplications");

  const getApplications = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/applications`);
      setApplications(res.data.data);
      var allApplicationNames = [];
      res.data.data.forEach((application) => {
        if (!allApplicationNames.includes(application.nazivPonude)) allApplicationNames.push(application.nazivPonude);
      });
      console.log(allApplicationNames);
      setApplicationNames(allApplicationNames);
    } catch (err) {}
  };

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="applicationsContainer">
        <div className="applicationsMainTitle">Prijave</div>
        <Form className="applicationName">
          <Form.Group className="applicationName" controlId="validationCustom01">
            <Form.Label className="itemTitleElement">Naziv ponude</Form.Label>
            <Form.Select required name="oblastRadionice" aria-label="Default select example" onChange={(e) => setChosenApplicationName(e.target.value)}>
              <option value="allApplications">Sve ponude</option>
              {applicationNames.map((name) => (
                <option value={name}>{name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
        <div className="allApplicationsContainer">
          <div className="applicationContainer">
            {chosenApplicationName == "allApplications" ? <div className="applicationTitle">Naziv ponude</div> : <></>}

            <div className="applicationTitle">Ime i prezime</div>
            <div className="applicationTitle">E-mail</div>
            <div className="applicationTitle">Datum prijave</div>
          </div>
          {applications
            .filter((application) => {
              return application.nazivPonude == chosenApplicationName || chosenApplicationName == "allApplications";
            })

            .map((application) => (
              <div className="applicationContainer">
                {chosenApplicationName == "allApplications" ? <div className="applicationInfoItem">{application.nazivPonude}</div> : <></>}

                <div className="applicationInfoItem">{application.imePrezime}</div>
                <div className="applicationInfoItem">{application.email}</div>
                <div className="applicationInfoItem">{application.datumPrijave}</div>
              </div>
            ))}
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default ReadApplications;
