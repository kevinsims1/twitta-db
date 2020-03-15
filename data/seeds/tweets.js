const createFakeTweets = require('../../testData/testTweets.js')
exports.seed = async function(knex) {
  //Users 
  const fakeTweets = [];
  const desiredFakeTweets = 100;
  for(let i = 0; i < desiredFakeTweets; i++){
    fakeTweets.push(createFakeTweets())
  }
      await knex('tweet').insert(fakeTweets);
};
