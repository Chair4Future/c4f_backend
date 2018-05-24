var db = require('../../models/index');

exports.list = () => {
  console.log("business");
  return new Promise((resolve, reject) => {
    db.Skill.findAll({ attributes: ['id', 'name'] }).then(
      res => resolve(res),
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.remove = (id) => {
  return new Promise((resolve, reject) => {
    db.Skill.destroy({ where: { id: id } }).then(
      result => {
        if (result > 0) resolve()
        else reject({ code: 401, msg: "Unauthorized" });
      },
      err => reject({ code: 500, msg: err.message }));
  });
}

exports.addSkillToUser = (name, level, user_id) => {
  return new Promise((resolve, reject) => {
    name = name.replace(/\b\w/g, l => l.toUpperCase());
    db.Skill.findOne({ where: { name: name } }).then(
      skill => {
        if (skill) skill.addUser(user_id, { through: { level: level ? level : 0 } }).then(
          () => resolve({ "id": skill.id, "name": skill.name, "level": level }),
          err => reject({ code: 500, msg: err.message }));
        else db.Skill.create({ name: name }).then(
          skill => skill.addUser(user_id, { through: { level: level ? level : 0 } }).then(
            () => resolve({ "id": skill.id, "name": skill.name, "level": level }),
            err => reject({ code: 500, msg: err.message })),
          err => reject({ code: 500, msg: err.message }));
      }, err => reject({ code: 500, msg: err.message }));
  });
}

exports.removeSkillFromUser = (skill_id, user_id) => {
  return new Promise((resolve, reject) => {
    db.UserSkill.destroy({ where: { skill_id: skill_id, user_id: user_id } }).then(
      () => resolve(),
      err => reject({ code: 500, msg: err.message }));
  });
}

