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
 * @apiParam {string} city (optional) user living city
 * @apiParam {string} country_code (optional) must follow the standard ISO 3166 alpha-2
 * @apiParam {string} photo (optional) user profile photo
 * @apiParam {string} description (optional) user description
 * @apiSuccess {string} token jwt valid for 8 hours and must be placed at "Authorization" header
 */
exports.register = function (req, res) {
    business.user.register(req.body).then(
        user => {
            business.utils.createToken(user).then(
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
 * @apiSuccess {string} user 
 * @apiSuccessExample {json} response example:
 * {
    "token": "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU2NGZkODNkLWQ2NTItNDI5YS04OWM4LTJjNjJhOWY2ZTRjOSIsImlhdCI6MTUyNzE4NzA5MywiZXhwIjoxNTI3MjE1ODkzfQ.cGRV9PGLdfXgMfTlFjbeOhaPiC_n7F1Xn_2bcy2T7MpctQcNkCf8w2jBbgWMRoCQU1xj_SR4r68hvXUPGy-nqETEEPg4_yJnyxAaoLejSjhxokMtwM0yWWu-8bgR9J4J4MVxCmduX8gGW06UgRv7g7avXqWJBHV5HeOvmuVqps60-Kt5kxiZ2w93bRkpG3edp-1xH3alJokKLSnxBGcrM3ZzbnZbhoAMtKktvnfVLv-I14SbKSgrhPWMAWgRl3fHVuq3FphglwlqUu7WAYHTmGkHV6aa8z_aalZpcynr_-2PiESk2C0Ketij70A4-xJ23mQAMwMytoCpey3Lp9zBgg",
    "user": {
        "id": "564fd83d-d652-429a-89c8-2c62a9f6e4c9",
        "name": "user1",
        "email": "user@a.aa",
        "birthdate": "2018-07-23T05:15:27.000Z",
        "photo": "564fd83d-d652-429a-99f0-b7b39197091f.png",
        "country_code": "PT",
        "city": "Leiria",
        "description": "Some description about me"
        "skills": [
            {
                "id": "69d4b004-e2e0-438f-99f0-b7b39197091f",
                "name": "java",
                "level": 5
            }
        ],
        "experience": [
            {
                "institution": "Minimal Software",
                "function": "Team Leader",
                "actual": true,
                "initDate": "2018-02-28",
                "endDate": null,
                "description": "some work description and responsabilities",
                "is_education": false
            }
        ],
        "links": [
            {
                "id": "69d4b004-e2e0-438f-99f0-b7b39197091f",
                "url": "https://somesocialnetwork.com/myprofile",
                "social": 3
            }
        ],
        "companies": [
            {
                "id": "69d4b004-e2e0-438f-99f0-b7b39197091f",
                "name": "Some company",
                "logo": "564fd83d-d652-429a-99f0-b7b39197091f.png"
            }
        ]
    }
}
 */
exports.login = function (req, res) {
    business.user.login(req.body).then(
        user => {
            business.utils.createToken(user).then(
                token => res.status(200).json({ token: token, user: user }),
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
    if (req.client) {
        business.user.changePassword(req.client, req.body).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {post} /my/link 01) Add link
 * @apiGroup User
 * @apiName addLink
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiParam {string} url personal profile
 * @apiParam {integer} social social network array index
 * @apiParamExample {json} request example:
 * {
   "url": "https://www.linkedin.com/in/admin-example-1a8a44144/",
   "social":2
    }
 * @apiSuccess {object} link return the created link with id
 */
exports.addLink = function (req, res) {
    if (req.client) {
        business.link.create(req.body, req.client).then(
            link => res.status(200).json({ link: link }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {delete} /my/link/:id 02) Remove link
 * @apiGroup User
 * @apiName removeLink
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiParam {string} :id link id to remove
 * @apiSuccess {boolean} result return true if was sucessfuly removed
 */
exports.removeLink = function (req, res) {
    if (req.client) {
        business.link.remove(req.params.id, req.client).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {post} /my/experience 03) Add experience
 * @apiGroup User
 * @apiName addExperience
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiParam {string} institution institution,
   @apiParam {string} function function name,
   @apiParam {boolean} actual flag indicating if still doing function,
   @apiParam {date} initDate init function date,
   @apiParam {date} endDate end function date,
   @apiParam {string} description function description,
   @apiParam {boolean} is_education
   @apiParamExample {json} request example:
   {
    "institution": "Minimal Software",
    "function": "Team Leader",
    "actual": true,
    "initDate": "2018-02-28",
    "endDate": null,
    "description": "some work description and responsabilities",
    "is_education": false
    }
 * @apiSuccess {object} experience return the created experience with id
 */
exports.addExperience = function (req, res) {
    if (req.client) {
        business.experience.create(req.body, req.client).then(
            experience => res.status(200).json({ experience: experience }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {delete} /my/experience/:id 04) Remove experience
 * @apiGroup User
 * @apiName removeExperience
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiParam {string} :id experience id to remove
 * @apiSuccess {object} result return true if was sucessfuly removed
 */
exports.removeExperience = function (req, res) {
    if (req.client) {
        business.experience.remove(req.params.id, req.client).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {post} /my/skill 05) Add skill
 * @apiGroup User
 * @apiName addSkill
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiParam {string} name skill/tecnology name
 * @apiParam {integer} level skill level, (1-5)
 * @apiParamExample {json} request example:
 * {
    "name": "NodeJS",
    "level": "3"
    }
 * @apiSuccess {object} skill return the create skill with id
 */
exports.addSkill = function (req, res) {
    if (req.client) {
        business.skill.addSkillToUser(req.body.name, req.body.level, req.client.id).then(
            skill => res.status(200).json({ skill: skill }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {delete} /my/skill/:id 06) Remove skill
 * @apiGroup User
 * @apiName removeSkill
 * @apiVersion 1.0.0
 * @apiUse auth
 * @apiHeader Authorization="< token >"
 * @apiParam {string} :id skill id to remove
 * @apiSuccess {boolean} result return true if was sucessfuly removed
 */
exports.removeSkill = function (req, res) {
    if (req.client) {
        business.skill.removeSkillFromUser(req.params.id, req.client.id).then(
            () => res.status(200).json({ result: true }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}