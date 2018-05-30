var mongoose = require('mongoose'),
    Sequelize = require('sequelize');

var mongo_uri = "", mysql_uri = "";

if (process.env.NODE_ENV === "production") {
    mongo_uri = 'mongodb://localhost:27017/myproject';
    mysql_uri = 'mysql://api:123qwe@localhost:3306/node';
} else {
    mongo_uri = 'mongodb://localhost:27017/test';
    mysql_uri = 'mysql://api:123qwe@localhost:3306/test';
}

const operatorsAliases = {
    $eq: Sequelize.Op.eq,
    $ne: Sequelize.Op.ne,
    $gte: Sequelize.Op.gte,
    $gt: Sequelize.Op.gt,
    $lte: Sequelize.Op.lte,
    $lt: Sequelize.Op.lt,
    $not: Sequelize.Op.not,
    $in: Sequelize.Op.in,
    $notIn: Sequelize.Op.notIn,
    $is: Sequelize.Op.is,
    $like: Sequelize.Op.like,
    $notLike: Sequelize.Op.notLike,
    $iLike: Sequelize.Op.iLike,
    $notILike: Sequelize.Op.notILike,
    $regexp: Sequelize.Op.regexp,
    $notRegexp: Sequelize.Op.notRegexp,
    $iRegexp: Sequelize.Op.iRegexp,
    $notIRegexp: Sequelize.Op.notIRegexp,
    $between: Sequelize.Op.between,
    $notBetween: Sequelize.Op.notBetween,
    $overlap: Sequelize.Op.overlap,
    $contains: Sequelize.Op.contains,
    $contained: Sequelize.Op.contained,
    $adjacent: Sequelize.Op.adjacent,
    $strictLeft: Sequelize.Op.strictLeft,
    $strictRight: Sequelize.Op.strictRight,
    $noExtendRight: Sequelize.Op.noExtendRight,
    $noExtendLeft: Sequelize.Op.noExtendLeft,
    $and: Sequelize.Op.and,
    $or: Sequelize.Op.or,
    $any: Sequelize.Op.any,
    $all: Sequelize.Op.all,
    $values: Sequelize.Op.values,
    $col: Sequelize.Op.col
};

// Create a new conntection to MongoDB server
mongoose.connect(mongo_uri);
// Create a new connection to MySQL server
var sequelize = new Sequelize(mysql_uri, { operatorsAliases: operatorsAliases, logging: false });

const db = {
    'User': require('./mysql/user')(sequelize, Sequelize),
    'Business': require('./mysql/business')(sequelize, Sequelize),
    'Company': require('./mysql/company')(sequelize, Sequelize),
    'Department': require('./mysql/department')(sequelize, Sequelize),
    'Nearshore': require('./mysql/nearshore')(sequelize, Sequelize),
    'Websection': require('./mysql/websection')(sequelize, Sequelize),
    'DepartmentUser': require('./mysql/department_user')(sequelize, Sequelize),
    'Experience': require('./mysql/experience')(sequelize, Sequelize),
    'Skill': require('./mysql/skill')(sequelize, Sequelize),
    'UserSkill': require('./mysql/user_skill')(sequelize, Sequelize),
    'Link': require('./mysql/link')(sequelize, Sequelize),

    'Log': require('./mongodb/log'),
    'Publication': require('./mongodb/publication')(mongoose),
    'Tag': require('./mongodb/tag')(mongoose)
}

Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) db[modelName].associate(db);
});

db.sequelize = sequelize;
db.mongoose = mongoose.connection;

module.exports = db;