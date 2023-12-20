import { formatPath } from "../js/namechange";
import "./../css/WorkshopArea.css";

const WorkshopArea = ({ item }) => {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const path = runningModePath + "/newuploads/oblastiRadionice/" + formatPath(item) + ".jpg";

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
