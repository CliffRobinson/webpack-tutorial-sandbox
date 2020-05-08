jest.mock('../db/chat', ()=> ({
  getChatMessagesByRoom: (id) => {
    console.log("I am mock getChatMgs")
    return new Promise((res, rej) => {
      res(["butts loil"])
    })
  }
}))

const io = require('socket.io-client')
const http = require('http')

const {REQUEST_MESSAGES_BY_ROOM} = require('../../constants/socketEvents')

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

/**
 * Setup websocket & HTTP servers
 */

beforeAll((done) => {
    httpServer = http.createServer().listen()
    httpServerAddr = httpServer.address()
    //ioServer = ioBack(httpServer)
    ioServer = require('./index')(httpServer)
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
      socket.on('connect', ()=> {
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
    done()
})

describe('basic socket.io example', () => {
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

    test('should communicate with waiting for socket.io handshakes', (done) => {
      const spy = jest.spyOn(ioServer, 'emit')
      // Emit sth from Client do Server
      socket.emit(REQUEST_MESSAGES_BY_ROOM, 0);
      // Use timeout to wait for socket.io server handshakes
      setTimeout(() => {
        // Put your server side expect() here
        console.log(spy.mock.calls)
        expect(spy).toHaveBeenCalledWith(
          'dispatch',
          { dispatchFunction: 'receiveMessages', payload: ['butts loil'] }
        )
        done();
      }, 50);
    });

  });