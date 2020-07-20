const faker = require('faker')
const random = require('random')
const { User, Project } = require('../models')

const TYPE = ['editor', 'new', 'popular']

const init = async () => {
    for (let index = 1; index <= 497; index++) {
        await Project.update({ type: TYPE[random.int(0, 2)] }, {
            where: {
                id: index
            }
        })
    }
}


init()