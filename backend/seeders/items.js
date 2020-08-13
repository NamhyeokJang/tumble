const faker = require('faker')
const random = require('random')
const { FgRed, FgCyan } = require('./color')
const { Project, Product, Item, sequelize } = require('../models')

let count = 0

const createItems = async () => {
    const projects = await Project.findAll({
        raw: true
    })
    const create = await projects.map(async (project) => {
        for (let index = 0; index < random.int(10, 30); index++) {
            count++
            await Item.create({
                name: faker.lorem.word(),
                projectId: project.id
            })
        }
    })
    Promise.all(create).then(() => {
        console.log(FgCyan, `Created ${count} items`)
        sequelize.close()
    })
}

module.exports = createItems