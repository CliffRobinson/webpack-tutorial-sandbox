import React from 'react'
import {shallow, mount} from 'enzyme'

import {GameList} from './GameList'

test('snapshot', () => {
    const wrapper = shallow(<GameList />)

    expect(wrapper).toMatchSnapshot()
})

test('GameList calls requestGameByStatus(pending) when it loads', () => {
    const fakeRequestGames = jest.fn()

    const wrapper = mount(<GameList requestGamesByStatus={fakeRequestGames} />)

    expect(fakeRequestGames).toBeCalled()
})