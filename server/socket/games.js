const log = require('loglevel')

const { RECEIVE_GAMES_BY_STATUS, REQUEST_GAMES_BY_STATUS, CREATE_GAME } = require('../../constants/events')
const gamesDb = require('../db/games')

module.exports = (socket, serverSocket) => {
    socket.on(REQUEST_GAMES_BY_STATUS, (status) => {
        log.trace(`socket is consulting db for games of status ${status}`)
        gamesDb.getGamesByStatus(status)
            .then(games => {
                log.trace(`just did getGamesByStatus, emitting an array of ${games.length}`)
                serverSocket.emit('dispatch', {dispatchFunction:"receiveGamesByStatus", payload: {status, games}})
            })
    })

    socket.on(CREATE_GAME, (game) => {
        log.trace(`socket is adding game ${game.name} to db`)
        gamesDb.createGame(game)
            .then((result) => {
                log.trace(`result of add is ${result}`)
                gamesDb.getGamesByStatus("pending")
                    .then(games => {
                        log.trace(`just did getGamesByStatus(pending) after createGame, emitting an array of ${games.length}`)
                        serverSocket.emit('dispatch', {dispatchFunction: "receiveGamesByStatus", payload: {status: "pending", games}})
                    })
            })
    })
}