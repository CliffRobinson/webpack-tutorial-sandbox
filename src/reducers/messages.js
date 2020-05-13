import log from 'loglevel'
import { RECEIVE_MESSAGES, REQUEST_MESSAGES_BY_ROOM, UPDATE_CURRENT_MESSAGE, ADD_MESSAGE } from '../../constants/events'

const initialState = {
    messages: [
        { user_id: 1, room_id: 0, time: 1585802165899, msg: "redux: lol butts lol" },
        { user_id: 2, room_id: 0, time: 1585802165950, msg: "redux: ugh, shut up" }
    ],
    currentMessage: ""
}

export function chat(state = initialState, action) {
    log.trace("Messages reducer receiving following action:")
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
        case REQUEST_MESSAGES_BY_ROOM:
            log.trace('reducer is asking socket for messages')
            action.socket.emit('requestMessagesByRoom', action.room_id)
            return state
        case RECEIVE_MESSAGES:
            return {
                messages: action.msgs,
                currentMessage: state.currentMessage
            }
        default: {
            return state;
        }
    }
}

export const forUnitTesting = {
    initialState
}
