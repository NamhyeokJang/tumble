const faker = require('faker')
const random = require('random')
const { FgRed, FgCyan } = require('./color')
const { Project, Product, sequelize } = require('../models')

let count = 0

const createProducts = async () => {
    const projects = await Project.findAll({
        raw: true
    })
    const create = await projects.map(async (project) => {
        for (let index = 0; index < random.int(3, 6); index++) {
            count++
            await Product.create({
                price: random.int(10000, 110000),
                name: faker.lorem.words(),
                limit: random.int(10, 100),
                projectId: project.id
            })
        }
    })
    Promise.all(create).then(() => {
        sequelize.close()
        console.log(FgCyan, `Created ${count} products`)
    })
}

module.exports = createProducts