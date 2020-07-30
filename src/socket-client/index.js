import openSocket from 'socket.io-client'

const {protocol, hostname} = window.location
import {socketPort} from '../../constants/ports'

let socketURL =  `${protocol}//${hostname}:${socketPort}`
console.log(`socket URL is ${socketURL}`)
export const socketInstance = openSocket(socketURL)

