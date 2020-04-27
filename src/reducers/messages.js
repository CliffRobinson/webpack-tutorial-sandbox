import log from 'loglevel'
import { GET_MESSAGES, RECEIVE_MESSAGES, REQUEST_MESSAGES, UPDATE_CURRENT_MESSAGE, ADD_MESSAGE } from '../actions/messageActions'

const initialState = {
    messages: [
        { user_id: 1, room_id: 0, time: 1585802165899, msg: "redux: lol butts lol" },
        { user_id: 2, room_id: 0, time: 1585802165950, msg: "redux: ugh, shut up" }
    ],
    currentMessage: ""
}

export function chat(state = initialState, action) {
    log.trace("Messages reducer receiving following action")
    log.trace(action)
    switch (action.type) {
        case ADD_MESSAGE: 
            action.socket.emit('addChatMessage', action.msg)
            return state
        case UPDATE_CURRENT_MESSAGE:
            return {
                messages: state.messages,
                currentMessage: action.currentMessage
            }
        case REQUEST_MESSAGES:
            console.log('reducer is asking socket for messages')
            action.socket.emit('requestMessagesByRoom', action.room_id)
            return state
        case RECEIVE_MESSAGES:
            return {
                messages: action.msgs,
                currentMessage: state.currentMessage
            }
        case GET_MESSAGES:
        default: {
            return state;
        }
    }
}

export const forUnitTesting = {
    initialState
}