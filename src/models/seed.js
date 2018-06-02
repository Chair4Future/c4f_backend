var utils = require('../business/v1.0.0/utils');

module.exports.seed = (db) => {
  return new Promise((resolve, reject) => {

    db.User.count({ where: { is_admin: true } }).then(
      count => {
        if (count < 1) {
          let encrypted = utils.encrypt(["123qweASD", "admin@c4f.pt", "Administrator", "user@c4f.pt", "User"]);
          if (!encrypted.error) {

            db.User.bulkCreate([
              { "email": encrypted.value[1], "is_admin": true, "is_moderator": true, "password": encrypted.value[0], name: encrypted.value[2], country_code: "PT", city: "Tomar" },
              { "email": encrypted.value[3], "password": encrypted.value[0], name: encrypted.value[4], country_code: "PT", city: "Leiria" },
            ]).then(
              () => resolve(),
              error => reject(error));

          } else reject(encrypted.error);
        } else resolve();
      }, error => reject(error));
  });

}

module.exports.testSeed = (db) => {
  return new Promise((resolve, reject) => {
    let encrypted = utils.encrypt(["admin@a.aa", "123qweASD"]);
    if (!encrypted.error) {
      db.User.create({ "email": encrypted.value[0], "is_adm": true, "password": encrypted.value[1] }).then(
        () => resolve(),
        error => reject(error));
    } else reject(encrypted.error);
  });
}