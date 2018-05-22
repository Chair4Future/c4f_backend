var uuidv4 = require('uuid/v4'),
    business = require('../../business/index').v1_0_0;

/**
 * @api {post} /file 01) Upload
 * @apiGroup Files
 * @apiName fileUpload
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {File} name html input name must be "file"
 * @apiSuccess {String} filename new filename to file
 */
exports.fileUpload = (req, res) => {
    if (req.client) {
        business.utils.upload('file').then(
            upload => upload(req, res, (err) => {
                let path = req.file.path.split('/');
                if (err) res.status(500).send(err.message);
                else res.status(200).json({ filename: path[path.length - 1] });
            }),
            error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

/**
 * @api {get} /file/:id 02) Download
 * @apiGroup Files
 * @apiName fileDownload
 * @apiVersion 1.0.0
 * @apiUse base
 * @apiParam {String} :id filename
 */
exports.fileDownload = (req, res) => {
    if (req.client) {
        business.utils.download(req.params.id).then(
            download => {
                res.writeHead(200, download.header);
                res.end(download.file, 'binary');
            }, error => res.status(error.code).send(error.msg));
    } else {
        res.status(401).send("Unauthorized");
    }
}

exports.destroyAll = function (req, res) {
    business.utils.deleteAll().then(
        () => res.status(200).json({ success: true }),
        error => res.status(500).send(error.msg)
    );
}

exports.testDb = function (req, res) {
    business.utils.deleteAll().then(
        () => business.utils.testSeed().then(
            res.status(200).json({ success: true }),
            error => res.status(500).send(error.msg)),
        error => res.status(500).send(error.msg));
}