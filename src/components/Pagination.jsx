import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';

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
      <nav>
        <ul className="pagination justify-content-center mt-3">
          <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>
              <FaChevronLeft />
            </button>
          </li>
  
          {renderPageNumbers().map((page, index) => (
            <li key={index} className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}>
              <button className="page-link" onClick={() => typeof page === "number" && onPageChange(page)} disabled={page === "..."}>
                {page}
              </button>
            </li>
          ))}
  
          <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
            <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>
              <FaChevronRight />
            </button>
          </li>
        </ul>
      </nav>
    );
}

export default Pagination;