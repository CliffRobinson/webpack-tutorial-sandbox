const supertest = require('supertest');

const users = require('./user-routes');

const testUsers = require('../db/seeds/test/test-users').data

describe("/server/routes/user-routes.js", () => {
    it('root route', (done) => {
        supertest(users)
            .get('/')
            .expect('Content-Type', /json/)
            .end ((response) => {
                expect(response).toEqual(testUsers)
                done()
            })
    })
})