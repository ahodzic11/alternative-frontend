import { formatPath } from "../js/namechange";
import "./../css/Workshop.css";

const Workshop = ({ item }) => {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const path = runningModePath + "/newuploads/radionice/" + formatPath(item.naslov) + "/" + item.naslovnaSlika;

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
