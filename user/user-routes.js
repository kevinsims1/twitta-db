const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

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

router.post('/register', (req, res) => {
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
            res.status(500).json({ message: 'check login', err })
        })
})

router.post('/update', (req, res) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(
            token,
            require('../auth/secret.js').jwtSecret,
            (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ message: 'invalid token' });
                } else {
                    const current = decodedToken;
                    const id = current.subject
                    console.log(id)
                    usersModel.updateUser(id, req.body)
                        .then(count => {
                            console.log(count)
                            res.status(200).json({ count })
                        })
                        .catch(err => res.status(500).json(err))
                }
            }
        );
    } else {
        res.status(401).json({ message: 'no token provided' });
    }

})

router.get('/current', (req, res) => {
    const token = req.headers.authorization
    if (token) {
        jwt.verify(
            token,
            require('../auth/secret.js').jwtSecret,
            (err, decodedToken) => {
                if (err) {
                    res.status(401).json({ message: 'invalid token' });
                } else {
                    const current = decodedToken;
                    const id = current.subject
                    console.log(id)
                    usersModel.findById(id)
                        .then(user => {
                            res.status(200).json({
                                user: user
                            })
                        })
                        .catch(err => {
                            res.status(500).json({
                                err
                            })
                        })
                }
            }
        );
    } else {
        res.status(401).json({ message: 'no token provided' });
    }

})
module.exports = router;