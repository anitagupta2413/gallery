const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/auth/index');
const imageRouter = require('./routes/imageUpload/index')
const dotenv = require('dotenv');
const cookieParser = require('cookie-parser');
const multer = require('multer');
const awsSdk = require('aws-sdk');

dotenv.config();
const app = express();
const PORT = 5000;

//Middlewares
app.use(cors(
  {
    origin: "http://localhost:3000", // Example: "http://localhost:3000"
    credentials: true, // Allows cookies
  }
));
app.use(bodyParser.json());
app.use(cookieParser());

//routes
app.use('/api/auth', userRouter);
app.use('/api/image' , imageRouter);

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
