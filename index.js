const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const logger = require('morgan');
const mongoose = require('mongoose')
require('dotenv').config()
const {_404Handler, errorHandler} = require('./middlewares/errorHandler')

mongoose
  .connect(process.env.MONGO_CONNECTION, {
      useNewUrlParser: true,
      // useCreateIndex: true,
      useUnifiedTopology: true
  })
  .catch(err => console.log(err))
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const corsOptions = {
  origin: '*',
  allowedHeaders: ['Content-Type', 'Authorization', 'Content-Length', 'X-Requested-With', 'Accept'],
  methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};
app.use(cors(corsOptions));

var accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(logger('combined', { stream: accessLogStream }));
app.use(logger('dev'));

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));
app.use(cookieParser());

app.use(require('./routes'))
app.use(errorHandler)
app.use('*', _404Handler)


const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`)
  console.log(`[TBS] :::: ${new Date()}`)
})