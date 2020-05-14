const log = require('loglevel')

const { RECEIVE_GAMES_BY_STATUS, REQUEST_GAMES_BY_STATUS, CREATE_GAME, UPDATE_GAME, DELETE_GAME } = require('../../constants/events')
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

    socket.on(UPDATE_GAME, (game) => {
        log.trace(`socket is updating game ${game.id} in db`)
        gamesDb.updateGame(game)
            .then((result) => {
                log.trace(`result of update is ${result}`)
                gamesDb.getGamesByStatus(game.status)
                    .then(games => {
                        log.trace(`just did getGamesByStatus(${game.status}) after updateGame, emitting an array of ${games.length}`)
                        serverSocket.emit('dispatch', {dispatchFunction: "receiveGamesByStatus", payload: {status: game.status, games}})
                    })
            })
    })

    socket.on(DELETE_GAME, (id) => {
        console.log(`socket is deleting game id:${id} in db`)
        gamesDb.deleteGame(id)
            .then((result) => {
                console.log(`result of game delete is ${result}`)
                gamesDb.getGamesByStatus("pending")
                    .then(games => {
                        console.log(`just did getGamesByStatus(pending) after createGame, emitting an array of ${games.length}`)
                        serverSocket.emit('dispatch', {dispatchFunction: "receiveGamesByStatus", payload: {status: "pending", games}})
                        log.setLevel("debug")
                    })
            }) 
    })
}