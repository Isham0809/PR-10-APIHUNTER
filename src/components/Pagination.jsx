import React from 'react'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

function Pagination({ currentPage, totalPosts, postsPerPage, onPageChange }) {
    const totalPages = Math.ceil(totalPosts / postsPerPage);
  
    const renderPageNumbers = () => {
      const pages = [];
      const showEllipsis = totalPages > 7;
  
      if (showEllipsis) {
        if (currentPage <= 4) {
          for (let i = 1; i <= 5; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        } else if (currentPage >= totalPages - 3) {
          pages.push(1);
          pages.push("...");
          for (let i = totalPages - 4; i <= totalPages; i++) {
            pages.push(i);
          }
        } else {
          pages.push(1);
          pages.push("...");
          for (let i = currentPage - 1; i <= currentPage + 1; i++) {
            pages.push(i);
          }
          pages.push("...");
          pages.push(totalPages);
        }
      } else {
        for (let i = 1; i <= totalPages; i++) {
          pages.push(i);
        }
      }
      return pages;
    };
  
    return (
      <div className="pagination">
        <button
          className="pagination-button"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <FaChevronLeft />
        </button>
  
        {renderPageNumbers().map((page, index) => (
          <button
            key={index}
            className={`pagination-button inline-block ${
              page === currentPage ? "active" : ""
            } ${page === "..." ? "ellipsis" : ""}`}
            onClick={() => typeof page === "number" && onPageChange(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}
  
        <button
          className="pagination-button inline-block"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <FaChevronRight />
        </button>
      </div>
    );
  }
export default Pagination
