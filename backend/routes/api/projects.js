const router = require('express').Router()
const { User, Project, Product, Sponsor, Compose, sequelize } = require('../../models')

// 모든 프로젝트 불러오기 && 검색 기능 추가 && Pagination 
router.get('/', async (req, res) => {
    const page = req.query.page ? req.query.page : 0
    const query = req.query
    const limit = req.query.limit
    delete query.page
    delete query.limit
    try {
        const allProject = await Project.findAll({
            where: query,
            limit: limit ? parseInt(limit) : 27,
            offset: limit ? 0 : page * 27,
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
            projects: allProject
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
                id: projectId,
            },
            attributes: ['id', [sequelize.fn('sum', sequelize.col('sponsors.donation')), 'total']],
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password', 'created_at', 'loginMethod']
                    }
                },
                {
                    model: Sponsor,
                    attributes: [],
                },
            ],
            group: ['id']
        })
        res.json({ project: findProjectByProjectId })
    } catch (error) {
        res.json({ error })
    }
})

//Project 후원자 수 검색
router.get('/sponsor/:projectId', async (req, res) => {
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

    try {
        const findTotal = await Sponsor.findOne({
            raw: true,
            where: {
                projectId
            },
            attributes: [[sequelize.fn('sum', sequelize.col('donation')), 'total']],
            group: ['projectId']
        })

        res.json({ total: findTotal.total })
    } catch (error) {
        res.json({ error })
    }
})

router.get('/test/:id', async (req, res) => {
    const { id } = req.params

    try {
        const findProject = await Sponsor.findAll({
            attributes: ['projectId', [sequelize.fn('sum', sequelize.col('donation')), 'total']],
            group: ['projectId']
        })

        res.json({ findProject })
    } catch (error) {
        res.json({ error })
    }
})


module.exports = router