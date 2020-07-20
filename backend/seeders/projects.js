const faker = require('faker')
const random = require('random')
const { User, Project } = require('../models')

const CATEGORIES = ['game', 'art', 'picture', 'movie', 'tech', 'video', 'fashion']
let count = 0

const init = async () => {
    const findHostUser = await User.findAll({
        where: {
            isHost: true
        }
    })
    findHostUser.forEach(async (userValue) => {
        const user = userValue.dataValues
        const randomValue = random.int(10, 30)
        for (let index = 0; index < randomValue; index++) {
            count++
            await Project.create({
                title: faker.lorem.sentence(),
                category: CATEGORIES[random.int(0, 6)],
                deadLine: faker.date.future(),
                goal: random.int(1000, 100000),
                cover: `https://picsum.photos/200/300?random=${random.int(10, 1000)}`,
                story: faker.lorem.paragraphs(),
                delivery: faker.date.future(),
                userId: user.id
            })
        }
    })
    console.log(`Created ${count} Projects`)
}

init()