require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');

const app = express();
const { errors } = require('celebrate');
const mongoose = require('mongoose');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const corsHandler = require('./middlewares/cors-processing');
const router = require('./routes/index');
const errorsHandler = require('./middlewares/handler-errors');
const rateLimiter = require('./middlewares/rate-limiter');

const { PORT, DB } = process.env;
const { DEF_PORT, DEF_DB } = require('./utils/config');

mongoose.connect(DB || DEF_DB);

app
  .options('*', corsHandler)
  .use(corsHandler)
  .use(express.json())
  .use(helmet())
  .use(requestLogger)
  .use(rateLimiter)
  .use(cookieParser())
  .use('/api', router)
  .use(errorLogger)
  .use(errors())
  .use(errorsHandler)
  .listen(PORT || DEF_PORT, () => {
    console.log(`App listening on port ${PORT || DEF_PORT}`);
  });
