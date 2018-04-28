var db = require('../../models/index');

exports.create = (name, email, phone, company_id, sponsors) => {
  return new Promise((resolve, reject) => {
    if (name) {
      if (company_id) {
        if (!email || /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(email)) {
          if (!phone || /\+\d{9,15}$/.test(phone)) {
            if (company_id) {
              name = name.replace(/\b\w/g, l => l.toUpperCase());
              db.Department.create({
                name: name,
                company_id: company_id,
                email: email,
                phone: phone
              }).then(
                department => department.addUsers(sponsors, { through: { sponsor: true } }).then(
                  () => resolve(department),
                  err => reject({ code: 500, msg: err.message })),
                err => reject({ code: 500, msg: err.message }));
            } else reject({ code: 500, msg: "Company must be defined" });
          } else reject({ code: 500, msg: "invalid phone number, must follow E.164 recommendation, this field is optional" });
        } else reject({ code: 500, msg: "invalid email, this field is optional" });
      } else reject({ code: 500, msg: "Company must be defined" });
    } else reject({ code: 500, msg: "name must be defined" });
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

exports.addUser = (department, user_id, is_sponsor) => {
  return new Promise((resolve, reject) => {
    department.addUser(user_id, { through: { is_sponsor: is_sponsor } }).then(
      () => resolve(),
      err => reject({ code: 500, msg: err.message }));
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

exports.removeUser = (department, user_id) => {
  return new Promise((resolve, reject) => {
    department.removeUser(user_id).then(
      () => resolve(),
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.verifySponsor = function (current_user, department_id) {
  return new Promise((resolve, reject) => {
    db.Department.findById(vitabox_id).then(
      department => {
        if (department) _isSponsor(department, current_user).then(
          () => resolve(department),
          error => reject(error));
        else reject({ code: 500, msg: "department not found" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}

// ________________________________________________________________________
// Private
// ________________________________________________________________________
_isSponsor = (department, user) => {
  return new Promise((resolve, reject) => {
    department.getUsers({ where: { id: user.id } }).then(
      users => {
        if (users.length > 0 && users[0].DepartmentUser.sponsor) resolve();
        else reject({ code: 401, msg: "Unauthorized" });
      }, error => reject({ code: 500, msg: error.message }));
  });
}