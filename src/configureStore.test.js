const mockDispatch = jest.fn()

jest.mock('redux', () => ({
    applyMiddleware: x => x,
    combineReducers: x => x,
    createStore: () => ({
        dispatch: mockDispatch
    })
}))

jest.mock('redux-devtools-extension', () => ({
    composeWithDevTools: x => x
}))

import ioBack from 'socket.io'
import io from 'socket.io-client'
import express from 'express'

import * as dispatchActions from './actions/messageActions'

let server
let http
let listener
let serverSocket
let clientSocket
let httpServerAddr
let configureStore

beforeAll((done) => {
    server = express()
    http = require('http').createServer(server)
    listener = http.listen()
    serverSocket = ioBack(http)
    httpServerAddr = (http.address())
    done()
})

afterAll((done) => {
    serverSocket.close()
    listener.close()
    done()
})

beforeEach((done) => {
    clientSocket = io.connect(`http://[${httpServerAddr.address}]:${httpServerAddr.port}`, {
        'reconnection delay': 0,
        'reopen delay': 0,
        'force new connection': true,
        transports: ['websocket'],
        //TODO: look at what these options mean
    })

    clientSocket.on('connect', () => {
        //console.log('client socket connected')
        done()
    })
})

afterEach((done) => {
    if (clientSocket.connected) {
        // console.log('client socket is connected, disconnecting')
        clientSocket.disconnect()
    }// else {
    //     console.log("client socket wasn't connected")
    // }
    jest.resetModules()
    done()
})

test('client socket will call store dispatch when server socket emits dispatch event', (done) => {
    jest.doMock('./socket-client', () => ({
        socketInstance: clientSocket
    }))

    configureStore = require('./configureStore').configureStore
    const store = configureStore()
    const dispatchFunction = "addMessage"
    const payload = ['mock msg 1', 'mock msg 2']
    serverSocket.emit('dispatch', { dispatchFunction, payload })
    setTimeout(() => {
        expect(mockDispatch.mock.calls[0][0]).toEqual(dispatchActions[dispatchFunction](payload))
        done()
    }, 50)
})

test('addSocketMiddleware', () => {
    const fakeSocket = "I'm a socket!"
    jest.doMock('./socket-client', () => ({
        socketInstance: fakeSocket
    }))

    const {addSocketMiddleware} = require('./configureStore').forUnitTesting

    let mockNextArgs
    const action = {type: 'fake'}
    
    addSocketMiddleware()((args) => {mockNextArgs = args})(action)
    expect(mockNextArgs.socket).toBe(fakeSocket)
})