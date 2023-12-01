import Button from "react-bootstrap/Button";
import React from "react";
import "./../css/FillerBar.css";

function FillerBar() {
  const path = "http://localhost:5000/newuploads/videa/kickbw2.mp4";

  function joinIn() {
    const element = document.getElementById("joinPlace");
    element.scrollIntoView();
  }

  return (
    <div className="bwCover">
      <div className="containerElement">
        <video className="kickVideo" autoPlay loop muted playsInline>
          <source className="sourceVideo" src={path} type="video/mp4"></source>
        </video>
        <div className="containerElementText">
          <div className="coverText">ŽELIŠ SE UKLJUČITI?</div>
          <div className="coverDetails">Sve naše aktivnosti usmjerene su na izgradnju društva jednakih mogućnosti za sve!</div>
          <Button className="buttonJoin" variant="danger" onClick={joinIn}>
            <p className="buttonText">UKLJUČI SE</p>
          </Button>
        </div>
      </div>
    </div>
  );
}

/*

*/

export default FillerBar;
