var business = require('../../business/index').v1_0_0;

/**
 * @apiDefine base
 * 
 * @apiHeader Accept-Version="1.0.0"
 * @apiHeader Content-Type="application/json"
 * @apiError {number} status http status code: 500 to business logic errors and 401 to unauthorized
 * @apiError {string} error error description
 */

/**
 * @api {get} /businessarea 01) List
 * @apiGroup Business
 * @apiName listBusiness
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiSuccess {Object} business business area list
 * @apiSuccessExample {json} Response example:
 * {
 *  "business": [
 *  {
 *    "id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *    "name": "International Relationships"
 *  },
 *  {
 *    "id": "7d9db945-d3f4-471a-a0f4-37f69c171dea",
 *    "name": "Software Development"
 *  }
 * ]}
 */
exports.list = function (req, res) {
  if (req.client) {
    business.business.list().then(
      result => res.status(200).json({ business: result }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {get} /business/:id/company 02) List Companies
 * @apiGroup Business
 * @apiName listBusinessCompanies
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiSuccess {Object} company companies list
 * @apiSuccessExample {json} Response example:
 * {
    "company": [
        {
            "id": "69d4b004-e2e0-438f-99f0-b7b39197091f",
            "name": "Some company",
            "logo": null
        }
    ]
  }
 */
exports.getCompanies = function (req, res) {
  if (req.client) {
    business.business.getCompanies(req.params.id).then(
      result => res.status(200).json({ company: result }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}
