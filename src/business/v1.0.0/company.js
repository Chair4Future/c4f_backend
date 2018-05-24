var db = require('../../models/index');

exports.create = (name, business, description, logo, banner, owner) => {
  return new Promise((resolve, reject) => {
    if (name && owner.id) {
      name = name.replace(/\b\w/g, l => l.toUpperCase());
      db.Company.create({
        name: name,
        user_id: owner.id,
        description: description,
        banner: banner,
        logo: logo
      }).then(
        res => resolve(res),
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

exports.update = (attributes, company) => {
  return new Promise((resolve, reject) => {
    let to_update = {};
    if (attributes.name) { to_update.name = name.replace(/\b\w/g, l => l.toUpperCase()); }
    if (attributes.description) { to_update.description = attributes.description; }
    if (attributes.banner) { to_update.banner = attributes.banner; }
    if (attributes.logo) { to_update.logo = attributes.logo; }
    company.update(to_update).then(
      () => resolve(),
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    db.Company.destroy({ where: { id: id } }).then(
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

exports.verifyCollaborator = (collaborator, id) => {
  return new Promise((resolve, reject) => {
    db.Company.findById(id, {
      include: [
        { model: db.Department, include: [{ model: db.User, where: { id: collaborator.id } }] },
        { model: db.Business }
      ]
    }).then(
      company => {
        if (company.Departments.length > 0) resolve(company);
        else reject({ code: 401, msg: "Unauthorized" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}
