const mockGames = require('../db/seeds/test/test-games').data

//const {getGamesByStatus, createGame} = require('../db/games')

const mockGetGamesByStatus = jest.fn((status) => new Promise((res, rej) => res((mockGames.filter((game) => (game.status == status))))))
const mockCreateGame = jest.fn((game) => new Promise((res, rej) => res([5])))
const mockUpdateGame = jest.fn((game) => new Promise((res, rej) => res(game.id)))
const mockDeleteGame = jest.fn((game) => new Promise((res, rej) => res(1)))

jest.mock('../db/games', () => ({
  getGamesByStatus: mockGetGamesByStatus,
  createGame: mockCreateGame,
  updateGame: mockUpdateGame,
  deleteGame: mockDeleteGame
}))

const io = require('socket.io-client')
const http = require('http')

const { REQUEST_GAMES_BY_STATUS, RECEIVE_GAMES_BY_STATUS, CREATE_GAME, UPDATE_GAME, DELETE_GAME } = require('../../constants/events')

// Test boilerplate stolen from: https://medium.com/@tozwierz/testing-socket-io-with-jest-on-backend-node-js-f71f7ec7010f
// Tomasz Zwierzchoń, you're a prince among men.

let socket;
let httpServer;
let httpServerAddr;
let ioServer;
let spy;

/**
 * Setup websocket & HTTP servers
 */

beforeAll((done) => {
  httpServer = http.createServer().listen()
  httpServerAddr = httpServer.address()
  ioServer = require('./index')(httpServer)
  spy = jest.spyOn(ioServer, 'emit')
  done()
})

/**
 * Cleanup websocket and HTTP servers
 */

afterAll((done) => {
  ioServer.close()
  httpServer.close()
  done()
})

/**
 * Run before each test
 */
beforeEach((done) => {
  //Setup
  // Do not hardcode server port and address, square brackets are used for IPv6

  socket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
    'reconnection delay': 0,
    'reopen delay': 0,
    'force new connection': true,
    transports: ['websocket'],
    //TODO: look at what these options mean
  })
  socket.on('connect', () => {
    done()
  })
})

/**
 * Run after each test
 */
afterEach((done) => {
  //Cleanup
  if (socket.connected) {
    socket.disconnect()
  }
  spy.mockClear()
  done()
})

describe('server socket game functions', () => {

  test('socket gets games by status from db and emits receive games', (done) => {
    const status = "pending"
    socket.emit(REQUEST_GAMES_BY_STATUS, status)
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith('dispatch', {
        dispatchFunction: 'receiveGamesByStatus', payload: { status, games: mockGames.slice(0, 2) }
      })
      done()
    }, 50)
  })

  test('socket calls db.createGame, then getGames(pending), then emit dispatch to client socket', (done) => {
    socket.emit(CREATE_GAME, mockGames[0])

    setTimeout(() => {
      expect(mockCreateGame.mock.calls[0][0]).toEqual(mockGames[0])
      expect(spy).toHaveBeenCalledWith('dispatch', {
        dispatchFunction: 'receiveGamesByStatus', payload: { status: "pending", games: mockGames.slice(0, 2) }
      })
      done()
    }, 50)
  })

  test('socket calls db.updateGame then getGames, then emit dispatch to client socket', (done) => {
    const id = 1
    const name = "Harry's butt lol"
    const password = "Harry is dumb lol"
    const status = "playing"
    const newGame = { id, name, password, status }

    socket.emit(UPDATE_GAME, newGame)

    setTimeout(() => {
      expect(mockUpdateGame.mock.calls[0][0]).toEqual(newGame)
      expect(spy).toHaveBeenCalledWith('dispatch', {
        dispatchFunction: 'receiveGamesByStatus', payload: { status: newGame.status, games: [mockGames[2]] }
      })
      done()
    }, 50)
  })

  test('socket calls db.deleteGame then getGames, then emit dispatch to client socket', (done) => {
    const id = 1
    socket.emit(DELETE_GAME, {id})
    require('loglevel').setLevel("trace")
    setTimeout(() => {
      expect(mockDeleteGame.mock.calls[0][0]).toEqual(id)
      expect(spy).toHaveBeenCalledWith('dispatch', {
        dispatchFunction: 'receiveGamesByStatus', payload: { status: "pending", games: mockGames.slice(0, 2) }
      })
      done()
    }, 50)
  })
})