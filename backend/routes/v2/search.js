const router = require('express').Router()

const popular = ['sunt', 'dolor', 'Omnis', 'ullam', 'at']

router.get('/', (req, res) => {
    res.json({ popular })
})


module.exports = router