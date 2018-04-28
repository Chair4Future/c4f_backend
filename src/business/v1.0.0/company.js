var db = require('../../models/index');

exports.create = (name, business, description, owner) => {
  return new Promise((resolve, reject) => {
    if (name && business && owner.id) {
      name = name.replace(/\b\w/g, l => l.toUpperCase());
      db.Company.create({
        name: name,
        user_id: owner.id,
        description: description
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
      attributes: ['id', 'name'],
      include: [
        { model: db.Business, attributes: ['id', 'name'] },
        { model: db.Department, attributes: ['id', 'name', 'email', 'phone'] },
        { model: db.Nearshore, attributes: ['id', 'country_code', 'city', 'address'] },
        { model: db.Websection, attributes: ['id', 'title', 'text', 'image', 'code'] },
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

exports.verifyOwner = (owner, id) => {
  return new Promise((resolve, reject) => {
    db.Company.findOne({ where: { user_id: owner.id, id: id } }).then(
      company => {
        if (company) resolve(company);
        else reject({ code: 500, msg: "company not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}
