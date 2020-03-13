const express = require('express');
const bcrypt = require('bcryptjs');

const usersModel = require('./user-model.js');
const genToken = require('../auth/token.js').genToken

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const users = await usersModel.getUsers()
        res.json(users)
    } catch (err) {
        res.status(500).json({
            message: 'Failed to get users'
        })
    }
})

router.post('/register', async (req, res) => {
    let user = req.body;
    const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
    user.password = hash;

    usersModel.register(user).then(user => {
        res.status(201).json(user)
    })
        .catch(err => {
            res.status(500).json(err)
        })
})

router.post('/login', (req, res) => {
    let { user_name, password } = req.body
    console.log({user_name, password})

    usersModel.findBy({ user_name })
        .first()
        .then(user => {
            if (user && bcrypt.compareSync(password, user.password)) {
                const token = genToken(user)

                res.status(200).json({
                    message: `Welcome ${user.user_name}!`,
                    token,
                    user
                });
            } else {
                res.status(401).json({ message: 'Invalid Credentials' });
            }
        })
        .catch(err => {
            res.status(500).json({message: 'check login',err})
        })
})

module.exports = router;