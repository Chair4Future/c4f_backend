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
 * @apiParam {string} logo (optional) logo filename
 * @apiParam {string} banner (optional) banner filename
 * @apiParam {string} collaborators (optional) number of collaborators
 * @apiParamExample {Object} Response example:
 * {
 *    "name": "Instituto Baldes de Massa",
 *    "business": ["Software Solutions"]
 *  }
 * @apiSuccess {json} company created company
 */
exports.create = function (req, res) {
  if (req.client) {
    business.company.create(req.body, req.client).then(
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
 *    "logo": "e9be456d-23cd-4997-8dd6-408e6b1fec86.jpg",
      "banner": "e9be456d-23cd-4997-8dd6-408e6b1fec86.jpg",
      "collaborators": "123",
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

/**
 * @api {put} /company/:id 04) Update
 * @apiGroup Company
 * @apiName getCompany
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} name (optional) valid name
 * @apiParam {string} description (optional) company description
 * @apiParam {string} logo (optional) logo filename
 * @apiParam {string} banner (optional) banner filename
 * @apiParam {string} collaborators (optional) number of collaborators
 * @apiSuccess {boolean} result returns false if was successfuly updated
 */
exports.update = (req, res) => {
  business.company.verifyOwner(req.client, req.params.id).then(
    company => business.company.update(req.body, company).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg)),
    error => res.status(error.code).send(error.msg))
}

/**
 * @api {post} /company/:id/nearshore 05) Add nearshore
 * @apiGroup Company
 * @apiName addNearshore
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {array} country_code must follow the standard ISO 3166 alpha-2
 * @apiParam {string} city
 * @apiParam {string} address (optional) address
 * @apiSuccess {Object} nearshore created nearshore
 * @apiSuccessExample {json} Response example:
 * {
    "nearshore": {
        "id": "816a3a62-5755-4afe-9a27-7a09af5e5085",
        "country_code": "PT",
        "city": "Lisboa",
        "address": "Parque das Nações nº12",
        "company_id": "e9be456d-23cd-4997-8dd6-408e6b1fec86",
        "updated_at": "2018-05-17T17:53:59.244Z",
        "created_at": "2018-05-17T17:53:59.244Z"
    }
}
 */
exports.addNearshore = (req, res) => {
  business.company.verifyOwner(req.client, req.params.id).then(
    company => business.nearshore.create(req.body, company).then(
      result => res.status(200).json({ nearshore: result }),
      error => res.status(error.code).send(error.msg)),
    error => res.status(error.code).send(error.msg))
}

/**
 * @api {delete} /company/:cid/nearshore/:nid 06) Remove nearshore
 * @apiGroup Company
 * @apiName removeNearshore
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiSuccess {boolean} result returns false if was successfuly removed
 */
exports.removeNearshore = (req, res) => {
  business.company.verifyOwner(req.client, req.params.cid).then(
    company => business.nearshore.remove(req.params.nid, company).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg)),
    error => res.status(error.code).send(error.msg))
}

/**
 * @api {post} /company/:id/websection 07) Add websection
 * @apiGroup Company
 * @apiName addWebsection
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} title
 * @apiParam {string} text description of the section
 * @apiParam {string} code (optional) code of the section layout
 * @apiParam {string} image (optional) image filename to section
 * @apiSuccess {Object} nearshore created nearshore
 * @apiSuccessExample {json} Response example:
 * {
    "websection": {
        "id": "2befd00b-3af0-4b83-a9d7-b49f4e7320d5",
        "title": "who we are",
        "text": "Some company",
        "image": "picture.jpg",
        "code": 1,
        "company_id": "e9be456d-23cd-4997-8dd6-408e6b1fec86",
        "updated_at": "2018-05-17T18:03:35.244Z",
        "created_at": "2018-05-17T18:03:35.244Z"
    }
}
 */
exports.addWebsection = (req, res) => {
  business.company.verifyOwner(req.client, req.params.id).then(
    company => business.websection.create(req.body, company).then(
      result => res.status(200).json({ websection: result }),
      error => res.status(error.code).send(error.msg)),
    error => res.status(error.code).send(error.msg))
}

/**
 * @api {put} /company/:cid/websection/:wid 08) Update websection
 * @apiGroup Company
 * @apiName updateWebsection
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} title
 * @apiParam {string} text description of the section
 * @apiParam {string} code (optional) code of the section layout
 * @apiParam {string} image (optional) image filename to section
 * @apiSuccess {boolean} result returns false if was successfuly updated
 */
exports.updateWebsection = (req, res) => {
  business.company.verifyOwner(req.client, req.params.cid).then(
    company => business.websection.update(req.params.wid, req.body, company).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg)),
    error => res.status(error.code).send(error.msg))
}

/**
 * @api {delete} /company/:cid/websection/:wid 09) Remove websection
 * @apiGroup Company
 * @apiName removeNearshore
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiSuccess {boolean} result returns false if was successfuly removed
 */
exports.removeWebsection = (req, res) => {
  business.company.verifyOwner(req.client, req.params.cid).then(
    company => business.websection.remove(req.params.wid, company).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg)),
    error => res.status(error.code).send(error.msg))
}

/**
 * @api {post} /company/:id/department 10) Add department
 * @apiGroup Company
 * @apiName addDepartment
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} name valid name
 * @apiParam {string} email (optional) valid email
 * @apiParam {string} phone (optional) must follow E.164 recommendation
 * @apiParam {string} sponsor_email email of the department's sponsor, must be registered
 * @apiSuccess {Object} department department created
 * @apiSuccessExample {json} Response example:
 * {
    "department": {
        "id": "2ecf4114-7e24-47ee-8d48-f0f361e30403",
        "name": "Markting",
        "company_id": "e9be456d-23cd-4997-8dd6-408e6b1fec86",
        "email": "depart@hat.com",
        "phone": "911234564",
        "updated_at": "2018-05-17T17:51:48.759Z",
        "created_at": "2018-05-17T17:51:48.759Z"
    }
 * }
 */
exports.addDepartment = function (req, res) {
  if (req.client) {
    business.company.verifyOwner(req.client, req.params.id).then(
      company => business.user.findByEmail(req.body.sponsor_email).then(
        user => business.department.create(req.body.name, req.body.email, req.body.phone, company.id, [user.id, req.client.id]).then(
          result => res.status(200).json({ department: result }),
          err => res.status(err.code).send(err.msg)),
        err => res.status(err.code).send(err.msg)),
      err => res.status(err.code).send(err.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {delete} /company/:cid/department/:did 11) Remove department
 * @apiGroup Company
 * @apiName removeDepartment
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiSuccess {boolean} result returns false if was successfuly removed
 */
exports.removeDepartment = (req, res) => {
  business.company.verifyOwner(req.client, req.params.cid).then(
    company => business.department.remove(req.params.did, company).then(
      () => res.status(200).json({ result: true }),
      error => res.status(error.code).send(error.msg)),
    error => res.status(error.code).send(error.msg))
}