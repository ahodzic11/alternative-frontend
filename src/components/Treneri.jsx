import React from "react";
import Navigation from "./Navigation";
import Footer from "./Footer";
import "./../css/Treneri.css";

function Treneri() {
  const path = "http://localhost:5000/newuploads/staff/";

  function copyToClipboard(email) {
    navigator.clipboard.writeText(email);
    var sb = document.getElementById("snackbar");

    //this is where the class name will be added & removed to activate the css
    sb.className = "show";

    setTimeout(() => {
      sb.className = sb.className.replace("show", "");
    }, 3000);
  }
  return (
    <>
      <Navigation />
      <div className="outterContainer">
        <div className="heading text-center">
          <h2>TRENERI</h2>
          <div className="underlineContainer"></div>
        </div>
        <div className="trainersContainer">
          <div className="solidBlockContainer"></div>
          <div className="personelContainer">
            <div className="trainerItem">
              <div className="trainerImage">
                <img className="trainerImageItem" src={path + "maksuma-topalovic.png"} />
              </div>
              <div className="trainerInformation">
                <div className="trainerName">Maksuma Topalović</div>
                <div className="trainerPosition">izvršna direktorica</div>
                <div className="trainerDescription">Sample text. Click to select the text box. Click again or double click to start editing the text.</div>
                <div className="trainerIcons">
                  <a className="cvIconLink" href="http://localhost:5000/newuploads/staff/cvs/maksuma-topalovic.pdf" download="maksuma-topalovic.pdf">
                    <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/cv.png" />
                  </a>
                  <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/email.png" onClick={() => copyToClipboard("maxi@bih.net.ba")} />
                </div>
              </div>
            </div>
            <div className="trainerItem">
              <div className="trainerImage">
                <img className="trainerImageItem" src={path + "ajla-vehab-hrusto.jpg"} />
              </div>
              <div className="trainerInformation">
                <div className="trainerName">Ajla Vehab-Hrusto</div>
                <div className="trainerPosition">magistar pedagogije</div>
                <div className="trainerDescription">Sample text. Click to select the text box. Click again or double click to start editing the text.</div>
                <div className="trainerIcons">
                  <a className="cvIconLink" href="http://localhost:5000/newuploads/staff/cvs/ajla-vehab-hrusto.pdf" download="ajla-vehab-hrusto.pdf">
                    <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/cv.png" />
                  </a>
                  <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/email.png" onClick={() => copyToClipboard("ajla_vehab@hotmail.com")} />
                </div>
              </div>
            </div>
            <div className="trainerItem">
              <div className="trainerImage">
                <img className="trainerImageItem" src={path + "vildana-neimarlija-2.jpg"} />
              </div>
              <div className="trainerInformation">
                <div className="trainerName">Vildana Neimarlija</div>
                <div className="trainerPosition">prof. pedagogije i psihologije</div>
                <div className="trainerDescription">Sample text. Click to select the text box. Click again or double click to start editing the text.</div>
                <div className="trainerIcons">
                  <a className="cvIconLink" href="http://localhost:5000/newuploads/staff/cvs/vildana-neimarlija.pdf" download="vildana-neimarlija.pdf">
                    <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/cv.png" />
                  </a>
                  <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/email.png" onClick={() => copyToClipboard("neimarlijavild@hotmail.com")} />
                </div>
              </div>
            </div>

            <div className="trainerItem">
              <div className="trainerImage">
                <img className="trainerImageItem" src={path + "mirha-husika.jpg"} />
              </div>
              <div className="trainerInformation">
                <div className="trainerName">Mirha Husika</div>
                <div className="trainerPosition">dipl. ing. el, odsjek za elektroenergetiku </div>
                <div className="trainerDescription">Sample text. Click to select the text box. Click again or double click to start editing the text.</div>
                <div className="trainerIcons">
                  <a className="cvIconLink" href="http://localhost:5000/newuploads/staff/cvs/mirha-husika.pdf" download="mirha-husika.pdf">
                    <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/cv.png" />
                  </a>
                  <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/email.png" onClick={() => copyToClipboard("mirhahusika@gmail.com")} />
                </div>
              </div>
            </div>
            <div className="trainerItem">
              <div className="trainerImage">
                <img className="trainerImageItem" src={path + "esmin-brodlija.jpg"} />
              </div>
              <div className="trainerInformation">
                <div className="trainerName">Esmin Brodlija</div>
                <div className="trainerPosition">dipl. psiholog i psihoterapeut</div>
                <div className="trainerDescription">Sample text. Click to select the text box. Click again or double click to start editing the text.</div>
                <div className="trainerIcons">
                  <a className="cvIconLink" href="http://localhost:5000/newuploads/staff/cvs/esmin-brodlija.pdf" download="esmin-brodlija.pdf">
                    <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/cv.png" />
                  </a>
                  <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/email.png" onClick={() => copyToClipboard("psihoterapija.e@mail.com")} />
                </div>
              </div>
            </div>
            <div className="trainerItem">
              <div className="trainerImage">
                <img className="trainerImageItem" src={path + "adnan-hodzic.png"} />
              </div>
              <div className="trainerInformation">
                <div className="trainerName">Adnan Hodžić</div>
                <div className="trainerPosition">ing. el., odsjek računarstvo i informatika</div>
                <div className="trainerDescription">Sample text. Click to select the text box. Click again or double click to start editing the text.</div>
                <div className="trainerIcons">
                  <a className="cvIconLink" href="http://localhost:5000/newuploads/staff/cvs/adnan-hodzic.pdf" download="adnan-hodzic.pdf">
                    <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/cv.png" />
                  </a>
                  <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/email.png" onClick={() => copyToClipboard("hodzicadnan00@gmail.com")} />
                </div>
              </div>
            </div>
            <div className="trainerItem">
              <div className="trainerImage">
                <img className="trainerImageItem" src={path + "mirza-neimarlija.jpg"} />
              </div>
              <div className="trainerInformation">
                <div className="trainerName">Mirza Neimarlija</div>
                <div className="trainerPosition">dizajner</div>
                <div className="trainerDescription">Sample text. Click to select the text box. Click again or double click to start editing the text.</div>
                <div className="trainerIcons">
                  <a className="cvIconLink" href="http://localhost:5000/newuploads/staff/cvs/mirza-neimarlija.pdf" download="mirza-neimarlija.pdf">
                    <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/cv.png" />
                  </a>
                  <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/email.png" onClick={() => copyToClipboard("neimarlija16@gmail.com")} />
                  <span id="snackbar">E-mail kopiran!</span>
                </div>
              </div>
            </div>

            <div className="trainerItem">
              <div className="trainerImage">
                <img className="trainerImageItem" src={path + "amel-husika.jpg"} />
              </div>
              <div className="trainerInformation">
                <div className="trainerName">Amel Husika</div>
                <div className="trainerPosition">student</div>
                <div className="trainerDescription">Sample text. Click to select the text box. Click again or double click to start editing the text.</div>
                <div className="trainerIcons">
                  <a className="cvIconLink" href="http://localhost:5000/newuploads/staff/cvs/amel-husika.pdf" download="amel-husika.pdf">
                    <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/cv.png" />
                  </a>
                  <img className="trainerIcon" src="http://localhost:5000/newuploads/ikone/email.png" onClick={() => copyToClipboard("husikaamel290@gmail.com")} />
                  <span id="snackbar">E-mail kopiran!</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Treneri;
