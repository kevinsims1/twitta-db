const db = require('../data/dbConfig.js');

module.exports = {
    getUsers,
    add
}

function getUsers(){
    return db('user')
}

async function add(user) {
    const [id] = await db('user').insert(user, 'id')

    return findById(id)
}

function findById(id){
    return db('user').where({id}).first()
}