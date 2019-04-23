// https://stackoverflow.com/questions/40844297/what-is-difference-between-axios-and-fetch
// https://www.thepolyglotdeveloper.com/2015/01/parse-xml-response-nodejs/

const axios = require('axios');
const express = require('express');
const app = express();
var parseString = require('xml2js').parseString;


app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
  res.send('<h1>Hello Express!</h1>');
});

app.get('/pepito', (req, response) => {
  //  res.send('hola')
  let jsonResult;
  let cookie;
  let exportId;
  let requestId;

  const data = {
    "reportUnitUri" : "/reports/Test/First_Report",
    "async" : false,
    "freshData" : true,
    "saveDataSnapshot" : false,
    "outputFormat" : "html",
    "interactive" : true,
    "ignorePagination" : true
  }

  const config = {
    headers: {
      'Content-Type': 'application/json'
    },
    auth: {
      'username': 'jasperadmin',
      'password': 'jasperadmin'
    },
    responseType: 'document',
    withCredentials: true
  }

  // const JRReportExecution = axios.create(config);

  axios.post('http://localhost:8080/jasperserver/rest_v2/reportExecutions', data, config)
    .then((res) => {
      console.log(res);
      console.log('Estatus');
      console.log(res.status);
      console.log('res.data.requestId');
      requestId = res.data.requestId;
      console.log(requestId);
      console.log('res.data.exports');
      console.log(res.data.exports[0]);
      console.log('res.data.exports.id');
      exportId = res.data.exports[0].id
      console.log(exportId);
      console.log('CookiePath')
      cookie = res.headers["set-cookie"][0] 
      console.log(cookie);

      // parseString(res, function (err, result) {
      //   // console.dir(JSON.stringify(result));
      //   jsonResult = JSON.stringify(result);
      //   console.log(JSON.parse(jsonResult));
      // });
    })
    .catch((e) => {
        console.log(e)
    // parseString(e, function (err, result) {
    //   console.log(result)
    //   // console.dir(JSON.stringify(result));
    //   // jsonResult = JSON.stringify(result);
    //   // console.log(JSON.parse(jsonResult));
    // });
    });
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