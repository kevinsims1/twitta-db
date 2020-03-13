//express server
const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const server = express();

//Configures routes
const userRoutes = require('./user/user-routes.js')

//middleware
server.use(helmet())
server.use(cors())
server.use(express.json())

//TODO: After schemas create routes
server.use('/users', userRoutes)

server.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  
module.exports = server