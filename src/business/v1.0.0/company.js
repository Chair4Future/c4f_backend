var db = require('../../models/index');

exports.create = (attributes) => {
  return new Promise((resolve, reject) => {
    attributes.name = attributes.name.replace(/\b\w/g, l => l.toUpperCase());
    db.Company.create(attributes).then(
      res => resolve(res),
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.list = () => {
  return new Promise((resolve, reject) => {
    db.Company.findAll({ attributes: ['id', 'name', 'description'] }).then(
      res => resolve(res),
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    db.Company.destory({ where: { id: id } }).then(
      () => resolve(),
      err => reject({ code: 500, msg: err.message }));
  });
}

