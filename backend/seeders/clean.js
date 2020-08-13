var sequelize = require('../models').sequelize
sequelize.sync({ force: true })
    .then(() => sequelize.close())

