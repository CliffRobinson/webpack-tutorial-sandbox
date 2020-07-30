import { PENDING, PLAYING, CLOSED } from '../../../constants/gameStatus'
import { REQUEST_GAMES_BY_STATUS, RECEIVE_GAMES_BY_STATUS, CREATE_GAME, UPDATE_GAME, DELETE_GAME } from '../../../constants/events'
import { requestGamesByStatus, receiveGamesByStatus, createGame, updateGame, deleteGame } from '../../actions/gameActions'
import { games, forUnitTesting } from '../games';

const { initalState } = forUnitTesting

const fakeEmit = jest.fn().mockName('fakeEmit')
const fakeSocket = {
    emit: fakeEmit
}
const replicateMiddleware = (action) => ({ ...action, socket: fakeSocket })

beforeEach(() => jest.clearAllMocks())

const fakeGame = { id: 1, name: "Harry's Hangout", password: "", status: "pending" }

test('reducers/games.js: default', () => {
    const expected = initalState

    const actual = games(undefined, replicateMiddleware({ type: undefined }))

    expect(actual).toEqual(expected)
})

test('reducers/games.js: requestGamesByStatus', () => {
    const actual = games(undefined, replicateMiddleware(requestGamesByStatus(PENDING)))

    expect(fakeEmit.mock.calls[0]).toEqual([REQUEST_GAMES_BY_STATUS, PENDING])
    expect(actual).toEqual(initalState)
})

test('reducers/games.js: receiveGamesByStatus requesting invalid statis', () => {
    expect(() => games(requestGamesByStatus("butts"))).toThrow(new Error('invalid status requested'))
})

test('reducers/games.js: receiveGamesByStatus requesting valid status', () => {
    const expected = {
        ...initalState,
        [PENDING]: [fakeGame]
    }

    const actual = games(undefined, replicateMiddleware(receiveGamesByStatus({status:PENDING, games:[fakeGame]})))

    expect(actual).toEqual(expected)
})

test('reducers/games.js: createGame', () => {
    const actual = games(undefined, replicateMiddleware(createGame(fakeGame)))
    expect(fakeEmit.mock.calls[0]).toEqual([CREATE_GAME, fakeGame])
    expect(actual).toEqual(initalState)
})

test('reducers/games.js: updateGame', () => {
    const actual = games(undefined, replicateMiddleware(updateGame(fakeGame)))
    expect(fakeEmit.mock.calls[0]).toEqual([UPDATE_GAME, fakeGame])
    expect(actual).toEqual(initalState)
})

test('reducers/games.js: deleteGame', () => {
    const actual = games(undefined, replicateMiddleware(deleteGame(fakeGame)))
    expect(fakeEmit.mock.calls[0]).toEqual([DELETE_GAME, fakeGame])
    expect(actual).toEqual(initalState)
})