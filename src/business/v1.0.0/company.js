var db = require('../../models/index');

exports.create = (attributes, owner) => {
  return new Promise((resolve, reject) => {
    console.log("business", "ownerid"+owner.id);
    if (attributes.name && attributes.business && owner.id) {
      console.log("attributes");
      attributes.name = attributes.name.replace(/\b\w/g, l => l.toUpperCase());
      db.Company.create({
        name: attributes.name,
        business_area_id: attributes.business,
        user_id: owner.id,
        description: attributes.description
      }).then(
        res => { console.log("res"); resolve(res) },
        err => reject({ code: 500, msg: err.message }));
    } else { reject({ code: 500, msg: "invalid arguments, please insert all fields" }); }
  });
}

exports.list = () => {
  return new Promise((resolve, reject) => {
    db.Company.findAll({ attributes: ['id', 'name'] }).then(
      res => resolve(res),
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.get = (id) => {
  return new Promise((resolve, reject) => {
    db.Company.findById(id, {
      attributes: ['id', 'name', 'description'],
      include: [
        { model: db.User, attributes: ['id', 'name'] },
        { model: db.BusinessArea, attributes: ['id', 'name'] },
        { model: db.Department, attributes: ['id', 'name', 'email', 'phone'] }
      ]
    }).then(
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
