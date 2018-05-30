var db = require('../../models/index');

exports.addCompanyToBusiness = (name, company_id) => {
  return new Promise((resolve, reject) => {
    name = name.replace(/\b\w/g, l => l.toUpperCase());
    db.Business.findOne({ where: { name: name } }).then(
      business => {
        if (business) business.addCompany(company_id).then(
          res => resolve(res),
          err => reject(err.message));
        else db.Business.create({ name: name }).then(
          business => business.addCompany(company_id).then(
            res => resolve(res),
            err => reject(err.message)),
          err => reject(err.message));
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
    db.Business.destroy({ where: { id: id } }).then(
      () => resolve(),
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.getCompanies = (id) => {
  return new Promise((resolve, reject) => {
    db.Business.findById(id, { include: [{ model: db.Company, attributes: ['id', 'name', 'logo'] }] }).then(
      res => {
        resolve(res.Companies.map(element => { return { id: element.id, name: element.name, logo: element.logo } }));
      },
      err => reject({ code: 500, msg: err.message }));
  });
}
