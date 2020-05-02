export const REQUEST_MESSAGES = "REQUEST_MESSAGES"
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES"
export const GET_MESSAGES = "GET_MESSAGES"
export const UPDATE_CURRENT_MESSAGE = "UPDATE_CURRENT_MESSAGE"
export const ADD_MESSAGE = "ADD_MESSAGE"

export function requestMessagesByRoom(room_id, socket) {
    return {
        type: REQUEST_MESSAGES,
        room_id,
        //socket
    }
}

export function receiveMessages(msgs) {
    console.log('calling receive message action creator')
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
    console.log('calling addmessage action creates')
    return {
        type: ADD_MESSAGE,
        //socket,
        msg
    }
}