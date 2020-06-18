import React from 'react'
import {shallow, mount} from 'enzyme'

import {GameList} from './GameList'
import {data as testGameData} from '../../server/db/seeds/test/test-games'

const testProps = {
    games: {
        pending: [],
        creating: {}
    }
}

test('snapshot, no games', () => {
    const wrapper = shallow(<GameList {...testProps}/>)

    expect(wrapper).toMatchSnapshot()
})

test('snapshot, game', () => {

    const withGameProps = {...testProps}
    withGameProps.games.pending.push(testGameData[0], testGameData[2])

    const wrapper = shallow(<GameList {...testProps}/>)

    expect(wrapper).toMatchSnapshot()
})

test('GameList calls requestGameByStatus(pending) when it loads', () => {
    const fakeRequestGames = jest.fn()

    const wrapper = mount(<GameList {...testProps} requestGamesByStatus={fakeRequestGames} />)

    expect(fakeRequestGames).toBeCalled()
})