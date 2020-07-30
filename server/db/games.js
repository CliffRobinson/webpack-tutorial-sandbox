const log = require('loglevel')
var devDb = require('./connection')

module.exports = {
    getGames: (testDb) => {
        const db = testDb || devDb
        log.trace('getting add games from DB')
        return db('games')
            .select()
    },
    getGameById: (id, testDb) => {
        const db = testDb || devDb
        log.trace(`getting game id ${id} from db`)
        return db('games')
            .where('id', id)
            .select()
    },
    getGamesByStatus: (status, testDb) => {
        const db = testDb || devDb
        log.trace(`getting games of status ${status} from db`)
        return db('games')
            .where('status', status)
            .select()
    },
    createGame: (game, testDb) => {
        const db = testDb || devDb
        log.trace(`creating game '${game.name}' in db`)
        return db('games')
            .insert(game)

    },
    updateGame: (game, testDb) => {
        const db = testDb || devDb
        log.trace(`updating game ${game.id} in db`)
        return db('games')
            .where('id', game.id)
            .update(game)
    },
    deleteGame:(id, testDb) => {
        const db = testDb || devDb
        log.trace(`deleting game id:${id} in db`)
        return db('games')
            .where('id', id)
            .delete()
    }
}