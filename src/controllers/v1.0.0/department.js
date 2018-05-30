var business = require('../../business/index').v1_0_0;


/**
 * @api {post} /department/:id/user 01) Add user
 * @apiGroup Department
 * @apiName addUserToDepartment
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} :id department id
 * @apiParam {string} email user email to add
 * @apiParam {boolean} is_sponsor flag to add usr as sponsor
 * @apiSuccess {boolean} result returns true if was successfuly added
 */
exports.addUser = function (req, res) {
  if (req.client) {
    business.user.findByEmail(req.body.email).then(
      user => business.department.verifySponsor(req.client, req.params.id).then(
        department => business.department.addUser(department, user.id, req.body.is_sponsor).then(
          () => res.status(200).json({ result: true }),
          err => res.status(err.code).send(err.msg)),
        err => res.status(err.code).send(err.msg)),
      err => res.status(err.code).send(err.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {get} /department/:id/user 02) Get users
 * @apiGroup Department
 * @apiName getUsersfromDepartment
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} :id department id
 * @apiSuccess {Object} users users list
 * @apiSuccessExample {json} Response example:
 * {
    "users": [
        {
            "id": "9c8db06b-ac5e-40a1-97ea-4e85ad3a7a65",
            "name": "cf4a6fb4db779c1b361c2f8567f178c9",
            "email": "00aad73d9d771cda1603febc3eefa84a",
            "photo": "9c8db06b-ac5e-40a1-97ea-4e85ad3a7a65.jpg"
        },
        {
            "id": "c3ed5136-0286-433c-b92a-e38be3fbb854",
            "name": "8b450a269a397b04ea10c4b4586a8535",
            "email": "2c55657e2a3b6a41610c61996ef6d1ca",
            "photo": "9c8db06b-ac5e-40a1-97ea-4e85ad3a7a65.jpg"
        }
    ]
}
 */
exports.getUsers = function (req, res) {
  if (req.client) {
    business.department.getUsers(req.params.id).then(
      result => res.status(200).json({ users: result }),
      err => res.status(err.code).send(err.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {delete} /department/:did/user/:uid 03) remove user
 * @apiGroup Department
 * @apiName removeUserFromDepartment
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} :did department id
 * @apiParam {string} :uid user id to remove
 * @apiSuccess {Object} result return true if was successfuly removed
 */
exports.removeUser = function (req, res) {
  if (req.client) {
    user => business.department.verifySponsor(req.client, req.params.did).then(
      department => business.department.removeUser(department, req.params.uid).then(
        () => res.status(200).json({ result: true }),
        err => res.status(err.code).send(err.msg)),
      err => res.status(err.code).send(err.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}