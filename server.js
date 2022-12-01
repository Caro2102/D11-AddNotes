const express = require('express');
const api = require('./routes/api.js');
const html= require('./routes/html.js');

const PORT = process.env.port || 3001;

const app = express();


// Middleware para analizar los datos de JSON y de formularios codificados por url
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(html);
app.use(api);


app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
