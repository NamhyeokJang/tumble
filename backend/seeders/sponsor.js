const faker = require('faker')
const random = require('random')
const { User, Project, Product, Sponsor } = require('../models')

const NUM = parseInt(process.argv[2])

const init = async () => {
    const findProject = await Project.findAll({
        include: Product
    }).then(res => res.map(project => project.dataValues))

    findProject.forEach(async project => {
        for (let index = 0; index < random.int(1, 10); index++) {
            const products = project.products.map(product => product.dataValues)
            const randomProduct = random.int(0, (products.length - 1))
            try {
                await Sponsor.create({
                    userId: random.int(1, 50),
                    productId: products[randomProduct].id,
                    projectId: products[randomProduct].projectId
                })
            } catch (error) {

            }
        }
    })
}

init()