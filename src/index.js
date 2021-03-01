const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const PORT = 5000;

app.use(bodyParser.json()); // Reconhecer requisição em JSON
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/authController')(app);
require('./app/controllers/projectController')(app);

app.listen(PORT, () => {
  console.log('Servidor online...');
});
