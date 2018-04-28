var business = require('../../business/index').v1_0_0;

/**
 * @api {post} /company 01) Create
 * @apiGroup Company
 * @apiName createCompany
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} name valid name
 * @apiParam {array} business[] business area names
 * @apiParam {string} email (optional) valid email
 * @apiParam {string} phone (optional) must follow E.164 recommendation
 * @apiParam {string} description (optional) company description
 * @apiSuccessExample {json} Response example:
 * {
 *    "name": "Instituto Baldes de Massa",
 *    "business": ["Software Solutions"]
 *  }
 */
exports.create = function (req, res) {
  if (req.client) {
    business.company.create(req.body.name, req.body.description, req.client).then(
      company => {
        let addBusiness = req.body.business.map(element => { return business.business.addCompanyToBusiness(element, company.id) });
        Promise.all(addBusiness).then(
          values => business.department.create("Administration", req.body.email, req.body.phone, company.id, [req.client.id]).then(
            department => res.status(200).json({ company: company }),
            error => res.status(error.code).send(error.msg))),
          error => res.status(500).send(error)
      },
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
 * @apiSuccess {Object} company company profile
 * @apiSuccessExample {json} Response example:
 * {
 *  "company": {
 *    "id": "01f52a4c-fc49-4a97-bbe0-c75e4679cd33",
 *    "name": "IBM",
 *    "description": null,
 *    "User": {
 *      "id": "16acf8fc-087f-4ef3-9236-83ebf42e3147",
 *      "name": "8b450a269a397b04ea10c4b4586a8535"
 *    },
 *    "BusinessArea": [
 *      {
 *        "id": "f8ae926f-39d1-43f5-bdfa-36a2c39c894c",
 *        "name": "International Relationships"
 *      }
 *    ],
 *    "Departments": [],
 *    "Nearshores": [],
 *    "Websections": []
 *  }
 * }
 */
exports.get = function (req, res) {
  business.company.get(req.params.id).then(
    result => res.status(200).json({ company: result }),
    error => res.status(error.code).send(error.msg));
}

exports.addNearshore = (req, res) => {
  business.company.verifyOwner(req.client, req.params.id).then(
    company => business.nearshore.create(req.body, company ).then(
      result => res.status(200).json({ nearshore: result }),
      error => res.status(error.code).send(error.msg)),
    error => res.status(error.code).send(error.msg))
}

exports.removeNearshore = (req, res) => {
  business.company.verifyOwner(req.client, req.params.cid).then(
    company => business.nearshore.remove(req.params.nid, company).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg)),
    error => res.status(error.code).send(error.msg))
}

exports.addWebsection = (req, res) => {
  business.company.verifyOwner(req.client, req.params.id).then(
    company => business.websection.create(req.body, company).then(
      result => res.status(200).json({ websection: result }),
      error => res.status(error.code).send(error.msg)),
    error => res.status(error.code).send(error.msg))
}

exports.updateWebsection = (req, res) => {
  business.company.verifyOwner(req.client, req.params.cid).then(
    company => business.websection.update(req.params.wid, company).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg)),
    error => res.status(error.code).send(error.msg))
}

exports.removeWebsection = (req, res) => {
  business.company.verifyOwner(req.client, req.params.cid).then(
    company => business.websection.remove(req.params.wid, company).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg)),
    error => res.status(error.code).send(error.msg))
}