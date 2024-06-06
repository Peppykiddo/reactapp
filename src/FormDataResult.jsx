import React from 'react';
import './DataResult.css'
const FormDataResult = ({ formDataList }) => {
  return (
    
    <div className="form-data-container">
      <h1>Submitted Form Result Table</h1>
      <div className="form-data-table">
        <table>
          <thead>
            <tr>
              <th>From Date</th>
              <th>To Date</th>
              <th>Transporter</th>
            </tr>
          </thead>
          <tbody>
            {formDataList.map((formData, index) => (
              <tr key={index}>
                <td>{formData.fromDate}</td>
                <td>{formData.toDate}</td>
                <td>{formData.transporter}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="form-data-table">
        <table>
          <thead>
            <tr>
              <th>Place</th>
              <th>Supplier</th>
              <th>Material</th>
            </tr>
          </thead>
          <tbody>
            {formDataList.map((formData, index) => (
              <tr key={index}>
                <td>{formData.place}</td>
                <td>{formData.supplier}</td>
                <td>{formData.material}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormDataResult;
