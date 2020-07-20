const router = require('express').Router()
const { User, Project, Product, Sponsor, Compose } = require('../../models')

// 모든 프로젝트 불러오기 && 검색 기능 추가 && Pagination 
router.get('/', async (req, res) => {
    const page = req.query.page ? req.query.page : 0
    const query = req.query
    const limit = req.query.limit
    delete query.page
    delete query.limit
    try {
        const allProject = await Project.findAndCountAll({
            where: query,
            limit: limit ? parseInt(limit) : 28,
            offset: limit ? 0 : page * 28,
            attributes: {
                exclude: ['userId']
            },
            include: [
                {
                    model: User,
                    attributes: ['id', 'name']
                },
            ]
        })
        res.status(200).json({
            count: allProject.count,
            projects: allProject.rows,
        })
    } catch (error) {
        res.json({ result: 'error', message: '잘못된 접근입니다.', error })
    }
})


// ProjectId로 프로젝트 디테일 검색 (include Product)
router.get('/:projectId', async (req, res) => {
    const { projectId } = req.params
    try {
        const findProjectByProjectId = await Project.findOne({
            where: {
                id: projectId
            },
            attributes: {
                exclude: ['userId']
            },
            include: [
                {
                    model: Product,
                    attributes: ['id']
                },
                {
                    model: User,
                    attributes: {
                        exclude: ['password', 'created_at', 'loginMethod']
                    }
                }
            ]
        })
        res.json({ project: findProjectByProjectId })
    } catch (error) {
        res.json({ error })
    }
})

//Project 후원자 수 검색
router.get('/count/:projectId', async (req, res) => {
    const { projectId } = req.params

    const countSponsorByProjectId = await Sponsor.count({
        where: {
            projectId
        }
    })

    res.json({ count: countSponsorByProjectId })
})

//Project 모금액 검색
router.get('/total/:projectId', async (req, res) => {
    const { projectId } = req.params

    const findSponsorByProjectId = await Sponsor.findAll({
        where: {
            projectId
        }
    })
        .then(results => results.map(result => result.dataValues))
    const prices = await findSponsorByProjectId.map(async sponsor => {
        const price = await Product.findOne({
            where: {
                id: sponsor.productId
            },
            attributes: ['price']
        }).then(result => result.dataValues.price)
        return price
    })

    Promise.all(prices).then(result => {
        if (result.length > 0) {
            const total = result.reduce((a, b) => a + b)
            res.json({ total })
        } else {
            res.json({ total: 0 })
        }
    })
})


module.exports = router