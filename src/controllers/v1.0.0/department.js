var business = require('../../business/index').v1_0_0;

/**
 * @api {post} /department 01) Create
 * @apiGroup Department
 * @apiName createDepartment
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} name valid name
 * @apiParam {string} email (optional) valid email
 * @apiParam {string} phone (optional) must follow E.164 recommendation
 * @apiParam {string} sponsor_email email of the department's sponsor, must be registered
 * @apiSuccess {Object} business business area created
 * @apiSuccessExample {json} Response example:
 * {
 *    "name": "Instituto Baldes de Massa",
 *    "business": "7d9db945-d3f4-471a-a0f4-37f69c171dea"
 *  }
 */
exports.create = function (req, res) {
  if (req.client) {
    business.user.findByEmail(sponsor_email).then(
      user => business.department.create(req.body, [user.id, req.client.id]).then(
        result => res.status(200).json({ department: result }),
        err => res.status(err.code).send(err.msg)),
      err => res.status(err.code).send(err.msg))
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {post} /department/:id/user 02) Add user
 * @apiGroup Department
 * @apiName addUserToDepartment
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} :id department id
 * @apiParam {string} email user email to add
 * @apiParam {boolean} is_sponsor flag to add usr as sponsor
 * @apiSuccess {Object} department department profile
 */
exports.addUser = function (req, res) {
  if (req.client) {
    business.user.findByEmail(req.body.email).then(
      user => business.department.verifySponsor(req.client, req.params.id).then(
        department => business.department.addUser(department, user.id, req.body.is_sponsor).then(
          result => res.status(200).json({ company: result }),
          err => res.status(err.code).send(err.msg)),
        err => res.status(err.code).send(err.msg)),
      err => res.status(err.code).send(err.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {delete} /department/:id/user 03) remove user
 * @apiGroup Department
 * @apiName removeUserFromDepartment
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} :id department id
 * @apiParam {string} user_id user id to remove
 * @apiSuccess {Object} result return true if was successfuly removed
 */
exports.removeUser = function (req, res) {
  if (req.client) {
    user => business.department.verifySponsor(req.client, req.params.id).then(
      department => business.department.removeUser(department, req.body.user_id).then(
        () => res.status(200).json({ result: true }),
        err => res.status(err.code).send(err.msg)),
      err => res.status(err.code).send(err.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}