const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')

const tweetModel = require('./tweet-model.js');
const usersModel = require('../user/user-model.js');

const router = express.Router();

router.get('/all', async (req, res) => {
    try {
        const tweets = await tweetModel.getTweets()
        res.json(tweets)
    } catch (err) {
        res.status(500).json({
            message: 'Failed to get tweets'
        })
    }
})

router.post('/create', (req, res) => {
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
                    console.log("tweet", req.body)
                    req.body.user_id = id
                    let tweet = req.body;
                    console.log("tweet", tweet)

                    tweetModel.makeTweet(tweet).then(tweet => {
                        res.status(201).json(tweet)
                    })
                        .catch(err => {
                            res.status(500).json(err)
                        })
                }
            }
        );
    } else {
        res.status(401).json({ message: 'no token provided' });
    }
})

module.exports = router;