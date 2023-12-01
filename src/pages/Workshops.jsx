import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import Button from "react-bootstrap/Button";
import WorkshopArea from "../components/WorkshopArea";
import { useNavigate } from "react-router-dom";
import "./../css/Workshops.css";

function Workshops() {
  const [workshopArea, setWorkshopArea] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // PREUREDIT DA RADI SA BAZOM PODATAKA
    function getWorkshopAreas() {
      let oblastiRadionica = ["Civilno Društvo", "Izgradnja samopoštovanja i samopouzdanja", "Ekologija i zdravlje", "Dječje kreativne radionice", "Izgradnja mira", "Kultura i obrazovanje", "Ljudska prava", "Prevencija rodno zasnovanog nasilja", "Prevencija bolesti ovisnosti", "Jačanje kompetencija mladih"];
      setWorkshopArea(oblastiRadionica);
    }

    getWorkshopAreas();
  }, []);

  const handleClick = (e) => {
    navigate("/workshops/" + e.target.id);
  };

  const handleClickAllWorkshops = (e) => {
    navigate("/allworkshops/");
  };

  return (
    <>
      <Navigation />
      <div className="workshopsMainWrapper">
        <div className="heading text-center">
          <h2>RADIONICE</h2>
          <div className="underlineContainer"></div>
        </div>
        <div className="workshopsIntroSmaller">
          U udruženju Alternative kakanj uspješno se oblikuju radionice za djecu i odrasle i koriste priručnici sa dobro razvijenim trening materijalima. Za nove teme kao npr. Prevencija rodno zasnovanog nasilja, Različite uloge vijećnika i dr. Uz razvijanje materijal organizujemo trening za trenere kako bismo na najbolji mogući način odgovorili na potrebe u zajednici. Osim radionica u okviru
          naših projekata i aktivnosti pružamo i trenerske usluge za druge projekte i organizacije.
        </div>
        <div className="allWorkshops">
          <Button className="viewAllWorkshops" variant="danger" onClick={handleClickAllWorkshops}>
            <p className="buttonText">SVE RADIONICE</p>
          </Button>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Workshops;

/*
<div className="workshopsAreasContainer">
          {workshopArea.map((area) => (
            <div className="workshopAreaSingleItem" onClick={handleClick}>
              <WorkshopArea item={area} />
            </div>
          ))}
        </div>
*/
