var utils = require('../business/v1.0.0/utils');

module.exports.seed = (db) => {
  return new Promise((resolve, reject) => {

    db.User.count({ where: { is_adm: true } }).then(
      count => {
        if (count < 1) {
          let encrypted = utils.encrypt(["admin@a.aa", "user2@a.aa", "123qweASD", "admin", "user"]);
          if (!encrypted.error) {

            db.User.bulkCreate([
              { "email": encrypted.value[0], "is_adm": true, "password": encrypted.value[2], name:encrypted.value[3] },
              { "email": encrypted.value[1], "password": encrypted.value[2], name:encrypted.value[4] }
            ]).then(
              users => db.Log.insertMany([
                { description: "User registered", datetime: "2018-03-08T09:43:40.000Z", user: users[0].id },
                { description: "User x changed password", datetime: "2018-03-08T09:47:28.000Z", user: users[1].id },
                { description: "User Y logged in", datetime: "2018-03-08T09:53:47.000Z", user: users[0].id }
              ], (error, doc) => {
                if (error) reject(error);
                resolve();
              }),
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