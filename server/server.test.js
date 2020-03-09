const supertest = require('supertest');

const server = require('./server');

describe("/server/server.js", () => {
    it('root route', (done) => {
        supertest(server)
            .get('/')
            .expect(200, done)
            // .end((err, res) => {
            //     expect(res.status).toEqual(200)
            // })
    })

});