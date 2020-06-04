import React from 'react'
import {connect} from 'react-redux'

import {GameList} from './GameList'

import { requestGamesByStatus } from '../actions/gameActions'

function mapStateToProps(x) {
    return x
}

const mapDispatchToProps = {
    requestGamesByStatus
}

export const GameListContainer = connect(mapStateToProps, mapDispatchToProps)(GameList)

export const forUnitTests = {
    mapStateToProps
}