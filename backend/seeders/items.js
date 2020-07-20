const faker = require('faker')
const random = require('random')
const { Project, Product, Item } = require('../models')

const init = async () => {
    const findProject = await Project.findAll()
    findProject.forEach(async projectValue => {
        const project = projectValue.dataValues
        for (let index = 0; index < random.int(3, 6); index++) {
            await Item.create({
                name: faker.lorem.word(),
                quantity: random.int(1, 3),
                projectId: project.id
            })
        }
    })
}

init()