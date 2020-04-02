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

    it('retrieves chat messages', () => {
        const expected = testData

        return chatDb.getChatMessages(testDb)
            .then(actual => {
                expect(actual).toEqual(expected)
            })
    })

    it('retrieves chat messages by room', () => {
        const expected = testData.slice(0, 2)

        return chatDb.getChatMessagesByRoom(0, testDb)
            .then(actual => {
                expect(actual).toEqual(expected)
            })
    })

    it('can add chat messages', () => {
        const newMsg = {
            user_id: 1,
            room_id:0, 
            time: 1585802176666,
            msg: "whatever u luv it"
        }

        const expected = [...testData, {id: 6, ...newMsg}]

        return chatDb.addChatMessage(newMsg, testDb)
            .then(result => expect(result).toEqual([6]))
            .then(() => {
                return chatDb.getChatMessages(testDb)
                    .then(actual => expect(actual).toEqual(expected))
            })
    })
})