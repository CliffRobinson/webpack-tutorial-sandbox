import {getMessages, requestMessages, receiveMessages} from '../actions/messageActions'
import { chat, forUnitTesting} from './messages'
const {initialState} = forUnitTesting

test('getMessages', () => {
    const expected = initialState
    const actual = chat(undefined, getMessages())

    expect(actual).toEqual(expected)
})

test('requestMessages', () => {
    const expected = initialState
    const actual = chat(undefined, requestMessages())

    expect(actual).toEqual(expected)
})

test('receiveMessage', ()=> {
    const expected = 'hello'
    const actual = chat(undefined, receiveMessages(expected))

    expect(actual).toEqual(expected)
})