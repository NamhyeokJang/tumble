const faker = require('faker')
const random = require('random')
const { FgRed, FgCyan, FgGreen } = require('./color')
const { Project, Product, Item, Compose, sequelize } = require('../models')

let count = 0

const createComposes = async () => {
    const projects = await Project.findAll({
        include: [
            {
                model: Product,
                raw: true
            },
            {
                model: Item,
                raw: true
            }
        ]
    })
        .then(projects => projects.map(project => project.dataValues))

    const create = projects.map(async project => {
        const products = project.products.map(product => product.dataValues)
        const items = project.items.map(item => item.dataValues)
        const composes = products.map(async product => {
            for (let index = 0; index < random.int(2, 5); index++) {
                count++
                try {
                    await Compose.create({
                        quantiy: random.int(1, 10),
                        itemId: items[random.int(0, (items.length - 1))].id,
                        productId: product.id
                    })
                } catch (error) {
                }
            }
        })
        Promise.all(composes).then(() => console.log(FgGreen, `${project.id} Created Composes`))

    })

    // Promise.all(create).then(() => {
    //     console.log(FgCyan, `Created Composes`)
    //     sequelize.close()
    // })
}


module.exports = createComposes