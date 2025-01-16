const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const PORT = 8080;

//Mongodb URI
const mongodb_connection_string = 'mongodb://localhost:27017/Gallery';

//Middlewares
app.use(cors());
app.use(bodyParser.json());

//mongodb connection
mongoose
  .connect(mongodb_connection_string , { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Database connected");
  })
  .catch((error) => {
    console.error(error);
  });

//start the server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
