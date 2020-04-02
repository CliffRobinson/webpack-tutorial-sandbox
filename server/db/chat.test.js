const testEnv = require('./test-environment');
const chatDb = require('./chat');
const data = require('./seeds/test/test-chat').data;
let testData = [];
let testDb = null;

describe('/server/db/index.js', () => {

    // Create a separate in-memory database before each test.
    beforeEach(() => {
        testData = data;
        testDb = testEnv.getTestDb()
        return testEnv.initialise(testDb)
    })

    // Destroy the database connection after each test.
    afterEach(() => {
        testData = [];
        testEnv.cleanup(testDb);
    })

    it('true', ()=> {
        expect(true).toBeTruthy()
    })

    it('retrieves chat messages', ()=> {
        const expected = testData

        return chatDb.getChatMessages(testDb)
            .then(actual => {
                expect(actual).toEqual(expected)
            })
    })
})