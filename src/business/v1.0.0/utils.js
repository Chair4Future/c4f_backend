var crypto = require("crypto"),
  fs = require("fs"),
  jwt = require('jsonwebtoken'),
  db = require('../../models/index');

exports.encrypt = (to_encrypt) => {
  try {
    return {
      value: to_encrypt.map((element, index) => {
        let cipher = crypto.createCipher(process.env.ALGORITHM, process.env.KEY);
        return element = cipher.update(Buffer.from(element), 'utf8', 'hex') + cipher.final('hex');
      }), err: null
    };
  } catch (err) {
    return { value: null, err: err };
  }
}
exports.decrypt = (to_decrypt) => {
  let decipher = crypto.createDecipher(process.env.ALGORITHM, process.env.KEY);
  return decipher.update(to_decrypt, 'hex', 'utf8') + decipher.final('utf8');
}

exports.createToken = (user, client_address) => {
  return new Promise((resolve, reject) => {
    let private_key = fs.readFileSync(__dirname + '/../../keys/key.pem').toString();
    if (private_key === undefined) reject({ code: 500, msg: "error on load private key" });

    let payload = {
      id: user.id
    };
    let options = {
      expiresIn: "8h",
      algorithm: "RS256",
      subject: client_address
    };
    jwt.sign(payload, private_key, options, (err, token) => {
      if (err) { reject({ code: 500, msg: err.message }); }
      resolve(token);
    });
  });
}

exports.validateToken = (token, client_address) => {
  return new Promise((resolve, reject) => {
    let public_key = fs.readFileSync(__dirname + '/../../keys/cert.pem').toString();
    if (public_key === undefined) reject("error on load public key");

    let options = {
      algorithms: ["RS256"],
      subject: client_address
    };

    jwt.verify(token, public_key, options, (err, payload) => {
      if (err) reject({ code: 500, msg: err.message });
      db.User.findById(payload.id).then(
        res => resolve(res),
        err => reject({ code: 500, msg: err.message })
      );
    });
  });
}


// JUST TO DEVELOPMENT
exports.deleteAll = function () {
  return new Promise((resolve, reject) => {
    db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() => {
      db.User.truncate().then(() => {
        db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true }).then(
          () => resolve(),
          error => reject(error));
      });
    }, error => reject(error));
  });
}

exports.testSeed = function () {
  return new Promise((resolve, reject) => {
    require('../../models/seed').testSeed(db).then(
      () => resolve(),
      error => reject(error));
  });
}