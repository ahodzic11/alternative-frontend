import React, { useCallback, useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import "./../css/WorkshopDetailed.css";

function WorkshopInformation() {
  const [workshop, setWorkshop] = useState([]);
  const [images, setImages] = useState([]);
  const { name } = useParams();
  const path = "http://localhost:5000/newUploads/radionice/" + name + "/";
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  useEffect(() => {
    const getWorkshop = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workshops/` + name);
        setWorkshop(res.data.data);
      } catch (err) {}
    };

    const getSlike = async () => {
      console.log(path);
      try {
        const response = await axios.get(`http://localhost:5000/radionice/` + name);
        setImages(response.data);
      } catch (err) {}
    };

    getWorkshop();
    getSlike();
  }, []);

  return (
    <>
      <Navigation />
      <div className="workshopInformationContainer">
        <div className="workshopInformationTitle">{workshop.naslov}</div>
        <div className="workshopInformationImage">
          <img src={"http://localhost:5000/newuploads/radionice/" + name + "/" + workshop.naslovnaSlika} alt="naslovnaSlika" />
        </div>
        <div className="workshopInnerContainer">
          <div className="workshopInformationAbout informationalText">
            <span>Sadržaj radionice: </span>
            {workshop.opisRadionice}
          </div>
          <div className="workshopInformationPlace informationalText">
            <span>Lokacija: </span> {workshop.mjesto}
          </div>
          <div className="workshopInformationPlace informationalText">
            <span>Datum: </span> {workshop.datum}
          </div>
          <div className="workshopInformationTrainer informationalText">
            <span>Trener/i: </span> {workshop.trener}
          </div>
          {workshop.ucesnici ? (
            <div className="workshopInformationParticipants informationalText">
              <span>Učesnici: </span>
              {workshop.ucesnici}
            </div>
          ) : (
            <></>
          )}

          {workshop.nazivDonatora ? (
            <div className="workshopInformationDonator informationalText">
              <span>Donator: </span>
              {workshop.nazivDonatora}
            </div>
          ) : (
            <></>
          )}

          {workshop.nazivProjekta ? (
            <div className="workshopInformationProject informationalText">
              <span>Projekat: </span>
              {workshop.nazivProjekta}
            </div>
          ) : (
            <></>
          )}

          <div className="workshopImagesHeadline">
            <span>Slike:</span>{" "}
          </div>
        </div>
        <div className="workshopImages">
          {images.map((image, index) => (
            <img key={index} id={image} className="workshopInformationImageElement" src={path + image} alt="slikaSRadionice" onClick={() => openImageViewer(index)} />
          ))}
        </div>
        {isViewerOpen && <ImageViewer src={images.map((image) => "http://localhost:5000/newuploads/radionice/" + name + "/" + image)} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />}
      </div>
      <Footer />
    </>
  );
}

export default WorkshopInformation;
