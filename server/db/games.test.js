const mockConn = jest.fn().mockImplementation(() => {
    return {
        select: (x) => x,
        where: (x) => ({ select: () => x, delete: (x) => x, update: (x) => x, }),
        insert: (x) => x
    }
})

jest.mock('./connection', () => mockConn)

const testEnv = require('./test-environment')
const db = require('./games')
const data = require('./seeds/test/test-games').data

let testData = []
let testDb = null

describe('/server/db/games.js', () => {
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

    test('retrieves games', () => {
        //Arrange
        const expected = testData;
        //Act
        return db.getGames(testDb)
            .then(actual => {
                expect(actual).toEqual(expected)
            })
    })

    test('retrieves games by id', () => {
        //Arrange
        const expected = [testData[0]]
        //Act
        return db.getGameById(1, testDb)
            .then(actual => {
                expect(actual).toEqual(expected)
            })
    })

    test('retrieves games by status', () => {
        //Arrange
        const expected = [testData[0], testData[1]]
        //Act
        return db.getGamesByStatus('pending', testDb)
            .then(actual => {
                expect(actual).toEqual(expected)
            })
    })

    test('can add a game', () => {
        //Arrange
        const name = "Neville's nook"
        const password = "Fortuna Major"
        const status = "pending"
        
        const expected = [
            ... testData,
            {id:5, name, password, status}
        ]
        //Act
        return db.createGame({name, password, status}, testDb)
            .then(result => expect(result).toEqual[5])
            .then(() => {
                return testDb('games')
                    .select()
                    .then(actual => {
                        expect(actual).toEqual(expected)
                    })
            })
    })

    test('can update games', () => {
        //Arrange
        const id = 1
        const name = "Harry's butt lol"
        const password = "Harry is dumb lol"
        const status = "playing"

        const newGame = {id, name, password, status}

        const expected = [
            newGame,
            ...testData.slice(1)
        ]

        return db.updateGame(newGame, testDb)
            .then(result => expect(result).toEqual(1))
            .then(() => {
                return testDb('games')
                    .select()
                    .then(actual => {
                        expect(actual).toEqual(expected);
                    })
            })
    })

    test('can delete games', () => {
        const expected = testData.slice(1)
        const id = 1
        return db.deleteGame(id, testDb)
            .then(() => {
                return testDb('games')
                    .where('id', id)
                    .select()
                    .then(result => {
                        expect(result).toHaveLength(0)
                    })
            })
            .then(() => {
                return testDb('games')
                    .select()
                    .then( actual => {
                        expect(actual).toEqual(expected)
                    })
            })
    })

    /////////////////////////////////////////

    test('db calls devDb by default', () => {
        
        const funcsAndArgs = [
            {func: "getGames"},
            {func: "getGameById", args:[0]},
            {func: "getGamesByStatus", args:["pending"]},
            {func: "createGame", args:[{name:"lads"}]},
            {func: "updateGame", args:[{id:1}]},
            {func: "deleteGame", args:[{id:1}]}
            // {func: "", args:[]}
        ]

        funcsAndArgs.map(key => {
            const {func, args} = key
            if (args) {
                db[func](...args)
            } else {
                db[func]()    
            }
            
            expect(mockConn).toBeCalledWith('games')
            mockConn.mockClear()
        })
    })

    test('Test that rollback drops table', (done) => {
        return testDb.schema.hasTable('games')
            .then(result1 => expect(result1).toEqual(true))
            .then(() => {
                testDb.migrate.rollback()
                    .then((rollbackRes) => {
                        testDb.schema.hasTable('games')
                            .then(result => {
                                expect(result).toEqual(false)
                                done()
                            })
                    })
            })
    })
})