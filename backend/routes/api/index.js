const router = require('express').Router()

router.use('/users', require('./users'))

router.get('/', (req, res) => {
    res.send('api')
})

module.exports = router