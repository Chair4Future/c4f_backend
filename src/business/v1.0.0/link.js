var db = require('../../models/index');

exports.create = (attributes, user) => {
  return new Promise((resolve, reject) => {
    if (attributes.social) {
      if (attributes.url) {
        db.Link.create({
          url: attributes.url,
          social: attributes.social,
          user_id: user.id
        }).then(
          link => resolve(link),
          err => reject({ code: 500, msg: err.message }));
      } else reject({ code: 500, msg: "url undefined" });
    } else reject({ code: 500, msg: "social network undefined" });
  });
}

exports.remove = (id, current_user) => {
  return new Promise((resolve, reject) => {
    db.Link.destroy({ where: { id: id, user_id: current_user.id } }).then(
      result => {
        if (result > 0) resolve()
        else reject({ code: 401, msg: "Unauthorized" });
      },
      err => reject({ code: 500, msg: err.message }));
  });
}