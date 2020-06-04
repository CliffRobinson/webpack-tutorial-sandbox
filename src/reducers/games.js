import {PENDING, PLAYING, CLOSED} from '../../constants/gameStatus'
import {REQUEST_GAMES_BY_STATUS, RECEIVE_GAMES_BY_STATUS, CREATE_GAME, UPDATE_GAME, DELETE_GAME} from '../../constants/events'

const initalState = {
    [PENDING]: [],
    [PLAYING]: [],
    [CLOSED]: []
}

export function games(state = initalState, action) {
    const socket = action.socket
    switch (action.type) {
        case REQUEST_GAMES_BY_STATUS: {
            socket.emit(REQUEST_GAMES_BY_STATUS, action.status)
            return state
        }
        case RECEIVE_GAMES_BY_STATUS: {
            console.log('RECEIVING GAMES BY STATUS')
            console.log(action)
            return {
                ... state,
                [action.status]: action.games
            }
        }
        case CREATE_GAME: {
            socket.emit(CREATE_GAME, action.game)
            return state;
        }
        case UPDATE_GAME: {
            socket.emit(UPDATE_GAME, action.game)
            return state;
        }
        case DELETE_GAME: {
            socket.emit(DELETE_GAME, action.game)
            return state;
        }
        default:
            return state
    }
}

export const forUnitTesting = {
    initalState
}