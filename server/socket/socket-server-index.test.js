const mockMsg = {
    name: 'Harry',
    msg: 'butts loil',
    time: 1585802175899,
    room_id: 0
}

const mockGetChat = jest.fn((id) => {
  return new Promise((res, rej) => {
    res([mockMsg])
  })
})

const mockAddChat = jest.fn((msg) => {
  return new Promise((res, rej) => {
    res(1)
  })
})

jest.mock('../db/chat', () => ({
  getChatMessagesByRoom: mockGetChat,
  addChatMessage: mockAddChat
}))

const io = require('socket.io-client')
const http = require('http')

const { REQUEST_MESSAGES_BY_ROOM, ADD_CHAT_MESSAGE } = require('../../constants/socketEvents')

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
  //ioServer = ioBack(httpServer)
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

describe('index of socket', () => {
  test('should communicate', (done) => {
    // once connected, emit Hello World
    ioServer.emit('echo', 'Hello World');
    socket.once('echo', (message) => {
      // Check that the message matches
      expect(message).toBe('Hello World');
      done();
    });
    ioServer.on('connection', (mySocket) => {
      expect(mySocket).toBeDefined();
    });
  });
  // test('should communicate with waiting for socket.io handshakes', (done) => {
  //   // Emit sth from Client do Server
  //   socket.emit('examlpe', 'some messages');
  //   // Use timeout to wait for socket.io server handshakes
  //   setTimeout(() => {
  //     // Put your server side expect() here
  //     done();
  //   }, 50);
  // });

  test('RequestMessages: server socket should call db then emit dispatch to client socket', (done) => {
    socket.emit(REQUEST_MESSAGES_BY_ROOM, 0);
    setTimeout(() => {
      expect(spy).toHaveBeenCalledWith(
        'dispatch',
        { dispatchFunction: 'receiveMessages', payload: [mockMsg] }
      )
      done();
    }, 50);
  });

  test('Addmessage: should call addChat, then getmessages, then emit dispatch to client socket', (done) => {
    // Emit sth from Client do Server
    socket.emit(ADD_CHAT_MESSAGE, mockMsg);
    // Use timeout to wait for socket.io server handshakes
    setTimeout(() => {
      expect(mockAddChat.mock.calls[0][0]).toEqual(mockMsg)
      expect(spy).toHaveBeenCalledWith(
        'dispatch',
        { dispatchFunction: 'receiveMessages', payload: [mockMsg] }
      )
      done();
    }, 50);
  });

});