var db = require('../../models/index');

exports.create = (attributes, user, is_owner) => {
  return new Promise((resolve, reject) => {
    db.Publication.create({
      title: attributes.title,
      resume: attributes.resume,
      text: attributes.text,
      brand_image: attributes.brand_image,
      detailed_image: attributes.detailed_image,
      sender: user.id,
      company: attributes.company_id,
      approved: is_owner
    }, (err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve(res);
    });
  });
}

exports.listByCompany = (id, is_owner) => {
  return new Promise((resolve, reject) => {
    if (is_owner) {
      db.Publication.find().where({ 'company': id }).exec((err, res) => {
        if (err) reject({ code: 500, msg: err.message });
        resolve(res);
      });
    } else {
      db.Publication.find().where({ 'company': id, 'approved': true }).exec((err, res) => {
        if (err) reject({ code: 500, msg: err.message });
        resolve(res);
      });
    }

  });
}

exports.findById = (id) => {
  return new Promise((resolve, reject) => {
    db.Publication.findOne({ '_id': id }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve(res);
    });
  });
}

exports.remove = (publication) => {
  return new Promise((resolve, reject) => {
    publication.remove((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve();
    });
  });
}

exports.authorize = (publication) => {
  return new Promise((resolve, reject) => {
    publication.approved = true;
    publication.save((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      resolve();
    });
  });
}