import React, { useState } from 'react';
import axios from 'axios';
import './EMD.css'; // Import your custom CSS file for styling
import Navbar from './Navbar';
import Abstract from './Abstract';

const EMD = () => {
  const fields = [
    "Date", "VoucherType", "Amount", "Type", "URNNumber", "StatusOfRefunded",
    "RefundedDate", "NPNumbers", "PartyName", "NameOfWork", "Section", "Remarks"
  ];

  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [data, setData] = useState({});
  const [error, setError] = useState('');
  const [showAbstract, setShowAbstract] = useState(false);
  const [abstractData, setAbstractData] = useState('');
  const [submitted, setSubmitted] = useState(false); // Track if data has been submitted

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === 'Amount' ? parseFloat(value) : value;

    setData({
      ...data,
      [name]: parsedValue
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!data.Date || !data.RefundedDate) {
      setError('Date fields are required');
      return;
    }

    let formattedData = { ...data };

    if (data.Date) {
      const date = new Date(data.Date);
      if (isNaN(date.getTime())) {
        setError('Invalid Date');
        return;
      }
      formattedData.Date = date.toISOString();
    }

    if (data.RefundedDate) {
      const refundedDate = new Date(data.RefundedDate);
      if (isNaN(refundedDate.getTime())) {
        setError('Invalid Refunded Date');
        return;
      }
      formattedData.RefundedDate = refundedDate.toISOString();
    }

    console.log('Submitting form with data:', formattedData);
    setError('');

    try {
      const response = await axios.post('http://localhost:3000/user/emd', formattedData);
      console.log('Response:', response.data);
      // alert('Data submitted successfully');
      setData({});
      setCurrentFieldIndex(0);
      setSubmitted(true); // Set submitted to true after successful submission
      handleViewAbstract(); // Automatically fetch abstract data after form submission
    } catch (error) {
      console.error('Error submitting EMD data:', error);
      setError(error.response ? error.response.data.message : error.message);
    }
  };

  const handleNext = () => {
    if (currentFieldIndex < fields.length - 1) {
      setCurrentFieldIndex(currentFieldIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentFieldIndex > 0) {
      setCurrentFieldIndex(currentFieldIndex - 1);
    }
  };

  const handleViewAbstract = async () => {
    try {
      const result = await axios.get('http://localhost:3000/user/getAbstractData');
      console.log("result = "+result.data)
      setAbstractData(result.data);
      setShowAbstract(true);
    } catch (error) {
      console.error('Error fetching abstract data:', error);
      setError('Error fetching abstract data');

    }
  };

  return (  
    <div className="emd-container">
      <Navbar />
      <div className="emd-content">
        
        <form onSubmit={handleSubmit} className="emd-form">
          <div className="card">
            <div className="card-body">
              <div className="form-group">
                <label>{fields[currentFieldIndex]}</label>
                <input
                  type={fields[currentFieldIndex] === 'Date' || fields[currentFieldIndex] === 'RefundedDate' ? 'date' : 'text'}
                  name={fields[currentFieldIndex]}
                  value={data[fields[currentFieldIndex]] || ''}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>
            <div className="card-footer">
              <div className="row">
                <div className="col">
                  {currentFieldIndex > 0 && (
                    <button type="button" onClick={handlePrevious} className="btn btn-secondary">
                      Previous
                    </button>
                  )}
                </div>
                <div className="col text-right">
                  {currentFieldIndex < fields.length - 1 && (
                    <button type="button" onClick={handleNext} className="btn btn-primary">
                      Next
                    </button>
                  )}
                  {currentFieldIndex === fields.length - 1 && (
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </form>
        {submitted && (
          <div className="alert alert-success mt-3" role="alert">
            Data submitted successfully!
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
        <button onClick={handleViewAbstract} className="btn btn-info mt-3">
          View Abstract
        </button>
      </div>
      {showAbstract && <Abstract data={abstractData} />}
    </div>
  );
}

export default EMD;