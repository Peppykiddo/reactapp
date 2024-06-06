import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const Page = ({ totalItems, itemsPerPage, currentPage, onPageChange }) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleClick = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  const renderPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(
        <button
          key={i}
          className={`page-item ${i === currentPage ? 'active' : ''}`}
          onClick={() => handleClick(i)}
        >
          {i}
        </button>
      );
    }
    return pages;
  };

  return (
    <div className="pagination">
      <button onClick={() => handleClick(currentPage - 1)} disabled={currentPage === 1} className="page-nav">
        <FaAngleLeft />
      </button>
      {renderPageNumbers()}
      <button onClick={() => handleClick(currentPage + 1)} disabled={currentPage === totalPages} className="page-nav">
        <FaAngleRight />
      </button>
    </div>
  );
};

export default Page;
