const router = require('express').Router()

router.use('/users', require('./user'))
router.use('/search', require('./search'))
router.use('/collections', require('./collection'))
router.use('/projects', require('./project'))
router.use('/products', require('./product'))

router.get('/', (req, res) => {
    res.send('GET: /v2')
})

module.exports = router