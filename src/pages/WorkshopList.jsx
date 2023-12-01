import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Workshop from "../components/Workshop";
import { useParams, useNavigate } from "react-router-dom";
import filterIcon from "./../assets/filters.png";
import { formatPath } from "../js/namechange";
import Pagination from "../components/Pagination";
import GoToTop from "../components/GoToTop";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "./../css/WorkshopList.css";

function WorkshopList() {
  let { area } = useParams();
  const [workshopList, setWorkshops] = useState([]);
  const [filteredWorkshops, setFilteredWorkshops] = useState([]);
  const [naslovFilter, setNaslovFilter] = useState("");
  const [trenerFilter, setTrenerFilter] = useState("");
  const [sort, setSort] = useState("newest");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("allyears");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredWorkshops.slice(indexOfFirstRecord, indexOfLastRecord);
  const [nPages, setNPages] = useState(Math.ceil(filteredWorkshops.length / recordsPerPage));
  const navigate = useNavigate();

  useEffect(() => {
    const getWorkshops = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/workshops/area/` + area);
        setWorkshops(res.data.data);
        setFilteredWorkshops(res.data.data);
        setNPages(Math.ceil(res.data.data.length / recordsPerPage));
      } catch (err) {}
    };

    getWorkshops();
    setSort("newest");
  }, []);

  const handleClick = (e) => {
    navigate("/workshops/details/" + formatPath(e.target.id));
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  function sortiraj() {
    if (sort === "newest") {
      setFilteredWorkshops((prev) =>
        [...prev].sort((a, b) => {
          var firstDate = a.datum.split(".");
          var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
          var secondDate = b.datum.split(".");
          var secondCorrectDate = new Date(secondDate[0], secondDate[1] - 1, secondDate[2]);
          return firstCorrectDate > secondCorrectDate ? -1 : 0;
        })
      );
    } else if (sort === "oldest") {
      setFilteredWorkshops((prev) =>
        [...prev].sort((a, b) => {
          var firstDate = a.datum.split(".");
          var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
          var secondDate = b.datum.split(".");
          var secondCorrectDate = new Date(secondDate[0], secondDate[1] - 1, secondDate[2]);
          return firstCorrectDate < secondCorrectDate ? -1 : 0;
        })
      );
    } else if (sort === "asc") {
      setFilteredWorkshops((prev) =>
        [...prev].sort((a, b) => {
          return a.naslov < b.naslov ? -1 : 0;
        })
      );
    } else if (sort === "desc") {
      setFilteredWorkshops((prev) =>
        [...prev].sort((a, b) => {
          return a.naslov > b.naslov ? -1 : 0;
        })
      );
    }
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
      allProjectsContainer.style.paddingLeft = "0px";
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
    setSelectedYear("allyears");
    setSort("newest");
    setTrenerFilter("");
    setNaslovFilter("");
    var yearInput = document.getElementById("yearInput");
    yearInput.value = "allyears";
    var sortInput = document.getElementById("sortInput");
    sortInput.value = "newest";
    var naslovInput = document.getElementById("naslovInput");
    naslovInput.value = "";
    var trenerInput = document.getElementById("trenerInput");
    trenerInput.value = "";
  };

  const filterSentWorkshops = (workshops) => {
    return workshops
      .filter((item) => {
        var date = item.datum.split(".");
        var fullDate = new Date(date[2], date[1] - 1, date[0]);
        let year = fullDate.getFullYear();
        return year == selectedYear || selectedYear == "allyears";
      })
      .filter((workshop) => {
        if (naslovFilter && trenerFilter) return workshop.naslov.toUpperCase().includes(naslovFilter.toUpperCase()) && workshop.trener.toUpperCase().includes(trenerFilter.toUpperCase());
        else if (naslovFilter) return workshop.naslov.toUpperCase().includes(naslovFilter.toUpperCase());
        else if (trenerFilter) return workshop.trener.toUpperCase().includes(trenerFilter.toUpperCase());
      });
  };

  const displayResults = () => {
    var resultNumber =
      filteredWorkshops.filter((item) => {
        var date = item.datum.split(".");
        var fullDate = new Date(date[2], date[1] - 1, date[0]);
        let year = fullDate.getFullYear();
        return year == selectedYear || selectedYear == "allyears";
      }).length % 10;
    if (resultNumber == 0) return <>radionica</>;
    else if (resultNumber == 1) return <>radionica</>;
    else if (resultNumber >= 2 && resultNumber <= 4) return <>radionice</>;
    else return <>radionica</>;
  };

  useEffect(() => {
    const getPagination = () => {
      setNPages(Math.ceil(filterSentWorkshops(workshopList).length / recordsPerPage));
    };

    const filterWorkshops = () => {
      setFilteredWorkshops(filterSentWorkshops(workshopList));
    };

    filterWorkshops();
    getPagination();
  }, [naslovFilter, selectedYear]);

  useEffect(() => {
    sortiraj();
  }, [sort, trenerFilter, naslovFilter, workshopList]);

  function getWorkshopYears() {
    var allYears = [];
    workshopList.forEach((workshop) => {
      var date = workshop.datum.split(".");
      var fullDate = new Date(date[2], date[1] - 1, date[0]);
      let year = fullDate.getFullYear();
      if (!allYears.includes(year)) allYears.push(year);
    });
    setYears(allYears);
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  useEffect(() => {
    getWorkshopYears();
  }, [workshopList, sort, filteredWorkshops]);

  return (
    <>
      <Navigation />
      <div className="projectsMainWrapper">
        <div className="heading text-center">
          <h2>{area}</h2>
        </div>
        <div id="filtersIcons" className="filtersIcons">
          <div id="filteringSmallerContainer" className="filteringSmallerContainer" onClick={(e) => prikaziFiltere(e)}>
            <img className="filterIcon" src={filterIcon} />
            <div className="filterIconText">FILTERI</div>
            <div id="filteringSmallerContainerTwo" className="filteringSmallerContainerTwo"></div>
          </div>
          <div className="resultsNumber">
            <div className="resultsNumberLength">{filteredWorkshops.length}</div>
            <div className="resultsNumberName">{displayResults()}</div>
          </div>
        </div>
        <div className="projectsSomeWrapper">
          <div id="filterIconsContainer" className="filterIconsContainer">
            <div id="filteringDiv" className="newFilterWrapper">
              <div className="newFilterContainer">
                <div className="newFilterSection">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="filtersCustomDesign">NASLOV</Form.Label>
                    <Form.Control id="naslovInput" type="naslov" placeholder="Naslov" onChange={(e) => setNaslovFilter(e.target.value)} />
                  </Form.Group>
                </div>
                <div className="newFilterSection">
                  <Form.Group controlId="formBasicEmail">
                    <Form.Label className="filtersCustomDesign">TRENER</Form.Label>
                    <Form.Control id="trenerInput" type="trener" placeholder="Trener" onChange={(e) => setTrenerFilter(e.target.value)} />
                  </Form.Group>
                </div>
                <div className="newFilterSection">
                  <Form.Group className="sortingContainer">
                    <Form.Label className="filtersCustomDesign">GODINA</Form.Label>
                    <Form.Select id="yearInput" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedYear(e.target.value)}>
                      <option value="allyears">Sve godine</option>
                      {years.length == 0 ? (
                        <></>
                      ) : (
                        <>
                          {years
                            .sort((a, b) => {
                              return a > b ? -1 : 0;
                            })
                            .map((year) => (
                              <option value={year}>{year}</option>
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
                      <option value="newest">Najnovije ka najstarijem</option>
                      <option value="oldest">Najstarije ka najnovijem</option>
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
          <div className="allProjectsContainer">
            {workshopList.length == 0 ? (
              <div className="noWorkshopsContainer">Nisu unesene radionice odabrane oblasti!</div>
            ) : (
              <div className="foundWorkshopsContainer">
                <div className="oneWorkshopDetail" onClick={handleClick}>
                  {currentRecords.map((item) => (
                    <Workshop item={item} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {workshopList.length != 0 ? <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : <></>}

      <GoToTop />
      <Footer />
    </>
  );
}

export default WorkshopList;
