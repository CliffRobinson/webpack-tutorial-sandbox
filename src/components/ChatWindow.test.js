import React from 'react'
import { shallow, mount } from 'enzyme'

import { ChatWindow } from './ChatWindow'

const data = {
    currentMessage: "",
    messages: [
        {
            name: 'Harry',
            msg: 'db: SANPE KILLS DUMBELDORE!!',
            time: 1585802175899
        },
        {
            name: 'Ron',
            msg: 'db: idk why I hang out with you',
            time: 1585802175950
        }
    ]
}

const fakeRequest = jest.fn()

test('chatWindow', () => {
    expect(shallow(<ChatWindow chat={data} />)).toMatchSnapshot()
})

test('chatWindow calls requestMessagesByRoom on render', () => {
    const wrapper = mount(<ChatWindow chat={data} requestMessagesByRoom={fakeRequest} room_id={77}/>)
    console.log(fakeRequest.mock.calls)
    expect(fakeRequest.mock.calls[0]).toEqual([77])
})