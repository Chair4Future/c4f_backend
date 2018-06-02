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

exports.listAll = () => {
  return new Promise((resolve, reject) => {
    db.Publication.find().where({ 'approved': true }).exec((err, res) => {
      if (err) reject({ code: 500, msg: err.message });
      let promises = res.map(publication => {
        return new Promise((resolve, reject) => {
          db.Company.findById(publication.company).then(
            company => {
              if (company) resolve({
                "datetime": publication.datetime,
                "likes": publication.likes,
                "dislikes": publication.dislikes,
                "approved": publication.approved,
                "_id": publication._id,
                "title": publication.title,
                "resume": publication.resume,
                "text": publication.text,
                "brand_image": publication.brand_image,
                "detailed_image": publication.detailed_image,
                "sender": publication.sender,
                "company_id": company.id,
                "company_name": company.name,
                "company_logo": company.logo,
              });
              else resolve();
            }, err => resolve());
        });
      });
      Promise.all(promises).then(
        res => resolve(res.filter(x => { return x != null })),
        err => reject({ code: 500, msg: "Cannot get the company from the publication" }));
    });
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