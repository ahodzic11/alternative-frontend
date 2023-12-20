import React, { useCallback, useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import ImageViewer from "react-simple-image-viewer";
import "./../css/WorkshopDetailed.css";

function NewsInformation() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const [news, setNews] = useState([]);
  const [images, setImages] = useState([]);
  const { name } = useParams();
  const path = runningModePath + "/newuploads/vijesti/" + name + "/";
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
    const getNews = async () => {
      try {
        const res = await axios.get(runningModePath + `/api/news/` + name);
        setNews(res.data.data);
      } catch (err) {}
    };

    const getSlike = async () => {
      try {
        const response = await axios.get(runningModePath + `/vijesti/` + name);
        setImages(response.data);
      } catch (err) {}
    };

    getNews();
    getSlike();
  }, []);

  return (
    <>
      <Navigation />
      <div className="workshopInformationContainer">
        <div className="workshopInformationTitle">{news.naziv}</div>
        <div className="workshopInformationImage">
          <img src={runningModePath + "/newuploads/vijesti/" + name + "/" + news.naslovnaSlika} alt="naslovnaSlika" />
        </div>
        <div className="workshopInformationAbout informationalText">
          <span>Sadržaj vijesti: </span>
          {news.tekstVijesti}
        </div>
        <div className="workshopInformationPlace informationalText">
          <span>Tema: </span> {news.tema}
        </div>
        <div className="workshopInformationPlace informationalText">
          <span>Datum: </span> {news.datum}
        </div>
        <div className="workshopImagesHeadline">
          <span>Slike:</span>{" "}
        </div>
        <div className="workshopImages">
          {images.map((image, index) => (
            <img key={index} id={image} className="workshopInformationImageElement" src={path + image} alt="slikaSRadionice" onClick={() => openImageViewer(index)} />
          ))}
        </div>
        {isViewerOpen && <ImageViewer src={images.map((image) => runningModePath + "/newuploads/vijesti/" + name + "/" + image)} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />}
      </div>
      <Footer />
    </>
  );
}

export default NewsInformation;
