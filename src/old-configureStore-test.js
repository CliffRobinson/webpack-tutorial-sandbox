const io = require('socket.io-client')
const http = require('http')
import ioBack from 'socket.io'

const mockDispatch = jest.fn()

jest.mock('redux', ()=> ({
    applyMiddleware: x => x,
    combineReducers: x => x, 
    createStore: () => ({
        dispatch: mockDispatch
    }), 
}))

jest.mock('redux-devtools-extension', () => ({
    composeWithDevTools: x => x
}))

let socket;
let httpServer;
let httpServerAddr;
let ioServer;

let configureStore

let mockSock

/**
 * Setup websocket & HTTP servers
 */

beforeAll((done) => {
    httpServer = http.createServer().listen()
    httpServerAddr = httpServer.address()
    ioServer = ioBack(httpServer)
    
    console.log(httpServerAddr)

    jest.doMock('../constants/ports', () => ({
        socketPort: httpServerAddr.port,
        serverPort: 3000,

    }))

    mockSock = require('./socket-client/')

    jest.doMock('./socket-client', () => ({
        socketInstance: mockSock
    }))

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

    
})

/**
 * Run after each test
 */
afterEach((done) => {
    //Cleanup
    if (mockSock.connected) {
        console.log('disconnecting our socket')
        mockSock.disconnect()
    }
    done()
})

test('configureStore', () => {
    const {configureStore} = require('./configureStore')
    const store = configureStore('./configureStore')
    ioServer.emit('dispatch', {dispatchFunction: 'fakeDispatchFunction', payload: 'fakePayload'})
    ioServer.emit('hello')
    console.log('doing our test')
    setTimeout(() => {
        console.log(mockDispatch)
    } ,50)

})