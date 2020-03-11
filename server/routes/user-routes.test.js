const supertest = require('supertest');

const server = require('../server');

const testUsers = require('../db/seeds/test/test-users').data

describe("/server/routes/user-routes.js", () => {
    it('root route', (done) => {
        supertest(server)
            .get('/users/')
            .expect('Content-Type', /json/)
            .end ((response) => {
                //expect(response).toEqual(testUsers)
                done()
           })
    })
})