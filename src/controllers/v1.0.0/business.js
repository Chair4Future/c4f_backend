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
 * ]
 */
exports.list = function (req, res) {
  if (req.client) {
    business.businessArea.list().then(
      result => res.status(200).json({ business: result }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}