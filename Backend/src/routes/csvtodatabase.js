const fs = require('fs');
const csv = require('csv-parser');
const mysql = require('mysql');

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'your_mysql_username',
  password: 'your_mysql_password',
  database: 'your_database_name',
});

// Function to execute MySQL queries
function executeQuery(sql, values) {
  return new Promise((resolve, reject) => {
    pool.query(sql, values, (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
}

// Read data from CSV file and insert into EMD database
fs.createReadStream('path/to/your/csv/file.csv')
  .pipe(csv())
  .on('data', async (row) => {
    try {
      // Map CSV data to EMD data structure
      const emdData = {
        Date: row.Date,
        VchType: row.VchType,
        Amount: parseFloat(row.Amount),
        Type: row.Type,
        URNNumber: row.URNNumber,
        StatusOfRefunded: row.StatusOfRefunded,
        RefundedDate: row.RefundedDate,
        NPNumbers: row.NPNumbers,
        PartyName: row.PartyName,
        NameOfWork: row.NameOfWork,
        Section: row.Section,
        Remarks: row.Remarks
      };

      // Insert data into EMD database
      const sql = `
        INSERT INTO emd_table (Date, VchType, Amount, Type, URNNumber, StatusOfRefunded, RefundedDate, NPNumbers, PartyName, NameOfWork, Section, Remarks)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const values = [
        emdData.Date,
        emdData.VchType,
        emdData.Amount,
        emdData.Type,
        emdData.URNNumber,
        emdData.StatusOfRefunded,
        emdData.RefundedDate,
        emdData.NPNumbers,
        emdData.PartyName,
        emdData.NameOfWork,
        emdData.Section,
        emdData.Remarks
      ];

      await executeQuery(sql, values);
      console.log('Data inserted successfully:', emdData);
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  })
  .on('end', () => {
    console.log('CSV file successfully processed');
  });
