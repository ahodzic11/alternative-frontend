import { formatPath } from "../js/namechange";
import "./../css/Project.css";

const Project = ({ item }) => {
  const path = "http://nvoapi.nvo-alternative.org/newuploads/projekti/" + formatPath(item.naziv) + "/" + item.naslovnaSlika;

  return (
    <div className="workshopAreaContainer">
      <div className="workshopAreaItem">
        <div className="workshopAreaImageContainer">
          <img id={item.naziv} className="workshopAreaImage" src={path} alt="workshopAreaImage" />
        </div>
        <div id={item.naziv} className="projectAreaTitle">
          {item.naziv.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Project;
