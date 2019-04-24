// https://stackoverflow.com/questions/40844297/what-is-difference-between-axios-and-fetch
// https://www.thepolyglotdeveloper.com/2015/01/parse-xml-response-nodejs/

require('dotenv').config({ path: '../../.env.jasper-reports' });
const JasperReports = require('../reports/jasper-reports/jasper-reports-generator');
const axios = require('axios');
const express = require('express');
const app = express();
const path = require('path');
let parseString = require('xml2js').parseString;

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!</h1>');
});

app.get('/pepito', (req, response) => {
  
  JasperReports.generateReport('FIRST_REPORT');
  res.sendFile(path.join(__dirname, '../reports/outputs/First_Report.html'))

  // const data = {
  //   "reportUnitUri" : "/reports/Test/First_Report",
  //   "async" : false,
  //   "freshData" : true,
  //   "saveDataSnapshot" : false,
  //   "outputFormat" : "html",
  //   "interactive" : true,
  //   "ignorePagination" : true
  // }

  // const config = {
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },
  //   auth: {
  //     'username': 'jasperadmin',
  //     'password': 'jasperadmin'
  //   },
  //   responseType: 'document',
  //   withCredentials: true
  // }

  // const JRReportExecution = axios.create(config);
});

app.get('/about', (req, res) => {
  res.send('About Page');
});

// /bad - send back json with errorMessage
app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});