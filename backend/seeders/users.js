const faker = require('faker')
const random = require('random')
const { User } = require('../models')

const NUM = parseInt(process.argv[2])

const randomBoolean = () => {
    const bool = random.int(0, 1)
    return bool ? true : false
}

const init = async () => {
    for (let idx = 0; idx < NUM; idx++) {
        await User.create({
            email: faker.internet.email(),
            password: '1234',
            name: faker.name.findName(),
            isHost: randomBoolean(),
            bio: faker.lorem.sentences(),
            profileImage: `https://picsum.photos/200/300?random=${idx}`,
            loginMethod: 'email'
        })
    }
    console.log(`Created ${NUM} Users`)
}


init()