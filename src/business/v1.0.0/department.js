var db = require('../../models/index');

exports.create = (attributes) => {
  return new Promise((resolve, reject) => {
    attributes.name = attributes.name.replace(/\b\w/g, l => l.toUpperCase());
    if (!attributes.email || /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(attributes.email)) {
      if (!attributes.phone || /\+\d{9,15}$/.test(attributes.phone)) {
        db.Department.create(attributes).then(
          res => resolve(res),
          err => reject({ code: 500, msg: err.message }));
      } else reject({ code: 500, msg: "invalid phone number, must follow E.164 recommendation, this field is optional" });
    } else reject({ code: 500, msg: "invalid email, this field is optional" });
  });
}

exports.list = () => {
  return new Promise((resolve, reject) => {
    db.Department.findAll({ attributes: ['id', 'name', 'email', 'phone'] }).then(
      res => resolve(res),
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    db.Department.destory({ where: { id: id } }).then(
      () => resolve(),
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.addUser = (id, user_id, is_sponsor) => {
  return new Promise((resolve, reject) => {
    db.Department.findById(id).then(
      department => {
        if (department) {
          department.addUser(user_id, { through: { is_sponsor: is_sponsor } }).then(
            () => resolve(),
            err => reject({ code: 500, msg: err.message }));
        } else reject({ code: 500, msg: "department not found" });
      }, err => reject({ code: 500, msg: err.message }));
  });
}

exports.getUsers = (id) => {
  return new Promise((resolve, reject) => {
    db.Department.findById(id).then(
      department => {
        if (department) {
          department.getUsers({ attributes: ['id', 'name', 'email', 'photo'] }).then(
            res => resolve(res),
            err => reject({ code: 500, msg: err.message }));
        } else reject({ code: 500, msg: "department not found" });
      }, err => reject({ code: 500, msg: err.message }));
  });
}

exports.removeUser = (id, user_id) => {
  return new Promise((resolve, reject) => {
    db.Department.findById(id).then(
      department => {
        if (department) {
          department.removeUser(user_id).then(
            () => resolve(),
            err => reject({ code: 500, msg: err.message }));
        } else reject({ code: 500, msg: "department not found" });
      }, err => reject({ code: 500, msg: err.message }));
  });
}