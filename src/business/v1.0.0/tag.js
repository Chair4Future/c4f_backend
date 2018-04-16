var db = require('../../models/index');

exports.create = (attributes) => {
  return new Promise((resolve, reject) => {
    if (attributes.name && attributes.business) {
      attributes.name = attributes.name.replace(/\b\w/g, l => l.toUpperCase());
      db.Publication.insert({ name: attributes.name, business: attributes.business }, (err, doc) => {
        if (err) reject({ code: 500, msg: err.message });
        else resolve(doc);
      });
    } else reject({ code: 500, msg: "tag name or business undentified" });
  });
}

exports.setPublication = (ids, publication) => {
  return new Promise((resolve, reject) => {
    let promises = []
    ids.forEach(id => promises.push(new Promise((resolve, reject) => {
      db.Tag.find().where({ '_id': id }).exec((err, tag) => {
        if (err) reject({ code: 500, msg: err.message });
        else tag.publications.push(publication._id).save((err, res) => {
          if (err) reject({ code: 500, msg: err.message });
          else resolve();
        });
      });
    })));
    Promise.all(promises).then(
      () => resolve(),
      err => reject());
  });
}

exports.getPublications = (id) => {
  return new Promise((resolve, reject) => {
    db.Tag.find().where({ '_id': id }).populate('publications').exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      else resolve(res);
    });
  });
}