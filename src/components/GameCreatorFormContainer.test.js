import { createGame, receiveGamesByStatus } from '../actions/gameActions'

import { forUnitTesting } from './GameCreatorFormContainer';
const { mapStateToProps, mapDispatchToProps } = forUnitTesting;

test('mapStateToProps', () => {
    const games = 'games';
    const state = {
        games, 
        someOtherKey: 'lol',
    }

    const actual = mapStateToProps(state);

    expect(actual).toEqual({games});
})

test('mapDispatchToProps', () =>{
    expect(mapDispatchToProps).toEqual({createGame, receiveGamesByStatus})
})