const testEnv = require('./test-environment');
const chatDb = require('./chat');
const data = [
    {
        name: 'Harry',
        msg: 'db: SANPE KILLS DUMBELDORE!!',
        time: 1585802175899,
        room_id: 0
    },
    {
        name: 'Ron',
        msg: 'db: idk why I hang out with you',
        time: 1585802175950,
        room_id: 0
    },
    {
        name: 'Fred',
        msg: 'db: anyone in here?',
        time: 1585802175950, 
        room_id: 1
    }
]

let testData = [];
let testDb = null;

describe('/server/db/chat.test.js', () => {

    // Create a separate in-memory database before each test.
    beforeEach(() => {
        testData = data.slice();
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
        const expected = testData.slice(0, 2).map(
            (item) => {
                return {
                    msg:item.msg,
                    time:item.time,
                    name:item.name
                }
            }
        )
        return chatDb.getChatMessagesByRoom(0, testDb)
            .then(actual => {
                expect(actual).toEqual(expected)
            })
    })

    it('can add chat messages', () => {

        const time = 1585802176666
        const msg = "whatever u luv it"
        const room_id = 0

        const newMsg = { user_id: 1, room_id, time, msg}

        const expected = [...testData, { name: "Harry", time, msg, room_id }]

        return chatDb.addChatMessage(newMsg, testDb)
            .then(result => expect(result).toEqual([6]))
            .then(() => {
                return chatDb.getChatMessages(testDb)
                    .then(actual => expect(actual).toEqual(expected))
            })
    })

    test('Test that rollback drops table', (done) => {
        return testDb.schema.hasTable('chat')
            .then(result1 => expect(result1).toEqual(true))
            .then(() => {
                testDb.migrate.rollback()
                    .then((rollbackRes) => {
                        testDb.schema.hasTable('chat')
                            .then(result => {
                                expect(result).toEqual(false)
                                done()
                            })
                    })
            })
    })
})