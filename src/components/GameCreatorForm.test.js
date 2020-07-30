import React from 'react';
import {shallow, mount} from 'enzyme';

import { CREATE_GAME } from '../../constants/events';

import { GameCreatorForm } from './GameCreatorForm'
import { CREATING } from '../../constants/gameStatus';

const mockCreateGame = jest.fn();
const mockReceiveGamesByStatus = jest.fn()

const testProps = {
    games: {
        creating: {
            name: "",
            password: ""
        }
    },
    createGame: mockCreateGame,
    receiveGamesByStatus: mockReceiveGamesByStatus
}

test('snapshot', () => {
    const wrapper = shallow(<GameCreatorForm {... testProps}/>)

    expect(wrapper).toMatchSnapshot()
})

test('clicker', () => {
    const wrapper = mount(<GameCreatorForm {... testProps}/>)

    const testButton = wrapper.find('button').first()

    testButton.simulate('click')

    expect(mockCreateGame).toBeCalled()

    mockCreateGame.mockClear()
})

test('name onChange', () => {
    const wrapper = mount(<GameCreatorForm {... testProps}/>)

    const mockPreventDefault = jest.fn()

    const newName = 'a'

    const event = {
        preventDefault: mockPreventDefault,
        target: {
            name: 'name',
            value: newName,
        }
    }

    const nameInput = wrapper.find('input').first();

    nameInput.simulate('change', event)

    expect(mockPreventDefault).toBeCalled()
    expect(mockReceiveGamesByStatus).toBeCalledWith({
        status: CREATING,
        games: {
            name: newName,
            password: ""
        },
    })

    mockPreventDefault.mockClear()
    mockReceiveGamesByStatus.mockClear()
});

test('password onChange', () => {
    const wrapper = mount(<GameCreatorForm {... testProps}/>)

    const mockPreventDefault = jest.fn()

    const newPassword = 'a'

    const event = {
        preventDefault: mockPreventDefault,
        target: {
            name: 'password',
            value: newPassword
        }
    }

    const nameInput = wrapper.find('input').at(1);

    nameInput.simulate('change', event)

    expect(mockPreventDefault).toBeCalled()
    expect(mockReceiveGamesByStatus).toBeCalledWith({
        status: CREATING,
        games: {
            name: "",
            password: newPassword
        },
    })

    mockPreventDefault.mockClear()
    mockReceiveGamesByStatus.mockClear()
});