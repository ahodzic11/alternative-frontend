import React, { useCallback, useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import Footer from "../components/Footer";
import GoToTop from "../components/GoToTop";
import axios from "axios";
import ImageViewer from "react-simple-image-viewer";
import "./../css/Galerija.css";

function Galerija() {
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(0);
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  useEffect(() => {
    const getSlike = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/galerija/`);
        setImages(response.data);
      } catch (err) {}
    };

    getSlike();
  }, []);

  const openImageViewer = useCallback((index) => {
    setCurrentImage(index);
    setIsViewerOpen(true);
  }, []);

  const closeImageViewer = () => {
    setCurrentImage(0);
    setIsViewerOpen(false);
  };

  return (
    <>
      {!isViewerOpen && <Navigation />}
      <div className="galleryMainWrapper">
        <div className="heading text-center">
          <h2>NAŠA GALERIJA</h2>
          <div className="underlineContainer"></div>
        </div>
        <ul id="hexGrid">
          {images.map((image, index) => (
            <li class="hex">
              <div class="hexIn">
                <img className="hexImageElement" src={"http://localhost:5000/newuploads/galerija/" + image} alt="" onClick={() => openImageViewer(index)} />
              </div>
            </li>
          ))}
        </ul>
      </div>
      {isViewerOpen && <ImageViewer src={images.map((image) => "http://localhost:5000/newuploads/galerija/" + image)} currentIndex={currentImage} disableScroll={false} closeOnClickOutside={true} onClose={closeImageViewer} />}
      {!isViewerOpen && <GoToTop />}

      <Footer />
    </>
  );
}

export default Galerija;
