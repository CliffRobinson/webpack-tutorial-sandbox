import React from 'react'
import { connect } from 'react-redux'

import { ChatWindow } from './ChatWindow'

import {requestMessagesByRoom, updateCurrentMessage, addMessage} from '../actions/messageActions'

const mapStateToProps = (state) => state
const mapDispatchToProps = {
    requestMessagesByRoom, updateCurrentMessage, addMessage
}

export const ChatWindowContainer = connect(mapStateToProps, mapDispatchToProps)(ChatWindow)

export const forUnitTests = {
    mapStateToProps
}