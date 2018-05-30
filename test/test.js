var request = require("request"),
    assert = require('assert'),
    port = process.env.PORT || 8080;
var base_url = "http://localhost:3000/";
var user_headers = { "Accept-Version": "1.0.0", "Content-Type": "application/json" };
var admin_headers = { "Accept-Version": "1.0.0", "Content-Type": "application/json" };
var user;

describe("Tests", () => {

    before((done) => {
        request.get(base_url + "testdb", (error, response, body) => {
            assert.equal(200, response.statusCode);
            done();
        });
    });


    /**
     * ______________________________________________________________________________________
     * ________________________________AUTHENTICATION________________________________________
     * ______________________________________________________________________________________
     */


    it("POST /register -> refuse email:'test1' password:'123QWEasd'", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "register",
            form: { email: 'test1', password: '123QWEasd', name: "Manuel Jaquim", country_code: "PT" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'user@a.a' password:'123QWEasd'", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "register",
            form: { email: 'user@a.a', password: '123QWEasd', name: "Manuel Jaquim", country_code: "PT" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'@some.com' password:'123QWEasd'", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "register",
            form: { email: '@some.com', password: '123QWEasd', name: "Manuel Jaquim", country_code: "PT" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'user@some.com' password:''", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "register",
            form: { email: 'user@some.com', password: '', name: "Manuel Jaquim", country_code: "PT" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'user@some.com' password:'12345678'", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "register",
            form: { email: 'user@some.com', password: '12345678', name: "Manuel Jaquim", country_code: "PT" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'user@some.com' password:'1Qa'", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "register",
            form: { email: 'user@some.com', password: '1Qa', name: "Manuel Jaquim", country_code: "PT" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'user@some.com' password:'1234QWER'", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "register",
            form: { email: 'user@some.com', password: '1234QWER', name: "Manuel Jaquim", country_code: "PT" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> accept email:'user@some.com' password:'123QWEasd'", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "register",
            form: { email: 'user@some.com', password: '123QWEasd', name: "Manuel Jaquim", country_code: "PT" }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(body);
            user_headers.Authorization = JSON.parse(body).token;
            user = JSON.parse(body).user;
            assert.equal(200, response.statusCode); done();
        });
    });
    it("POST /register -> refuse repeated emails", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "register",
            form: { email: 'user@some.com', password: '123QWEasd', name: "Manuel Jaquim", country_code: "PT" }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });

    it("POST /login -> refuse email:'user1@some.com' password:'123qweASD'", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "login",
            form: { email: 'user1@some.com', password: '123qweASD' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /login -> refuse email:'user@some.com' password:'156qsdgdsADDE'", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "login",
            form: { email: 'user@some.com', password: '156qsdgdsADDE' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /login -> accept email:'user@some.com' password:'123QWEasd'", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "login",
            form: { email: 'user@some.com', password: '123QWEasd' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(body);
            user_headers.Authorization = JSON.parse(body).token;
            assert.equal(200, response.statusCode); done();
        });
    });
    it("POST /chpass -> refuse new password:'12345678", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "chpass",
            form: { password: '12345678' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /chpass -> accept new password:'123qweASD'", (done) => {
        request.post({
            headers: user_headers,
            url: base_url + "chpass",
            form: { password: '123qweASD' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(body);
            assert.equal(200, response.statusCode); done();
        });
    });
});