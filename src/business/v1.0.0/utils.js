var crypto = require("crypto"),
  fs = require("fs"),
  jwt = require('jsonwebtoken'),
  path = require("path"),
  mime = require('mime-types'),
  multer = require('multer'),
  db = require('../../models/index'),
  uuidv4 = require('uuid/v4');

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

exports.createToken = (user) => {
  return new Promise((resolve, reject) => {
    let private_key = fs.readFileSync(__dirname + '/../../keys/key.pem').toString();
    if (private_key === undefined) reject({ code: 500, msg: "error on load private key" });

    let payload = {
      id: user.id
    };
    let options = {
      expiresIn: "8h",
      algorithm: "RS256"
    };
    jwt.sign(payload, private_key, options, (err, token) => {
      if (err) { reject({ code: 500, msg: err.message }); }
      resolve(token);
    });
  });
}

exports.validateToken = (token) => {
  return new Promise((resolve, reject) => {
    let public_key = fs.readFileSync(__dirname + '/../../keys/cert.pem').toString();
    if (public_key === undefined) reject("error on load public key");

    let options = {
      algorithms: ["RS256"]
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

exports.upload = (html_name) => {
  return new Promise((resolve, reject) => {
    try {
      let obj = multer({
        storage: multer.diskStorage(
          {
            destination: path.resolve(__dirname, '..', '..', '..', 'files'),
            filename: (req, file, cb) => cb(null, uuidv4() + '.' + mime.extension(file.mimetype))
          }
        ),
        fileFilter: (req, file, cb) => {
          if (!file.originalname.match(/\.(jpg|jpeg|png|gif|pdf)$/)) return cb(new Error('Only image files are allowed!'), false);
          cb(null, true);
        }
      }).single(html_name);
      resolve(obj);
    } catch (err) { reject({ code: 500, msg: err.message }); }
  });
}

exports.download = (filename) => {
  return new Promise((resolve, reject) => {
    try {
      let file = fs.readFileSync(path.resolve(__dirname, '..', '..', '..', 'files', filename));
      let header = { 'Content-Type': mime.lookup(filename) }
      resolve({ file: file, header: header });
    } catch (err) { reject({ code: 500, msg: err.message }); }
  });
}

// JUST TO DEVELOPMENT
exports.deleteAll = function () {
  return new Promise((resolve, reject) => {
    db.sequelize.query('SET FOREIGN_KEY_CHECKS = 0', { raw: true }).then(() => {
      db.User.truncate().then(() => {
        db.Company.truncate().then(() => {
          db.Business.truncate().then(() => {
            db.Nearshore.truncate().then(() => {
              db.Websection.truncate().then(() => {
                db.Department.truncate().then(() => {
                  db.DepartmentUser.truncate().then(() => {
                    db.Publication.remove({}, () => {
                      db.Log.remove({}, () => {
                        db.Tag.remove({}, () => {
                          db.sequelize.query('SET FOREIGN_KEY_CHECKS = 1', { raw: true }).then(
                            () => resolve(),
                            error => reject(error));
                        });
                      }, error => reject(error))
                    }, error => reject(error))
                  }, error => reject(error))
                }, error => reject(error))
              }, error => reject(error))
            }, error => reject(error))
          }, error => reject(error))
        }, error => reject(error))
      }, error => reject(error))
    }, error => reject(error))
  });
}

exports.testSeed = function () {
  return new Promise((resolve, reject) => {
    require('../../models/seed').testSeed(db).then(
      () => resolve(),
      error => reject(error));
  });
}