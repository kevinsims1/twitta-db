const db = require('../data/dbConfig.js');
const usersModel = require('../user/user-model')

module.exports = {
    getTweets,
    makeTweet,
    findById,
    findBy
}

async function getTweets(){
    const tweets = await db('tweet')
    console.log('tweets:', tweets)
    const usersPromises = tweets.map(async (tweet) => {
        const user = await usersModel.findById(tweet.user_id)
        // console.log(user)
        return user
    })
    const users = await Promise.all(usersPromises)

    const response = {
        tweets,
        users
    }

    return response
}

async function makeTweet(tweet) {
    const [id] = await db('tweet').insert(tweet, 'id')

    return findById(id)
}

function findById(id){
    return db('tweet').where({id}).first()
}

function findBy(filter){
    return db('tweet').where(filter)
}