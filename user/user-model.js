const db = require('../data/dbConfig.js');

module.exports = {
    getUsers,
    register,
    findById,
    findBy,
    updateUser
}

function getUsers(){
    return db('user')
}

async function register(user) {
    const [id] = await db('user').insert(user, 'id')

    return findById(id)
}

function findById(id){
    return db('user').where({id}).first()
}

function findBy(filter){
    return db('user').where(filter)
}

function updateUser(id, changes) {
    return db('user')
        .where({id})
        .update(changes)
}