const router = require('express').Router()
const { Item } = require('../../models')

router.get('/', async (req, res) => {
    const findAllItems = await Item.findAndCountAll()
    res.json({ items: findAllItems })
})


module.exports = router