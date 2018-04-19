var business = require('../../business/index').v1_0_0;

/**
 * @api {post} /company 01) Create
 * @apiGroup Company
 * @apiName createCompany
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} name valid name
 * @apiSuccess {Object} business business area created
 * @apiSuccessExample {json} Response example:
 * {
 *    "name": "Instituto Baldes de Massa",
 *    "business": "7d9db945-d3f4-471a-a0f4-37f69c171dea"
 *  }
 */
exports.create = function (req, res) {
  if (req.client) {
    console.log("req.client");
    business.company.create(req.body, req.client).then(
      result => res.status(200).json({ business: result }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {get} /company 02) List
 * @apiGroup Company
 * @apiName listCompanies
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiSuccess {Object} company companies list
 * @apiSuccessExample {json} Response example:
 * {
 *  "company": [
 *  {
 *    "id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *    "name": "International Relationships"
 *  },
 *  {
 *    "id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *    "name": "Software Development"
 *  }
 * ]
 */
exports.list = function (req, res) {
    business.company.list().then(
      result => res.status(200).json({ company: result }),
      error => res.status(error.code).send(error.msg));
}

/**
 * @api {get} /company/:id 03) Get
 * @apiGroup Company
 * @apiName getCompany
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiSuccess {Object} company companies list
 * @apiSuccessExample {json} Response example:
 * {
 *  "company": [
 *  {
 *    "id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *    "name": "International Relationships"
 *  },
 * ]
 */
exports.get = function (req, res) {
  business.company.get(req.params.id).then(
    result => res.status(200).json({ company: result }),
    error => res.status(error.code).send(error.msg));
}