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
 *  "skill": [
 * ]
 */
exports.list = function (req, res) {
  if (req.client) {
    business.skill.list().then(
      result => res.status(200).json({ skill: skill }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}