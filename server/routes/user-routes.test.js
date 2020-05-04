const supertest = require('supertest')
const server = require('../server')

describe('/routes/user-routes', () => {

    beforeEach(() => {
        jest.resetModules();
    });

    it('renders sample data', (done) => {
        supertest(server)
            .get('/users')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('throws errors', (done)=> {

        jest.doMock('../db/users', () => {
            return {
                getAllUsers: () => {
                    return new Promise((res, rej) => {
                        rej(new Error("this is a mock Error"))
                    })
                }
            }
        })
    
        const serverWithMockedError = require('../server')
    
        return supertest(serverWithMockedError)
            .get('/users')
            .expect(404, done)
    })
})


