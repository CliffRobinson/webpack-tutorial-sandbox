import * as statuses from '../../constants/gameStatus'
import {REQUEST_GAMES_BY_STATUS, RECEIVE_GAMES_BY_STATUS, CREATE_GAME, UPDATE_GAME, DELETE_GAME} from '../../constants/events'

export function requestGamesByStatus(status) {

    if (Object.values(statuses).includes(status)) {
        return {
            type: REQUEST_GAMES_BY_STATUS,
            status
        }
    } else {
        throw new Error ('invalid status requested')
    }

}

export function receiveGamesByStatus({status, games}) {
    return {
        type: RECEIVE_GAMES_BY_STATUS,
        status,
        games
    }
}

export function createGame(game) {
    return {
        type: CREATE_GAME,
        game
    }
}

export function updateGame(game) {
    return {
        type: UPDATE_GAME,
        game
    }
}

export function deleteGame(game) {
    return {
        type: DELETE_GAME,
        game
    }
}