import React from "react";
import "./../css/Pagination.scss";

const Pagination = ({ nPages, currentPage, setCurrentPage }) => {
  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);
  function goToTop() {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  const nextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
    goToTop();
  };
  const prevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
    goToTop();
  };

  return (
    <div className="pagination-outer">
      <ul className="pagination">
        <li className="page-item">
          <a className="page-link" onClick={prevPage}>
            <span aria-hidden="true">«</span>
          </a>
        </li>
        {pageNumbers.map((pgNumber) => (
          <li key={pgNumber} className={`page-item ${currentPage == pgNumber ? "active" : ""} `}>
            <a onClick={() => setCurrentPage(pgNumber)} className="page-link">
              {pgNumber}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" onClick={nextPage}>
            <span aria-hidden="true">»</span>
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
