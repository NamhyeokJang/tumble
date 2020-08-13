const router = require('express').Router()
const { User, Collection, Project, sequelize } = require('../../models')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    let query = req.query
    // .type === 'spotlight' ? req.query : { ...req.query, type: { [Op.eq]: req.query.type, [Op.not]: 'spotlight' } }
    const limit = query.limit ? parseInt(query.limit) : 0
    const order = query.order === 'random' ? sequelize.random() : null
    let includeProject = {}
    if (!query.with) {
        query = { ...req.query, type: { [Op.not]: 'spotlight' } }
    }
    if (query.with === 'project') {
        includeProject = {
            include: {
                model: Project,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'collectionId', 'userId']
                },
                limit: limit,
                order: order,
                include: {
                    model: User,
                    attributes: ['id', 'name']
                }
            }
        }
    }
    if (limit) delete query.limit
    if (order) delete query.order
    if (query.with) delete query.with
    try {
        const findCollections = await Collection.findAll({
            where: query,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            ...includeProject
        })

        res.json({ collections: findCollections })
    } catch (error) {
        res.json({ error })
    }
})

router.get('/:collectionId', async (req, res) => {
    const { collectionId } = req.params
    try {
        const findCollectionById = await Collection.findOne({
            where: {
                id: collectionId
            },
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            include: {
                model: Project,
                attributes: {
                    exclude: ['createdAt', 'updatedAt', 'collectionId'],
                },
                include: {
                    model: User,
                    attributes: ['id', 'name']
                }
            }
        })

        res.json({ collection: findCollectionById })
    } catch (error) {
        res.json({ error })
    }
})

router.get('/count/:collectionId', async (req, res) => {
    const { collectionId } = req.params
    try {
        const countProjects = await Project.count({
            where: {
                collectionId
            }
        })

        res.json({ count: countProjects })
    } catch (error) {
        res.json({ error })
    }
})


module.exports = router