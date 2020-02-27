const testEnv = require('./test-environment');
const db = require('./index');
const data = require('./seeds/test/test-users').data;
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

    it('retrieves users', () => {
        //Arrange
        const expected = testData;
        //Act
        //Be sure to always use 'return' when testing with promises.
        return db.getAllUsers(testDb)
            .then(actual => {
                expect(actual).toEqual(testData)
            })
    })
})