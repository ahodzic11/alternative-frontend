import React from "react";
import logo from "../assets/logo.png";
import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import "./../css/Footer.css";
import { useNavigate } from "react-router-dom";

function Footer() {
  const navigate = useNavigate();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDnxNuVTe9vAKyqK7HoWSymsVLJxL1sCk0",
  });

  if (!isLoaded) return <div>Loading...</div>;

  const handleClick = (e) => {
    navigate("/");
  };

  const handleReferenceClick = (e) => {
    navigate("/" + e.target.id);
  };

  return (
    <div className="footerDiv">
      <div className="mainDiv">
        <div className="mainInformation">
          <img className="alternativeLogo" src={logo} alt="alternativeLogo" onClick={handleClick} />
          <div className="alternativeInfoContainer">
            <div className="alternativeInfo">Ulica Šehida 5</div>
            <div className="alternativeInfo">Kakanj 72240</div>
            <div className="alternativeInfo">+387 32 556 288</div>
            <div className="alternativeInfo">Bosna i Hercegovina</div>
            <div className="alternativeInfo">alternative@bih.net.ba</div>
          </div>
        </div>
        <div id="footerContactUsPoint"></div>
        <div className="locationDiv">
          <GoogleMap className="locationContainer" zoom={18} center={{ lat: 44.12359400703324, lng: 18.11589595721071 }} mapContainerClassName="map-container">
            <MarkerF position={{ lat: 44.12359400703324, lng: 18.11589595721071 }} />
          </GoogleMap>
        </div>
        <div className="references">
          <div className="title">POVEZNICE</div>
          <div className="reference">
            <p id="onama" className="referenceItem" onClick={handleReferenceClick}>
              O NAMA
            </p>
          </div>
          <div className="reference">
            <p id="projekti" className="referenceItem" onClick={handleReferenceClick}>
              PROJEKTI
            </p>
          </div>
          <div className="reference">
            <p id="donatori" className="referenceItem" onClick={handleReferenceClick}>
              DONATORI
            </p>
          </div>
          <div className="reference">
            <p id="vijesti" className="referenceItem" onClick={handleReferenceClick}>
              NOVOSTI
            </p>
          </div>
          <div className="reference">
            <p id="drugionama" className="referenceItem" onClick={handleReferenceClick}>
              DRUGI O NAMA
            </p>
          </div>
          <div className="reference">
            <p className="referenceItem">KONTAKT</p>
          </div>
        </div>
      </div>
      <div className="copyrightFooter">Copyright © Udruženje Alternative Kakanj 2023</div>
    </div>
  );
}

export default Footer;
