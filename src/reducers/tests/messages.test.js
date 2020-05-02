import {getMessages, requestMessagesByRoom, receiveMessages, updateCurrentMessage} from '../../actions/messageActions'
import { chat, forUnitTesting} from '../messages'
const {initialState} = forUnitTesting

test('getMessages', () => {
    const expected = initialState
    const actual = chat(undefined, getMessages())

    expect(actual).toEqual(expected)
})

test('requestMessages', () => {
    const expected = initialState
    const mockEmit = jest.fn()
    const mockSocket = {
        emit: mockEmit
    }
    const actual = chat(undefined, requestMessagesByRoom(0, mockSocket))

    expect(actual).toEqual(expected)
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