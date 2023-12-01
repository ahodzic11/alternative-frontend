import React from "react";
import "./../css/ProjectsBar.css";

function ProjectsBar() {
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
      <section ref={domRef} className={isVisible ? " is-visible" : "sectionCenter"}>
        {children}
      </section>
    );
  };

  const FadeInKick = ({ children }) => {
    const domRef = React.useRef();

    const [isVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        console.log(entries);
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
      <section ref={domRef} className={isVisible ? " is-visible-youth" : "sectionLeft"}>
        {children}
      </section>
    );
  };
  const FadeInProjects = ({ children }) => {
    const domRef = React.useRef();

    const [isVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        console.log(entries);
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
      <section ref={domRef} className={isVisible ? " is-visible-projects" : "sectionLeft"}>
        {children}
      </section>
    );
  };
  const FadeInDonators = ({ children }) => {
    const domRef = React.useRef();

    const [isVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        console.log(entries);
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
      <section ref={domRef} className={isVisible ? " is-visible-donators" : "sectionLeft"}>
        {children}
      </section>
    );
  };
  return (
    <div className="projectsContainer">
      <FadeInSection>
        <div className="projectsIntro">
          <div className="projectsIntroText">Kroz učešće građana identifikovali smo njihove stvarne potrebe i uz podršku donatora radili na najboljim rješenjima.</div>
        </div>
      </FadeInSection>

      <div className="projectInfo">
        <FadeInKick>
          <div className="youth">
            <div className="projectNumbers projectNumbersKICK"></div>
            <div className="projectDetailText">mladih je koristilo usluge KICK-a</div>
          </div>
        </FadeInKick>
        <FadeInProjects>
          <div className="projects">
            <div className="projectNumbers projectNumbersPROJECT"></div>
            <div className="projectDetailText">implementiranih projekata kroz 25 godina postojanja</div>
          </div>
        </FadeInProjects>
        <FadeInDonators>
          <div className="donators">
            <div className="projectNumbers projectNumbersDONATORS"></div>
            <div className="projectDetailText">donatora su podržala naše projekte</div>
          </div>
        </FadeInDonators>
      </div>
    </div>
  );
}

export default ProjectsBar;
