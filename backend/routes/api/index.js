const router = require('express').Router()

router.use('/user', require('./user'))
router.use('/project', require('./project'))
router.use('/product', require('./product'))
router.use('/item', require('./item'))

router.get('/', (req, res) => {
    res.send('GET: /api')
})

module.exports = router