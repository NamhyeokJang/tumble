const router = require('express').Router()
const { Product, Item, Compose, Sponsor } = require('../../models')

router.get('/', async (req, res) => {
    const findAllProduct = await Product.findAndCountAll()

    res.json({ products: findAllProduct })
})

router.get('/:productId', async (req, res) => {
    const { productId } = req.params

    const findProductByProductId = await Product.findOne({
        where: {
            id: productId
        },
        attributes: {
            exclude: ['projectId', 'createdAt', 'updatedAt']
        },
        include: [
            {
                model: Item,
                attributes: ['name', 'quantity']
            }
        ]
    })

    res.json({ product: findProductByProductId })
})

router.get('/sponsor/:productId', async (req, res) => {
    const { productId } = req.params

    const findSponsorCount = await Sponsor.count({
        where: {
            productId
        }
    })

    res.json({ count: findSponsorCount })
})


module.exports = router