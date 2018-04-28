var db = require('../../models/index'),
    utils = require('./utils');

exports.register = (attributes) => {
    return new Promise((resolve, reject) => {
        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(attributes.password)) {
            if (/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/.test(attributes.email)) {
                if (/[A-Z][a-zA-Z\'áéíóõãÁÉÍÓãõâêîôûÃÕÂÊÎÔÛ][^#&<>\"~;$^%{}?!*+_\-»«@£§€ªº,0-9]{1,50}$/.test(attributes.name)) {
                    if (!attributes.country_code || /^(AF|AX|AL|DZ|AS|AD|AO|AI|AQ|AG|AR|AM|AW|AU|AT|AZ|BS|BH|BD|BB|BY|BE|BZ|BJ|BM|BT|BO|BQ|BA|BW|BV|BR|IO|BN|BG|BF|BI|KH|CM|CA|CV|KY|CF|TD|CL|CN|CX|CC|CO|KM|CG|CD|CK|CR|CI|HR|CU|CW|CY|CZ|DK|DJ|DM|DO|EC|EG|SV|GQ|ER|EE|ET|FK|FO|FJ|FI|FR|GF|PF|TF|GA|GM|GE|DE|GH|GI|GR|GL|GD|GP|GU|GT|GG|GN|GW|GY|HT|HM|VA|HN|HK|HU|IS|IN|ID|IR|IQ|IE|IM|IL|IT|JM|JP|JE|JO|KZ|KE|KI|KP|KR|KW|KG|LA|LV|LB|LS|LR|LY|LI|LT|LU|MO|MK|MG|MW|MY|MV|ML|MT|MH|MQ|MR|MU|YT|MX|FM|MD|MC|MN|ME|MS|MA|MZ|MM|NA|NR|NP|NL|NC|NZ|NI|NE|NG|NU|NF|MP|NO|OM|PK|PW|PS|PA|PG|PY|PE|PH|PN|PL|PT|PR|QA|RE|RO|RU|RW|BL|SH|KN|LC|MF|PM|VC|WS|SM|ST|SA|SN|RS|SC|SL|SG|SX|SK|SI|SB|SO|ZA|GS|SS|ES|LK|SD|SR|SJ|SZ|SE|CH|SY|TW|TJ|TZ|TH|TL|TG|TK|TO|TT|TN|TR|TM|TC|TV|UG|UA|AE|GB|US|UM|UY|UZ|VU|VE|VN|VG|VI|WF|EH|YE|ZM|ZW)$/.test(attributes.country_code)) {
                        if (!attributes.phone || /\+\d{9,15}$/.test(attributes.phone)) {
                            if (attributes.phone) {
                                let encrypted = utils.encrypt([attributes.email, attributes.password, attributes.name, attributes.phone]);
                                if (!encrypted.err) {
                                    db.User.create({
                                        email: encrypted.value[0],
                                        password: encrypted.value[1],
                                        name: encrypted.value[2],
                                        phone: encrypted.value[3],
                                        birthdate: attributes.birthdate,
                                        country_code: attributes.country_code,
                                        photo: attributes.photo
                                    }).then(
                                        res => resolve(res),
                                        err => reject({ code: 500, msg: err.message }))
                                } else reject({ code: 500, msg: encrypted.err.message });
                            }
                            else {
                                let encrypted = utils.encrypt([attributes.email, attributes.password, attributes.name]);
                                if (!encrypted.err) {
                                    db.User.create({
                                        email: encrypted.value[0],
                                        password: encrypted.value[1],
                                        name: encrypted.value[2],
                                        birthdate: attributes.birthdate,
                                        country_code: attributes.country_code,
                                        photo: attributes.photo
                                    }).then(
                                        res => resolve(res),
                                        err => reject({ code: 500, msg: err.message }))
                                } else reject({ code: 500, msg: encrypted.err.message });
                            }
                        } else reject({ code: 500, msg: "invalid phone number, must follow E.164 recommendation, this field is optional" });
                    } else reject({ code: 500, msg: "invalid country code, must follow the standard ISO 3166 alpha-2, this field is optional" });
                } else reject({ code: 500, msg: "invalid name" });
            } else reject({ code: 500, msg: "invalid email" });
        } else reject({ code: 500, msg: "invalid password, must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters" });
    });
}

exports.login = (attributes) => {
    return new Promise((resolve, reject) => {
        let encrypted = utils.encrypt([attributes.email, attributes.password]);
        if (!encrypted.err) {
            db.User.findOne({ where: { email: encrypted.value[0], password: encrypted.value[1] } }).then(
                res => {
                    if (res) {
                        resolve({
                            id: res.id,
                            name: utils.decrypt(res.name),
                            email: utils.decrypt(res.email),
                            birthdate: res.birthdate,
                            photo: res.photo,
                            country_code: res.country_code
                        });
                    }
                    else { reject({ code: 500, msg: "email and password don't match" }); }
                }, err => reject({ code: 500, msg: err.message }));
        } else reject({ code: 500, msg: encrypted.err.message });
    });
}

exports.changePassword = (user, attributes) => {
    return new Promise((resolve, reject) => {
        if (/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[A-Za-z\d$@$!%*#?&-.]{8,}$/.test(attributes.password)) {
            let encrypted = utils.encrypt([attributes.password]);
            if (!encrypted.err) {
                user.update({ password: encrypted.value[0] }).then(
                    () => resolve(),
                    err => reject({ code: 500, msg: err.message }));
            } else reject({ code: 500, msg: encrypted.err.message });
        } else reject({ code: 500, msg: "invalid password, must have at least one uppercase letter, one lowercase, one digit and a minimum 8 characters" });
    });
}

exports.findByEmail = (email) => {
    return new Promise((resolve, reject) => {
        let encrypted = utils.encrypt([email]);
        if (!encrypted.err) {
            db.User.findOne({ where: { email: encrypted.value[0] } }).then(
                res => {
                    if (res) { resolve(res); }
                    else { reject({ code: 500, msg: "user not registered" }); }
                }, err => reject({ code: 500, msg: err.message }));
        } else reject({ code: 500, msg: encrypted.err.message });
    });
}