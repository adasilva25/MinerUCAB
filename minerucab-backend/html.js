const path = require('path');
const fs = require('fs');

fs.writeFile(__dirname + '/reports/outputs/message.html', '<h1>Hola</h1>', (err) => {
  if (err) throw err;
  console.log('The file has been saved!');
  console.log(__dirname)
});