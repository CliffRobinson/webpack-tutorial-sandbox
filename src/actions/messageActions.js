import log from 'loglevel'
import {REQUEST_MESSAGES, RECEIVE_MESSAGES, GET_MESSAGES, UPDATE_CURRENT_MESSAGE, ADD_MESSAGE} from '../../constants/actionTypes'

export function requestMessagesByRoom(room_id) {
    return {
        type: REQUEST_MESSAGES,
        room_id,
    }
}

export function receiveMessages(msgs) {
    log.trace('calling receive message action creator')
    return {
        type: RECEIVE_MESSAGES,
        msgs
    }
}

export function getMessages() {
    return {
        type: GET_MESSAGES
    }
}

export function updateCurrentMessage(currentMessage){
    return {
        type: UPDATE_CURRENT_MESSAGE,
        currentMessage
    }

}

export function addMessage(msg, socket) {
    log.trace('calling addmessage action creator')
    return {
        type: ADD_MESSAGE,
        msg
    }
}