const supertest = require('supertest');

const server = require('./server');

describe("/server/server.js", () => {
    it('root route', () => {
        supertest(server)
            .get('/')
            .end((err, res) => {
                expect(res.status).toEqual(200)
            })
    })

});