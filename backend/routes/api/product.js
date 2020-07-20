const router = require('express').Router()
const { Product, Item, Compose } = require('../../models')

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


module.exports = router