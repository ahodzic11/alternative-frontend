import { formatPath } from "../js/namechange";
import "./../css/Workshop.css";

const Workshop = ({ item }) => {
  const path = "http://localhost:5000/newuploads/radionice/" + formatPath(item.naslov) + "/" + item.naslovnaSlika;

  return (
    <div className="workshopAreaContainer">
      <div className="workshopAreaItem">
        <div className="workshopAreaImageContainer">
          <img id={item.naslov} className="workshopAreaImage" src={path} alt="workshopAreaImage" />
        </div>
        <div id={item.naslov} className="workshopAreaTitle">
          {item.naslov.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default Workshop;
