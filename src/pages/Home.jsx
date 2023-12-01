import React from "react";
import AcitivityBar from "../components/AcitivityBar";
import DetailedProjectsBar from "../components/DetailedProjectsBar";
import FillerBar from "../components/FillerBar";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import ProjectsBar from "../components/ProjectsBar";
import Statements from "../components/Statements";
import GoToTop from "../components/GoToTop";
import "./../css/Home.css";

function Home() {
  const FadeInSection = ({ children }) => {
    const domRef = React.useRef();

    const [isVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        // In your case there's only one element to observe:
        if (entries[0].isIntersecting) {
          // Not possible to set it back to false like this:
          console.log("ugledalo ga");
          setVisible(true);

          // No need to keep observing:
          observer.unobserve(domRef.current);
        }
      });

      observer.observe(domRef.current);

      return () => observer.disconnect();
    }, []);

    return (
      <section ref={domRef} className={isVisible ? "" : ""}>
        {children}
      </section>
    );
  };

  return (
    <div>
      <div id="navigationFadeInDiv" className="navigationFadeInDiv">
        <Navigation />
      </div>
      <FillerBar />
      <ProjectsBar />
      <AcitivityBar />
      <DetailedProjectsBar />
      <GoToTop />
      <Footer />
    </div>
  );
}

export default Home;
