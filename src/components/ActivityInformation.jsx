import React, { useCallback, useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import "./../css/WorkshopDetailed.css";

function ActivityInformation() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const [activity, setActivity] = useState([]);
  const [images, setImages] = useState([]);
  const { name } = useParams();
  const path = runningModePath + "/newuploads/aktivnosti/" + name + "/";
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
    const getActivity = async () => {
      try {
        const res = await axios.get(runningModePath + `/api/activities/` + name);
        setActivity(res.data.data);
      } catch (err) {}
    };

    const getSlike = async () => {
      try {
        const response = await axios.get(runningModePath + `/aktivnosti/` + name);
        setImages(response.data);
      } catch (err) {}
    };

    getActivity();
    getSlike();
  }, []);

  return (
    <>
      <Navigation />
      <div className="workshopInformationContainer">
        <div className="workshopInformationTitle">{activity.naziv}</div>
        <div className="workshopInformationImage">
          <img src={runningModePath + "/newuploads/aktivnosti/" + name + "/" + activity.naslovnaSlika} alt="naslovnaSlika" />
        </div>
        <div className="workshopInformationAbout informationalText">
          <span>Sadržaj aktivnosti: </span>
          {activity.opisAktivnosti}
        </div>
        <div className="workshopInformationPlace informationalText">
          <span>Lokacija: </span> {activity.mjesto}
        </div>
        <div className="workshopInformationPlace informationalText">
          <span>Datum: </span> {activity.datum}
        </div>
        <div className="workshopInformationDonator informationalText">
          <span>Donator: </span>
          {activity.nazivDonatora}
        </div>
        {activity.nazivProjekta ? (
          <div className="workshopInformationProject informationalText">
            <span>Projekat: </span>
            {activity.nazivProjekta}
          </div>
        ) : (
          <></>
        )}
        <div className="workshopImagesHeadline">
          <span>Slike:</span>{" "}
        </div>
        <div className="workshopImages">
          {images.map((image, index) => (
            <img key={index} id={image} className="workshopInformationImageElement" src={path + image} alt="slikaSRadionice" onClick={() => openImageViewer(index)} />
          ))}
        </div>
        {isViewerOpen && <ImageViewer src={images.map((image) => runningModePath + "/newuploads/aktivnosti/" + name + "/" + image)} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />}
      </div>
      <Footer />
    </>
  );
}

export default ActivityInformation;
