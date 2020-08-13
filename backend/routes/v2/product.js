const router = require('express').Router()
const { Product, Item, sequelize, Compose, Sponsor } = require('../../models')

router.get('/', async (req, res) => {
    try {
        const products = await Product.findAll()

        res.json({ products: products })
    } catch (error) {

    }
})

router.get('/:productId', async (req, res) => {
    const { productId } = req.params
    const product = await Product.findOne({
        where: {
            id: productId
        },
        include: [
            {
                model: Item,
                attributes: ['id', 'name']
            },
        ]
    })

    res.json({ product: product })
})

router.get('/sponsor/:productId', async (req, res) => {
    const { productId } = req.params
    const sponsorsCount = await Sponsor.count({
        where: {
            productId
        }
    })

    res.json({ count: sponsorsCount })
})


module.exports = router