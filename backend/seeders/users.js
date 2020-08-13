const faker = require('faker')
const random = require('random')
const { FgRed, FgCyan } = require('./color')
const { User, sequelize } = require('../models')


const randomBoolean = () => {
    const bool = random.int(0, 1)
    return bool ? true : false
}

const createUsers = async (number) => {
    for (let idx = 0; idx < number; idx++) {
        try {
            await User.create({
                email: faker.internet.email(),
                password: '1234',
                name: faker.name.findName(),
                isHost: randomBoolean(),
                bio: faker.lorem.sentences(),
                profileImage: `https://picsum.photos/200/300?random=${idx}`,
                loginMethod: 'email'
            })
        } catch (error) {
            console.log(FgRed, 'failed created user')
        }
    }
    await sequelize.close()
    console.log(FgCyan, `Created ${number} Users`)
}

module.exports = createUsers