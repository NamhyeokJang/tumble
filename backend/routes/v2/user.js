const router = require('express').Router()
const { User, Project } = require('../../models')


//Test code - All User
router.get('/', async (req, res) => {
    const allUser = await User.findAll()

    res.json({ users: allUser })
})

router.get('/:userId', async (req, res) => {
    const { userId } = req.params
    try {
        const findUserById = await User.findOne({
            where: {
                id: userId
            },
            attributes: {
                exclude: ['password', 'loginMethod',]
            },
            include: {
                model: Project,
                attributes: ['id'],
                include: {
                    model: User,
                    attributes: ['id', 'name']
                }
            }
        })
        res.json({ user: findUserById })
    } catch (error) {
        res.json({ error })
    }
})

// Sign User By Email
router.post('/sign', async (req, res) => {
    const body = req.body
    try {
        const CreateUser = await User.create(body)

        res.json({ result: 'ok', user: CreateUser })
    } catch (error) {
        res.json({ error })
    }
    res.end()
})

// Login User
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

        if (findUser) {
            return res.json({ result: 'ok', user: findUser })
        } else {
            return res.json({ result: 'failed', message: '아이디나 비밀번호가 일치하지 않습니다.' })
        }
    } catch (error) {
        res.json({ error })
    }
    res.end()
})


module.exports = router