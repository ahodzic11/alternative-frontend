import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Activity from "../components/Activity";
import filterIcon from "./../assets/filters.png";
import Button from "react-bootstrap/Button";
import { formatPath } from "../js/namechange";
import Pagination from "../components/Pagination";
import GoToTop from "../components/GoToTop";
import "./../css/AllActivities.css";

function AllActivities() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const [activityList, setActivities] = useState([]);
  const [filteredActivities, setFilteredActivities] = useState([]);
  const [nazivFilter, setNazivFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [donators, setDonators] = useState([]);
  const [projects, setProjects] = useState([]);
  const [selectedDonator, setSelectedDonator] = useState("allDonators");
  const [selectedProject, setSelectedProject] = useState("allProjects");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredActivities.slice(indexOfFirstRecord, indexOfLastRecord);
  const [nPages, setNPages] = useState(Math.ceil(filteredActivities.length / recordsPerPage));
  const navigate = useNavigate();

  useEffect(() => {
    const getActivities = async () => {
      try {
        const res = await axios.get(runningModePath + `/api/activities`);
        setActivities(res.data.data);
        setFilteredActivities(res.data.data);
        setNPages(Math.ceil(res.data.data.length / recordsPerPage));
      } catch (err) {}
    };
    getActivities();
    setSort("asc");
  }, []);

  function prikaziNameChange() {
    let ime = "Fajront - novi muzički bend u Kicku".toLowerCase();
    var regexPattern = /\s+/g;
    var string = ime.replace("-", "").replace(/"/g, "").replace(/ć|č/g, "c").replace(/š/g, "s").replace(/đ/g, "d").replace(/ž/g, "z").replace(/:|-|,/g, "").replace(".", "").replace("„", "").replace("“", "").replace(/„/g, "").replace(/“/g, "");
    let rijeci = string.replace(regexPattern, " ");
    console.log(rijeci.replace(/ /g, "-"));
  }

  useEffect(() => {
    const getPagination = () => {
      setNPages(Math.ceil(filterSentActivities(activityList).length / recordsPerPage));
    };

    const filterActivities = () => {
      setFilteredActivities(filterSentActivities(activityList));
    };
    filterActivities();

    getPagination();
  }, [nazivFilter, selectedDonator, selectedProject]);

  const filterSentActivities = (activities) => {
    return activities
      .filter((item) => {
        return item.nazivDonatora == selectedDonator || selectedDonator == "allDonators";
      })
      .filter((item) => {
        return item.nazivProjekta == selectedProject || selectedProject == "allProjects";
      })
      .filter((item) => {
        if (nazivFilter) return item.naziv.toUpperCase().includes(nazivFilter.toUpperCase());
        else return 1;
      });
  };

  function sortiraj() {
    if (sort === "asc") {
      setFilteredActivities((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv < b.naziv ? -1 : 0;
        })
      );
    } else if (sort === "desc") {
      setFilteredActivities((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv > b.naziv ? -1 : 0;
        })
      );
    }
  }

  function getDonators() {
    var allDonators = [];
    activityList.forEach((activity) => {
      if (!allDonators.includes(activity.nazivDonatora)) allDonators.push(activity.nazivDonatora);
    });
    setDonators(allDonators);
  }

  function getProjects() {
    var allProjects = [];
    activityList.forEach((activity) => {
      if (!allProjects.includes(activity.nazivProjekta)) allProjects.push(activity.nazivProjekta);
    });
    setProjects(allProjects);
  }

  useEffect(() => {
    getDonators();
    getProjects();
  }, [activityList, sort, filteredActivities]);

  useEffect(() => {
    sortiraj();
  }, [sort, nazivFilter, activityList]);

  const handleClick = (e) => {
    navigate("/activities/details/" + formatPath(e.target.id));
  };

  useEffect(() => {
    handleChange();
  }, [nazivFilter]);

  function handleChange() {
    setSort(sort);
    sortiraj();
  }

  const prikaziFiltere = (e) => {
    e.preventDefault();
    var filteringDiv = document.getElementById("filterIconsContainer");
    var filteringIcons = document.getElementById("filteringSmallerContainer");
    var filteringIconsTwo = document.getElementById("filteringSmallerContainerTwo");
    var allProjectsContainer = document.getElementById("allProjectsContainer");
    if (filteringDiv.style.left === "0px") {
      filteringDiv.style.left = "-300px";
      filteringIconsTwo.style.left = "-300px";
      filteringIcons.style.color = "black";
      allProjectsContainer.style.paddingLeft = "40px";
    } else {
      filteringDiv.style.transition = "1s";
      filteringDiv.style.left = "0px";
      filteringIconsTwo.style.left = "0px";
      filteringIcons.style.transition = "1s";
      filteringIcons.style.color = "white";
      //DA NE BUDE OVERLAY
      allProjectsContainer.style.transition = "1s";
      allProjectsContainer.style.paddingLeft = "260px";
    }
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const resetujFiltere = (e) => {
    e.preventDefault();
    setNazivFilter("");
    setSelectedDonator("allDonators");
    setSelectedProject("allProjects");
    setSort("asc");
    var nazivInput = document.getElementById("nazivInput");
    nazivInput.value = "";
    var sortInput = document.getElementById("sortInput");
    sortInput.value = "asc";
    var projekatInput = document.getElementById("projekatInput");
    projekatInput.value = "allProjects";
    var donatorInput = document.getElementById("donatorInput");
    donatorInput.value = "allDonators";
  };

  const displayResults = () => {
    var resultNumber = filteredActivities.length % 10;
    if (resultNumber == 0) return <>aktivnosti</>;
    else if (filteredActivities.length % 100 == 11) return <>aktivnosti</>;
    else if (resultNumber == 1) return <>aktivnost</>;
    else return <>aktivnosti</>;
  };

  return (
    <>
      <Navigation />
      <div className="projectsMainWrapper">
        <div className="heading text-center">
          <h2 onClick={prikaziNameChange}>AKTIVNOSTI</h2>
          <div className="underlineContainer"></div>
        </div>
        <div id="filtersIcons" className="filtersIcons">
          <div id="filteringSmallerContainer" className="filteringSmallerContainer" onClick={(e) => prikaziFiltere(e)}>
            <img className="filterIcon" src={filterIcon} />
            <div className="filterIconText">FILTERI</div>
            <div id="filteringSmallerContainerTwo" className="filteringSmallerContainerTwo"></div>
          </div>
          <div className="resultsNumber">
            <div className="resultsNumberLength">{filteredActivities.length}</div>
            <div className="resultsNumberName">{displayResults()}</div>
          </div>
        </div>
        <div className="projectsSomeWrapper">
          <div id="filterIconsContainer" className="filterIconsContainer">
            <div id="filteringDiv" className="newFilterWrapper">
              <div className="newFilterContainer">
                <div className="newFilterSection">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="filtersCustomDesign">NAZIV</Form.Label>
                    <Form.Control id="nazivInput" type="naziv" placeholder="Naziv" onChange={(e) => setNazivFilter(e.target.value)} />
                  </Form.Group>
                </div>
                <div className="newFilterSection">
                  <Form.Group className="sortingContainer">
                    <Form.Label className="filtersCustomDesign">DONATOR</Form.Label>
                    <Form.Select id="donatorInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedDonator(e.target.value)}>
                      <option value="allDonators">Svi donatori</option>
                      {donators.length == 0 ? (
                        <></>
                      ) : (
                        <>
                          {donators
                            .sort((a, b) => {
                              return a > b ? -1 : 0;
                            })
                            .map((donator) => (
                              <option value={donator}>{donator}</option>
                            ))}
                        </>
                      )}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="newFilterSection">
                  <Form.Group className="sortingContainer">
                    <Form.Label className="filtersCustomDesign">PROJEKAT</Form.Label>
                    <Form.Select id="projekatInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedProject(e.target.value)}>
                      <option value="allProjects">Svi projekti</option>
                      {projects.length == 0 ? (
                        <></>
                      ) : (
                        <>
                          {projects
                            .sort((a, b) => {
                              return a > b ? -1 : 0;
                            })
                            .filter((project) => {
                              return project.length > 0 ? -1 : 0;
                            })
                            .map((project) => (
                              <option value={project}>{project}</option>
                            ))}
                        </>
                      )}
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="newFilterSection">
                  <Form.Group className="sortingContainer">
                    <Form.Label className="filtersCustomDesign">SORTIRAJ</Form.Label>
                    <Form.Select id="sortInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSort(e.target.value)}>
                      <option value="asc">A-Z</option>
                      <option value="desc">Z-A</option>
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="newFilterSection">
                  <Button className="resetFilters" variant="danger" onClick={(e) => resetujFiltere(e)}>
                    <div className="resetFiltersText">RESETUJ FILTERE</div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          <div id="allProjectsContainer" className="allProjectsContainer">
            {donators.length == 0 ? (
              <>
                {currentRecords.map((item) => (
                  <div className="projectClickableDiv" onClick={(e) => handleClick(e)}>
                    <Activity item={item} />
                  </div>
                ))}
              </>
            ) : (
              <>
                {currentRecords.map((item) => (
                  <div className="projectClickableDiv" onClick={(e) => handleClick(e)}>
                    <Activity item={item} />
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      {currentRecords.length != 0 ? <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : <></>}
      <GoToTop />
      <Footer />
    </>
  );
}

export default AllActivities;
