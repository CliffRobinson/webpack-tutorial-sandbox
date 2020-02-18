const supertest = require('supertest');

const server = require('./server');

describe("/server/server.js", () => {
    it('test suite runs', () => {
        expect(true).toBe(true)
    })

    it('root route', () => {
        supertest(server)
            .get('/')
            .end((err, res) => {
                expect(res.status).toEqual(200)
            })
    })
});