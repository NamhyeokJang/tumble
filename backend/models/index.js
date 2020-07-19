const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'config.json'))[env];
const db = {};

const sequelize = new Sequelize(config.database, config.username, config.password, config);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// DB Table
db.User = require('./user')(sequelize, Sequelize);
db.Project = require('./project')(sequelize, Sequelize)
db.Product = require('./product')(sequelize, Sequelize)
db.Item = require('./item')(sequelize, Sequelize)
db.Sponsor = require('./sponsor')(sequelize, Sequelize)

// DB 관계
db.User.hasMany(db.Project, { foreignKey: 'user_id', sourceKey: 'id' });
db.Project.belongsTo(db.User, { foreignKey: 'user_id', targetKey: 'id' });

db.Project.hasMany(db.Product, { foreignKey: 'project_id', sourceKey: 'id' });
db.Product.belongsTo(db.Project, { foreignKey: 'project_id', targetKey: 'id' });

db.Product.belongsToMany(db.Item, { through: 'compose' })
db.Item.belongsToMany(db.Product, { through: 'compose' })

db.User.belongsToMany(db.Product, { through: 'sponsor' })
db.Product.belongsToMany(db.User, { through: 'sponsor' })

db.Project.hasMany(db.Sponsor, { foreignKey: 'projectId', sourceKey: 'id' });
db.Sponsor.belongsTo(db.Project, { foreignKey: 'projectId', targetKey: 'id' });

module.exports = db;