var db = require('../../models/index');

exports.create = (attributes, user) => {
  return new Promise((resolve, reject) => {
    db.Publication.insert({
      title: attributes.title,
      resume: attributes.resume,
      text: attributes.text,
      brand_image: attributes.brand_image,
      detailed_image: attributes.detailed_image,
      datetime: attributes.datetime
    }, (err,res) => {
      if (err) reject({ code: 500, msg: err.message });
      else resolve(res);
    });
  });
}

exports.listByCompany = (id) => {
  return new Promise((resolve, reject) => {
    db.Publication.find().where({ 'company': id}).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      else resolve(res);
    });
  });
}