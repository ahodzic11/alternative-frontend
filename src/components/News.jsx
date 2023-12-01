import { formatPath } from "../js/namechange";
import "./../css/News.css";

const News = ({ item }) => {
  const path = "http://localhost:5000/newuploads/vijesti/" + formatPath(item.naziv) + "/" + item.naslovnaSlika;

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
