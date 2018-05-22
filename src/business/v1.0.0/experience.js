var db = require('../../models/index');

exports.create = (attributes, user) => {
  return new Promise((resolve, reject) => {
    if (attributes.institution) {
      if (attributes.function && attributes.function.length < 30) {
        if (attributes.initDate) {
          if (attributes.actual || attributes.endDate) {
            db.Experience.create({
              institution: attributes.institution,
              function: attributes.function,
              actual: attributes.actual ? attributes.actual : false,
              initDate: attributes.initDate,
              endDate: attributes.endDate ? attributes.endDate : null,
              description: attributes.description,
              is_education: attributes.is_education ? attributes.is_education : false,
              user_id: user.id
            }).then(
              experience => resolve(experience),
              err => reject({ code: 500, msg: err.message }));
          } else reject({ code: 500, msg: "end date must be defined or define as actual" });
        } else reject({ code: 500, msg: "init date undefined" });
      } else reject({ code: 500, msg: "function undefined or too long" });
    } else reject({ code: 500, msg: "institution undefined" });
  });
}

exports.remove = (id, current_user) => {
  return new Promise((resolve, reject) => {
    db.Experience.destroy({ where: { id: id, user_id: current_user.id } }).then(
      () => resolve(),
      err => reject({ code: 500, msg: err.message }));
  });
}