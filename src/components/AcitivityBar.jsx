import React, { useEffect, useState } from "react";
import axios from "axios";
import Offer from "./Offer";
import "./../css/ActivityBar.css";

function AcitivityBar() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const [offerList, setOffers] = useState([]);

  const FadeInRegular = ({ children }) => {
    const domRef = React.useRef();

    const [isVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        // In your case there's only one element to observe:
        if (entries[0].isIntersecting) {
          // Not possible to set it back to false like this:
          setVisible(true);

          // No need to keep observing:
          observer.unobserve(domRef.current);
        }
      });

      observer.observe(domRef.current);

      return () => observer.disconnect();
    }, []);

    return (
      <section ref={domRef} className={isVisible ? "regular-is-visible" : ""}>
        {children}
      </section>
    );
  };

  const FadeInSection = ({ children }) => {
    const domRef = React.useRef();

    const [isVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        // In your case there's only one element to observe:
        if (entries[0].isIntersecting) {
          // Not possible to set it back to false like this:
          setVisible(true);

          // No need to keep observing:
          observer.unobserve(domRef.current);
        }
      });

      observer.observe(domRef.current);

      return () => observer.disconnect();
    }, []);

    return (
      <section ref={domRef} className={isVisible ? "activities-is-visible" : ""}>
        {children}
      </section>
    );
  };

  const FadeInActivities = ({ children }) => {
    const domRef = React.useRef();

    const [isVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        // In your case there's only one element to observe:
        if (entries[0].isIntersecting) {
          // Not possible to set it back to false like this:
          setVisible(true);

          // No need to keep observing:
          observer.unobserve(domRef.current);
        }
      });

      observer.observe(domRef.current);

      return () => observer.disconnect();
    }, []);

    return (
      <section ref={domRef} className={isVisible ? "is-visible" : ""}>
        {children}
      </section>
    );
  };

  useEffect(() => {
    const getOffers = async () => {
      try {
        const res = await axios.get(runningModePath + `/api/offers`);
        setOffers(res.data.data);
      } catch (err) {}
    };
    getOffers();
  }, []);

  return (
    <>
      <div id="joinPlace"></div>
      <FadeInActivities>
        <div className="activityContainer">
          <FadeInSection>
            <div className="joinActivityText">Pridružite se aktivnostima u KICK-u</div>
          </FadeInSection>
          <div className="activities">
            {offerList.map((offer) => (
              <FadeInRegular>
                <Offer item={offer} />
              </FadeInRegular>
            ))}
          </div>
        </div>
      </FadeInActivities>
    </>
  );
}

export default AcitivityBar;
