var business = require('../../business/index').v1_0_0;

/**
 * @api {get} /skill 01) List
 * @apiGroup Skill
 * @apiName listSkill
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiSuccess {Object} skill skill list
 * @apiSuccessExample {json} Response example:
 * {
    "skill": [
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
    business.skill.list().then(
      result => res.status(200).json({ skill: result }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}