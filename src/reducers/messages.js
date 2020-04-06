import log from 'loglevel'
import {GET_MESSAGES, RECEIVE_MESSAGES} from '../actions/messageActions'

const initialState = [
    { user_id: 1, room_id: 0, time: 1585802165899, msg: "redux: lol butts lol" },
    { user_id: 2, room_id: 0, time: 1585802165950, msg: "redux: ugh, shut up" }
]

export function chat(state = initialState, action) {
    log.trace("Messages reducer receiving following action")
    log.trace(action)
    switch (action.type) {
        case RECEIVE_MESSAGES:
            return action.msgs
        case GET_MESSAGES:
        default:{
                return state;
            }
    }
}

export const forUnitTesting = {
    initialState
}