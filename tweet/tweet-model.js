const db = require('../data/dbConfig.js');

module.exports = {
    getTweets,
    makeTweet,
    findById,
    findBy
}

function getTweets(){
    return db('tweet')
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