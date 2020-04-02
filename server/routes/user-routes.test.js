const nock = require('nock')
const supertest = require('supertest')
const sampleData = require('../db/seeds/test/test-users').data
const server = require('../server')

describe('/routes/user-routes', () => {
    it('renders sample data', (done) => {
        supertest(server)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })
})