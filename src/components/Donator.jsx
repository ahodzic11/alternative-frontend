import { formatPath } from "../js/namechange";
import "./../css/Donator.css";

const Donator = ({ item }) => {
  const path = "http://localhost:5000/newuploads/donatori/" + formatPath(item.naziv) + "/" + item.naslovnaSlika;

  function getPodrsku() {
    var podrska = "";
    var periodi = item.podrska.split(",");
    for (let i = 0; i < periodi.length; i++) {
      var godine = periodi[i].split("-");
      if (godine[0] == godine[1]) podrska += godine[0] + ".";
      else podrska += godine[0] + ". - " + godine[1] + ".";
      if (i < periodi.length - 1) podrska += ", ";
    }
    return podrska + " godina";
  }

  return (
    <div className="donatorAreaContainer" onClick={() => getPodrsku()}>
      <div className="donatorAreaItem">
        <div className="donatorAreaImageContainer">
          <img id={item.naziv} className="donatorAreaImage" src={path} alt="donatorAreaImage" />
        </div>
        <div className="donatorSecondWrapper">
          <div className="donatorAreaTitle">{item.naziv.toUpperCase()}</div>
          <div className="donatorPeriod">{getPodrsku()}</div>
          <div className="donatorLink">
            {item.link ? (
              <div>
                <a href={item.link}>{item.link}</a>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Donator;
