import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./../css/WorkshopInformation.css";

function WorkshopDetailed() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const [workshop, setWorkshop] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getWorkshop = async () => {
      try {
        const res = await axios.get(runningModePath + `/api/workshops/` + name);
        setWorkshop(res.data.data);
      } catch (err) {}
    };

    getWorkshop();
  }, []);

  const handleClick = (e) => {
    navigate("/workshops/workshopdetails/" + name);
  };

  return (
    <>
      <Navigation />
      <div className="randomAssDiv">
        <div className="workshopDetailedMainWrapper">
          <div className="firstWrapper">
            <div className="workshopDetailedTitle">{workshop.naslov}</div>
            <div className="workshopDetailedGoal">{workshop.cilj}</div>
            <div className="workshopDetailedGoal">
              <p className="moreAboutWorkshopLink" onClick={handleClick}>
                Više o radionici &gt;
              </p>
            </div>
          </div>
          <div className="secondWrapper">
            <img className="workshopImageElement" src={runningModePath + "/newuploads/radionice/" + name + "/" + workshop.naslovnaSlika} alt="workshopImageElement" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default WorkshopDetailed;
