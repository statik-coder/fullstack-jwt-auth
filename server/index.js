//Setup dotenv
require('dotenv').config();

const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const router = require('./router/index');
const errorMiddleware = require('./middlewares/error-middleware');

//Set port
const PORT = process.env.PORT || 5000;

//Create app
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use('/api', router);
app.use(errorMiddleware);

//Create start fn
const start = async () => {
  try {
    await mongoose.connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () => console.log(`Server started on ${PORT} port`));
  } catch (error) {
    console.log(error);
  }
};

//Start server
start();
