const faker = require('faker')
const random = require('random')
const { Project, Product, Item, Compose } = require('../models')


const init = async () => {
    const findProject = await Project.findAll({
        include: [Item, Product]
    })
        .then(res => res.map(project => project.dataValues))

    findProject.forEach(async project => {
        const products = project.products.map(product => product.dataValues)
        const items = project.items.map(item => item.dataValues)
        products.forEach(async product => {
            const itemLength = items.length - 1
            try {
                await Compose.create({
                    productId: product.id,
                    itemId: items[random.int(0, itemLength)].id
                })
            } catch (error) {
                console.error(items[random.int(0, itemLength)].id)
            }
        })
    })
}


init()