//Backend Server
require('dotenv').config()

const server = require('./server.js')

const PORT = process.env.PORT || 3000;

server.listen(PORT, () => {
    console.log(`App is up and running. Listening on port ${PORT}`);
  });