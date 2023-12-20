import React, { useEffect, useState } from "react";
import Footer from "./Footer";
import Navigation from "./Navigation";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./../css/ProjectDetailed.css";

function ProjectDetailed() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const [project, setProject] = useState([]);
  const { name } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const getProject = async () => {
      try {
        const res = await axios.get(runningModePath + `/api/projects/` + name);
        setProject(res.data.data);
      } catch (err) {}
    };

    getProject();
  }, []);

  const handleClick = (e) => {
    navigate("/projects/projectdetails/" + name);
  };

  return (
    <>
      <Navigation />
      <div className="randomAssDiv">
        <div className="projectDetailedMainWrapper">
          <div className="firstWrapperProject">
            <div className="projectDetailedTitle">{project.naziv}</div>
            <div className="projectDetailedGoal">{project.cilj}</div>
            <div className="projectDetailedGoal">
              <p className="moreAboutProjectLink" onClick={handleClick}>
                Više o projektu &gt;
              </p>
            </div>
          </div>
          <div className="secondWrapperProject">
            <img className="workshopImageElement" src={runningModePath + "/newuploads/projekti/" + name + "/" + project.naslovnaSlika} alt="workshopImageElement" />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ProjectDetailed;
