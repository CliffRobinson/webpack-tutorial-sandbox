const supertest = require('supertest')
const server = require('../server')

describe('/routes/chat-routes', () => {

    beforeEach(() => {
        jest.resetModules();
    });

    it('renders sample data', (done) => {
        supertest(server)
            .get('/chat')
            .expect('Content-Type', /json/)
            .expect(200, done)
    })

    it('throws errors', (done)=> {

        jest.doMock('../db/chat', () => {
            return {
                getChatMessages: () => {
                    return new Promise((res, rej) => {
                        rej(new Error("this is a mock Error"))
                    })
                }
            }
        })

        const serverWithMockedError = require('../server')

        return supertest(serverWithMockedError)
            .get('/chat')
            .expect(404, done)
    })
})