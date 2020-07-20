const faker = require('faker')
const random = require('random')
const { Project, Product } = require('../models')

const init = async () => {
    const findAllProject = await Project.findAll()
    findAllProject.forEach(async (projectValue) => {
        const project = projectValue.dataValues
        const randomValue = random.int(1, 4)

        for (let index = 0; index < randomValue; index++) {
            await Product.create({
                price: random.int(1000, 30000),
                name: faker.lorem.words(),
                limit: random.int(10, 100),
                projectId: project.id
            })
        }
    })
}

init()