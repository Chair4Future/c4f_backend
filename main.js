// server.js

// BASE SETUP
// =============================================================================
var cluster = require('cluster');
// Get the env variables from .env
require('dotenv').config();

if (cluster.isMaster) {
    var db = require('./src/models/index');
    db.sequelize.sync().then(
        () => {
            require('./src/models/seed').seed(db).then(
                () => {
                    console.log('\x1b[32m%s\x1b[0m.', '(PLAIN) Connection established with MongoDB and MySQL');

                    var cpus = require('os').cpus().length
                    console.log('Master cluster setting up ' + cpus + ' workers...');

                    for (var i = 0; i < cpus; i++) {
                        cluster.fork();
                    }

                    cluster.on('exit', function (worker, code, signal) {
                        console.log('Worker ' + worker.process.pid + ' died with code: ' + code + ', and signal: ' + signal + '-> Starting a new worker');
                        cluster.fork();
                    });
                },
                error => {
                    console.log('Unable to seed Databases.', error.message);
                    process.exit(1);
                }
            )
        },
        error => {
            console.log('Unable to connect to Databases.', error);
            process.exit(1);
        });
} else {
    // call the packages we need
    var express = require('express'),           // call express
        // https = require('https'),
        // fs = require("fs"),
        path = require('path'),
        router = require('./src/router'),
        middleware=require('./src/middleware');

    // START THE SERVER
    // =============================================================================
    // define our app using express
    var app = express();

    // Present SPA
    app.use('/', express.static(path.resolve(__dirname, 'public')));
    // Present Documentation
    app.use('/docs', express.static(path.resolve(__dirname, 'docs')));
    // middleware routes
    middleware(app);
    // Register routes
    router(app);

    // Define the listenning port
    var port = process.env.PORT || 3000;
    // start http server
    app.listen(port, () => {
        // https://stackoverflow.com/questions/9781218/how-to-change-node-jss-console-font-color
        console.log('\x1b[32m%s %d\x1b[0m.', '(PLAIN) Server http listening on port', port);
    });

    // //set options to https
    // const options = {
    //     key: fs.readFileSync(__dirname + "/app/keys/https_key.pem"),
    //     cert: fs.readFileSync(__dirname + "/app/keys/https_cert.pem"),
    //     ca: fs.readFileSync(__dirname + "/app/keys/https_ca.pem"),
    //     dhparam: fs.readFileSync(__dirname + "/app/keys/https_dhparam.pem")
    // };
    // // start https server
    // https.createServer(options, app).listen(8080, () => {
    //     console.log('\x1b[32m%s %d\x1b[0m.', '(PLAIN) Server https listening on port', port);
    // });
}