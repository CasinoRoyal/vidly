import React from 'react';

const Pagination = ({ itemTotal, pageSize, currentPage, onPageChange }) => {
  const arr = [];
  const pagesCount = Math.ceil(itemTotal / pageSize);

  if (pagesCount === 1) return null;

  for (let i = 1; i <= pagesCount; i++) {
    arr.push(i)
  }

  return (
    <nav className="page">
      <ul className="pagination">
        {
          arr.map((page) => {
            return (
              <li key={page} 
                  className={`page-item ${currentPage === page ? 'active' : ''}`}>
                <a className="page-link" onClick={() => onPageChange(page)}>
                  {page}
                </a>
              </li>
            )
          })
        }
      </ul>
    </nav>
  )
}

export default Pagination;