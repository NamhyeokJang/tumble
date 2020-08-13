const router = require('express').Router()

router.use('/user', require('./user'))
router.use('/collections', require('./collections'))
router.use('/projects', require('./projects'))
router.use('/product', require('./product'))
router.use('/item', require('./item'))

router.get('/', (req, res) => {
    res.send('GET: /api')
})

module.exports = router