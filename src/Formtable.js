import React, { useState } from 'react';
import axios from 'axios';
import './Formtable.css';
import FormDataResult from './FormDataResult'; // Import the FormDataResult component
import Navbar from './Navbar';


const Formtable = () => {
  
  const [formData, setFormData] = useState({
    fromDate: '',
    toDate: '',
    place: '',
    material: '',
    supplier: '',
    transporter: ''
  });
  const [submittedData, setSubmittedData] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const formattedData = {
        ...formData,
        fromDate: new Date(formData.fromDate).toISOString(),
        toDate: new Date(formData.toDate).toISOString()
      };
      const response = await axios.post('http://localhost:3000/user/postData', formattedData); // Corrected API endpoint URL
      console.log('Response:', response.data);
      setSubmittedData(formattedData);
      setShowResult(true);
      setFormData({
        fromDate: '',
        toDate: '',
        place: '',
        material: '',
        supplier: '',
        transporter: ''
      });
    } catch (error) {
      console.error('Error:', error.response ? error.response.data : error.message);
      setError(error.response ? error.response.data : error.message); // Set error message
    }
  };

  return (
   <div>
  <Navbar />
    <div className="container">
      <form onSubmit={handleSubmit}>
        <table className="table">
          <tbody>
            <tr>
              <td>
                <div className="form-group">
                  <label>From-date:</label>
                  <input
                    type="date"
                    name="fromDate"
                    value={formData.fromDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label>To-date:</label>
                  <input
                    type="date"
                    name="toDate"
                    value={formData.toDate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <div className="form-group">
                  <label>Place:</label>
                  <input
                    type="text"
                    name="place"
                    value={formData.place}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label>Material:</label>
                  <input
                    type="text"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <table className="table">
          <tbody>
            <tr>
              <td>
                <div className="form-group">
                  <label>Supplier:</label>
                  <input
                    type="text"
                    name="supplier"
                    value={formData.supplier}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </td>
              <td>
                <div className="form-group">
                  <label>Transporter:</label>
                  <input
                    type="text"
                    name="transporter"
                    value={formData.transporter}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>

        <button type="submit" className="btn btn-primary">Submit</button>
      </form>

      {/* Display error message */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Display FormDataResult component if showResult is true */}
      {showResult && submittedData && (
        <FormDataResult formDataList={[submittedData]} />
      )}
    </div>
    </div> 
  );
};

export default Formtable;
