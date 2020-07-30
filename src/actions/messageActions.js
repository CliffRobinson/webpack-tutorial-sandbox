import log from 'loglevel'
import {REQUEST_MESSAGES_BY_ROOM, RECEIVE_MESSAGES, UPDATE_CURRENT_MESSAGE, ADD_MESSAGE} from '../../constants/events'

export function requestMessagesByRoom(room_id) {
    return {
        type: REQUEST_MESSAGES_BY_ROOM,
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

export function updateCurrentMessage(currentMessage){
    return {
        type: UPDATE_CURRENT_MESSAGE,
        currentMessage
    }

}

export function addMessage(msg) {
    log.trace('calling addmessage action creator')
    return {
        type: ADD_MESSAGE,
        msg
    }
}