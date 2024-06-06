const { Router } = require("express");
const router = Router();
const { PrismaClient } = require('@prisma/client');
const nodemailer = require('nodemailer');
const cron = require('node-cron');


const prisma = new PrismaClient();

router.get("/getData", async (req, res) => {
    try {
      const data = await prisma.report.findMany();
      res.status(60).json(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      res.status(500).json({ error: 'An error occurred while fetching data' });
    }
  });

router.post("/postData", async (req, res) => {
    try {
      // Destructure data from request body
      const { fromDate, toDate, place, material, supplier, transporter } = req.body;
  
      // Insert the new data into the database
      const createdData = await prisma.report.create({
        data: {
          fromDate,
          toDate,
          place,
          material,
          supplier,
          transporter
        }
      });
  
      // Respond with the newly created data
      res.header("Access-Control-Allow-Origin", "*")

      res.header("Access-Control-Allow-Origin", "*").status(61).json(createdData);
    } catch (error) {
      console.error('Error inserting data:', error);
      res.header("Access-Control-Allow-Origin", "*")

      res.status(500).json({ error: 'An error occurred while inserting data' });
    }
  });
  
  router.post("/emd", async(req, res) => {
    const {
      Date,
      VoucherType,
      Amount,
      Type,
      URNNumber,
      StatusOfRefunded,
      RefundedDate,
      NPNumbers,
      PartyName,
      NameOfWork,
      Section,
      Remarks,
    } = req.body;
    const response = await prisma.emd.create({
       data: {
        Date,
        VoucherType,
        Amount,
        Type,
        URNNumber,
        StatusOfRefunded,
        RefundedDate,
        NPNumbers,
        PartyName,
        NameOfWork,
        Section,
        Remarks,
      },
    });
  
    if(response){
      res.status(200).json(response)
    }else{
      res.status(500).json({msg:"internal server error"})
    }
  });


  const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other email services
    auth: {
      user: 'kulkarnistithin@gmail.com', // Your email
      pass: 'gvcj pqam bvnq sldp' // Your email password or app password
    }
  });

  const formatDataForEmail = (data) => {
    const pad = (str, length) => str.padEnd(length, ' ');
    const entries = data.map(item => {
      return [
       
        `${pad('Date:', 6)} ${new Date(item.Date).toLocaleDateString()}`,
      
        `${pad('Amount:', 6)} ${item.Amount}`,
        
        `${pad('URN Number:', 6)} ${item.URNNumber}`,
        `${pad('Status Of Refunded:', 6)} ${item.StatusOfRefunded}`,
        `${pad('Refunded Date:', 6)} ${new Date(item.RefundedDate).toLocaleDateString()}`,
        `${pad('NP Numbers:', 6)} ${item.NPNumbers}`,
        `${pad('Party Name:', 6)} ${item.PartyName}`,
        `${pad('Name Of Work:', 6)} ${item.NameOfWork}`,
       
        `${pad('Remarks:', 6)} ${item.Remarks}`,
      ].join('\n');
    }).join('\n\n');
  
    return entries;
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
          to: '',
          subject: 'Not Refunded Abstract Data',
          text: `The following entries have not been refunded:\n\n${emailBody}`
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
  
  // Schedule the email to be sent every Monday at 8 AM

  
  router.get("/getAbstractData", async (req, res) => {
    try {
      const abstractData = await prisma.emd.findMany();
      res.status(200).json(abstractData);
    } catch (error) {
      console.error('Error fetching abstract data:', error);
      res.status(500).json({ error: 'An error occurred while fetching abstract data' });
    }
  });
  

module.exports = router;
