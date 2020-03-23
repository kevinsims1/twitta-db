const faker = require("faker");

const fakeUser = () => ({
    user_name: faker.internet.userName(),
    name: faker.name.findName(),
    bio: faker.company.catchPhrase(),
    avi: faker.image.avatar(),
    password: faker.internet.password()
})


module.exports = fakeUser