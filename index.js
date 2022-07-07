const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const fs = require('fs')
const path = require('path')
const cors = require('cors')
const logger = require('morgan');
require('dotenv').config()

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

app.get('/', (req, res) => res.send('ok'))
// const { _404handler, errorMaster } = require('./middlewares/errorHandler')
// const router = require('./routers')

// app.use(router)

// app.use('*', _404handler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`server is running at port ${PORT}`)
  console.log(`[TBS] :::: ${new Date()}`)
})