const cors = require('cors');
const allowedCors = require('../utils/allowedCors');

const corsOptions = {
  origin: allowedCors,
  credentials: true,
};

module.exports = cors(corsOptions);
