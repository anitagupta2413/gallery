const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/auth/index');
const dotenv = require('dotenv');


const app = express();
const PORT = 5000;

//Middlewares
app.use(cors());
app.use(bodyParser.json());
dotenv.config();

//routes
app.use('/api/auth', userRouter);

//mongodb connection
mongoose
  .connect(process.env.MONGODB_CONNECTION_STRING , { useNewUrlParser: true, useUnifiedTopology: true })
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
