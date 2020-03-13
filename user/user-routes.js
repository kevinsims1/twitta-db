const express = require('express');

const usersModel = require('./user-model.js');

const router = express.Router();

router.get('/all', async (req,res) => {
    try{
        const users = await usersModel.getUsers()
        res.json(users)
    } catch(err){
        res.status(500).json({
            message: 'Failed to get users'
        })
    }
})

router.post('/create', async (req,res) => {
    let user = req.body;

    usersModel.add(user).then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json(err)
    })
})

module.exports = router;