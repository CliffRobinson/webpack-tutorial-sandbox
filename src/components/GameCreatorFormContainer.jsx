import React from 'react';
import { connect } from 'react-redux'

import { GameCreatorForm } from './GameCreatorForm'
import { createGame, receiveGamesByStatus } from '../actions/gameActions'

const mapStateToProps = ({games}) => ({games});
const mapDispatchToProps = {
    createGame,
    receiveGamesByStatus
}

export const GameCreatorFormContainer = connect(mapStateToProps, mapDispatchToProps)(GameCreatorForm);

export const forUnitTesting = {
    mapStateToProps,
    mapDispatchToProps
}