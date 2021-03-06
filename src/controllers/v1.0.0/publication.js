var business = require('../../business/index').v1_0_0;

/**
 * @api {post} /publication 01) Create
 * @apiGroup Publication
 * @apiName createPublication
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} title publication title
 * @apiParam {string} resume (optional) publication resume to feed
 * @apiParam {string} text publication full description
 * @apiParam {string} brand_image (optional) image filename to brand image
 * @apiParam {string} detailed_image (optional) image filename to details
 * @apiParam {string} company_id related company id
 * @apiParam {array} tag[] tags names
 * @apiParamExample {Object} Response example:
 * {
    "title":"Publication title",
    "resume":"Vestibulum a elit eu nisl feugiat tempus. Aliquam maximus ut velit sit amet consequat. Donec ut consequat dolor. Aliquam cursus quis ipsum a vestibulum. Fusce auctor posuere tempus. Donec sagittis congue ullamcorper.",
    "text":"Ut non felis et ipsum faucibus gravida non vel felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ex nibh, sollicitudin sit amet est in, tempus accumsan urna. Duis ipsum est, eleifend eu sapien in, vehicula accumsan lectus. In eu tellus malesuada, elementum lectus id, rhoncus magna. Nam eu sapien id neque ornare suscipit. Quisque laoreet nunc a pellentesque tincidunt. Ut lacinia, nunc et ultricies lacinia, tellus mi pretium orci, et accumsan mauris leo ut mi. Proin suscipit, ipsum id blandit placerat, dolor sapien laoreet ex, vel iaculis risus ex sed dui. Nunc sed felis vel metus cursus sollicitudin ac quis tellus. Nam vulputate fringilla quam, id porta turpis placerat vel. Nam tristique neque at felis mattis, ut aliquet ligula ultricies. Proin ante purus, aliquet vitae nibh vitae, sollicitudin aliquet ex. Cras et tortor tellus.",
    "brand_image":"69d4b004-e2e0-438f-99f0-b7b39197091f.jpg",
    "detailed_image":"b96fc30e-16da-4463-96af-d9fed68a0da9.png",
    "company_id":"69d4b004-e2e0-438f-99f0-b7b39197091f",
    "tag":["hightech", ".net"]
  }
 * @apiSuccess {json} publication created publication
 */
exports.create = function (req, res) {
  if (req.client) {
    business.company.verifyCollaborator(req.client, req.body.company_id).then(
      company => {
        if (req.body.tag && req.body.tag.length > 0) {
          let getTags = req.body.tag.map(element => { return business.tag.findOrCreate(element) });
          Promise.all(getTags).then(
            tags => business.publication.create(req.body, req.client, company.user_id === req.client.id).then(
              publication => {
                let setTags = tags.map(tag => { return business.tag.setPublication(tag, publication) });
                Promise.all(setTags).then(
                  () => res.status(200).json({ publication: publication }),
                  error => res.status(500).send(error));
              }, error => res.status(error.code).send(error.msg)),
            error => res.status(500).send(error));
        } else {
          business.publication.create(req.body, req.client, company.user_id === req.client.id).then(
            publication => res.status(200).json({ publication: publication }),
            error => res.status(500).send(error));
        }
      }, error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {get} /publication/all 02) List all
 * @apiGroup Publication
 * @apiName listAllPublication
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiSuccess {object} publication publications list
 * @apiSuccessExample {json} Response example:
 * {
    "publication": [
        {
            "datetime": "2018-05-24T17:02:41.834Z",
            "likes": 0,
            "dislikes": 0,
            "approved": true,
            "_id": "5b06f033c432f1310d6633ba",
            "title": "Publication title",
            "resume": "Vestibulum a elit eu nisl feugiat tempus. Aliquam maximus ut velit sit amet consequat. Donec ut consequat dolor. Aliquam cursus quis ipsum a vestibulum. Fusce auctor posuere tempus. Donec sagittis congue ullamcorper.",
            "text": "Ut non felis et ipsum faucibus gravida non vel felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ex nibh, sollicitudin sit amet est in, tempus accumsan urna. Duis ipsum est, eleifend eu sapien in, vehicula accumsan lectus. In eu tellus malesuada, elementum lectus id, rhoncus magna. Nam eu sapien id neque ornare suscipit. Quisque laoreet nunc a pellentesque tincidunt. Ut lacinia, nunc et ultricies lacinia, tellus mi pretium orci, et accumsan mauris leo ut mi. Proin suscipit, ipsum id blandit placerat, dolor sapien laoreet ex, vel iaculis risus ex sed dui. Nunc sed felis vel metus cursus sollicitudin ac quis tellus. Nam vulputate fringilla quam, id porta turpis placerat vel. Nam tristique neque at felis mattis, ut aliquet ligula ultricies. Proin ante purus, aliquet vitae nibh vitae, sollicitudin aliquet ex. Cras et tortor tellus.",
            "brand_image": "69d4b004-e2e0-438f-99f0-b7b39197091f.jpg",
            "detailed_image": "b96fc30e-16da-4463-96af-d9fed68a0da9.png",
            "sender": "f52273ea-f05f-4d3b-ac57-a974060526b7",
            "company_id": "0a9f8e01-88f4-4809-a4b9-15f4399b22bb",
            "company_name": "Instituto Baldes De Massa 2",
            "company_logo": "b96fc30e-16da-4463-96af-d9fed68a0da9.png"
        }
    ]
  }
 */
exports.listAll = function (req, res) {
  if (req.client) {
    business.publication.listAll().then(
      publications => res.status(200).json({ publication: publications }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {get} /publication/tag/:id 03) List by tag
 * @apiGroup Publication
 * @apiName listPublicationsByTag
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} :id tag id
 * @apiSuccess {object} publication publications list by tag
 * @apiSuccessExample {json} Response example:
 * {
    "publication": [
        {
            "datetime": "2018-05-24T17:02:41.834Z",
            "likes": 0,
            "dislikes": 0,
            "approved": true,
            "_id": "5b06f033c432f1310d6633ba",
            "title": "Publication title",
            "resume": "Vestibulum a elit eu nisl feugiat tempus. Aliquam maximus ut velit sit amet consequat. Donec ut consequat dolor. Aliquam cursus quis ipsum a vestibulum. Fusce auctor posuere tempus. Donec sagittis congue ullamcorper.",
            "text": "Ut non felis et ipsum faucibus gravida non vel felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ex nibh, sollicitudin sit amet est in, tempus accumsan urna. Duis ipsum est, eleifend eu sapien in, vehicula accumsan lectus. In eu tellus malesuada, elementum lectus id, rhoncus magna. Nam eu sapien id neque ornare suscipit. Quisque laoreet nunc a pellentesque tincidunt. Ut lacinia, nunc et ultricies lacinia, tellus mi pretium orci, et accumsan mauris leo ut mi. Proin suscipit, ipsum id blandit placerat, dolor sapien laoreet ex, vel iaculis risus ex sed dui. Nunc sed felis vel metus cursus sollicitudin ac quis tellus. Nam vulputate fringilla quam, id porta turpis placerat vel. Nam tristique neque at felis mattis, ut aliquet ligula ultricies. Proin ante purus, aliquet vitae nibh vitae, sollicitudin aliquet ex. Cras et tortor tellus.",
            "brand_image": "69d4b004-e2e0-438f-99f0-b7b39197091f.jpg",
            "detailed_image": "b96fc30e-16da-4463-96af-d9fed68a0da9.png",
            "sender": "f52273ea-f05f-4d3b-ac57-a974060526b7",
            "company_id": "0a9f8e01-88f4-4809-a4b9-15f4399b22bb",
            "company_name": "Instituto Baldes De Massa 2",
            "company_logo": "b96fc30e-16da-4463-96af-d9fed68a0da9.png"
        }
    ]
  }
 */
exports.listByTag = function (req, res) {
  if (req.client) {
    business.tag.getPublications(req.params.id).then(
      publications => res.status(200).json({ publication: publications }),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {get} /publication/company/:id 04) List by company
 * @apiGroup Publication
 * @apiName listPublicationsByCompany
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} :id company id
 * @apiSuccess {object} publication publications list by company
 * @apiSuccessExample {json} Response example:
 * {
    "publication": [
        {
            "datetime": "2018-05-24T17:02:41.834Z",
            "likes": 0,
            "dislikes": 0,
            "approved": true,
            "_id": "5b06f033c432f1310d6633ba",
            "title": "Publication title",
            "resume": "Vestibulum a elit eu nisl feugiat tempus. Aliquam maximus ut velit sit amet consequat. Donec ut consequat dolor. Aliquam cursus quis ipsum a vestibulum. Fusce auctor posuere tempus. Donec sagittis congue ullamcorper.",
            "text": "Ut non felis et ipsum faucibus gravida non vel felis. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam ex nibh, sollicitudin sit amet est in, tempus accumsan urna. Duis ipsum est, eleifend eu sapien in, vehicula accumsan lectus. In eu tellus malesuada, elementum lectus id, rhoncus magna. Nam eu sapien id neque ornare suscipit. Quisque laoreet nunc a pellentesque tincidunt. Ut lacinia, nunc et ultricies lacinia, tellus mi pretium orci, et accumsan mauris leo ut mi. Proin suscipit, ipsum id blandit placerat, dolor sapien laoreet ex, vel iaculis risus ex sed dui. Nunc sed felis vel metus cursus sollicitudin ac quis tellus. Nam vulputate fringilla quam, id porta turpis placerat vel. Nam tristique neque at felis mattis, ut aliquet ligula ultricies. Proin ante purus, aliquet vitae nibh vitae, sollicitudin aliquet ex. Cras et tortor tellus.",
            "brand_image": "69d4b004-e2e0-438f-99f0-b7b39197091f.jpg",
            "detailed_image": "b96fc30e-16da-4463-96af-d9fed68a0da9.png",
            "sender": "f52273ea-f05f-4d3b-ac57-a974060526b7",
            "company": "69d4b004-e2e0-438f-99f0-b7b39197091f"
        }
    ]
  }
 */
exports.listByCompany = function (req, res) {
  if (req.client) {
    business.company.verifyOwner(req.client, req.params.id).then(
      () => business.publication.listByCompany(req.params.id, true).then(
        publications => res.status(200).json({ publication: publications }),
        error => res.status(error.code).send(error.msg)),
      error => business.publication.listByCompany(req.params.id, false).then(
        publications => res.status(200).json({ publication: publications }),
        error => res.status(error.code).send(error.msg)));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {put} /publication/:id/authorize 05) Authorize publication
 * @apiGroup Publication
 * @apiName authorizePublication
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} :id publication id
 * @apiSuccess {boolean} result returns true if was successfuly authorized
 */
exports.authorize = function (req, res) {
  if (req.client) {
    business.publication.findById(req.params.id).then(
      publication => business.company.verifyOwner(req.client, publication.company).then(
        () => business.publication.authorize(publication).then(
          () => res.status(200).json({ result: true }),
          error => res.status(error.code).send(error.msg)),
        error => res.status(401).send("Unauthorized")),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}

/**
 * @api {delete} /publication/:id 06) Remove publication
 * @apiGroup Publication
 * @apiName removePublication
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {string} :id publication id
 * @apiSuccess {boolean} result returns true if was successfuly removed
 */
exports.remove = function (req, res) {
  if (req.client) {
    business.publication.findById(req.params.id).then(
      publication => business.company.verifyOwner(req.client, publication.company).then(
        () => business.publication.remove(publication).then(
          () => res.status(200).json({ result: true }),
          error => res.status(error.code).send(error.msg)),
        error => res.status(401).send("Unauthorized")),
      error => res.status(error.code).send(error.msg));
  } else {
    res.status(401).send("Unauthorized");
  }
}