import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navigation from "../components/Navigation";
import axios from "axios";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";
import Donator from "../components/Donator";
import filterIcon from "./../assets/filters.png";
import Button from "react-bootstrap/Button";
import GoToTop from "../components/GoToTop";
import Pagination from "../components/Pagination";
import "./../css/AllDonators.css";

function AllDonators() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const [donatorList, setDonators] = useState([]);
  const [filteredDonators, setFilteredDonators] = useState([]);
  const [nazivFilter, setNazivFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [years, setYears] = useState([]);
  const [selectedYear, setSelectedYear] = useState("allyears");
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredDonators.slice(indexOfFirstRecord, indexOfLastRecord);
  const [nPages, setNPages] = useState(Math.ceil(filteredDonators.length / recordsPerPage));
  const navigate = useNavigate();

  const FadeInSectionLeft = ({ children }) => {
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
      <section ref={domRef} className={isVisible ? " donator-is-visible" : "donatorSectionLeft"}>
        {children}
      </section>
    );
  };

  const FadeInSectionRight = ({ children }) => {
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
      <section ref={domRef} className={isVisible ? " donator-is-visible" : "donatorSectionRight"}>
        {children}
      </section>
    );
  };

  useEffect(() => {
    const getDonators = async () => {
      try {
        const res = await axios.get(runningModePath + `/api/donators`);
        setDonators(res.data.data);
        setFilteredDonators(res.data.data);
        setNPages(Math.ceil(res.data.data.length / recordsPerPage));
        setSort("newest");

        var allYears = [];
        res.data.data.forEach((donator) => {
          donator.podrska.split(",").forEach((period) => {
            var godine = period.split("-");
            if (!allYears.includes(godine[0])) allYears.push(godine[0]);
            if (!allYears.includes(godine[1])) allYears.push(godine[1]);
          });
        });
        setYears(allYears);
      } catch (err) {}
    };

    getDonators();
  }, []);

  function findLatestYear(donator) {
    var latestYear = 0;
    donator.podrska.split(",").forEach((period) => {
      var godine = period.split("-");
      if (Number(godine[0]) > latestYear) latestYear = Number(godine[0]);
      if (Number(godine[1]) > latestYear) latestYear = Number(godine[1]);
    });
    return latestYear;
  }

  function sortiraj() {
    if (sort === "newest") {
      setFilteredDonators((prev) =>
        [...prev].sort((a, b) => {
          return findLatestYear(a) > findLatestYear(b) ? -1 : 0;
        })
      );
    } else if (sort === "oldest") {
      setFilteredDonators((prev) =>
        [...prev].sort((a, b) => {
          return findLatestYear(a) < findLatestYear(b) ? -1 : 0;
        })
      );
    } else if (sort === "asc") {
      setFilteredDonators((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv < b.naziv ? -1 : 0;
        })
      );
    } else if (sort === "desc") {
      setFilteredDonators((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv > b.naziv ? -1 : 0;
        })
      );
    }
  }

  const filterSentDonators = (news) => {
    return news
      .filter((donator) => {
        if (nazivFilter) return donator.naziv.toUpperCase().includes(nazivFilter.toUpperCase());
        else return 1;
      })
      .filter((donator) => {
        return uPeriodu(donator) || selectedYear == "allyears";
      });
  };

  useEffect(() => {
    const getPagination = () => {
      setNPages(Math.ceil(filterSentDonators(donatorList).length / recordsPerPage));
    };

    const filterDonators = () => {
      setFilteredDonators(filterSentDonators(donatorList));
    };
    filterDonators();

    getPagination();
  }, [nazivFilter, selectedYear]);

  useEffect(() => {
    sortiraj();
  }, [sort, nazivFilter, donatorList]);

  useEffect(() => {
    handleChange();
  }, [nazivFilter]);

  function handleChange() {
    setSort(sort);
    if (nazivFilter) setFilteredDonators(donatorList.filter((item) => item.naziv.toUpperCase().includes(nazivFilter.toUpperCase())));
    else setFilteredDonators(donatorList);
    sortiraj();
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

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
    setNazivFilter("");
    setSelectedYear("allyears");
    setSort("asc");
    var nazivInput = document.getElementById("nazivInput");
    nazivInput.value = "";
    var sortInput = document.getElementById("sortInput");
    sortInput.value = "asc";
    var yearInput = document.getElementById("yearInput");
    yearInput.value = "allyears";
  };

  const displayResults = () => {
    var resultNumber =
      filteredDonators.filter((donator) => {
        return (selectedYear <= Number(donator.krajPodrske) && selectedYear >= Number(donator.pocetakPodrske)) || selectedYear == "allyears";
      }).length % 10;
    if (resultNumber == 0) return <>donatora</>;
    else if (resultNumber == 1) return <>donator</>;
    else return <>donatora</>;
  };

  function uPeriodu(donator) {
    let inRange = false;
    donator.podrska.split(",").forEach((period) => {
      var godine = period.split("-");
      if (selectedYear <= Number(godine[1]) && selectedYear >= Number(godine[0])) inRange = true;
    });
    return inRange;
  }

  return (
    <>
      <Navigation />
      <div className="projectsMainWrapper">
        <div id="donatorField" className="heading text-center">
          <h2>DONATORI</h2>
          <div className="underlineContainer"></div>
        </div>
        <div id="filtersIcons" className="filtersIcons">
          <div id="filteringSmallerContainer" className="filteringSmallerContainer" onClick={(e) => prikaziFiltere(e)}>
            <img className="filterIcon" src={filterIcon} />
            <div className="filterIconText">FILTERI</div>
            <div id="filteringSmallerContainerTwo" className="filteringSmallerContainerTwo"></div>
          </div>
          <div className="resultsNumber">
            <div className="resultsNumberLength">{filteredDonators.length}</div>
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
                      <option value="newest">Najnoviji ka najstarijim</option>
                      <option value="oldest">Najstariji ka najnovijim</option>
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
            {currentRecords.map((donator, index) =>
              index % 2 == 0 ? (
                <FadeInSectionLeft>
                  <Donator item={donator} onClick={uPeriodu(donator)} />
                </FadeInSectionLeft>
              ) : (
                <FadeInSectionRight>
                  <Donator item={donator} onClick={uPeriodu(donator)} />
                </FadeInSectionRight>
              )
            )}
          </div>
        </div>
      </div>
      <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <GoToTop />
      <Footer />
    </>
  );
}

export default AllDonators;
