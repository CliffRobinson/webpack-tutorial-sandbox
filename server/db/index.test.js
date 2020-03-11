const knex = require('knex')

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
                //Assert
                expect(actual).toEqual(testData)
            })
    })

    it('retrieves a specific user', () => {
        //Arrange
        const expected = [testData[0]];
        //Act
        return db.getUserById(1, testDb)
            .then(actual => {
                //Assert
                expect(actual).toEqual(expected);
            })
    })

    it('deletes a specific user', () => {
        //Arrange
        const expected = testData.slice(1);
        const index = 1;
        //Act
        return db.deleteUserById(index, testDb)
            .then(() => {
                //Assert
                return testDb('users')
                    .where('id', index)
                    .select()
                    .then(result => {
                        expect(result).toHaveLength(0)
                    })
            })
            .then(() => {
                return testDb('users')
                    .select()
                    .then(actual => {
                        expect(actual).toEqual(expected);
                    })
            })
    })

    it('can add a user', () => {
        //Arrange
        const name = 'Hermione'
        const password = 'password'
        const expected = testData.slice()
        expected.push({ id: 6, name, password })
            //Act
        return db.addUser({ name, password }, testDb)
            //Assert we are adding id 6
            .then(result => expect(result).toEqual([6]))
            .then(() => {
                return testDb('users')
                    .select()
                    .then(actual => {
                        //Assert the contents of the db
                        expect(actual).toEqual(expected);
                    })
            })
    })

    it('can update a user', () => {
        //Arrange
        const newUser = {
            id: 3,
            name: "Lee",
            password: "password1"
        }
        const expected = testData.slice();
        expected[2] = newUser

        //Act
        return db.updateUser(newUser, testDb)
            .then(result => expect(result).toEqual(1))
            .then(() => {
                return testDb('users')
                    .select()
                    .then(actual => {
                        //Assert the contents of the db
                        expect(actual).toEqual(expected);
                    })
            })
    })
})