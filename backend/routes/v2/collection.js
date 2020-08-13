const router = require('express').Router()
const { Collection, Project } = require('../../models')
const { Op } = require('sequelize')

router.get('/', async (req, res) => {
    //where
    let query = req.query
    //options
    const limit = query.limit ? parseInt(query.limit) : 0
    const order = query.order === 'random' ? sequelize.random() : null
    let includeProject = {}
    //spotlight 제외
    if (!query.type) {
        query = {
            ...req.query,
            type: {
                [Op.not]: 'spotlight'
            }
        }
    }
    // project include 
    if (query.with === 'project') {
        includeProject = {
            include: {
                model: Project,
                attributes: ['id'],
                limit: limit,
                order: order,
            }
        }
    }
    if (limit) delete query.limit
    if (order) delete query.order
    if (query.with) delete query.with
    try {
        const collection = await Collection.findAll({
            where: query,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            },
            ...includeProject
        })

        res.json({ collections: collection })
    } catch (error) {
        res.json({ error })
    }
})

router.get('/:collectionId', async (req, res) => {
    const { collectionId } = req.params
    const collection = await Collection.findOne({
        where: {
            id: collectionId
        },
        include: [
            {
                model: Project,
                attributes: ['id']
            }
        ]
    })

    res.json({ collection: collection })
})


module.exports = router