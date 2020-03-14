const faker = require("faker");

const fakeUser = () => ({
    user_name: faker.internet.userName(),
    name: faker.name.findName(),
    bio: faker.company.catchPhrase(),
    password: faker.internet.password()
})


module.exports = fakeUser