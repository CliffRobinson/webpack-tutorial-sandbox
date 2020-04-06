export const REQUEST_MESSAGES = "REQUEST_MESSAGES"
export const RECEIVE_MESSAGES = "RECEIVE_MESSAGES"
export const GET_MESSAGES = "GET_MESSAGES"

export function requestMessages() {
    return {
        type: REQUEST_MESSAGES
    }
}

export function receiveMessages(msgs) {
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