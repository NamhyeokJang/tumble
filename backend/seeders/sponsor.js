const faker = require('faker')
const random = require('random')
const { User, Project, Product, Sponsor, sequelize } = require('../models')
const { FgCyan, FgRed } = require('./color')

let count = 0

const createSponsors = async (number) => {
    const findProject = await Project.findAll({
        include: Product
    }).then(res => res.map(project => project.dataValues))

    const create = findProject.map(async project => {
        for (let index = 0; index < random.int(1, 30); index++) {
            const products = project.products.map(product => product.dataValues)
            const randomProduct = random.int(0, (products.length - 1))
            try {
                count++
                await Sponsor.create({
                    donation: random.int(1000, 60000),
                    userId: random.int(1, number),
                    productId: products[randomProduct].id,
                    projectId: products[randomProduct].projectId
                })
            } catch (error) {
            }
        }
    })

    Promise.all(create).then(() => {
        console.log(FgCyan, `Created ${count} Sponsors`)
        sequelize.close()
    })
}

module.exports = createSponsors