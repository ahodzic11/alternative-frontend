import React, { useEffect } from "react";
import { useState } from "react";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import Form from "react-bootstrap/Form";
import "./../css/ReadReservations.css";

function ReadReservations() {
  const [reservations, setReservations] = useState([]);
  const [reservationNames, setReservationNames] = useState([]);
  const [chosenReservationName, setChosenReservationName] = useState("allReservations");

  const getReservations = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/reservations`);
      setReservations(res.data.data);
      var allReservationNames = [];
      res.data.data.forEach((reservation) => {
        if (!allReservationNames.includes(reservation.nazivPonude)) allReservationNames.push(reservation.nazivPonude);
      });
      setReservationNames(allReservationNames);
    } catch (err) {}
  };

  useEffect(() => {
    getReservations();
  }, []);

  return (
    <>
      <AdminNavigation />
      <div className="reservationsContainer">
        <div className="reservationsMainTitle">Rezervacije</div>
        <Form className="reservationName">
          <Form.Group className="reservationName" controlId="validationCustom01">
            <Form.Label className="itemTitleElement">Naziv rezervacije</Form.Label>
            <Form.Select required name="oblastRadionice" aria-label="Default select example" onChange={(e) => setChosenReservationName(e.target.value)}>
              <option value="allReservations">Sve rezervacije</option>
              {reservationNames.map((name) => (
                <option value={name}>{name}</option>
              ))}
            </Form.Select>
          </Form.Group>
        </Form>
        <div className="allReservationsContainer">
          <div className="questionContainer">
            {chosenReservationName == "allReservations" ? <div className="reservationTitle">Naziv ponude</div> : <></>}

            <div className="reservationTitle">Ime i prezime</div>
            <div className="reservationTitle">Datum</div>
            <div className="reservationTitle">Vrijeme</div>
            <div className="reservationTitle">Telefon</div>
          </div>
          {reservations
            .filter((reservation) => {
              return reservation.nazivPonude == chosenReservationName || chosenReservationName == "allReservations";
            })

            .map((reservation) => (
              <div className="reservationContainer">
                {chosenReservationName == "allReservations" ? <div className="reservationInfoItem">{reservation.nazivPonude}</div> : <></>}

                <div className="reservationInfoItem">{reservation.imePrezime}</div>
                <div className="reservationInfoItem">{reservation.datum}</div>
                <div className="reservationInfoItem">{reservation.vrijeme}</div>
                <div className="reservationInfoItem">{reservation.telefon}</div>
              </div>
            ))}
        </div>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default ReadReservations;
