import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, pageSize, onPageSizeChange }) => {
  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      const leftBound = Math.max(currentPage - 1, 1);
      const rightBound = Math.min(currentPage + 1, totalPages);

      if (leftBound > 1) pageNumbers.push(1, '...');
      for (let i = leftBound; i <= rightBound; i++) {
        pageNumbers.push(i);
      }
      if (rightBound < totalPages) pageNumbers.push('...', totalPages);
    }

    return pageNumbers;
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 my-8">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-gray-700">Show</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="border rounded-md px-2 py-1 text-sm"
        >
          {[5, 10, 20, 50].map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-700">entries</span>
      </div>
      <div className="flex items-center space-x-2">
        <button
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
          className="hidden sm:block p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="First Page"
        >
          <ChevronsLeft size={20} />
        </button>
        <button
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Previous Page"
        >
          <ChevronLeft size={20} />
        </button>
        <div className="hidden sm:flex space-x-2">
          {getPageNumbers().map((page, index) => (
            <button
              key={index}
              onClick={() => typeof page === 'number' && onPageChange(page)}
              className={`px-4 py-2 rounded-md transition-colors duration-200 ${
                currentPage === page
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              } ${typeof page !== 'number' ? 'cursor-default' : ''}`}
              disabled={typeof page !== 'number'}
            >
              {page}
            </button>
          ))}
        </div>
        <div className="sm:hidden">
          <span className="px-4 py-2 rounded-md bg-gray-200 text-gray-700">
            {currentPage} / {totalPages}
          </span>
        </div>
        <button
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Next Page"
        >
          <ChevronRight size={20} />
        </button>
        <button
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
          className="hidden sm:block p-2 rounded-md bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          aria-label="Last Page"
        >
          <ChevronsRight size={20} />
        </button>
      </div>
    </nav>
  );
};

const App = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const totalItems = 100;
  const totalPages = Math.ceil(totalItems / pageSize);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const newData = Array.from({ length: pageSize }, (_, index) => ({
        id: (currentPage - 1) * pageSize + index + 1,
        name: `Item ${(currentPage - 1) * pageSize + index + 1}`,
        description: `Description for item ${(currentPage - 1) * pageSize + index + 1}`,
      }));
      setData(newData);
      setLoading(false);
    }, 500);
  }, [currentPage, pageSize]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handlePageSizeChange = (newSize) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Interactive Pagination Demo</h1>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {data.map((item) => (
            <div key={item.id} className="bg-white p-4 rounded-lg shadow-md transition-transform duration-200 hover:scale-105">
              <h2 className="text-xl font-semibold mb-2">{item.name}</h2>
              <p className="text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
      />
    </div>
  );
};

export default App;
