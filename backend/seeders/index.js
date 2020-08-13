const { FgRed, FgCyan } = require('./color')
const createUsers = require('./users')
const createCollections = require('./collection')
const createProjects = require('./projects')
const createProducts = require('./products')
const createItems = require('./items')
const createComposes = require('./compose')
const createSponsors = require('./sponsor')
const { sequelize } = require('../models')

const INPUT_NUM = parseInt(process.argv[3])
const SEED_TYPE = process.argv[2]

const init = () => {
    switch (SEED_TYPE) {
        case 'users':
            if (INPUT_NUM) {
                createUsers(INPUT_NUM)
            } else {
                console.log(FgRed, 'plz input number')
            }
            break;
        case 'collections':
            if (INPUT_NUM) {
                createCollections(INPUT_NUM)
            } else {
                console.log(FgRed, 'plz input number')
            }
            break;
        case 'projects':
            createProjects()
            break;
        case 'products':
            createProducts()
            break;
        case 'items':
            createItems()
            break;
        case 'composes':
            createComposes()
            break;
        case 'sponsors':
            createSponsors()
            break;
        default:
            break;
    }
}

init()