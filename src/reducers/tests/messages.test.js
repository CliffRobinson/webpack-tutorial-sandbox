import {getMessages, requestMessagesByRoom, receiveMessages, updateCurrentMessage, addMessage} from '../../actions/messageActions'
import { chat, forUnitTesting} from '../messages'
const {initialState} = forUnitTesting

import {REQUEST_MESSAGES_BY_ROOM, ADD_CHAT_MESSAGE} from '../../../constants/socketEvents'

const fakeEmit = jest.fn().mockName('fakeEmit')
const fakeSocket = {
    emit: fakeEmit
}
const replicateMiddleware = (action) => ({...action, socket: fakeSocket})

beforeEach(()=> jest.clearAllMocks())

test('default', () => {
    const expected = initialState
    const actual = chat(undefined, {type: 'default'})

    expect(actual).toEqual(expected)
})

test('requestMessages', () => {
    const expected = initialState

    const actual = chat(undefined, replicateMiddleware(requestMessagesByRoom(0)))

    expect(actual).toEqual(expected)

    expect(fakeEmit.mock.calls[0]).toEqual([REQUEST_MESSAGES_BY_ROOM, 0])

})

test('receiveMessage', ()=> {
    const messages = ['hello']
    const expected = {
        ...initialState,
        messages
    }
    const actual = chat(undefined, receiveMessages(messages))

    expect(actual).toEqual(expected)
})

test('updateCurrentMessage', ()=> {
    const newMessage = "lol"
    const expected = {
        ...initialState,
        currentMessage: newMessage
    }

    const actual = chat(undefined, updateCurrentMessage(newMessage))

    expect(actual).toEqual(expected)
})

test('addMessage', ()=> {
    const message = 'ello I am msg'
    const expected = initialState
    const actual = chat(undefined, replicateMiddleware(addMessage(message)))

    expect(actual).toEqual(expected)

    expect(fakeEmit.mock.calls[0]).toEqual([ADD_CHAT_MESSAGE, message])
})