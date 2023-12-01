import { formatPath } from "../js/namechange";
import Button from "react-bootstrap/Button";
import "./../css/Workshop.css";
import { useNavigate } from "react-router-dom";

const Offer = ({ item }) => {
  const path = "http://localhost:5000/newuploads/ponude/" + formatPath(item.naziv) + "/" + item.naslovnaSlika;
  const navigate = useNavigate();

  const showOffer = (e) => {
    e.preventDefault();
    navigate("/offers/" + formatPath(item.naziv));
  };

  return (
    <div className="activityItem">
      <img className="activityImage" src={path} />
      <div className="activityText">{item.naziv}</div>
      <div className="activityDetailedText">{item.opis}</div>
      <Button className="activityButton" variant="outline-dark" onClick={(e) => showOffer(e)}>
        <div className="activityButtonText">SAZNAJ VIŠE</div>
      </Button>
    </div>
  );
};

export default Offer;
