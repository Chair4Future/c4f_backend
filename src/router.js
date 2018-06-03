// ROUTES FOR OUR API
// =============================================================================
module.exports = (app) => {
    var controllers = require('./controllers/index'),
        versioning = require('express-routes-versioning')();

    app
        /*________________________________________________check
        *_____________________USERS_______________________
        *_________________________________________________*/
        .post('/register', versioning({
            "1.0.0": controllers.v1_0_0.user.register
        }))
        .post('/login', versioning({
            "1.0.0": controllers.v1_0_0.user.login,
        }))
        .post('/chpass', versioning({
            "1.0.0": controllers.v1_0_0.user.changePassword,
        }))
        .get('/my/profile', versioning({
            "1.0.0": controllers.v1_0_0.user.getProfile,
        }))
        .put('/my/profile', versioning({
            "1.0.0": controllers.v1_0_0.user.updateProfile,
        }))
        .post('/my/skill', versioning({
            "1.0.0": controllers.v1_0_0.user.addSkill,
        }))
        .delete('/my/skill/:id', versioning({
            "1.0.0": controllers.v1_0_0.user.removeSkill,
        }))
        .post('/my/link', versioning({
            "1.0.0": controllers.v1_0_0.user.addLink,
        }))
        .delete('/my/link/:id', versioning({
            "1.0.0": controllers.v1_0_0.user.removeLink,
        }))
        .post('/my/experience', versioning({
            "1.0.0": controllers.v1_0_0.user.addExperience,
        }))
        .delete('/my/experience/:id', versioning({
            "1.0.0": controllers.v1_0_0.user.removeExperience,
        }))
        /*________________________________________________
        *___________________BUSINESS______________________
        *_________________________________________________*/
        .get('/business', versioning({
            "1.0.0": controllers.v1_0_0.business.list,
        }))
        .get('/business/:id/company', versioning({
            "1.0.0": controllers.v1_0_0.business.getCompanies,
        }))
        /*________________________________________________
        *_____________________SKILL_______________________
        *_________________________________________________*/
        .get('/skill', versioning({
            "1.0.0": controllers.v1_0_0.skill.list,
        }))
        /*________________________________________________
        *______________________TAG________________________
        *_________________________________________________*/
        .get('/tag', versioning({
            "1.0.0": controllers.v1_0_0.tag.list,
        }))
        /*________________________________________________
        *___________________COMPANY_______________________
        *_________________________________________________*/
        .post('/company', versioning({
            "1.0.0": controllers.v1_0_0.company.create,
        }))
        .get('/company', versioning({
            "1.0.0": controllers.v1_0_0.company.list,
        }))
        .get('/company/:id', versioning({
            "1.0.0": controllers.v1_0_0.company.get,
        }))
        .put('/company/:id', versioning({
            "1.0.0": controllers.v1_0_0.company.update,
        }))
        .delete('/company/:id', versioning({
            "1.0.0": controllers.v1_0_0.company.remove,
        }))
        .post('/company/:id/nearshore', versioning({
            "1.0.0": controllers.v1_0_0.company.addNearshore,
        }))
        .delete('/company/:cid/nearshore/:nid', versioning({
            "1.0.0": controllers.v1_0_0.company.removeNearshore,
        }))
        .post('/company/:id/websection', versioning({
            "1.0.0": controllers.v1_0_0.company.addWebsection,
        }))
        .put('/company/:cid/websection/:wid', versioning({
            "1.0.0": controllers.v1_0_0.company.updateWebsection,
        }))
        .delete('/company/:cid/websection/:wid', versioning({
            "1.0.0": controllers.v1_0_0.company.removeWebsection,
        }))
        .post('/company/:id/department', versioning({
            "1.0.0": controllers.v1_0_0.company.addDepartment,
        }))
        .delete('/company/:cid/department/:did', versioning({
            "1.0.0": controllers.v1_0_0.company.removeDepartment,
        }))
        /*________________________________________________
        *__________________DEPARTMENT_____________________
        *_________________________________________________*/
        .post('/department/:id/user', versioning({
            "1.0.0": controllers.v1_0_0.department.addUser,
        }))
        .get('/department/:id/user', versioning({
            "1.0.0": controllers.v1_0_0.department.getUsers,
        }))
        .delete('/department/:id/user/:uid', versioning({
            "1.0.0": controllers.v1_0_0.department.removeUser,
        }))
        /*________________________________________________
        *_____________________FILES_______________________
        *_________________________________________________*/
        .post('/file', versioning({
            "1.0.0": controllers.v1_0_0.manage.fileUpload
        }))
        .get('/file/:id', versioning({
            "1.0.0": controllers.v1_0_0.manage.fileDownload
        }))
        /*________________________________________________
        *_________________PUBLICATION_____________________
        *_________________________________________________*/
        .post('/publication', versioning({
            "1.0.0": controllers.v1_0_0.publication.create,
        }))
        .get('/publication/all', versioning({
            "1.0.0": controllers.v1_0_0.publication.listAll,
        }))
        .get('/publication/company/:id', versioning({
            "1.0.0": controllers.v1_0_0.publication.listByCompany,
        }))
        .get('/publication/tag/:id', versioning({
            "1.0.0": controllers.v1_0_0.publication.listByTag,
        }))
        .put('/publication/:id/authorize', versioning({
            "1.0.0": controllers.v1_0_0.publication.authorize,
        }))
        .delete('/publication/:id', versioning({
            "1.0.0": controllers.v1_0_0.publication.remove,
        }))
        /*________________________________________________
        *_____________________TRASH_______________________
        *_________________________________________________*/
        .get('/destroy', versioning({
            "1.0.0": controllers.v1_0_0.manage.destroyAll
        }))
        .get('/testdb', versioning({
            "1.0.0": controllers.v1_0_0.manage.testDb
        }))
        .get('/company/:id/verifyuser', versioning({
            "1.0.0": controllers.v1_0_0.manage.verifyUser
        }))


    app.all('*', (req, res) => {
        res.status(404).json({ 'message': 'Route could not be found' });
    });
};