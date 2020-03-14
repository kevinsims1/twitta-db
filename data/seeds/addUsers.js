const createFakeUsers = require('../../testData/testUsers.js')
exports.seed = async function(knex) {
  //Users 
  const fakeUsers = [];
  const desiredFakeUsers = 100;
  for(let i = 0; i < desiredFakeUsers; i++){
    fakeUsers.push(createFakeUsers())
  }
      await knex('user').insert(fakeUsers);
};
