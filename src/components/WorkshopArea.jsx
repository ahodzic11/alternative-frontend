import { formatPath } from "../js/namechange";
import "./../css/WorkshopArea.css";

const WorkshopArea = ({ item }) => {
  const path = "http://localhost:5000/newuploads/oblastiRadionice/" + formatPath(item) + ".jpg";

  return (
    <div className="workshopAreaContainer">
      <div className="workshopAreaItem">
        <div className="workshopAreaImageContainer" style={{ backgroundImage: `url(${path})`, backgroundSize: "cover" }}>
          <div className="workshopAreaTitleItem">{item.toUpperCase()}</div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopArea;

//<img id={item} className="workshopAreaImage" src={path} alt="workshopAreaImage" />
