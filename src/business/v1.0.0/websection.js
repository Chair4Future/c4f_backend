var db = require('../../models/index');

exports.create = (attributes, company) => {
  return new Promise((resolve, reject) => {
    db.Websection.create({
      title: attributes.title,
      text: attributes.text,
      image: attributes.image,
      code: attributes.code,
      company_id: company.id
    }).then(
      websection => resolve(websection),
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.update = (id, attributes, company) => {
  return new Promise((resolve, reject) => {
    db.Websection.findOne({ where: { id: id, company_id: company.id } }).then(
      websection => websection.update({
        title: attributes.title,
        text: attributes.text,
        image: attributes.image,
        code: attributes.code
      }).then(
        () => resolve(),
        error => reject({ code: 500, msg: error.message })),
      error => reject({ code: 500, msg: error.message }));
  });
}

exports.remove = (id, company) => {
  return new Promise((resolve, reject) => {
    db.Websection.destroy({ where: { id: id, company_id: company.id } }).then(
      () => resolve(),
      err => reject({ code: 500, msg: err.message }));
  });
}