var db = require('../../models/index');

exports.addCompanyToBusiness = (name, company_id) => {
  return new Promise((resolve, reject) => {
    name = name.replace(/\b\w/g, l => l.toUpperCase());
    db.Business.findOrCreate({ where: { name: name } }).then(
      business => {
        if (business) {
          business.addCompany(company_id).then(
            res => resolve(res),
            err => reject(err.message))
        } else reject("was not possible to define the business");
      }, err => reject(err.message));
  });
}

exports.list = () => {
  return new Promise((resolve, reject) => {
    db.Business.findAll({ attributes: ['id', 'name'] }).then(
      res => resolve(res),
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    db.Business.destory({ where: { id: id } }).then(
      () => resolve(),
      err => reject({ code: 500, msg: err.message }));
  });
}