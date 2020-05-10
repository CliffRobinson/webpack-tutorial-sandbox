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
const fakeUpdate = jest.fn()
const fakeAdd = jest.fn()

test('chatWindow', () => {
    const wrapper = mount(<ChatWindow
        chat={data}
        requestMessagesByRoom={fakeRequest} updateCurrentMessage={fakeUpdate} room_id={77} />)
})

test('chatWindow calls requestMessagesByRoom on render', () => {
    const wrapper = mount(<ChatWindow chat={data} requestMessagesByRoom={fakeRequest} room_id={77} />)
    expect(fakeRequest.mock.calls[0]).toEqual([77])
})

test('chatWindow calls updateCurrentMessage when input changes', () => {
    const neverNotHilarious = "butts lol"
    const wrapper = mount(<ChatWindow chat={data}
        requestMessagesByRoom={fakeRequest} updateCurrentMessage={fakeUpdate} room_id={77} />)
    const input = wrapper.find('input').at(0)
    input.instance().value = neverNotHilarious
    input.simulate("change")
    expect(fakeUpdate).toHaveBeenCalledWith(neverNotHilarious)
})

test('clicking the button dispatches a message', () => {

    // const fakeStamp = 1466424490000
    // const spy = jest
    //     .spyOn(global, 'Date')
    //     .mockImplementation(() => ({
    //         now: () => fakeStamp
    //     }))


    const neverNotHilarious = "butts lol"
    const wrapper = mount(<ChatWindow
        requestMessagesByRoom={fakeRequest}
        updateCurrentMessage={fakeUpdate}
        room_id={77} addMessage={fakeAdd}
        chat={{ ...data, currentMessage: neverNotHilarious }} />)
    const button = wrapper.find('button').at(0)
    button.simulate('click')

    const call = {...fakeAdd.mock.calls[0][0], time:1}
    //TODO: mock out time properly
    expect(call).toEqual({
        user_id: 1,
        room_id: 77,
        msg: neverNotHilarious,
        time:1
    })
})