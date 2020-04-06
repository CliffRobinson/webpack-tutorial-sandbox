import {forUnitTests} from './ChatWindowContainer'

test('mapStateToProps', ()=> {
    expect(forUnitTests.mapStateToProps("butts")).toEqual("butts")
})