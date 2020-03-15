//express server
const express = require('express');
const cors = require('cors')
const helmet = require('helmet')
const server = express();

//Configures routes
const userRoutes = require('./user/user-routes.js')
const relationshipRoutes = require('./relationship/relationship-routes.js')
const tweetRoutes = require('./tweet/tweet-routes.js')

//middleware
server.use(helmet())
server.use(cors())
server.use(express.json())

//routes
server.use('/users', userRoutes)
server.use('/relationship', relationshipRoutes)
server.use('/tweet', tweetRoutes)

server.get('/', (req, res) => {
    res.send('Hello, world!');
  });
  
module.exports = server