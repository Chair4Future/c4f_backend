var request = require("request"),
    assert = require('assert'),
    port = process.env.PORT || 8080;
var base_url = "http://localhost:8080/";
var test1_headers = { "Accept-Version": "1.0.0", "Content-Type": "application/json" };
var test2_headers = { "Accept-Version": "1.0.0", "Content-Type": "application/json" };
var admin_headers = { "Accept-Version": "1.0.0", "Content-Type": "application/json" };

describe("Tests", () => {

    before((done) => {
        request.get(base_url, (error, response, body) => {
            assert.equal(200, response.statusCode);
            request.get(base_url + "testdb", (error, response, body) => {
                assert.equal(200, response.statusCode);
                done();
            });
        });
    });

    it("login has admin", (done) => {
        request.post({
            headers: admin_headers,
            url: base_url + "login",
            form: { email: 'admin@a.aa', password: '123qweASD' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(body);
            admin_headers.Authorization = JSON.parse(body).token;
            assert.equal(200, response.statusCode); done();
        });
    });


    /**
     * ______________________________________________________________________________________
     * ________________________________AUTHENTICATION________________________________________
     * ______________________________________________________________________________________
     */


    it("POST /register -> refuse email:'test1' password:'123QWEasd'", (done) => {
        request.post({
            headers: test1_headers,
            url: base_url + "register",
            form: { email: 'test1', password: '123QWEasd' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'test1@a.a' password:'123QWEasd'", (done) => {
        request.post({
            headers: test1_headers,
            url: base_url + "register",
            form: { email: 'test1@a.a', password: '123QWEasd' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'@ipt.pt' password:'123QWEasd'", (done) => {
        request.post({
            headers: test1_headers,
            url: base_url + "register",
            form: { email: '@ipt.pt', password: '123QWEasd' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> accept email:'test1@ipt.pt' password:'123QWEasd'", (done) => {
        request.post({
            headers: test1_headers,
            url: base_url + "register",
            form: { email: 'test1@ipt.pt', password: '123QWEasd' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(body);
            test1_headers.Authorization = JSON.parse(body).token;
            testuser1 = JSON.parse(body).user;
            assert.equal(200, response.statusCode); done();
        });
    });
    it("POST /register -> refuse repeated emails", (done) => {
        request.post({
            headers: test1_headers,
            url: base_url + "register",
            form: { email: 'test1@ipt.pt', password: '123QWEasd' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });

    it("POST /register -> refuse email:'test2@ipt.pt' password:''", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "register",
            form: { email: 'test2@ipt.pt', password: '' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'test2@ipt.pt' password:'12345678'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "register",
            form: { email: 'test2@ipt.pt', password: '12345678' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'test2@ipt.pt' password:'1Qa'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "register",
            form: { email: 'test2@ipt.pt', password: '1Qa' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> refuse email:'test2@ipt.pt' password:'1234QWER'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "register",
            form: { email: 'test2@ipt.pt', password: '1234QWER' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /register -> accept email:'test2@ipt.pt' password:'123qweASD'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "register",
            form: { email: 'test2@ipt.pt', password: '123qweASD' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(body);
            assert.equal(200, response.statusCode); done();
        });
    });

    it("POST /login -> refuse email:'test3@ipt.pt' password:'123qweASD'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "login",
            form: { email: 'test3@ipt.pt', password: '123qweASD' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /login -> accept email:'test2@ipt.pt' password:'123qweASD'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "login",
            form: { email: 'test2@ipt.pt', password: '123qweASD' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(body);
            test2_headers.Authorization = JSON.parse(body).token;
            assert.equal(200, response.statusCode); done();
        });
    });

    it("POST /chpass -> refuse new_password:'456RTYfgh' old_password:'123qweZXC'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "chpass",
            form: { new_password: '456RTYfgh', old_password: '123qweZXC' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /chpass -> refuse new_password:'12345678' old_password:'123qweASD'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "chpass",
            form: { new_password: '12345678', old_password: '123qweASD' }
        }, (error, response, body) => {
            assert.equal(500, response.statusCode); done();
        });
    });
    it("POST /chpass -> accept new_password:'456RTYfgh' old_password:'123qweASD'", (done) => {
        request.post({
            headers: test2_headers,
            url: base_url + "chpass",
            form: { new_password: '456RTYfgh', old_password: '123qweASD' }
        }, (error, response, body) => {
            if (response.statusCode != 200) console.log(body);
            assert.equal(200, response.statusCode); done();
        });
    });
});