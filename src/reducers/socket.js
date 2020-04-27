import openSocket from 'socket.io-client'

const {protocol, hostname} = window.location
import {socketPort} from '../../constants'

let socketURL =  `${protocol}//${hostname}:${socketPort}`
console.log(`socket URL is ${socketURL}`)
const socketInstance = openSocket(socketURL)

export function socket(state, action) {
    switch (action.type) {
        default: return socketInstance
    }
}