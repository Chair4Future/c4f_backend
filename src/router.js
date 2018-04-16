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
            "1.0.0": controllers.v1_0_0.user.register,
            "2.0.0": (req, res) => res.json({ error: 'invalid version' })
        }))
        .post('/login', versioning({
            "1.0.0": controllers.v1_0_0.user.login,
        }))
        .post('/chpass', versioning({
            "1.0.0": controllers.v1_0_0.user.changePassword,
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


    app.all('*', (req, res) => {
        res.status(404).json({ 'message': 'Route could not be found' });
    });
};