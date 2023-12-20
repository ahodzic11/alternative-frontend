import { formatPath } from "../js/namechange";
import "./../css/News.css";

const News = ({ item }) => {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const path = runningModePath + "/newuploads/vijesti/" + formatPath(item.naziv) + "/" + item.naslovnaSlika;

  return (
    <div className="workshopAreaContainer">
      <div className="workshopAreaItem">
        <div className="workshopAreaImageContainer">
          <img id={item.naziv} className="workshopAreaImage" src={path} alt="workshopAreaImage" />
        </div>
        <div id={item.naziv} className="newsAreaTitle">
          {item.naziv.toUpperCase()}
        </div>
      </div>
    </div>
  );
};

export default News;
