const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const relationshipModel = require('./relationship-model.js');
const genToken = require('../auth/token.js').genToken

const router = express.Router();




router.post('/add', (req, res) => {
    let relationship = req.body;

    relationshipModel.addRelationship(relationship)
    .then(relationship => {
        res.status(201).json(relationship)
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err)
    })
})

module.exports = router