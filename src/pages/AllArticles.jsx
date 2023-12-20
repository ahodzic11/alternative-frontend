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
import GoToTop from "../components/GoToTop";
import "./../css/AllArticles.css";
import Pagination from "../components/Pagination";

function AllArticles() {
  const runningModePath = process.env.REACT_APP_NODE_ENV == "development" ? process.env.REACT_APP_LOCAL_SERVER : process.env.REACT_APP_REMOTE_SERVER;
  const [articleList, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [nazivFilter, setNazivFilter] = useState("");
  const [sort, setSort] = useState("asc");
  const [donators, setDonators] = useState([]);
  const [selectedDonator, setSelectedDonator] = useState("allDonators");
  const [selectedMediaType, setSelectedMediaType] = useState("allValues");
  const [selectedYear, setSelectedYear] = useState("allyears");
  const [years, setYears] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredArticles.slice(indexOfFirstRecord, indexOfLastRecord);
  const [nPages, setNPages] = useState(Math.ceil(filteredArticles.length / recordsPerPage));
  const navigate = useNavigate();
  const path = runningModePath + "/newuploads/clanci/";

  const FadeInSection = ({ children }) => {
    const domRef = React.useRef();

    const [isVisible, setVisible] = React.useState(false);

    React.useEffect(() => {
      const observer = new IntersectionObserver((entries) => {
        // In your case there's only one element to observe:
        if (entries[0].isIntersecting) {
          // Not possible to set it back to false like this:
          console.log(entries[0].intersectionRatio);
          setVisible(true);

          // No need to keep observing:
          observer.unobserve(domRef.current);
        }
      });

      observer.observe(domRef.current);

      return () => observer.disconnect();
    }, []);

    return (
      <section ref={domRef} className={isVisible ? " article-is-visible" : "sectionCenter"}>
        {children}
      </section>
    );
  };

  useEffect(() => {
    const getArticles = async () => {
      try {
        const res = await axios.get(runningModePath + `/api/articles`);
        setArticles(res.data.data);
        setFilteredArticles(res.data.data);
        setNPages(Math.ceil(res.data.data.length / recordsPerPage));
        setSort("newest");
      } catch (err) {}
    };
    getArticles();
    getArticlesYears();
    setSort("asc");
  }, []);

  function getArticlesYears() {
    var allYears = [];
    filteredArticles.forEach((article) => {
      var date = article.datum.split("-");
      var fullDate = new Date(date[0], date[1] - 1, date[2]);
      let year = fullDate.getFullYear();
      if (!allYears.includes(year)) allYears.push(year);
    });
    setYears(allYears);
  }

  function sortiraj() {
    if (sort === "newest") {
      setFilteredArticles((prev) =>
        [...prev].sort((a, b) => {
          var firstDate = a.datum.split(".");
          var firstCorrectDate = new Date(firstDate[2], firstDate[1] - 1, firstDate[0]);
          var secondDate = b.datum.split(".");
          var secondCorrectDate = new Date(secondDate[2], secondDate[1] - 1, secondDate[0]);
          return firstCorrectDate > secondCorrectDate ? -1 : 0;
        })
      );
    } else if (sort === "oldest") {
      setFilteredArticles((prev) =>
        [...prev].sort((a, b) => {
          var firstDate = a.datum.split(".");
          var firstCorrectDate = new Date(firstDate[0], firstDate[1] - 1, firstDate[2]);
          var secondDate = b.datum.split(".");
          var secondCorrectDate = new Date(secondDate[0], secondDate[1] - 1, secondDate[2]);
          return firstCorrectDate < secondCorrectDate ? -1 : 0;
        })
      );
    } else if (sort === "asc") {
      setFilteredArticles((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv < b.naziv ? -1 : 0;
        })
      );
    } else if (sort === "desc") {
      setFilteredArticles((prev) =>
        [...prev].sort((a, b) => {
          return a.naziv > b.naziv ? -1 : 0;
        })
      );
    }
  }

  const filterSentArticles = (articles) => {
    return articles
      .filter((item) => {
        return item.nazivDonatora == selectedDonator || selectedDonator == "allDonators";
      })
      .filter((item) => {
        if (nazivFilter) return item.naziv.toUpperCase().includes(nazivFilter.toUpperCase());
        else return 1;
      })
      .filter((article) => {
        var date = article.datum.split(".");
        var fullDate = new Date(date[2], date[1] - 1, date[0]);
        let year = fullDate.getFullYear();
        return year == selectedYear || selectedYear == "allyears";
      })
      .filter((article) => {
        return article.tipMedija == selectedMediaType || selectedMediaType == "allValues";
      });
  };

  useEffect(() => {
    const getPagination = () => {
      setNPages(Math.ceil(filterSentArticles(articleList).length / recordsPerPage));
    };

    const filterNews = () => {
      setFilteredArticles(filterSentArticles(articleList));
    };
    filterNews();
    getPagination();
    sortiraj();
  }, [nazivFilter, selectedYear, selectedMediaType, selectedDonator]);

  function getDonators() {
    var allDonators = [];
    filteredArticles.forEach((project) => {
      if (!allDonators.includes(project.nazivDonatora)) allDonators.push(project.nazivDonatora);
    });
    setDonators(allDonators);
  }

  useEffect(() => {
    getDonators();
  }, [articleList, sort, filteredArticles]);

  useEffect(() => {
    sortiraj();
  }, [sort, nazivFilter, articleList]);

  useEffect(() => {
    handleChange();
  }, [nazivFilter]);

  function handleChange() {
    setSort(sort);
    if (nazivFilter) setFilteredArticles(articleList.filter((item) => item.naziv.toUpperCase().includes(nazivFilter.toUpperCase())));
    else setFilteredArticles(articleList);
    sortiraj();
  }

  function ellipsify(str) {
    if (str.length > 830) {
      return str.substring(0, 830) + "...";
    } else {
      return str;
    }
  }

  function getArticlesYears() {
    var allYears = [];
    articleList.forEach((article) => {
      var date = article.datum.split(".");
      var fullDate = new Date(date[2], date[1] - 1, date[0]);
      let year = fullDate.getFullYear();
      if (!allYears.includes(year)) allYears.push(year);
    });
    setYears(allYears);
  }

  useEffect(() => {
    getArticlesYears();
  }, [articleList, sort, filteredArticles]);

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

  const displayResults = () => {
    var resultNumber = filteredArticles.length % 100;
    if (resultNumber == 0) return <>članaka</>;
    else if (resultNumber == 1) return <>članak</>;
    else if (resultNumber >= 2 && resultNumber <= 4) return <>članka</>;
    else if (resultNumber >= 5 && resultNumber <= 20) return <>članaka</>;
  };

  const resetujFiltere = (e) => {
    e.preventDefault();
    setSelectedYear("allyears");
    setSort("newest");
    setNazivFilter("");
    var tipMedija = document.getElementById("tipMedija");
    tipMedija.value = "allValues";
    var yearInput = document.getElementById("yearInput");
    yearInput.value = "allyears";
    var sortInput = document.getElementById("sortInput");
    sortInput.value = "newest";
    var naslovInput = document.getElementById("nazivInput");
    naslovInput.value = "";
    var trenerInput = document.getElementById("trenerInput");
    trenerInput.value = "";
  };

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentPage]);

  return (
    <>
      <Navigation />
      <div className="articlesMainWrapper">
        <div className="heading text-center">
          <h2>ČLANCI</h2>
          <div className="underlineContainer"></div>
        </div>
        <div id="filtersIcons" className="filtersIcons">
          <div id="filteringSmallerContainer" className="filteringSmallerContainer" onClick={(e) => prikaziFiltere(e)}>
            <img className="filterIcon" src={filterIcon} alt="Filter icon" />
            <div className="filterIconText">FILTERI</div>
            <div id="filteringSmallerContainerTwo" className="filteringSmallerContainerTwo"></div>
          </div>
          <div className="resultsNumber">
            <div className="resultsNumberLength">{filteredArticles.length}</div>
            <div className="resultsNumberName">{displayResults()}</div>
          </div>
        </div>
        <div className="articlesSomeWrapper">
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
                      <option id="yearInput" value="allyears">
                        Sve godine
                      </option>
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
                  <Form.Group className="sortingContainers">
                    <Form.Label className="filtersCustomDesign">TIP MEDIJA</Form.Label>
                    <Form.Select id="tipMedija" name="oblastRadionice" aria-label="Default select example" onClick={(e) => setSelectedMediaType(e.target.value)}>
                      <option value="allValues">Svi mediji</option>
                      <option value="Web portal">Web portal</option>
                      <option value="Društvene mreže">Društvene mreže</option>
                      <option value="TV">TV</option>
                      <option value="Štampa">Štampa</option>
                    </Form.Select>
                  </Form.Group>
                </div>

                <div className="newFilterSection">
                  <Form.Group className="sortingContainers">
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
          <div id="allArticlesContainer" className="allArticlesContainer">
            {donators.length == 0 ? (
              <>
                {currentRecords.map((item) => (
                  <FadeInSection>
                    <Project item={item} />
                  </FadeInSection>
                ))}
              </>
            ) : (
              <>
                {currentRecords.map((article) => (
                  <FadeInSection>
                    <div className="articleItemWithPadding">
                      <div className="articleItem">
                        <div className="articleTopBar">
                          <div className="articleTopBarTextContainer">
                            {article.datum} | {article.nazivMedija}
                          </div>
                        </div>
                        <div className="articleImageTextContainer">
                          <div className="articleImage">
                            <img className="articleImageElement" src={path + formatPath(article.naziv) + "/" + article.naslovnaSlika} alt="Article element" />
                          </div>
                          <div className="articleTextContainer">
                            <div className="articleMainTitle">{article.naziv}</div>
                            <div className="articleText">{ellipsify(article.tekst)}</div>
                            {article.link ? (
                              <div className="readMoreArticle">
                                Pročitaj više na:
                                <a className="readMoreLink" href={article.link}>
                                  {article.link}
                                </a>
                              </div>
                            ) : (
                              <>
                                <div></div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </FadeInSection>
                ))}
              </>
            )}
          </div>
        </div>
      </div>
      {filterSentArticles(currentRecords).length != 0 ? <Pagination nPages={nPages} currentPage={currentPage} setCurrentPage={setCurrentPage} /> : <></>}
      <GoToTop />
      <Footer />
    </>
  );
}

export default AllArticles;
