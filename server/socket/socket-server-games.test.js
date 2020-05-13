const mockGames = require('../db/seeds/test/test-games').data

const io = require('socket.io-client')
const http = require('http')

const { REQUEST_GAMES_BY_STATUS, RECEIVE_GAMES_BY_STATUS } = require('../../constants/events')

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
/////
describe('server socket game functions', () => {
    test('socket gets games by status from db and emits receive games', () => {
        socket.emit(REQUEST_GAMES_BY_STATUS, "pending")
        setTimeout( () => {
            expect(spy).toHaveBeenCalledWith('dispatch', {
              dispatchFunction:'requestGamesByStatus', payload: mockGames.slice(0,1)
            })
        }, 50)

    })
})