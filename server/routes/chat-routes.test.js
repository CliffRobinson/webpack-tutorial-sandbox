const nock = require('nock')

const supertest = require('supertest')
const server = require('../server')

describe('/routes/user-routes', () => {
    it('renders sample data', (done) => {
        supertest(server)
            .get('/chat')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('throws errors', ()=> {
        return supertest(server)
            .get('/chat')
            .expect(404)
            .then(res => {
                //console.log(res)
            })
    })
})