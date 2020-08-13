const faker = require('faker')
const random = require('random')
const { FgRed, FgCyan } = require('./color')
const { Collection, sequelize } = require('../models')

const createCollections = async (number) => {
    await Collection.create({
        title: '주목할 만한 프로젝트',
        type: 'spotlight',
        cover: `https://picsum.photos/200/300?random=${random.int(1000, 1005)}`,
        description: faker.lorem.sentence()
    })
    for (let index = 0; index < number; index++) {
        await Collection.create({
            title: faker.lorem.sentence(),
            type: faker.lorem.word(),
            cover: `https://picsum.photos/200/300?random=${random.int(1, 1000)}`,
            description: faker.lorem.sentence()
        })
    }
    await sequelize.close();
    console.log(FgCyan, `Created ${number} Collections`)
}


module.exports = createCollections