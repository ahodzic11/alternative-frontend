import React, { useEffect, useState } from "react";
import upArrow from "./../assets/uparrow.png";
import "./../css/GoToTop.css";

function GoToTop() {
  const [valueLeft, setValueLeft] = useState("-130px");
  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    const handleScrollButtonVisibility = () => {
      window.pageYOffset > 1100 ? setValueLeft("30px") : setValueLeft("-130px");
    };

    window.addEventListener("scroll", handleScrollButtonVisibility);

    return () => {
      window.removeEventListener("scroll", handleScrollButtonVisibility);
    };
  });

  return (
    <>
      {
        <button style={{ right: valueLeft }} onClick={handleScrollToTop} id="myBtn" title="Go to top">
          <img className="upArrowIcon" src={upArrow} />
        </button>
      }
    </>
  );
}

export default GoToTop;
