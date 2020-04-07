import React from 'react'
import { connect } from 'react-redux'

import { ChatWindow } from './ChatWindow'

import {requestMessages} from '../actions/messageActions'

const mapStateToProps = (state) => state
const mapDispatchToProps = {
    requestMessages
}

export const ChatWindowContainer = connect(mapStateToProps, mapDispatchToProps)(ChatWindow)

export const forUnitTests = {
    mapStateToProps
}