import {forUnitTests} from './GameListContainer'
const {mapStateToProps, mapDispatchToProps} = forUnitTests

test('mapStateToProps', () => {
    const state = 'butts'
    expect(mapStateToProps(state)).toEqual(state)
})

// test('mapDispatchToProps', () => {
//     const state = 'butts'
//     expect(mapDispatchToProps(state)).toEqual(state)
// })