import React, { useEffect } from "react";
import Button from "react-bootstrap/Button";
import AdminNavigation from "../components/AdminNavigation";
import AdminLogout from "../components/AdminLogout";
import AdminGoBack from "../components/AdminGoBack";
import axios from "axios";
import { useState } from "react";
import { useParams } from "react-router-dom";
import "./../css/AddWorkshopPage.css";
import { formatPath } from "../js/namechange";

function ChooseImage() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const [currentItem, setCurrentItem] = useState({});
  const [images, setImages] = useState([]);
  const [selected, setSelected] = useState({});
  const [path, setPath] = useState("");
  let { name, type } = useParams();

  useEffect(() => {
    const getPath = () => {
      let folderName = "";
      if (type == "workshop") folderName = "radionice";
      else if (type == "project") folderName = "projekti";
      else if (type == "activity") folderName = "aktivnosti";
      else if (type == "news") folderName = "vijesti";
      else if (type == "donator") folderName = "donatori";
      else if (type == "ponuda") folderName = "ponude";
      else if (type == "clanak") folderName = "clanci";
      setPath(runningModePath + "/newuploads/" + folderName + "/" + name + "/");
    };

    const getSlike = async () => {
      try {
        var response = {};
        if (type == "workshop") response = await axios.get(runningModePath + `/radionice/` + name);
        else if (type == "project") response = await axios.get(runningModePath + `/projekti/` + name);
        else if (type == "activity") response = await axios.get(runningModePath + `/aktivnosti/` + name);
        else if (type == "news") response = await axios.get(runningModePath + `/vijesti/` + name);
        else if (type == "donator") response = await axios.get(runningModePath + `/donatori/` + name);
        else if (type == "ponuda") response = await axios.get(runningModePath + `/ponude/` + name);
        else if (type == "clanak") response = await axios.get(runningModePath + `/clanci/` + name);
        setImages(response.data);
      } catch (err) {}
    };

    const getCurrentItem = async () => {
      try {
        let res = {};
        if (type == "workshop") {
          res = await axios.get(runningModePath + `/api/workshops/` + name);
        } else if (type == "project") {
          res = await axios.get(runningModePath + `/api/projects/` + name);
        } else if (type == "activity") {
          res = await axios.get(runningModePath + `/api/activities/` + name);
        } else if (type == "news") {
          res = await axios.get(runningModePath + `/api/news/` + name);
        } else if (type == "donator") {
          res = await axios.get(runningModePath + `/api/donators/` + name);
        } else if (type == "ponuda") {
          res = await axios.get(runningModePath + `/api/offers/` + name);
        } else if (type == "clanak") {
          res = await axios.get(runningModePath + `/api/articles/` + name);
        }
        const dummyWorkshop = res.data.data;
        setCurrentItem(dummyWorkshop);
        setSelected(dummyWorkshop.naslovnaSlika);
      } catch (err) {}
    };

    const getSelected = async () => {
      try {
        let res = {};
        if (type == "workshop") res = await axios.get(runningModePath + `/api/workshops/selectedImage/` + currentItem.id);
        else if (type == "project") res = await axios.get(runningModePath + `/api/projects/selectedImage/` + currentItem.id);
        else if (type == "activity") res = await axios.get(runningModePath + `/api/activities/selectedImage/` + currentItem.id);
        else if (type == "news") res = await axios.get(runningModePath + `/api/news/selectedImage/` + currentItem.id);
        else if (type == "donator") res = await axios.get(runningModePath + `/api/donators/selectedImage/` + currentItem.id);
        else if (type == "ponuda") res = await axios.get(runningModePath + `/api/ponude/selectedImage/` + currentItem.id);
        else if (type == "clanak") res = await axios.get(runningModePath + `/api/articles/selectedImage/` + currentItem.id);
      } catch (err) {}
    };

    getPath();
    getSlike();
    getCurrentItem();
    getSelected();
  }, []);

  const updateImage = async () => {
    try {
      const updatedItem = {
        id: currentItem.id,
        naslovnaSlika: selected,
      };
      let res = {};
      if (type == "workshop") res = await axios.patch(runningModePath + `/api/workshops/updateImage`, updatedItem);
      else if (type == "project") res = await axios.patch(runningModePath + `/api/projects/updateImage`, updatedItem);
      else if (type == "activity") res = await axios.patch(runningModePath + `/api/activities/updateImage`, updatedItem);
      else if (type == "news") res = await axios.patch(runningModePath + `/api/news/updateImage`, updatedItem);
      else if (type == "donator") res = await axios.patch(runningModePath + `/api/donators/updateImage`, updatedItem);
      else if (type == "ponuda") res = await axios.patch(runningModePath + `/api/offers/updateImage`, updatedItem);
      else if (type == "clanak") res = await axios.patch(runningModePath + `/api/articles/updateImage`, updatedItem);
    } catch (err) {}
  };

  const selectedImage = (e) => {
    e.preventDefault();
    const slika = document.getElementById(e.target.id);
    setSelected(slika.id);
  };

  return (
    <>
      <AdminNavigation />
      <div className="currentLocationHeadlineChooseImage">Odabir naslovne slike</div>
      <div className="currentLocationHeadline2">{currentItem.naslov != null ? currentItem.naslov : currentItem.naziv}</div>
      <div className="clickContainer">
        {images.length == 0 ? (
          <div className="nemaSlikaContainer">NEMATE UNESENIH</div>
        ) : (
          <>
            {images.map((image) => (
              <div className="imageSelection">
                {image == selected ? (
                  <div className="selectedImage">
                    <img id={image} className="chooseImageElement" src={path + image} alt="slikaSRadionice" onClick={(e) => selectedImage(e)} />
                    <div className="selectedDiv">ODABRANA</div>
                  </div>
                ) : (
                  <img id={image} className="chooseImageElement" src={path + image} alt="slikaSRadionice" onClick={(e) => selectedImage(e)} />
                )}
              </div>
            ))}
          </>
        )}
      </div>
      <div id="saveSelectedImage" className="addStuffButton" onClick={updateImage}>
        <Button>Sačuvaj naslovnu</Button>
      </div>
      <AdminLogout />
      <AdminGoBack />
    </>
  );
}

export default ChooseImage;
