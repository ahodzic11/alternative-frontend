import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./../css/NewsDetailed.css";
import { formatPath } from "../js/namechange";

function NewsDetailed() {
  const [news, setNews] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getNews = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/news/` + name);
        setNews(res.data.data);
      } catch (err) {}
    };

    getNews();
  }, []);

  const handleClick = (e) => {
    navigate("/news/newsdetails/" + name);
  };

  return (
    <>
      <Navigation />
      <div className="randomAssDiv">
        <div className="newsDetailedMainWrapper">
          <div className="firstWrapperNews">
            <div className="newsDetailedTitle">{news.naziv}</div>
            <div className="newsDetailedGoal">{news.tema}</div>
            <div className="newsDetailedGoal">
              <p className="moreAboutNewsLink" onClick={handleClick}>
                Više o novosti &gt;
              </p>
            </div>
          </div>
          <div className="secondWrapperNews">
            <img className="newsImageElement" src={"http://localhost:5000/newuploads/vijesti/" + name + "/" + news.naslovnaSlika} alt="workshopImageElement" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NewsDetailed;
