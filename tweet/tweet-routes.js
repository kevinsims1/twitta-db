const express = require('express');
const bcrypt = require('bcryptjs');

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
    let tweet = req.body;
    // const user = await db('user').where({id: tweet.user_id}).first()
    // usersModel.updateUser({id, tweets})
    tweetModel.makeTweet(tweet).then(tweet => {
        res.status(201).json(tweet)
    })
        .catch(err => {
            res.status(500).json(err)
        })
})

module.exports = router;