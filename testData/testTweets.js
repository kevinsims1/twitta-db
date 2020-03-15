const faker = require("faker");

const fakeTweet = () => ({
    user_id: Math.ceil(Math.floor(Math.random() * 100)),
    tweet: faker.company.catchPhrase()
})


module.exports = fakeTweet