import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Project from "../components/Project";
import { formatPath } from "../js/namechange";
import filterIcon from "./../assets/filters.png";
import Button from "react-bootstrap/Button";
import Pagination from "../components/Pagination";
import GoToTop from "../components/GoToTop";
import "./../css/AllProjects.css";

function AllProjects() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const [projectList, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [nazivFilter, setNazivFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [donators, setDonators] = useState([]);
  const [selectedDonator, setSelectedDonator] = useState("allDonators");
  const [selectedRange, setSelectedRange] = useState("allValues");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(12);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredProjects.slice(indexOfFirstRecord, indexOfLastRecord);
  const [nPages, setNPages] = useState(Math.ceil(filteredProjects.length / recordsPerPage));
  const navigate = useNavigate();

  useEffect(() => {
    const getProjects = async () => {
      try {
        const res = await axios.get(runningModePath + `/api/projects`);
        setProjects(res.data.data);
        setFilteredProjects(res.data.data);
        setNPages(Math.ceil(res.data.data.length / recordsPerPage));
      } catch (err) {}
    };
    getProjects();
    setSort("asc");
  }, []);

  function sortiraj() {
    if (sort === "asc") {
      setFilteredProjects((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv < b.naziv ? -1 : 0;
        })
      );
    } else if (sort === "desc") {
      setFilteredProjects((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv > b.naziv ? -1 : 0;
        })
      );
    }
  }

  function getDonators() {
    var allDonators = [];
    projectList.forEach((project) => {
      if (!allDonators.includes(project.nazivDonatora)) allDonators.push(project.nazivDonatora);
    });
    setDonators(allDonators);
  }

  useEffect(() => {
    const getPagination = () => {
      setNPages(Math.ceil(filterSentProjects(projectList).length / recordsPerPage));
    };

    const filterNews = () => {
      setFilteredProjects(filterSentProjects(projectList));
    };
    filterNews();
    getPagination();
  }, [nazivFilter, selectedRange, selectedDonator]);

  const filterSentProjects = (projects) => {
    return projects
      .filter((item) => {
        if (nazivFilter) return item.naziv.toUpperCase().includes(nazivFilter.toUpperCase());
        else return 1;
      })
      .filter((item) => {
        return item.nazivDonatora == selectedDonator || selectedDonator == "allDonators";
      })
      .filter((item) => {
        if (selectedRange == "allValues") return 1;
        else if (selectedRange == "0to10") return Number(item.projektniGrant) >= 0 && Number(item.projektniGrant) <= 10000;
        else if (selectedRange == "10to50") return Number(item.projektniGrant) >= 10000 && Number(item.projektniGrant) <= 50000;
        else if (selectedRange == "50to100") return Number(item.projektniGrant) >= 50000 && Number(item.projektniGrant) <= 100000;
        else if (selectedRange == "over100") return Number(item.projektniGrant) >= 100000;
      });
  };

  useEffect(() => {
    getDonators();
  }, [projectList]);

  useEffect(() => {
    sortiraj();
  }, [sort, nazivFilter, projectList]);

  const handleClick = (e) => {
    //console.log(e.target);
    navigate("/projects/details/" + formatPath(e.target.id));
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
      //allProjectsContainer.style.transition = "1s";
      //allProjectsContainer.style.paddingLeft = "260px";
    }
  };

  const resetujFiltere = (e) => {
    e.preventDefault();
    setNazivFilter("");
    setSelectedDonator("allDonators");
    setSelectedRange("allValues");
    setSort("asc");
    var nazivInput = document.getElementById("nazivInput");
    nazivInput.value = "";
    var sortInput = document.getElementById("sortInput");
    sortInput.value = "asc";
    var donatorInput = document.getElementById("donatorInput");
    donatorInput.value = "allDonators";
    var valuesInput = document.getElementById("iznosSredstava");
    valuesInput.value = "allValues";
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  const displayResults = () => {
    var resultNumber = filteredProjects.length % 100;
    if (resultNumber == 0) return <>projekata</>;
    else if (resultNumber == 1) return <>projekat</>;
    else if (resultNumber >= 2 && resultNumber <= 4) return <>projekta</>;
    else if (resultNumber >= 5 && resultNumber <= 20) return <>projekata</>;
  };

  return (
    <>
      <Navigation />
      <div className="projectsMainWrapper">
        <div className="heading text-center">
          <h2>PROJEKTI</h2>
          <div className="underlineContainer"></div>
        </div>
        <div id="filtersIcons" className="filtersIcons">
          <div id="filteringSmallerContainer" className="filteringSmallerContainer" onClick={(e) => prikaziFiltere(e)}>
            <img className="filterIcon" src={filterIcon} />
            <div className="filterIconText">FILTERI</div>
            <div id="filteringSmallerContainerTwo" className="filteringSmallerContainerTwo"></div>
          </div>
          <div className="resultsNumber">
            <div className="resultsNumberLength">{filteredProjects.length}</div>
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
                  <Form.Group className="sortingContainers">
                    <Form.Label className="filtersCustomDesign">DONATOR</Form.Label>
                    <Form.Select id="donatorInput" className="filterInputField" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedDonator(e.target.value)}>
                      <option className="filterInputField" value="allDonators">
                        <div>Svi donatori</div>
                      </option>
                      {donators.length == 0 ? (
                        <></>
                      ) : (
                        <>
                          {donators
                            .sort((a, b) => {
                              return a > b ? -1 : 0;
                            })
                            .map((donator) => (
                              <option className="filterInputField" value={donator}>
                                {donator}
                              </option>
                            ))}
                        </>
                      )}
                    </Form.Select>
                  </Form.Group>
                </div>
                <div className="newFilterSection">
                  <Form.Group className="sortingContainers">
                    <Form.Label className="filtersCustomDesign">IZNOS SREDSTAVA</Form.Label>
                    <Form.Select id="iznosSredstava" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedRange(e.target.value)}>
                      <option value="allValues">Svi iznosi</option>
                      <option value="0to10">0 KM do 10000 KM</option>
                      <option value="10to50">10000 KM do 50000 KM</option>
                      <option value="50to100">50000 KM do 100000 KM</option>
                      <option value="over100">Preko 100000 KM</option>
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="newFilterSection">
                  <Form.Group className="sortingContainers">
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
                    <Project item={item} />
                  </div>
                ))}
              </>
            ) : (
              <>
                {currentRecords.map((item) => (
                  <div className="projectClickableDiv" onClick={(e) => handleClick(e)}>
                    <Project item={item} onClick={(e) => handleClick(e)} />
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

export default AllProjects;
