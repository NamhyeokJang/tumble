const faker = require('faker')
const random = require('random')
const { FgRed, FgCyan } = require('./color')
const { User, Project, Collection, sequelize } = require('../models')

const CATEGORIES = ['game', 'art', 'picture', 'movie', 'tech', 'video', 'fashion']
let count = 0

const createProjects = async () => {
    const hostUsers = await User.findAll({
        where: {
            isHost: true
        },
        raw: true,
    })

    const create = await hostUsers.map(async user => {
        const collectionId = await Collection.findOne({
            where: {
                id: random.int(1, 25)
            }
        }).then(collection => collection ? collection.id : null)

        if (collectionId) {
            for (let index = 0; index < random.int(1, 3); index++) {
                count++
                await Project.create({
                    title: faker.lorem.sentence(),
                    category: CATEGORIES[random.int(0, 6)],
                    deadLine: faker.date.future(),
                    goal: random.int(1000, 100000),
                    cover: `https://picsum.photos/200/300?random=${random.int(10, 1000)}`,
                    description: faker.lorem.sentence(),
                    story: faker.lorem.paragraphs(),
                    delivery: faker.date.future(),
                    userId: user.id,
                    collectionId: collectionId
                })
            }
        } else {
            for (let index = 0; index < random.int(4, 15); index++) {
                count++
                await Project.create({
                    title: faker.lorem.sentence(),
                    category: CATEGORIES[random.int(0, 6)],
                    deadLine: faker.date.future(),
                    goal: random.int(1000, 100000),
                    cover: `https://picsum.photos/200/300?random=${random.int(10, 1000)}`,
                    description: faker.lorem.sentence(),
                    story: faker.lorem.paragraphs(),
                    delivery: faker.date.future(),
                    userId: user.id,
                })
            }
        }
    })
    Promise.all(create).then(() => {
        sequelize.close()
        console.log(FgCyan, `Created ${count} projects`)
    })
}

module.exports = createProjects