const { app } = require('./app.js')
const request = require('supertest');
const assert = require('assert');
const { describe } = require('mocha')


describe('GET /', function () {
    it('responds with json', function () {
        return request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', "text/html; charset=utf-8")
            .expect(200)
            .then(response => {
                assert(response.text, 'Hello World')
            })
            .catch(err => console.log(err))
    });
});



// describe('post /users', function () {

//     it('register user error', async function () {
//         const response = await request(app)
//             .post('/api/users/')
//             .send({
//                 "user": {
//                     "username": "ggggggaa12311",
//                     "password": "ggggggaa123",
//                     "email": "ggggggaa1231231@mail.com"
//                 }
//             })
//             .then(res => {
//                 assert(res.status, 400)
//                 assert(res.body.errors.length, 2)
//             })
//     })

//     it('register user success', function () {
//         const username = password = 'aggggggaa123112111'
//         const email = `${username}@mail.com`
//         return request(app)
//             .post('/api/users/')
//             .send({
//                 "user": {
//                     "username": username,
//                     "password": password,
//                     "email": email
//                 }
//             })
//             .expect(201)
//             .then(response => {
//                 assert(response.body.user.username, username)
//                 assert(response.body.user.email, email)
//             })
//     })
// })
let token = ''
describe('post /users/login', function () {
    it('login user', function () {
        return request(app)
            .post('/api/users/login')
            .send({
                "user": {
                    "email": "ggggggaa1231231@mail.com",
                    "password": "ggggggaa123"
                }
            })
            .expect(200)
            .then(response => {
                assert(response.body._id, "62dccae5f9270cad977207b0")
                token = response.body.token
            })
    })

    it('test token auth', function () {
        return request(app)
            .get('/api/user')
            .set('Authorization', `Bearer ${token}`)
            .expect(200)
    })
})



describe('/articles', function () {
    const article_json = {
        "article": {
            "title": "123456",
            "description": "6543241",
            "body": "ggggg123456",
            "tagList": ["reactjs"]
        }
    }
    it('create articles', function () {
        return request(app)
            .post('/api/articles')
            .send(article_json)
            .expect(201)
            .then(response => {
                assert(response.body.article.title, article_json.article.title)
            })
    })
    it('get articles',function(){
        return request(app)
        .get('/api/articles')
        .expect(200)
            .then(response => {
                assert(response.body.article.title, article_json.article.title)
            })
    })
})
