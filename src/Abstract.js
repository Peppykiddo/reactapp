import React, { useState, useEffect } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import Page from './Page';
import './Abstract.css';

const Abstract = ({ data }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [filteredData, setFilteredData] = useState([]);
  const [displayFields, setDisplayFields] = useState([]);
  const [selectedFields, setSelectedFields] = useState([]);
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const years = Array.from(new Set(data.map(item => new Date(item.Date).getFullYear())));
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.body.classList.toggle('dark-mode', !isDarkMode);
    document.body.classList.toggle('light-mode', isDarkMode);
  }
  useEffect(() => {
    if (!data) return;

    const searchTerms = searchTerm.split(',').map(term => term.trim().toLowerCase());

    const filtered = data.filter(item => {
      const amount = parseFloat(item.Amount);
      const itemDate = new Date(item.Date);
      const itemYear = itemDate.getFullYear();
      const itemMonth = itemDate.getMonth();

      const matchesYear = selectedYear ? itemYear === parseInt(selectedYear) : true;
      const matchesMonth = selectedMonth ? itemMonth === months.indexOf(selectedMonth) : true;

      const matchesSearch = searchTerms.every(term => {
        if (term.includes(':')) {
          const [field, value] = term.split(':').map(s => s.trim());
          return item[field] && item[field].toString().toLowerCase().includes(value);
        } else {
          return Object.entries(item).some(([key, val]) =>
            key.toLowerCase().includes(term) || val.toString().toLowerCase().includes(term)
          );
        }
      });

      const isInRange = (!minAmount || amount >= parseFloat(minAmount)) && (!maxAmount || amount <= parseFloat(maxAmount));

      return matchesSearch && isInRange && matchesYear && matchesMonth;
    });

    const fieldsToShow = selectedFields.length > 0 ? selectedFields : Object.keys(data[0] || {});

    setDisplayFields(fieldsToShow);
    setFilteredData(filtered);
  }, [searchTerm, minAmount, maxAmount, data, selectedFields, selectedYear, selectedMonth]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleMinAmountChange = (e) => {
    setMinAmount(e.target.value);
  };

  const handleMaxAmountChange = (e) => {
    setMaxAmount(e.target.value);
  };

  const handleFieldChange = (field) => {
    setSelectedFields(prevFields =>
      prevFields.includes(field)
        ? prevFields.filter(f => f !== field)
        : [...prevFields, field]
    );
  };

  const handleYearChange = (e) => {
    setSelectedYear(e.target.value);
  };

  const handleMonthChange = (e) => {
    setSelectedMonth(e.target.value);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const sumAmount = filteredData.reduce((acc, item) => acc + parseFloat(item.Amount), 0);
  const sumRefundedAmount = filteredData.reduce((acc, item) => item.StatusOfRefunded === 'Refunded' ? acc + parseFloat(item.Amount) : acc, 0);
  const sumNotRefundedAmount = filteredData.reduce((acc, item) => item.StatusOfRefunded !== 'Refunded' ? acc + parseFloat(item.Amount) : acc, 0);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="abstract-container">
      <div className="search-container">
        <input
          type="text"
          className="form-control"
          placeholder="Search to filter data... (e.g., date:2023-05-18, type:refund)"
          value={searchTerm}
          onChange={handleSearchChange}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Min Amount"
          value={minAmount}
          onChange={handleMinAmountChange}
        />
        <input
          type="number"
          className="form-control"
          placeholder="Max Amount"
          value={maxAmount}
          onChange={handleMaxAmountChange}
        />
      </div>
      <button onClick={() => setShowAdvancedSearch(!showAdvancedSearch)} className="btn-advanced-search">
        {showAdvancedSearch ? 'Hide Advanced Search' : 'Show Advanced Search'}
      </button>
      {showAdvancedSearch && (
        <div className="advanced-search">
          <div className="fields-selection">
            {Object.keys(data[0] || {}).map(field => (
              <label key={field}>
                <input
                  type="checkbox"
                  checked={selectedFields.includes(field)}
                  onChange={() => handleFieldChange(field)}
                />
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
            ))}
          </div>
          <div className="date-selection">
            <select className="form-control" value={selectedYear} onChange={handleYearChange}>
              <option value="">Select Year</option>
              {years.map(year => (
                <option key={year} value={year}>{year}</option>
              ))}
            </select>
            <select className="form-control" value={selectedMonth} onChange={handleMonthChange}>
              <option value="">Select Month</option>
              {months.map((month, index) => (
                <option key={index} value={month}>{month}</option>
              ))}
            </select>
          </div>
        </div>
      )}
      <div className="table-responsive">
        <table className="table table-bordered table-striped mt-3">
          <thead className="thead-dark">
            <tr>
              {displayFields.map(field => <th key={field}>{field.charAt(0).toUpperCase() + field.slice(1)}</th>)}
            </tr>
          </thead>
          <tbody>
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <tr key={index}>
                  {displayFields.map(field => (
                    <td key={field}>
                      {field === 'StatusOfRefunded' && item[field] === 'Not refunded' ? (
                        <FaExclamationTriangle className="warning-icon" />
                      ) : (
                        item[field]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={displayFields.length}>No matching data found</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Page
        totalItems={filteredData.length}
        itemsPerPage={itemsPerPage}
        currentPage={currentPage}
        onPageChange={handlePageChange}
      />
      <div className="sum-container">
        <div className="sum-box">
          <h4>Total Amount:</h4>
          <p>{sumAmount.toFixed(2)}</p>
        </div>
        <div className="sum-box">
          <h4>Refunded Amount:</h4>
          <p>{sumRefundedAmount.toFixed(2)}</p>
        </div>
        <div className="sum-box">
          <h4>Not Refunded Amount:</h4>
          <p>{sumNotRefundedAmount.toFixed(2)}</p>
        </div>
      </div>
    </div>
  );
};

export default Abstract;
