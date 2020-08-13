const router = require('express').Router()
const { Project, Product, sequelize, User, Sponsor } = require('../../models')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    let query = req.query
    const page = req.query.page ? req.query.page : 0
    const limit = req.query.limit
    const order = req.query.order === 'new' ? [['createdAt', 'desc']] : []
    if (query.title) {
        query = {
            ...query,
            title: {
                [Op.substring]: `${query.title}`
            }
        }
    }
    // status
    if (query.status === 'ing') {
        query = {
            ...query,
            deadLine: {
                [Op.gte]: new Date
            }
        }
    } else if (query.status === 'end') {
        query = {
            ...query,
            deadLine: {
                [Op.lt]: new Date
            }
        }
    }
    // belongs to Collection
    if (query.editor === 'true') {
        query = {
            ...query,
            collectionId: {
                [Op.not]: null
            }
        }
    }

    delete query.page
    delete query.limit
    delete query.editor
    delete query.status
    delete query.order

    try {
        const findProject = await Project.findAndCountAll({
            limit: limit ? parseInt(limit) : 27,
            offset: limit ? 0 : page * 27,
            where: query,
            attributes: ['id', 'title', 'description', 'cover', 'createdAt'],
            order: order
        })

        res.json({
            count: findProject.count,
            projects: findProject.rows
        })
    } catch (error) {

    }
})

//project Detail
router.get('/:projectId', async (req, res) => {
    const { projectId } = req.params
    let products = []
    let isDesc = {}

    if (req.query.desc) {
        isDesc = {
            exclude: ['story', 'userId', 'createdAt', 'updatedAt']
        }
    } else {
        isDesc = {
            exclude: ['userId', 'createdAt', 'updatedAt']
        }
        products = await Product.findAll({
            where: {
                projectId
            },
            attributes: ['id']
        })
    }

    try {
        const project = await Project.findOne({
            where: {
                id: projectId
            },
            group: ['id'],
            attributes: {
                include: [
                    [sequelize.fn('sum', sequelize.col('sponsors.donation')), 'donation'],
                    [sequelize.fn('count', sequelize.col('sponsors.projectId')), 'sponsor']
                ],
                exclude: ['userId']
            },
            include: [
                {
                    model: User,
                    attributes: {
                        exclude: ['password', 'created_at', 'loginMethod']
                    }
                },
                {
                    model: Sponsor,
                    attributes: []
                },
            ],
        })

        res.json({ project: project, products })
    } catch (error) {
        res.json({ error })
    }
})

module.exports = router