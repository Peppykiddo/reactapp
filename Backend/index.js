const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const cron = require('node-cron');

const prisma = new PrismaClient();
app.use(cors());

const userRouter = require("./src/routes/user");
const loginRouter = require("./src/routes/login");

const transporter = nodemailer.createTransport({
  service: 'gmail', // You can use other email services
  auth: {
    user: 'kulkarnistithin@gmail.com', // Your email
    pass: 'gvcj pqam bvnq sldp' // Your email password or app password
  }
});

const formatDataForEmail = (data) => {
  const tableRows = data.map(item => {
    return `
      <tr>
        <td>${new Date(item.Date).toLocaleDateString()}</td>
        <td>${item.Amount}</td>
        <td>${item.URNNumber}</td>
        <td>${item.StatusOfRefunded}</td>
        <td>${new Date(item.RefundedDate).toLocaleDateString()}</td>
        <td>${item.NPNumbers}</td>
        <td>${item.PartyName}</td>
        <td>${item.NameOfWork}</td>
        <td>${item.Remarks}</td>
      </tr>
    `;
  }).join('');

  return `
    <table border="1" cellpadding="5" cellspacing="0" style="border-collapse: collapse; width: 100%;">
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount</th>
          <th>URN Number</th>
          <th>Status Of Refunded</th>
          <th>Refunded Date</th>
          <th>NP Numbers</th>
          <th>Party Name</th>
          <th>Name Of Work</th>
          <th>Remarks</th>
        </tr>
      </thead>
      <tbody>
        ${tableRows}
      </tbody>
    </table>
  `;
};

const sendNotRefundedEmail = async () => {
  try {
    const abstractData = await prisma.emd.findMany();

    // Filter for not refunded data and send email
    const notRefundedData = abstractData.filter(item => item.StatusOfRefunded === "Not Refunded");

    if (notRefundedData.length > 0) {
      const emailBody = formatDataForEmail(notRefundedData);
      const mailOptions = {
        from: 'kulkarnistithin@gmail.com',
        to: 'rashut@gmail.com',
        subject: 'Not Refunded Abstract Data',
        html: `<p>The following entries have not been refunded:</p>${emailBody}`
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email:', error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
    }
  } catch (error) {
    console.error('Error fetching abstract data:', error);
  }
};

// Schedule task to run at 9:00 AM on the first day of every month
cron.schedule('0 9 1 * *', () => {
  console.log('Running scheduled task to send not refunded emails...');
  sendNotRefundedEmail();
});

// Middleware for parsing request bodies
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/login", loginRouter);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
