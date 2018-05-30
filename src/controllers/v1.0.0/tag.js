var business = require('../../business/index').v1_0_0;

/**
 * @api {get} /tag 01) List
 * @apiGroup Tag
 * @apiName listTag
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiSuccess {Object} tag tags list
 * @apiSuccessExample {json} Response example:
 * {
    "tag": [
        {
            "id": "c6db7ebc-aebb-4977-b0cd-8cf0c4c7d7df",
            "name": "NodeJS"
        }
    ]
  }
 */
exports.list = function (req, res) {
  console.log("contrller");
  if (req.client) {
    business.tag.list().then(
      result => res.status(200).json({ tag: result }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}