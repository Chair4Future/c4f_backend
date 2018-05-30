var db = require('../../models/index');

exports.findOrCreate = (name) => {
  return new Promise((resolve, reject) => {
    if (name) {
      name = name.replace(/\b\w/g, l => l.toUpperCase());
      db.Tag.findOne({ name: name }, (err, doc) => {
        if (err) reject({ code: 500, msg: err.message });
        if (doc) {
          doc.usage += 1;
          doc.save((err, res) => {
            if (err) reject({ code: 500, msg: err.message });
            else resolve(res);
          });
        } else {
          db.Tag.create({ name: name }, (err, res) => {
            if (err) reject({ code: 500, msg: err.message });
            else resolve(res);
          })
        }
      });
    } else reject({ code: 500, msg: "tag name undentified" });
  });
}

exports.list = () => {
  return new Promise((resolve, reject) => {
    db.Tag.find().exec((err, tags) => {
      if (err) reject({ code: 500, msg: err.message });
      else resolve(tags);
    })
  });
}

exports.setPublication = (tag, publication) => {
  return new Promise((resolve, reject) => {
    tag.publications.push(publication);
    tag.save((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      else resolve();
    });
  });
}

exports.getPublications = (id) => {
  return new Promise((resolve, reject) => {
    db.Tag.findOne({ '_id': id }).populate('publications').exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      tosend = res.publications.filter(approved = true);
      resolve(tosend);
    });
  });
}