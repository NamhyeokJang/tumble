const router = require('express').Router()
const { User } = require('../../models')

router.get('/', (req, res) => {
    res.send('GET: /users')
})

// Sign User By Email
router.post('/sign', async (req, res) => {
    const body = req.body
    try {
        const CreateUser = await User.create(body)

        res.json({ user: CreateUser })
    } catch (error) {
        res.json({ error })
    }
    res.end()
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body

    try {
        const findUser = await User.findOne({
            where: {
                email,
                password
            },
            attributes: { exclude: ['password', 'login_method', 'created_at'] }
        })
        res.json({ user: findUser })
    } catch (error) {
        res.json({ error })
    }
    res.end()
})


module.exports = router