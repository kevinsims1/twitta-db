const db = require('../../data/dbConfig.js');


module.exports = {
    addRelationship,
    findRelationshipById
}

async function addRelationship(relationship) {
    const followed = await db('user').where({user_name: relationship.followed}).first()
    const follower = await db('user').where({user_name: relationship.follower}).first()
    const [id] = await db('relationship').insert({
        followed: followed.id,
        follower: follower.id
    })
    return findRelationshipById(id)
}

function findRelationshipById(id){
    return db('relationship').where({id}).first()
}