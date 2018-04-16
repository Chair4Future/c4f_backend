var business = require('../../business/index').v1_0_0;
/**
 * @apiDefine auth
 * 
 * @apiHeader Accept-Version="1.0.0"
 * @apiHeader Content-Type="application/json"
 * @apiError {number} status http status code: 500 to business logic errors and 401 to unauthorized
 * @apiError {string} error error description
 */

/**
 * @api {post} /register 01) Register user
 * @apiGroup Authentication
 * @apiName userRegister
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiParam {string} email valid user email
 * @apiParam {string} password must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters
 * @apiParam {string} name valid user name
 * @apiParam {string} birthdate (optional) user birthdate
 * @apiParam {string} phone (optional) must follow E.164 recommendation
 * @apiParam {string} country_code must follow the standard ISO 3166 alpha-2
 * @apiParam {string} photo (optional) user profile photo
 * @apiSuccess {string} token jwt valid for 8 hours and must be placed at "Authorization" header
 */
exports.register = function (req, res) {
    business.user.register(req.body).then(
        user => {
            business.utils.createToken(user, req.connection.remoteAddress).then(
                token => res.status(200).json({ token: token, user: user.id }),
                error => res.status(error.code).send(error.msg));
        },
        error => res.status(500).send(error.msg));
}

/**
 * @api {post} /login 02) Login user
 * @apiGroup Authentication
 * @apiName userLogin
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiParam {string} email valid email
 * @apiParam {string} password must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters
 * @apiSuccess {string} token jwt valid for 8 hours and must be placed at "Authorization" header
 */
exports.login = function (req, res) {
    business.user.login(req.body).then(
        user => {
            business.utils.createToken(user, req.connection.remoteAddress).then(
                token => res.status(200).json({ token: token, user: user.id }),
                error => res.status(error.code).send(error.msg));
        },
        error => res.status(error.code).send(error.msg));
}

/**
 * @api {post} /chpass 03) Change password
 * @apiGroup Authentication
 * @apiName changePassword
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiParam {string} password new password
 * @apiSuccess {boolean} result return true if was sucessfuly updated
 */
exports.changePassword = function (req, res) {
    if (req.client && req.client.constructor.name === "User") {
        business.user.changePassword(req.client, req.body).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}